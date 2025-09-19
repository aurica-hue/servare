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

              // Apply fixes when page loads
              function applyInstagramFixes() {
                if (isInstagramBrowser()) {
                  // Add Instagram class to body
                  document.body.classList.add('instagram-browser');
                  
                  // Fix viewport height issues
                  fixViewportHeight();
                  
                  // Fix section positioning
                  fixSectionPositioning();
                  
                  // Add Instagram-specific styles
                  addInstagramStyles();
                }
              }

              function fixViewportHeight() {
                // Get actual screen height
                const screenHeight = window.screen.height;
                const viewportHeight = window.innerHeight;
                
                // Use the more reliable height
                const fixedHeight = Math.max(screenHeight, viewportHeight);
                
                // Apply to all sections
                const sections = document.querySelectorAll('section, [class*="section"], [data-section]');
                sections.forEach(section => {
                  section.style.height = fixedHeight + 'px';
                  section.style.minHeight = fixedHeight + 'px';
                  section.style.maxHeight = fixedHeight + 'px';
                });
              }

              function fixSectionPositioning() {
                // Force hardware acceleration and fix positioning
                const allElements = document.querySelectorAll('section, [class*="section"], div, h1, h2, h3, p');
                allElements.forEach(element => {
                  const style = element.style;
                  style.webkitTransform = 'translate3d(0,0,0)';
                  style.transform = 'translate3d(0,0,0)';
                  style.webkitBackfaceVisibility = 'hidden';
                  style.backfaceVisibility = 'hidden';
                });
              }

              function addInstagramStyles() {
                // Create and inject CSS to fix Instagram browser issues
                const style = document.createElement('style');
                style.textContent = \`
                  .instagram-browser {
                    -webkit-text-size-adjust: 100% !important;
                    text-size-adjust: 100% !important;
                  }
                  
                  .instagram-browser section,
                  .instagram-browser [class*="section"],
                  .instagram-browser div {
                    -webkit-transform: translate3d(0,0,0) !important;
                    transform: translate3d(0,0,0) !important;
                    -webkit-backface-visibility: hidden !important;
                    backface-visibility: hidden !important;
                    -webkit-text-size-adjust: none !important;
                    text-size-adjust: none !important;
                    position: relative !important;
                  }
                  
                  .instagram-browser * {
                    -webkit-text-size-adjust: none !important;
                    text-size-adjust: none !important;
                  }
                  
                  .instagram-browser h1,
                  .instagram-browser h2,
                  .instagram-browser h3,
                  .instagram-browser p {
                    -webkit-transform: translate3d(0,0,0) !important;
                    transform: translate3d(0,0,0) !important;
                    -webkit-backface-visibility: hidden !important;
                    backface-visibility: hidden !important;
                  }
                \`;
                document.head.appendChild(style);
              }

              // Run fixes when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', applyInstagramFixes);
              } else {
                applyInstagramFixes();
              }

              // Also run fixes on window resize
              window.addEventListener('resize', function() {
                if (isInstagramBrowser()) {
                  setTimeout(fixViewportHeight, 100);
                }
              });

            })();
          `}
        </Script>
      </body>
    </html>
  )
}
