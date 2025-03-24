import { Inter } from 'next/font/google';
import './globals.css';
import { FormDefinitionsProvider } from '@/contexts/FormDefinitionsContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Header } from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import { ModalProvider } from '@/contexts/ModalContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'Dynamic Forms App',
  description: 'Create and manage dynamic forms.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body
        className={cn(
          'h-full font-sans antialiased',
          inter.variable
        )}
      >
        <FormDefinitionsProvider>
          <ModalProvider>
            <div className="flex h-full">
              <Sidebar />
              <div className="flex min-w-0 flex-1 flex-col">
                <Header />
                <PageWrapper>{children}</PageWrapper>
              </div>
            </div>
          </ModalProvider>
        </FormDefinitionsProvider>
      </body>
    </html>
  );
}
