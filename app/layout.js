import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-lg font-bold">Kişisel Bütçe Takip Uygulaması</h1>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-blue-500 text-white p-4 text-center">
          © 2024 Bütçe Uygulaması
        </footer>
      </body>
    </html>
  );
}
