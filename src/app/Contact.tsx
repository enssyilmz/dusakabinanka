'use client';

export default function Contact() {
  return (
    <section id="iletisim" className="relative z-50 min-h-screen w-full bg-gray-50 text-black">
      <div className="px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 max-w-7xl mx-auto">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">İletişim</h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg">
            <li><strong>Adres:</strong> Mağaza Konumu, Şehir/İlçe</li>
            <li><strong>Telefon:</strong> 0 (5xx) 000 00 00</li>
            <li><strong>E-posta:</strong> info@ankadusakabin.com</li>
            <li><strong>Çalışma Saatleri:</strong> 09:00 - 19:00</li>
          </ul>
        </div>

        <form
          className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm grid grid-cols-1 gap-3 sm:gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('[page] İletişim formu gönderildi');
            alert('Talebiniz alındı. En kısa sürede dönüş yapacağız.');
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="adSoyad" className="font-medium text-sm sm:text-base">Ad Soyad</label>
              <input id="adSoyad" name="adSoyad" required className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:border-gray-500" />
            </div>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="telefon" className="font-medium text-sm sm:text-base">Telefon</label>
              <input id="telefon" name="telefon" required className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:border-gray-500" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label htmlFor="aciklama" className="font-medium text-sm sm:text-base">Açıklama</label>
            <textarea id="aciklama" name="aciklama" rows={6} required className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base outline-none focus:border-gray-500" />
          </div>
          <div>
            <button type="submit" className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-none" style={{ backgroundColor: '#376C6F', color: '#ffffff' }}>
              Gönder
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


