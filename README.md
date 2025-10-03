# Anka Duşakabin - Modern Web Sitesi

Anka Duşakabin için geliştirilmiş modern, responsive ve tam özellikli web sitesi. Next.js 15, TypeScript ve Firebase teknolojileri kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### 📱 Ana Sayfa
- **Hero Slider**: Otomatik geçiş yapan görsel slider
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Smooth Animations**: Framer Motion ile akıcı animasyonlar
- **Navigation**: Kolay gezinme için navigation okları

### 🖼️ Katalog Sayfası
- **Pagination**: Sayfa bazlı görsel görüntüleme
- **Responsive Grid**: 
  - Desktop: 8 görsel
  - Tablet: 6 görsel
  - Mobile: 4 görsel
- **Modal Görüntüleme**: Görselleri büyütme ve gezinme
- **Firebase Integration**: Cloudinary ile görsel yönetimi

### 📞 İletişim Sayfası
- **İnteraktif Harita**: Leaflet + OpenStreetMap entegrasyonu
- **İletişim Formu**: Firebase Firestore ile veri kaydetme
- **Responsive Layout**: Mobil uyumlu tasarım
- **Gerçek Zamanlı Konum**: Ordu, Altınordu adres işaretleme

### 🔐 Admin Paneli
- **Authentication**: Firebase Auth ile güvenli giriş
- **Görsel Yönetimi**: 
  - Cloudinary ile görsel yükleme
  - Toplu ve tekli silme işlemleri
  - Görsel önizleme
- **İletişim Mesajları**: Form gönderimlerini görüntüleme ve yönetme
- **Modern UI**: #376C6F tema rengi ile tutarlı tasarım

## 🛠️ Teknolojiler

### Frontend
- **Next.js 15.5.4** - React framework
- **React 19.1.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.22** - Animation library

### Backend & Database
- **Firebase 12.3.0** - Backend as a Service
- **Firestore** - NoSQL database
- **Firebase Auth** - Authentication
- **Cloudinary** - Image hosting and management

### Maps & Icons
- **Leaflet 1.9.4** - Interactive maps
- **React Leaflet 5.0.0** - React integration
- **React Icons 5.5.0** - Icon library

## 📋 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm/yarn/pnpm

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone [repository-url]
cd anka
```

2. **Dependencies'leri yükleyin**
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. **Environment variables'ları ayarlayın**
`.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. **Development server'ı başlatın**
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

5. **Tarayıcıda açın**
[http://localhost:3000](http://localhost:3000)

## 🔧 Firebase Kurulumu

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Catalogs collection
    match /catalogs/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // Contact collection
    match /contact/{document} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```

### Collections
- **catalogs**: Görsel metadata'ları
- **contact**: İletişim form gönderimleri

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin paneli
│   ├── Catalog.tsx           # Katalog sayfası
│   ├── Contact.tsx           # İletişim sayfası
│   ├── HomeHero.tsx          # Ana sayfa hero
│   ├── components/
│   │   └── MapComponent.tsx  # Harita komponenti
│   ├── widgets/
│   │   ├── HeroSlider.tsx    # Hero slider
│   │   └── InfoCard.tsx      # Bilgi kartları
│   ├── globals.css           # Global stiller
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Ana sayfa
├── lib/
│   ├── firebase.ts           # Firebase konfigürasyonu
│   └── firestoreService.ts   # Firestore servisleri
└── public/
    └── images/               # Statik görseller
```

## 🎨 Tasarım

### Renk Paleti
- **Ana Tema**: #376C6F (Teal/Blue-Green)
- **Arka Plan**: Beyaz ve gri tonları
- **Vurgular**: Kırmızı (silme), Yeşil (onay) tonları

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Önerilen)
```bash
npm run build
vercel --prod
```

### Diğer Platformlar
- Netlify
- Firebase Hosting
- AWS Amplify

## 📱 Özellikler Detayı

### Admin Paneli
- ✅ Görsel yükleme (Cloudinary)
- ✅ Görsel silme (tekli/toplu)
- ✅ İletişim mesajlarını görüntüleme
- ✅ Responsive tablo tasarımı
- ✅ Authentication koruması

### Katalog
- ✅ Pagination sistemi
- ✅ Modal görüntüleme
- ✅ Responsive grid layout
- ✅ Firebase entegrasyonu

### İletişim
- ✅ İnteraktif harita (Leaflet)
- ✅ Form validation
- ✅ Firebase form kaydetme
- ✅ Responsive tasarım

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje özel kullanım için geliştirilmiştir.

## 📞 İletişim

**Anka Duşakabin**
- 📍 Şahincili, Polatlı Şehitleri Cd. No:17/A, 52800 Altınordu/Ordu
- 📞 0553 977 96 23
- 🕒 Çalışma Saatleri: 08:00 - 19:00 (Pazar hariç)

---

**Geliştirici Notu**: Bu proje modern web teknolojileri kullanılarak geliştirilmiştir ve sürekli güncellenmektedir.