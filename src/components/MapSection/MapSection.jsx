import React from "react";
import "./MapSection.css";

export default function MapSection() {
  const address = "Усть-Каменогорск, ул. Казахстан, 59";
  const mapsQuery = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps?q=${mapsQuery}`;

  return (
    <section className="section map">
      <div className="container">
        <div className="map__grid">
          <div className="map__text">
            <div className="eyebrow">Контакты</div>
            <h2 className="h2">Мы в Усть‑Каменогорске</h2>
            <p className="lead">
              Удобное расположение в городе. Для навигации используйте карту — можно открыть в отдельном окне и построить
              маршрут.
            </p>

            <div className="map__cards">
              <div className="map__card card">
                <div className="map__cardTitle">Адрес</div>
                <a className="map__cardText map__link" href={mapsUrl} target="_blank" rel="noreferrer">
                  {address}
                </a>
              </div>
              <div className="map__card card">
                <div className="map__cardTitle">Телефон</div>
                <a className="map__cardText map__link" href="tel:+77771234567">
                  +7 (777) 123‑45‑67
                </a>
              </div>
              <div className="map__card card">
                <div className="map__cardTitle">Email</div>
                <a className="map__cardText map__link" href="mailto:booking@villaborghese.example">
                  booking@villaborghese.example
                </a>
              </div>
            </div>
          </div>

          <div className="map__frame card">
            <iframe
              title="Villa Borghese — карта (метка по адресу)"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

