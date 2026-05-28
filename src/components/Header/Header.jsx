import React, { useEffect, useMemo, useState } from "react";
import "./Header.css";

const navItems = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О нас" },
  { id: "menu", label: "Меню" },
  { id: "booking", label: "Бронирование" },
  { id: "contacts", label: "Контакты" }
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const currentPath = useMemo(() => (typeof window !== "undefined" ? window.location.pathname : "/"), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const onNavClick = (id) => {
    setIsMenuOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`} data-path={currentPath}>
      <div className="header__inner container">
        <button className="header__logo" onClick={() => onNavClick("home")} aria-label="На главную">
          Villa <span>Borghese</span>
        </button>

        <nav className="header__nav" aria-label="Навигация">
          {navItems.map((item) => (
            <button key={item.id} className="header__link" onClick={() => onNavClick(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header__actions">
          <button className="btn btn--primary header__cta" onClick={() => onNavClick("booking")}>
            Забронировать стол
          </button>

          <button
            className={`burger ${isMenuOpen ? "burger--open" : ""}`}
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobileMenu ${isMenuOpen ? "mobileMenu--open" : ""}`} aria-hidden={!isMenuOpen}>
        <div className="mobileMenu__panel">
          <div className="mobileMenu__top">
            <div className="mobileMenu__brand">
              Villa <span>Borghese</span>
            </div>
            <button className="mobileMenu__close" onClick={() => setIsMenuOpen(false)} aria-label="Закрыть меню">
              ✕
            </button>
          </div>

          <div className="mobileMenu__links">
            {navItems.map((item) => (
              <button key={item.id} className="mobileMenu__link" onClick={() => onNavClick(item.id)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="mobileMenu__footer">
            <button className="btn btn--primary mobileMenu__cta" onClick={() => onNavClick("booking")}>
              Заказать столик
            </button>
            <div className="mobileMenu__hint">Нажмите Escape, чтобы закрыть</div>
          </div>
        </div>

        <button className="mobileMenu__backdrop" onClick={() => setIsMenuOpen(false)} aria-label="Закрыть" />
      </div>
    </header>
  );
}

