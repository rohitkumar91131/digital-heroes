import './globals.css';

export const metadata = { title: 'LeadDesk Mini', description: 'Simple lead capture application' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight text-blue-600">LeadDesk Mini</h1>
            <nav><a href="/admin" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Admin Dashboard</a></nav>
          </div>
        </header>
        <main className="flex-1 max-w-6xl mx-auto w-full p-6 flex flex-col">{children}</main>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} LeadDesk Mini. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}