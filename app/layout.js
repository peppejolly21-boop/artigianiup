import "./globals.css";

export const metadata = {
  title: "ArtigianiUp",
  description: "Trova professionisti vicino a te",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
