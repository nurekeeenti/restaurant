import React, { useMemo, useState } from "react";
import "./MenuSection.css";

const TABS = [
  { key: "starters", label: "Закуски" },
  { key: "mains", label: "Горячее" },
  { key: "desserts", label: "Десерты" },
  { key: "drinks", label: "Напитки" }
];

const MENU = [
  {
    id: "s1",
    category: "starters",
    title: "Тартар из говядины сухой выдержки",
    description: "Каперсы, трюфельная эмульсия, хрустящий бриошь, маринованный шалот.",
    price: "4.200 ₸",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "s2",
    category: "starters",
    title: "Гребешок, цитрус и масло нуазет",
    description: "Сегменты апельсина, крем из пастернака, миндальная крошка.",
    price: "5.600 ₸",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "s3",
    category: "starters",
    title: "Салат с бураттой и печёной свёклой",
    description: "Фундук, медово-бальзамический соус, зелёное масло.",
    price: "3.900 ₸",
    image:
      "https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=1400&q=80"
  },

  {
    id: "m1",
    category: "mains",
    title: "Филе сибаса с соусом бер блан",
    description: "Фенхель конфи, картофельный крем, укропное масло.",
    price: "7.400 ₸",
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "m2",
    category: "mains",
    title: "Утиная грудка, вишня и тимьян",
    description: "Пюре из сельдерея, соус демиглас, карамелизированная морковь.",
    price: "8.100 ₸",
    image:
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "m3",
    category: "mains",
    title: "Ризотто с белыми грибами",
    description: "Пармезан, масло трюфеля, хрустящие грибы, зелёный лук.",
    price: "6.600 ₸",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1400&q=80"
  },

  {
    id: "d1",
    category: "desserts",
    title: "Шоколадный фондан",
    description: "Тёплый ганаш, сорбет из малины, какао-крошка.",
    price: "3.200 ₸",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "d2",
    category: "desserts",
    title: "Тарт с ванильным кремом и инжиром",
    description: "Соль флер де сель, миндальная основа, медовая глазурь.",
    price: "3.500 ₸",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJluiddgezJObnaYjIOaeWPNvchsCsa4Ws1g&s"
  },
  {
    id: "d3",
    category: "desserts",
    title: "Чизкейк с цитрусовым акцентом",
    description: "Лайм, сливочный сыр, хрустящий сабле, соус юдзу.",
    price: "3.100 ₸",
    image:
      "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1400&q=80"
  },

  {
    id: "dr1",
    category: "drinks",
    title: "Коктейль «Noir»",
    description: "Бергамот, тоник, цитрус, лёгкая дымность. Безалкогольная версия — по запросу.",
    price: "2.400 ₸",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    id: "dr2",
    category: "drinks",
    title: "Бокал игристого",
    description: "Brut, холодная подача, идеальный аперитив перед сетом.",
    price: "2.900 ₸",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-_I6MRiHbUlP8mEWuI11reA1PfP6_YXxTYg&s"
  },
  {
    id: "dr3",
    category: "drinks",
    title: "Кофе фильтр / эспрессо",
    description: "Свежеобжаренные зерна, чистый профиль, идеальное завершение ужина.",
    price: "1.300 ₸",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80"
  }
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

