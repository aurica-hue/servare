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

              // Apply Instagram-specific fixes
              function applyInstagramFixes() {
                if (isInstagramBrowser()) {
                  console.log('Instagram browser detected - fixing scroll snap issues');
                  
                  document.body.classList.add('instagram-browser');
                  
                  // Wait for page to load, then apply fixes
                  setTimeout(() => {
                    fixInstagramScrollSnap();
                  }, 500);
                }
              }

              function fixInstagramScrollSnap() {
                // Find the scroll container
                const scrollContainer = document.querySelector('.h-full.overflow-y-auto');
                if (!scrollContainer) return;
                
                // Force hardware acceleration
                scrollContainer.style.webkitTransform = 'translateZ(0)';
                scrollContainer.style.transform = 'translateZ(0)';
                scrollContainer.style.webkitBackfaceVisibility = 'hidden';
                scrollContainer.style.backfaceVisibility = 'hidden';
                
                // Override the scroll behavior for Instagram to ensure proper centering
                const originalScrollTo = scrollContainer.scrollTo;
                scrollContainer.scrollTo = function(options) {
                  if (typeof options === 'object' && options.behavior === 'smooth') {
                    // For Instagram, use a custom smooth scroll that respects section boundaries
                    const targetTop = options.top;
                    const currentTop = this.scrollTop;
                    const distance = targetTop - currentTop;
                    const duration = 300; // ms
                    const startTime = Date.now();
                    
                    function animateScroll() {
                      const elapsed = Date.now() - startTime;
                      const progress = Math.min(elapsed / duration, 1);
                      
                      // Easing function for smooth animation
                      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                      
                      this.scrollTop = currentTop + (distance * easeOutCubic);
                      
                      if (progress < 1) {
                        requestAnimationFrame(animateScroll.bind(this));
                      }
                    }
                    
                    animateScroll.call(this);
                  } else {
                    originalScrollTo.call(this, options);
                  }
                };
                
                // Add CSS to ensure proper scrolling and centering
                const style = document.createElement('style');
                style.textContent = \`
                  .instagram-browser .h-full.overflow-y-auto {
                    -webkit-overflow-scrolling: touch !important;
                    scroll-snap-type: y mandatory !important;
                    scroll-behavior: auto !important;
                  }
                  
                  .instagram-browser section {
                    scroll-snap-align: start !important;
                    scroll-snap-stop: always !important;
                  }
                \`;
                document.head.appendChild(style);
                
                console.log('Instagram scroll snap fix applied with proper centering');
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
