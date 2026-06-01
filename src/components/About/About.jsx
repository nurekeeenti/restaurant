import React from "react";
import "./About.css";
import Countdown from "../Countdown/Countdown";

export default function About() {
  return (
    <section id="about" className="section about" style={{ scrollMarginTop: "5rem" }}>
      <div className="container">
        <div className="about__grid">
          <div className="about__text">
            <div className="eyebrow">О нас</div>
            <h2 className="h2">Тихая роскошь. Точный вкус. Чистые эмоции.</h2>
            <p className="lead">
              Villa Borghese — пространство, где высокая кухня звучит современно: сезонные продукты, авторские техники и
              внимательная подача. Мы ценим баланс — насыщенность и лёгкость, классику и неожиданное.
            </p>
            <p className="lead" style={{ opacity: 0.78 }}>
              Каждый вечер здесь — это небольшой ритуал: от первого бокала до последнего десерта. Мы работаем с
              локальными фермерами, следим за сезоном и меняем карту так, чтобы каждый визит был чуть другим.
              Приходите за вкусом — оставайтесь ради атмосферы.
            </p>
          </div>

          <div className="about__gallery">
            <div className="about__img about__img--tall">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
                alt="Интерьер ресторана"
                loading="lazy"
              />
            </div>
            <div className="about__img">
              <img
                src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80"
                alt="Подача блюда"
                loading="lazy"
              />
            </div>
            <Countdown targetISO="2026-06-06T19:00:00+05:00" title="До Chef's Table Night" />
          </div>
        </div>

        {/* 4 highlights full-width below */}
        <div className="about__highlights">
          <div className="about__highlight card">
            <div className="about__highlightIcon">✦</div>
            <div className="about__highlightTitle">Философия</div>
            <div className="about__highlightText">
              Минимализм во вкусе, максимум в деталях. Каждый ингредиент — на своём месте, без лишнего шума.
            </div>
          </div>
          <div className="about__highlight card">
            <div className="about__highlightIcon">◈</div>
            <div className="about__highlightTitle">Шеф‑повар</div>
            <div className="about__highlightText">
              Авторские сеты, где французская школа встречается с локальными продуктами и современной подачей.
            </div>
          </div>
          <div className="about__highlight card">
            <div className="about__highlightIcon">❧</div>
            <div className="about__highlightTitle">Атмосфера</div>
            <div className="about__highlightText">
              Тёплый свет, мягкие фактуры и музыка, которая не мешает разговору — идеально для особого вечера.
            </div>
          </div>
          <div className="about__highlight card">
            <div className="about__highlightIcon">◇</div>
            <div className="about__highlightTitle">Винная карта</div>
            <div className="about__highlightText">
              Более 80 позиций: Старый и Новый свет, природные вина и классические апелласьоны под каждый сет.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}