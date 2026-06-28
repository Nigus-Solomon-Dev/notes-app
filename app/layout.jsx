import 'dotenv/config';
import './globals.css';

export const metadata = {
  title: 'Notes App',
  description: 'A simple notes app built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}