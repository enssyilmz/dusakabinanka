'use client';

export default function Contact() {
  return (
    <section id="iletisim" className="relative z-20 min-h-screen w-[calc(100vw-300px)] md:w-[calc(100vw-300px)] lg:w-[calc(100vw-360px)] ml-[300px] md:ml-[300px] lg:ml-[360px] bg-gray-50 text-black">
      <div className="px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">İletişim</h2>
          <ul className="space-y-3 text-base">
            <li><strong>Adres:</strong> Mağaza Konumu, Şehir/İlçe</li>
            <li><strong>Telefon:</strong> 0 (5xx) 000 00 00</li>
            <li><strong>E-posta:</strong> info@ankadusakabin.com</li>
            <li><strong>Çalışma Saatleri:</strong> 09:00 - 19:00</li>
          </ul>
        </div>

        <form
          className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm grid grid-cols-1 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('[page] İletişim formu gönderildi');
            alert('Talebiniz alındı. En kısa sürede dönüş yapacağız.');
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="adSoyad" className="font-medium">Ad Soyad</label>
              <input id="adSoyad" name="adSoyad" required className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-gray-500" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="telefon" className="font-medium">Telefon</label>
              <input id="telefon" name="telefon" required className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-gray-500" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="aciklama" className="font-medium">Açıklama</label>
            <textarea id="aciklama" name="aciklama" rows={6} required className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-gray-500" />
          </div>
          <div>
            <button type="submit" className="px-6 py-3 font-semibold rounded-none" style={{ backgroundColor: '#376C6F', color: '#ffffff' }}>
              Gönder
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


