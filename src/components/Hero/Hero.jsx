import React from "react";
import "./Hero.css";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section id="home" className="hero" style={{ scrollMarginTop: "5rem" }}>
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container hero__content">
        <div className="hero__badge">
          <span className="hero__dot" />
          Высокая кухня · Авторские сеты · Винная карта
        </div>

        <h1 className="hero__title">Искусство вкуса в каждом блюде</h1>
        <p className="hero__subtitle">
          Сезонные ингредиенты, точная техника и атмосфера тихой роскоши. Откройте для себя дегустационное меню,
          созданное шефом в духе современной европейской гастрономии.
        </p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => scrollToId("menu")}>
            Смотреть меню
          </button>
          <button className="btn btn--ghost" onClick={() => scrollToId("booking")}>
            Заказать столик
          </button>
        </div>

        <div className="hero__meta">
          <div className="hero__metaItem">
            <div className="hero__metaLabel">Локация</div>
            <div className="hero__metaValue">Усть‑Каменогорск · центр города</div>
          </div>
          <div className="hero__metaDivider" />
          <div className="hero__metaItem">
            <div className="hero__metaLabel">Сервис</div>
            <div className="hero__metaValue">Подача в 2–3 акта · сомелье</div>
          </div>
          <div className="hero__metaDivider" />
          <div className="hero__metaItem">
            <div className="hero__metaLabel">Бронирование</div>
            <div className="hero__metaValue">Онлайн заявка · подтверждение в течение дня</div>
          </div>
        </div>
      </div>
    </section>
  );
}

