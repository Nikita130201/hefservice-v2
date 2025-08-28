// src/app/page.js
"use client";

import Hero from "@/components/Hero";
import FeatureGrid from "@/components/Process";
import CTA from "@/components/CTA";
import Advantages from "@/components/Advantages";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <Advantages />
      {/* сюда позже вставим WorldMap / и др. секции */}
      <CTA />
    </>
  );
}