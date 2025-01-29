import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

import 'easymde/dist/easymde.min.css';
import './globals.css';

const workSans = Work_Sans({
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['100', '200', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | IdeaShare',
    default: 'IdeaShare',
  },
  description: 'Create, Share, and Grow',
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={workSans.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
