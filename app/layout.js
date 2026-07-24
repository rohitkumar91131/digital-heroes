import './globals.css';
import Header from '@/components/Header';
import ThemeProvider from '@/components/ThemeProvider';

export const metadata = {
  title: 'LeadDesk Mini',
  description: 'Simple lead capture application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1 max-w-6xl mx-auto w-full p-6 flex flex-col">
            {children}
          </main>
          <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
            <p className="mb-2">&copy; {new Date().getFullYear()} LeadDesk Mini. All rights reserved.</p>
            <p>
              Powered by{' '}
              <a href="https://digitalheroesco.com/" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white font-medium hover:underline">
                Digital Heroes
              </a>
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}