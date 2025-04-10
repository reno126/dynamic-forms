import { Inter } from 'next/font/google';
import './globals.css';
import { FormDefinitionsProvider } from '@/contexts/FormDefinitionsContext';
import { cn } from '@/lib/utils';
import { ModalProvider } from '@/contexts/ModalContext';
import { RecordActionsProvider } from '@/contexts/RecordsContext';
import { MainLayout } from '@/components/layout/MainLayout';

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
          <RecordActionsProvider>
            <ModalProvider>
              <MainLayout>{children}</MainLayout>
            </ModalProvider>
          </RecordActionsProvider>
        </FormDefinitionsProvider>
      </body>
    </html>
  );
}
