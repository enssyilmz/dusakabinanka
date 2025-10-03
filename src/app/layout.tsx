import type { Metadata } from "next";
import "./globals.css";
import 'leaflet/dist/leaflet.css';


export const metadata: Metadata = {
  title: "Anka Duşakabin",
  description: "Duşakabin toptancısı ve perakendecisi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="m-0">
        {children}
      </body>
    </html>
  );
}
