"use client";
import { useRef, useState } from "react";

const slides = [
  {
    eyebrow: "THE HOUSE",
    title: "Website",
    description: "Discover the official world of House of Antiques.",
    image: "/cards/house.jpg",
    href: "https://houseof-antiques.com",
  },
  {
    eyebrow: "SHOP",
    title: "Store",
    description: "Browse rare antiques, artworks, and collectible pieces.",
    image: "/cards/store.jpg",
    href: "https://houseofantiques.store",
  },
  {
    eyebrow: "TOUR",
    title: "Virtual Tour",
    description: "Walk through the house in an immersive 360° experience.",
    image: "/cards/tour.jpg",
    href: "https://my.matterport.com/show/?m=rUWyUPkBTgF",
  },
  {
    eyebrow: "VISIT",
    title: "Booking",
    description: "Reserve your visit and experience the house in person.",
    image: "/cards/booking.jpg",
    href: "https://houseofantiques.github.io/Booking-/",
  },
  {
    eyebrow: "MEDIA",
    title: "Press",
    description: "Read stories, features, and media coverage.",
    image: "/cards/press.jpg",
    href: "https://www.houseof-antiques.com/press",
  },
  {
    eyebrow: "MENU",
    title: "Menu",
    description: "Explore the hospitality side of the experience.",
    image: "/cards/menu.jpg",
    href: "https://hoa-menu.vercel.app/",
  },
];
export default function Home() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
const touchStartX = useRef<number | null>(null);
const touchEndX = useRef<number | null>(null);

const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
  touchStartX.current = event.touches[0].clientX;
};

const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
  touchEndX.current = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (touchStartX.current === null || touchEndX.current === null) return;

  const distance = touchStartX.current - touchEndX.current;
  const minSwipeDistance = 45;

  if (Math.abs(distance) > minSwipeDistance) {
    if (distance > 0) {
      next();
    } else {
      prev();
    }
  }

  touchStartX.current = null;
  touchEndX.current = null;
};
  const next = () => setActive((current) => (current + 1) % slides.length);
  const prev = () =>
    setActive((current) => (current - 1 + slides.length) % slides.length);

  return (
    <main className="page">
      <section
  className="scene"
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
        <img src="/hand-card.jpg" alt="" className="backgroundImage" />

        <header className="header">
          <img src="/logo.png" alt="House of Antiques" className="logo" />

          <div className="counter">
            {active + 1} / {slides.length}
          </div>
        </header>

        <div className="mainTitle">
          <span>HOUSE OF ANTIQUES</span>
          <h1>Choose Your Experience</h1>
          <p>One visual gateway to every corner of the house.</p>
        </div>

       <div className="paperContent" key={slide.title}>
  <div className="linkInfo">
    <span>{slide.eyebrow}</span>
    <h2>{slide.title}</h2>
    <p>{slide.description}</p>
  </div>

  <div className="slideImageBox">
    <img src={slide.image} alt={slide.title} />
  </div>
</div>

<a href={slide.href} className="enterLink">
  Enter
</a>

        <button className="arrow arrowRight" onClick={next} aria-label="Next">
          ›
        </button>

        <button className="arrow arrowLeft" onClick={prev} aria-label="Previous">
          ‹
        </button>

        <div className="dots">
          {slides.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setActive(index)}
              className={active === index ? "dot activeDot" : "dot"}
              aria-label={item.title}
            />
          ))}
        </div>
      </section>
    </main>
  );
}