import React, { useEffect, useMemo, useState } from "react";
import "./Gallery.css";

const DEFAULT_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=2200&q=80",
    alt: "Зал ресторана"
  },
  {
    src: "https://static.tildacdn.com/tild3063-3134-4236-b738-303535396163/servirovka_stola_tia.jpg",
    alt: "Сервировка"
  },
  {
    src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=2200&q=80",
    alt: "Подача блюда"
  },
  {
    src: "https://shopcdnpro.grainajz.com/category/358773/1770/e66ac67bba4ef3f4bf754c2c27c5586b/DSC02876.jpg",
    alt: "Кухня и процесс"
  },
  {
    src: "https://static1-repo.aif.ru/1/0a/824061/e7b946af286e03393874f8b92c0f0e6f.jpg",
    alt: "Детали подачи"
  },
  {
    src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=2200&q=80",
    alt: "Вечерний свет"
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=80",
    alt: "Атмосфера зала"
  },
  {
    src: "https://images.unsplash.com/photo-1421622548261-c45bfe178854?auto=format&fit=crop&w=2200&q=80",
    alt: "Подача и текстуры"
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2200&q=80",
    alt: "Винная карта"
  },
  {
    src: "https://masterpiecer-images.s3.yandex.net/5d6427d9614b11ee9f43a6c7e2b53deb:upscaled",
    alt: "Столики для двоих"
  }
];

function clampIndex(i, len) {
  if (len <= 0) return 0;
  return ((i % len) + len) % len;
}

export default function Gallery({ photos = DEFAULT_PHOTOS }) {
  const [active, setActive] = useState(0);

  const safePhotos = useMemo(() => photos.filter((p) => p && p.src), [photos]);

  const goTo = (index) => setActive(clampIndex(index, safePhotos.length));
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  useEffect(() => {
    if (safePhotos.length <= 1) return;
    if (typeof window === "undefined") return;

    const reduceMotion =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setActive((prevActive) => clampIndex(prevActive + 1, safePhotos.length));
    }, 4600);

    return () => window.clearInterval(id);
  }, [safePhotos.length]);

  const prevIndex = safePhotos.length ? clampIndex(active - 1, safePhotos.length) : 0;
  const nextIndex = safePhotos.length ? clampIndex(active + 1, safePhotos.length) : 0;
  const visible = safePhotos.length
    ? [
        { pos: "prev", idx: prevIndex, photo: safePhotos[prevIndex] },
        { pos: "active", idx: active, photo: safePhotos[active] },
        { pos: "next", idx: nextIndex, photo: safePhotos[nextIndex] }
      ]
    : [];

  return (
    <section className="section gallery" aria-label="Галерея ресторана">
      <div className="container">
        <div className="gallery__head">
          <div>
            <div className="eyebrow">Галерея</div>
            <h2 className="h2">Интерьер и атмосфера Villa Borghese</h2>
            <p className="lead">Премиальная карусель: мягкие переходы, фокус на центральной фотографии.</p>
          </div>

          <div className="gallery__controls">
            <button className="gallery__btn" onClick={prev} aria-label="Предыдущее фото" disabled={safePhotos.length <= 1}>
              ←
            </button>
            <button
              className="gallery__btn"
              onClick={next}
              aria-label="Следующее фото"
              disabled={safePhotos.length <= 1}
            >
              →
            </button>
          </div>
        </div>

        <div className="gallery__card card">
          <div className="gallery__stage" aria-label="Слайды">
            {visible.map(({ pos, idx, photo }) => (
              <button
                key={`${pos}-${idx}`}
                className={`gallerySlide gallerySlide--${pos}`}
                onClick={() => goTo(idx)}
                aria-label={`Открыть: ${photo.alt || `Фото ${idx + 1}`}`}
              >
                <img className="gallerySlide__img" src={photo.src} alt={photo.alt || `Фото ${idx + 1}`} loading="lazy" />
                <div className="gallerySlide__shade" aria-hidden="true" />
                <div className="gallerySlide__caption">{photo.alt || "Фото"}</div>
              </button>
            ))}
          </div>

          <div className="gallery__dots" aria-label="Навигация по слайдам">
            {safePhotos.map((_, idx) => (
              <button
                key={idx}
                className={`gallery__dot ${idx === active ? "gallery__dot--active" : ""}`}
                onClick={() => goTo(idx)}
                aria-label={`Слайд ${idx + 1}`}
                aria-current={idx === active ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

