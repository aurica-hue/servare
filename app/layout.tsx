import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Servare AI – We Apply, You Interview',
  description: 'Automated résumé tailoring & job applications.',
  openGraph: {
    title: 'Servare AI',
    description: 'Automated résumé tailoring & job applications.',
    images: ['/og-cover.png'],
  },
  alternates: {
    canonical: 'https://servare.ai',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        {children}
        <Analytics />
        
        {/* Instagram Browser Compatibility Fix */}
        <Script id="instagram-browser-fix" strategy="afterInteractive">
          {`
            (function() {
              // Detect Instagram browser
              function isInstagramBrowser() {
                return navigator.userAgent.includes("Instagram");
              }

              // Apply minimal fixes when page loads
              function applyInstagramFixes() {
                if (isInstagramBrowser()) {
                  console.log('Instagram browser detected - applying minimal fixes');
                  
                  // Add Instagram class to body for CSS targeting
                  document.body.classList.add('instagram-browser');
                  
                  // Wait for content to load, then apply fixes
                  setTimeout(() => {
                    fixInstagramScrolling();
                  }, 1000);
                }
              }

              function fixInstagramScrolling() {
                // Only fix scrolling issues, don't mess with layout
                const style = document.createElement('style');
                style.textContent = \`
                  .instagram-browser {
                    -webkit-overflow-scrolling: touch !important;
                    overflow-scrolling: touch !important;
                  }
                  
                  .instagram-browser * {
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                  }
                \`;
                document.head.appendChild(style);
                
                // Force hardware acceleration on scroll container
                const scrollContainer = document.querySelector('[data-scroll-container]') || document.body;
                if (scrollContainer) {
                  scrollContainer.style.webkitTransform = 'translateZ(0)';
                  scrollContainer.style.transform = 'translateZ(0)';
                }
              }

              // Run fixes when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', applyInstagramFixes);
              } else {
                applyInstagramFixes();
              }

            })();
          `}
        </Script>
      </body>
    </html>
  )
}
