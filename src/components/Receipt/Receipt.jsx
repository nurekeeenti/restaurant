import React, { useRef } from "react";
import "./Receipt.css";

export default function Receipt({ receipt, onClose, onNewBooking }) {
  const printRef = useRef(null);

  if (!receipt) return null;
  const handlePrint = () => {
    const content = printRef.current;
    const win = window.open("", "_blank", "width=480,height=700");
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Чек Villa Borghese</title>
          <style>
            @page { margin: 1cm; }
            body { margin: 0; background: #f8f6f2; font-family: sans-serif; }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div className="receiptModal" role="dialog" aria-modal="true" aria-label="Чек об оплате">
      <button className="receiptModal__backdrop" onClick={onClose} aria-label="Закрыть" type="button" />

      <div className="receiptModal__panel">
        <div ref={printRef} className="receipt" id="print-receipt">
          <div className="receipt__brand">
            Villa <span>Borghese</span>
          </div>
          <div className="receipt__status">✓ Оплата успешно проведена</div>
          <div className="receipt__date">Дата: {receipt.todayFormatted}</div>

          <div className="receipt__divider" />

          <div className="receipt__row">
            <span>Номер брони</span>
            <strong>{receipt.bookingCode}</strong>
          </div>
          <div className="receipt__row">
            <span>Гость</span>
            <strong>{receipt.name}</strong>
          </div>
          <div className="receipt__row">
            <span>Телефон</span>
            <strong>{receipt.phone}</strong>
          </div>
          <div className="receipt__row">
            <span>Визит</span>
            <strong>
              {receipt.visitDate} · {receipt.visitTime} · {receipt.guests} гост(ей)
            </strong>
          </div>

          {receipt.hasPreorder && receipt.items?.length > 0 ? (
            <>
              <div className="receipt__sectionTitle">Предзаказ</div>
              <div className="receipt__items">
                {receipt.items.map((item) => (
                  <div key={item.menuId} className="receipt__item">
                    <div className="receipt__itemTop">
                      <span className="receipt__itemTitle">{item.title}</span>
                      <span className="receipt__itemQty">×{item.quantity}</span>
                    </div>
                    <div className="receipt__itemBottom">
                      <span>{item.unitPriceFormatted}</span>
                      <strong>{item.lineTotalFormatted}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="receipt__note">Предзаказ не выбран — оплачена только бронь столика.</div>
          )}

          <div className="receipt__divider" />

          <div className="receipt__total">
            <span>Итого</span>
            <strong>{receipt.totalFormatted}</strong>
          </div>

          <div className="receipt__footer">
            Усть‑Каменогорск · ул. Казахстан, 59
            <br />
            Спасибо, что выбрали Villa Borghese!
          </div>
        </div>

        <div className="receiptModal__actions no-print">
          <button type="button" className="btn btn--primary" onClick={handlePrint}>
            Распечатать чек
          </button>
          <button type="button" className="btn btn--ghost" onClick={onNewBooking}>
            Новая бронь
          </button>
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
