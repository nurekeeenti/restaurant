import React, { useEffect, useMemo, useState } from "react";
import "./Countdown.css";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toParts(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetISO, title = "До следующего вечера от шефа" }) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const interval = reduceMotion ? 60000 : 1000;
    const id = window.setInterval(() => setNow(Date.now()), interval);
    return () => window.clearInterval(id);
  }, []);

  const parts = toParts(target - now);

  return (
    <div className="countdown card" aria-label="Обратный отсчет">
      <div className="countdown__top">
        <div className="countdown__eyebrow">Таймер</div>
        <div className="countdown__title">{title}</div>
        <div className="countdown__sub">Успей забронировать столик на дегустационный сет</div>
      </div>

      <div className="countdown__grid">
        <div className="countdown__cell">
          <div className="countdown__num">{parts.days}</div>
          <div className="countdown__label">дней</div>
        </div>
        <div className="countdown__cell">
          <div className="countdown__num">{pad2(parts.hours)}</div>
          <div className="countdown__label">часов</div>
        </div>
        <div className="countdown__cell">
          <div className="countdown__num">{pad2(parts.minutes)}</div>
          <div className="countdown__label">мин</div>
        </div>
        <div className="countdown__cell">
          <div className="countdown__num">{pad2(parts.seconds)}</div>
          <div className="countdown__label">сек</div>
        </div>
      </div>

      <div className="countdown__hint">
        Идея: каждую пятницу — авторский “Chef’s Table Night” с винным пэрингом.
      </div>
    </div>
  );
}

