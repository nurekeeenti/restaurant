import React, { useMemo, useState } from "react";
import "./BookingForm.css";
import { MENU, formatMoney } from "../../data/menu";
import { createBooking, payBooking } from "../../api/client";
import Receipt from "../Receipt/Receipt";

function pad2(v) {
  return String(v).padStart(2, "0");
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function addDaysISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export default function BookingForm() {
  const minDate = useMemo(() => todayISO(), []);
  const maxDate = useMemo(() => addDaysISO(60), []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2"
  });

  const [enablePreorder, setEnablePreorder] = useState(false);
  const [cart, setCart] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [step, setStep] = useState("form");
  const [bookingId, setBookingId] = useState(null);
  const [bookingCode, setBookingCode] = useState("");
  const [receipt, setReceipt] = useState(null);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const preorderTotal = useMemo(() => {
    return Object.entries(cart).reduce((sum, [menuId, qty]) => {
      const item = MENU.find((m) => m.id === menuId);
      if (!item || qty < 1) return sum;
      return sum + item.priceAmount * qty;
    }, 0);
  }, [cart]);

  const setQty = (menuId, qty) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[menuId];
      else next[menuId] = qty;
      return next;
    });
  };

  const validate = () => {
    return (
      form.name.trim().length >= 2 &&
      form.phone.trim().length >= 8 &&
      Boolean(form.date) &&
      Boolean(form.time) &&
      Number(form.guests) >= 1
    );
  };

  const buildPreorderPayload = () =>
    Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([menuId, quantity]) => ({ menuId, quantity }));

  const resetAll = () => {
    setForm({ name: "", phone: "", date: "", time: "", guests: "2" });
    setEnablePreorder(false);
    setCart({});
    setSubmitted(false);
    setError("");
    setStep("form");
    setBookingId(null);
    setBookingCode("");
    setReceipt(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    if (!validate()) return;

    const preorderItems = enablePreorder ? buildPreorderPayload() : [];
    if (enablePreorder && preorderItems.length === 0) {
      setError("Выберите хотя бы одно блюдо для предзаказа или отключите предзаказ.");
      return;
    }

    setLoading(true);
    try {
      const result = await createBooking({
        name: form.name.trim(),
        phone: form.phone.trim(),
        date: form.date,
        time: form.time,
        guests: Number(form.guests),
        preorderItems
      });

      setBookingId(result.id);
      setBookingCode(result.bookingCode);
      setStep("confirm");
    } catch (err) {
      setError(err.message || "Не удалось сохранить бронь. Запустите сервер: npm run server");
    } finally {
      setLoading(false);
    }
  };

  const onPay = async () => {
    if (!bookingId) return;
    setLoading(true);
    setError("");
    try {
      const result = await payBooking(bookingId);
      setReceipt(result.receipt);
      setStep("receipt");
    } catch (err) {
      setError(err.message || "Ошибка при оплате");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="section booking" style={{ scrollMarginTop: "5rem" }}>
      <div className="container">
        <div className="booking__grid">
          <div className="booking__left">
            <div className="eyebrow">Бронирование</div>
            <h2 className="h2">Забронируйте столик для особого вечера</h2>
            <p className="lead">
              Бронь сохраняется в базе данных. Можно добавить предзаказ блюд — после подтверждения оплаты вы получите
              чек с датой и суммой (как при успешной покупке).
            </p>

            <div className="booking__notes">
              <div className="booking__note card">
                <div className="booking__noteTitle">Время работы</div>
                <div className="booking__noteText">Ежедневно 12:00–23:00</div>
              </div>
              <div className="booking__note card">
                <div className="booking__noteTitle">Предзаказ</div>
                <div className="booking__noteText">Блюда готовятся к вашему приходу</div>
              </div>
              <div className="booking__note card">
                <div className="booking__noteTitle">Контакты</div>
                <div className="booking__noteText">+7 (777) 123‑45‑67</div>
              </div>
            </div>
          </div>

          <div className="booking__right">
            {step === "form" ? (
              <form className="bookingForm card" onSubmit={onSubmit} noValidate>
                <div className="bookingForm__title">Форма заявки</div>

                {error ? <div className="bookingForm__error">{error}</div> : null}

                <div className="bookingForm__grid">
                  <label className="field">
                    <span className="field__label">Имя</span>
                    <input
                      className={`field__input ${submitted && form.name.trim().length < 2 ? "field__input--error" : ""}`}
                      type="text"
                      placeholder="Например, Алия"
                      value={form.name}
                      onChange={update("name")}
                      required
                      minLength={2}
                    />
                    {submitted && form.name.trim().length < 2 ? (
                      <span className="field__error">Введите имя (минимум 2 символа)</span>
                    ) : null}
                  </label>

                  <label className="field">
                    <span className="field__label">Телефон</span>
                    <input
                      className={`field__input ${submitted && form.phone.trim().length < 8 ? "field__input--error" : ""}`}
                      type="tel"
                      placeholder="+7 (___) ___‑__‑__"
                      value={form.phone}
                      onChange={update("phone")}
                      required
                      minLength={8}
                      inputMode="tel"
                    />
                    {submitted && form.phone.trim().length < 8 ? (
                      <span className="field__error">Укажите телефон для подтверждения</span>
                    ) : null}
                  </label>

                  <label className="field">
                    <span className="field__label">Дата</span>
                    <input
                      className={`field__input ${submitted && !form.date ? "field__input--error" : ""}`}
                      type="date"
                      value={form.date}
                      onChange={update("date")}
                      required
                      min={minDate}
                      max={maxDate}
                    />
                    {submitted && !form.date ? <span className="field__error">Выберите дату</span> : null}
                  </label>

                  <label className="field">
                    <span className="field__label">Время</span>
                    <input
                      className={`field__input ${submitted && !form.time ? "field__input--error" : ""}`}
                      type="time"
                      value={form.time}
                      onChange={update("time")}
                      required
                      min="12:00"
                      max="22:30"
                    />
                    {submitted && !form.time ? <span className="field__error">Выберите время</span> : null}
                  </label>

                  <label className="field field--full">
                    <span className="field__label">Количество гостей</span>
                    <select className="field__input" value={form.guests} onChange={update("guests")} required>
                      {Array.from({ length: 10 }).map((_, i) => {
                        const v = String(i + 1);
                        return (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>

                <label className="preorderToggle field--full">
                  <input
                    type="checkbox"
                    checked={enablePreorder}
                    onChange={(e) => {
                      setEnablePreorder(e.target.checked);
                      if (!e.target.checked) setCart({});
                    }}
                  />
                  <span>Добавить предзаказ блюд</span>
                </label>

                {enablePreorder ? (
                  <div className="preorderList">
                    <div className="preorderList__title">Выберите блюда</div>
                    {MENU.map((item) => (
                      <div key={item.id} className="preorderRow">
                        <div className="preorderRow__info">
                          <div className="preorderRow__name">{item.title}</div>
                          <div className="preorderRow__price">{item.price}</div>
                        </div>
                        <div className="preorderRow__qty">
                          <button
                            type="button"
                            className="preorderRow__btn"
                            onClick={() => setQty(item.id, (cart[item.id] || 0) - 1)}
                            aria-label="Уменьшить"
                          >
                            −
                          </button>
                          <span className="preorderRow__count">{cart[item.id] || 0}</span>
                          <button
                            type="button"
                            className="preorderRow__btn"
                            onClick={() => setQty(item.id, (cart[item.id] || 0) + 1)}
                            aria-label="Увеличить"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                    {preorderTotal > 0 ? (
                      <div className="preorderList__total">Сумма предзаказа: {formatMoney(preorderTotal)}</div>
                    ) : null}
                  </div>
                ) : null}

                <div className="bookingForm__actions">
                  <button className="btn btn--primary bookingForm__submit" type="submit" disabled={loading}>
                    {loading ? "Сохранение…" : "Забронировать"}
                  </button>
                  <div className="bookingForm__fineprint">
                    Villa Borghese
                  </div>
                </div>
              </form>
            ) : null}

            {step === "confirm" ? (
              <div className="bookingConfirm card">
                <div className="bookingConfirm__title">Бронь создана</div>
                <p className="bookingConfirm__text">
                  Номер брони: <strong>{bookingCode}</strong>
                  <br />
                  {form.date} в {form.time}, гостей: {form.guests}
                  {enablePreorder && preorderTotal > 0 ? (
                    <>
                      <br />
                      К оплате (предзаказ): <strong>{formatMoney(preorderTotal)}</strong>
                    </>
                  ) : (
                    <>
                      <br />
                      Предзаказ не выбран — оплата не требуется (бронь бесплатная).
                    </>
                  )}
                </p>

                {error ? <div className="bookingForm__error">{error}</div> : null}

                <div className="bookingConfirm__actions">
                  <button type="button" className="btn btn--primary" onClick={onPay} disabled={loading}>
                    {loading ? "Обработка…" : "Подтвердить оплату и получить чек"}
                  </button>
                  <button type="button" className="btn btn--ghost" onClick={resetAll}>
                    Новая бронь
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {step === "receipt" && receipt ? (
        <Receipt receipt={receipt} onClose={resetAll} onNewBooking={resetAll} />
      ) : null}
    </section>
  );
}
