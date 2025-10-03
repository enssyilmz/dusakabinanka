'use client';

import HomeHero from './HomeHero';
import Catalog from './Catalog';
import Contact from './Contact';

export default function Main() {
  return (
    <div>
    {/* Hero Bölümü */}
    <div className='overflow-hidden'>
    <HomeHero />
    </div>

    {/* Katalog Bölümü */}
    <div className='overflow-hidden'>
      <Catalog />
    </div>

    {/* İletişim Bölümü */}
    <div className='overflow-hidden'>
      <Contact />
    </div>
    </div>
  );
}
