import { ContactForm } from "../components/ContactForm"
import { SquaresBackground } from "../components/ui/squares-background"

export default function ContactPage() {
  console.log("[v0] ContactPage rendering")

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      {/* Background behind content */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <SquaresBackground />
      </div>

      {/* Centered content */}
      <div className="container mx-auto grid min-h-screen place-items-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Join Our Waitlist</h1>
            <p className="text-xl text-gray-300">
              Be among the first to experience the future of career automation
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
