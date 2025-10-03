'use client';

export default function Catalog() {
  return (
    <section id="katalog" className="relative z-50 min-h-screen w-full bg-[#376C6F] text-white">
      <div className="px-4 sm:px-6 py-12 sm:py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8">Katalog</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-white/20 rounded-lg overflow-hidden shadow-sm bg-white text-black">
              <div className="aspect-[4/3] bg-gray-100 grid place-items-center text-xs sm:text-sm md:text-base text-gray-400">
                Ürün Görseli
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg">Ürün {i + 1}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Kısa açıklama (fiyat yok).</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


