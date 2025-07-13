import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import PerformanceMonitor from './components/PerformanceMonitor';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Outpilot Portfolio | Web Engineer',
    template: '%s | Outpilot Portfolio',
  },
  description:
    'Webエンジニアのポートフォリオサイト - 技術力とアウトプット力をアピール。React、TypeScript、Next.jsを中心としたモダンなWeb開発の実績をご紹介します。',
  keywords: [
    'Web Engineer',
    'フロントエンド',
    'React',
    'TypeScript',
    'Next.js',
    'ポートフォリオ',
    'Web開発',
  ],
  authors: [{ name: 'Kodama' }],
  creator: 'Kodama',
  publisher: 'Outpilot',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://outpilot-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://outpilot-portfolio.vercel.app',
    title: 'Outpilot Portfolio | Web Engineer',
    description:
      'Webエンジニアのポートフォリオサイト - 技術力とアウトプット力をアピール',
    siteName: 'Outpilot Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Outpilot Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outpilot Portfolio | Web Engineer',
    description:
      'Webエンジニアのポートフォリオサイト - 技術力とアウトプット力をアピール',
    images: ['/og-image.png'],
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Kodama',
              jobTitle: 'Web Engineer',
              description:
                'Webエンジニアとして3年以上の経験を持ち、フロントエンドからバックエンドまで幅広い技術スタックで開発を行っています。',
              url: 'https://outpilot-portfolio.vercel.app',
              sameAs: [
                'https://github.com/yourusername',
                'https://twitter.com/yourusername',
                'https://linkedin.com/in/yourusername',
              ],
              knowsAbout: [
                'React',
                'TypeScript',
                'Next.js',
                'Node.js',
                'Web Development',
                'Frontend Development',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  );
}
