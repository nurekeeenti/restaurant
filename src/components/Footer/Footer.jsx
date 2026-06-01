import React from "react";
import "./Footer.css";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default function Footer() {
  return (
    <footer id="contacts" className="footer" style={{ scrollMarginTop: "5rem" }}>
      <div className="container footer__grid">

        {/* ── LEFT COLUMN ── */}
        <div className="footer__left">
          <div className="footer__logo">
            Villa <span>Borghese</span>
          </div>
          <div className="footer__tagline">
            Усть‑Каменогорск · современная высокая кухня, где вкус — это композиция, а вечер — ритуал.
          </div>

          <div className="footer__section">
            <div className="footer__title">Часы работы</div>
            <div className="footer__item">Пн–Вс: 12:00–23:00</div>
            <div className="footer__item">Кухня: до 22:30</div>
            <div className="footer__item">Бар: до 23:00</div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="footer__right">
          <div className="footer__section">
            <div className="footer__title">Контакты</div>
            <div className="footer__item">Адрес: Усть‑Каменогорск, ул. Казахстан, 59</div>
            <a className="footer__item footer__link" href="tel:+77771234567">
              Телефон: +7 (777) 123‑45‑67
            </a>
            <a className="footer__item footer__link" href="mailto:booking@villaborghese.example">
              Email: booking@villaborghese.example
            </a>
          </div>

          <div className="footer__socialBlock">
            <span className="footer__socialLabel">Мы в сетях</span>
            <div className="footer__socialIcons">
              <a className="footer__iconBtn" href="#!" aria-label="Instagram"><InstagramIcon /></a>
              <a className="footer__iconBtn" href="#!" aria-label="Facebook"><FacebookIcon /></a>
              <a className="footer__iconBtn" href="#!" aria-label="TikTok"><TikTokIcon /></a>
            </div>
          </div>
        </div>

      </div>

      <div className="container footer__bottom">
        <div className="footer__divider" />

        {/* Two-zone bottom strip */}
        <div className="footer__bottomRow">
          {/* LEFT — chips */}
          <div className="footer__bottomLeft">
          </div>


        </div>

        <div className="footer__copyright">
          © {new Date().getFullYear()} Villa Borghese. Все права защищены.
        </div>
      </div>
    </footer>
  );
}