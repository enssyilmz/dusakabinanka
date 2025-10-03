'use client';

import HomeHero from './HomeHero';
import Catalog from './Catalog';
import Contact from './Contact';

export default function Main() {
  return (
    <>
    {/* Hero Bölümü */}
    <div>
    <HomeHero />
    </div>

    {/* Katalog Bölümü */}
    <div>
      <Catalog />
    </div>

    {/* İletişim Bölümü */}
    <div>
      <Contact />
    </div>
    </>
  );
}
