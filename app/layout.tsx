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
        
        {/* Instagram Browser Compatibility Fix - Karpathy Method */}
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
                  console.log('Instagram browser detected - applying Karpathy method fix');
                  
                  document.body.classList.add('instagram-browser');
                  
                  // Wait for page to load, then apply fixes
                  setTimeout(() => {
                    fixInstagramScrollLogic();
                  }, 1000);
                }
              }

              function fixInstagramScrollLogic() {
                const scrollContainer = document.querySelector('.h-full.overflow-y-auto');
                if (!scrollContainer) return;
                
                // Get all sections to calculate proper heights
                const sections = scrollContainer.querySelectorAll('section');
                if (sections.length === 0) return;
                
                // Calculate the actual height of each section in Instagram
                const sectionHeight = scrollContainer.clientHeight;
                console.log('Instagram section height:', sectionHeight);
                
                // Override the scroll event handler to use correct calculations
                let isScrolling = false;
                
                const handleInstagramScroll = () => {
                  if (isScrolling) return;
                  
                  const scrollTop = scrollContainer.scrollTop;
                  const currentSection = Math.round(scrollTop / sectionHeight);
                  
                  // Dispatch custom event with correct section index
                  const event = new CustomEvent('instagram-scroll-update', {
                    detail: { activeSection: Math.max(0, Math.min(currentSection, sections.length - 1)) }
                  });
                  document.dispatchEvent(event);
                };
                
                // Remove existing scroll listener and add our fixed one
                scrollContainer.removeEventListener('scroll', handleInstagramScroll);
                scrollContainer.addEventListener('scroll', handleInstagramScroll, { passive: true });
                
                // Override scrollTo to use correct section heights
                const originalScrollTo = scrollContainer.scrollTo;
                scrollContainer.scrollTo = function(options) {
                  if (typeof options === 'object' && options.behavior === 'smooth') {
                    // Calculate correct target position
                    const sectionIndex = Math.round(options.top / window.innerHeight);
                    const correctTop = sectionIndex * sectionHeight;
                    
                    // Use instant scroll to avoid Instagram's broken smooth scrolling
                    this.scrollTop = correctTop;
                  } else {
                    originalScrollTo.call(this, options);
                  }
                };
                
                // Add CSS for proper scrolling
                const style = document.createElement('style');
                style.textContent = \`
                  .instagram-browser .h-full.overflow-y-auto {
                    -webkit-overflow-scrolling: touch !important;
                    scroll-snap-type: none !important;
                    scroll-behavior: auto !important;
                  }
                  
                  .instagram-browser section {
                    height: 100vh !important;
                    scroll-snap-align: none !important;
                  }
                \`;
                document.head.appendChild(style);
                
                console.log('Instagram scroll logic fix applied - sections:', sections.length, 'height:', sectionHeight);
                
                // Fix contact form scrolling issue
                fixInstagramContactForm();
              }
              
              function fixInstagramContactForm() {
                // Add CSS to ensure contact form works properly in Instagram
                const contactStyle = document.createElement('style');
                contactStyle.textContent = \`
                  .instagram-browser .instagram-browser-fix {
                    min-height: 100vh !important;
                    height: auto !important;
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                  }
                  
                  .instagram-browser .instagram-browser-fix .container {
                    padding-top: 2rem !important;
                    padding-bottom: 2rem !important;
                  }
                  
                  .instagram-browser .instagram-browser-fix .min-h-screen {
                    min-height: auto !important;
                    height: auto !important;
                  }
                \`;
                document.head.appendChild(contactStyle);
                
                console.log('Instagram contact form fix applied');
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
