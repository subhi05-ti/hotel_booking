import AnalyzerPage from '@/components/analyzer-page';
import { Tent } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Tent className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Kumbh Mela Navigator</h1>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <AnalyzerPage />
        </div>
      </main>
      <footer className="border-t bg-card">
        <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kumbh Mela Navigator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
