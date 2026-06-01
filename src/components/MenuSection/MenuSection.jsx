import React, { useMemo, useState } from "react";
import "./MenuSection.css";
import { MENU } from "../../data/menu";

const TABS = [
  { key: "starters", label: "Закуски" },
  { key: "mains", label: "Горячее" },
  { key: "desserts", label: "Десерты" },
  { key: "drinks", label: "Напитки" }
];

function formatCount(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} позиция`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} позиции`;
  return `${n} позиций`;
}

export default function MenuSection() {
  const [active, setActive] = useState("starters");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU.filter((x) => {
      if (x.category !== active) return false;
      if (!q) return true;
      const hay = `${x.title} ${x.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [active, query]);
  const activeLabel = TABS.find((t) => t.key === active)?.label || "Меню";

  return (
    <section id="menu" className="section menu" style={{ scrollMarginTop: "5rem" }}>
      <div className="container">
        <div className="menu__head">
          <div>
            <div className="eyebrow">Меню</div>
            <h2 className="h2">Выбор дня — в ритме сезона</h2>
            <p className="lead">
              Деликатные сочетания, натуральные вкусы и точные соусы. Переключайтесь между категориями — карточки
              интерактивны и полностью адаптивны.
            </p>
          </div>

          <div className="menu__summary card">
            <div className="menu__summaryTitle">{activeLabel}</div>
            <div className="menu__summaryMeta">{formatCount(items.length)}</div>
            <div className="menu__summaryHint">Наведите на карточку, чтобы увидеть эффект</div>
          </div>
        </div>

        <div className="menu__tabs" role="tablist" aria-label="Категории меню">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`menu__tab ${active === t.key ? "menu__tab--active" : ""}`}
              onClick={() => {
                setActive(t.key);
                setQuery("");
              }}
              role="tab"
              aria-selected={active === t.key}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="menu__searchRow">
          <label className="menu__search">
            <span className="menu__searchLabel">Поиск по категории</span>
            <input
              className="menu__searchInput"
              type="search"
              placeholder="Например: трюфель, гребешок, шоколад…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Поиск блюд"
            />
          </label>
          {query.trim() ? (
            <button className="menu__clear" onClick={() => setQuery("")} aria-label="Очистить поиск">
              Очистить
            </button>
          ) : null}
        </div>

        <div className="menu__grid" role="region" aria-label="Список блюд">
          {items.length ? (
            items.map((dish) => (
            <article key={dish.id} className="menuCard">
              <div className="menuCard__imgWrap" aria-hidden="true">
                <img className="menuCard__img" src={dish.image} alt={dish.title} loading="lazy" />
                <div className="menuCard__imgOverlay" aria-hidden="true" />
              </div>
              <div className="menuCard__body">
                <div className="menuCard__top">
                  <h3 className="menuCard__title">{dish.title}</h3>
                  <div className="menuCard__price">{dish.price}</div>
                </div>
                <p className="menuCard__desc">{dish.description}</p>
                <div className="menuCard__pillRow">
                  <div className="menuCard__pill">Подача à la minute</div>
                  <div className="menuCard__pill">Сезонные ингредиенты</div>
                </div>
              </div>
            </article>
            ))
          ) : (
            <div className="menu__empty card">
              <div className="menu__emptyTitle">Ничего не найдено</div>
              <div className="menu__emptyText">Попробуйте изменить запрос или очистить поиск.</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

