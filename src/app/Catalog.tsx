'use client';

export default function Catalog() {
  return (
    <section id="katalog" className="relative z-20 min-h-screen w-[calc(100vw-300px)] md:w-[calc(100vw-300px)] lg:w-[calc(100vw-360px)] ml-[300px] md:ml-[300px] lg:ml-[360px] bg-[#376C6F] text-white">
      <div className="px-6 py-16 w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Katalog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-white/20 rounded-lg overflow-hidden shadow-sm bg-white text-black">
              <div className="aspect-[4/3] bg-gray-100 grid place-items-center text-gray-400">
                Ürün Görseli
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">Ürün {i + 1}</h3>
                <p className="text-sm text-gray-600 mt-1">Kısa açıklama (fiyat yok).</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


