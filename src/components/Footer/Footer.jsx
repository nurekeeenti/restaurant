import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="contacts" className="footer" style={{ scrollMarginTop: "5rem" }}>
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            Villa <span>Borghese</span>
          </div>
          <div className="footer__tagline">
            Усть‑Каменогорск · современная высокая кухня, где вкус — это композиция, а вечер — ритуал.
          </div>
          <div className="footer__social">
            <a className="footer__socialLink" href="#!" aria-label="Instagram">
              Instagram
            </a>
            <a className="footer__socialLink" href="#!" aria-label="Facebook">
              Facebook
            </a>
            <a className="footer__socialLink" href="#!" aria-label="TikTok">
              TikTok
            </a>
          </div>
        </div>

        <div className="footer__col">
          <div className="footer__title">Часы работы</div>
          <div className="footer__item">Пн–Вс: 12:00–23:00</div>
          <div className="footer__item">Кухня: до 22:30</div>
          <div className="footer__item">Бар: до 23:00</div>
        </div>

        <div className="footer__col">
          <div className="footer__title">Контакты</div>
          <div className="footer__item">Адрес: Усть‑Каменогорск, ул. Казахстан, 59</div>
          <a className="footer__item footer__link" href="tel:+77771234567">
            Телефон: +7 (777) 123‑45‑67
          </a>
          <a className="footer__item footer__link" href="mailto:booking@villaborghese.example">
            Email: booking@villaborghese.example
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <div className="footer__divider" />
        <div className="footer__copyright">
          © {new Date().getFullYear()} Villa Borghese. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

