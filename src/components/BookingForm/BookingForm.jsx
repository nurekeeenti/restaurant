import React, { useMemo, useState } from "react";
import "./BookingForm.css";

function pad2(v) {
  return String(v).padStart(2, "0");
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  return `${yyyy}-${mm}-${dd}`;
}

function addDaysISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  return `${yyyy}-${mm}-${dd}`;
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

  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const isValid =
      form.name.trim().length >= 2 &&
      form.phone.trim().length >= 8 &&
      Boolean(form.date) &&
      Boolean(form.time) &&
      Number(form.guests) >= 1;

    if (!isValid) return;

    setIsModalOpen(true);
  };

  const close = () => setIsModalOpen(false);

  return (
    <section id="booking" className="section booking" style={{ scrollMarginTop: "5rem" }}>
      <div className="container">
        <div className="booking__grid">
          <div className="booking__left">
            <div className="eyebrow">Бронирование</div>
            <h2 className="h2">Забронируйте столик для особого вечера</h2>
            <p className="lead">
              Оставьте заявку — мы подтвердим бронирование и учтём ваши пожелания (тихий столик, повод, аллергии).
            </p>

            <div className="booking__notes">
              <div className="booking__note card">
                <div className="booking__noteTitle">Время работы</div>
                <div className="booking__noteText">Ежедневно 12:00–23:00</div>
              </div>
              <div className="booking__note card">
                <div className="booking__noteTitle">Дресс‑код</div>
                <div className="booking__noteText">Smart casual</div>
              </div>
              <div className="booking__note card">
                <div className="booking__noteTitle">Контакты</div>
                <div className="booking__noteText">+7 (777) 123‑45‑67</div>
              </div>
            </div>
          </div>

          <div className="booking__right">
            <form className="bookingForm card" onSubmit={onSubmit} noValidate>
              <div className="bookingForm__title">Форма заявки</div>
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
                  <select
                    className="field__input"
                    value={form.guests}
                    onChange={update("guests")}
                    required
                    aria-label="Количество гостей"
                  >
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

              <div className="bookingForm__actions">
                <button className="btn btn--primary bookingForm__submit" type="submit">
                  Отправить заявку
                </button>
                <div className="bookingForm__fineprint">
                  Нажимая кнопку, вы соглашаетесь на обработку данных для связи по бронированию.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Успешная отправка">
          <button className="modal__backdrop" onClick={close} aria-label="Закрыть" />
          <div className="modal__panel">
            <div className="modal__title">Ваша заявка принята</div>
            <div className="modal__text">
              Мы свяжемся с вами для подтверждения. Если нужно срочно — позвоните по номеру{" "}
              <span className="modal__accent">+7 (777) 123‑45‑67</span>.
            </div>
            <div className="modal__meta">
              <div className="modal__chip">Дата: {form.date || "—"}</div>
              <div className="modal__chip">Время: {form.time || "—"}</div>
              <div className="modal__chip">Гостей: {form.guests}</div>
            </div>
            <div className="modal__actions">
              <button className="btn btn--primary" onClick={close}>
                Понятно
              </button>
              <button
                className="btn btn--ghost"
                onClick={() => {
                  close();
                  setForm({ name: "", phone: "", date: "", time: "", guests: "2" });
                  setSubmitted(false);
                }}
              >
                Новая заявка
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

