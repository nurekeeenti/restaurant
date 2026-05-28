import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import MenuSection from "./components/MenuSection/MenuSection";
import BookingForm from "./components/BookingForm/BookingForm";
import Gallery from "./components/Gallery/Gallery";
import MapSection from "./components/MapSection/MapSection";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <MenuSection />
        <BookingForm />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}

