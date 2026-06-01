const express = require("express");
const cors = require("cors");
const { db, generateBookingCode } = require("./db");
const menuCatalog = require("./menuData");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function nowISO() {
  return new Date().toISOString();
}

function formatReceiptDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("ru-RU", {
    timeZone: "Asia/Almaty",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getMenuMap() {
  const map = new Map();
  menuCatalog.forEach((item) => map.set(item.id, item));
  return map;
}

function buildReceipt(bookingId) {
  const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(bookingId);
  if (!booking) return null;

  const items = db
    .prepare("SELECT menu_id, title, unit_price, quantity, line_total FROM preorder_items WHERE booking_id = ?")
    .all(bookingId);

  return {
    bookingCode: booking.booking_code,
    status: booking.status,
    name: booking.name,
    phone: booking.phone,
    visitDate: booking.visit_date,
    visitTime: booking.visit_time,
    guests: booking.guests,
    hasPreorder: Boolean(booking.has_preorder),
    totalAmount: booking.total_amount,
    totalFormatted: `${Number(booking.total_amount).toLocaleString("ru-RU")} ₸`,
    createdAt: booking.created_at,
    paidAt: booking.paid_at,
    paidAtFormatted: formatReceiptDate(booking.paid_at),
    todayFormatted: formatReceiptDate(booking.paid_at || booking.created_at),
    items: items.map((row) => ({
      menuId: row.menu_id,
      title: row.title,
      unitPrice: row.unit_price,
      unitPriceFormatted: `${Number(row.unit_price).toLocaleString("ru-RU")} ₸`,
      quantity: row.quantity,
      lineTotal: row.line_total,
      lineTotalFormatted: `${Number(row.line_total).toLocaleString("ru-RU")} ₸`
    }))
  };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "villa-borghese-api" });
});

app.get("/api/menu", (_req, res) => {
  res.json({ items: menuCatalog });
});

app.post("/api/bookings", (req, res) => {
  try {
    const { name, phone, date, time, guests, preorderItems = [] } = req.body || {};

    if (!name || String(name).trim().length < 2) {
      return res.status(400).json({ error: "Укажите имя (минимум 2 символа)" });
    }
    if (!phone || String(phone).trim().length < 8) {
      return res.status(400).json({ error: "Укажите корректный телефон" });
    }
    if (!date || !time) {
      return res.status(400).json({ error: "Укажите дату и время визита" });
    }

    const guestsNum = Number(guests);
    if (!guestsNum || guestsNum < 1) {
      return res.status(400).json({ error: "Количество гостей должно быть от 1" });
    }

    const menuMap = getMenuMap();
    let totalAmount = 0;
    const normalizedItems = [];

    if (Array.isArray(preorderItems) && preorderItems.length > 0) {
      for (const row of preorderItems) {
        const menuItem = menuMap.get(row.menuId);
        const qty = Number(row.quantity) || 0;
        if (!menuItem || qty < 1) continue;

        const lineTotal = menuItem.priceAmount * qty;
        totalAmount += lineTotal;
        normalizedItems.push({
          menuId: menuItem.id,
          title: menuItem.title,
          unitPrice: menuItem.priceAmount,
          quantity: qty,
          lineTotal
        });
      }
    }

    const bookingCode = generateBookingCode();
    const createdAt = nowISO();
    const hasPreorder = normalizedItems.length > 0 ? 1 : 0;

    const insertBooking = db.prepare(`
      INSERT INTO bookings (
        booking_code, name, phone, visit_date, visit_time, guests,
        has_preorder, status, total_amount, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    `);

    const result = insertBooking.run(
      bookingCode,
      String(name).trim(),
      String(phone).trim(),
      date,
      time,
      guestsNum,
      hasPreorder,
      totalAmount,
      createdAt
    );

    const bookingId = result.lastInsertRowid;

    if (normalizedItems.length > 0) {
      const insertItem = db.prepare(`
        INSERT INTO preorder_items (booking_id, menu_id, title, unit_price, quantity, line_total)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      const insertMany = db.transaction((items) => {
        for (const item of items) {
          insertItem.run(bookingId, item.menuId, item.title, item.unitPrice, item.quantity, item.lineTotal);
        }
      });
      insertMany(normalizedItems);
    }

    res.status(201).json({
      id: bookingId,
      bookingCode,
      status: "pending",
      totalAmount,
      hasPreorder: Boolean(hasPreorder),
      message: "Бронь создана. Подтвердите предоплату для получения чека."
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Не удалось создать бронь" });
  }
});

app.post("/api/bookings/:id/pay", (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(bookingId);

    if (!booking) return res.status(404).json({ error: "Бронь не найдена" });
    if (booking.status === "paid") {
      return res.json({ message: "Уже оплачено", receipt: buildReceipt(bookingId) });
    }

    const paidAt = nowISO();
    db.prepare("UPDATE bookings SET status = 'paid', paid_at = ? WHERE id = ?").run(paidAt, bookingId);

    const receipt = buildReceipt(bookingId);
    res.json({
      message: "Оплата успешно проведена",
      receipt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка оплаты" });
  }
});

app.get("/api/bookings/:id/receipt", (req, res) => {
  const bookingId = Number(req.params.id);
  const receipt = buildReceipt(bookingId);
  if (!receipt) return res.status(404).json({ error: "Чек не найден" });
  if (receipt.status !== "paid") {
    return res.status(400).json({ error: "Чек доступен после оплаты" });
  }
  res.json({ receipt });
});

app.listen(PORT, () => {
  console.log(`API Villa Borghese: http://localhost:${PORT}`);
});
