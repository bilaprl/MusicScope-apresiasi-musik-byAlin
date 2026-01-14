import type { Metadata, Viewport } from "next"; // Tambahkan Viewport di sini
import "./globals.css";

export const metadata: Metadata = {
  title: "MusicScope – Apresiasi Musik Nusantara & Dunia - byAlin",
  description: "Aplikasi Pembelajaran Seni Musik Kelas X",
};

// Pengaturan khusus Viewport untuk mencegah zoom otomatis di iPhone
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Menghindari desain pecah karena user zoom-in tidak sengaja
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect untuk performa font yang lebih cepat di HP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&family=Material+Icons&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased font-['Montserrat'] bg-slate-50 text-slate-800"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
