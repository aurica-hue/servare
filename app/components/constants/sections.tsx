import { Badge } from "../ui/badge"
// Force reload

export const sections = [
  {
    id: "hero",
    subtitle: (
      <Badge variant="outline" className="text-white border-white">
        Career Automation
      </Badge>
    ),
    title: "Servare AI",
    showButton: false, // removed the apply button by setting showButton to false
  },
  {
    id: "about",
    title: "Traditional Job Search",
    content: (
      <ul className="text-left space-y-2">
        <li>• Average Time to Placement – 5.5 months</li>
        <li>• ATS Rejection – 75% of qualified applications never seen by humans</li>
        <li>• Time Wasted – Requires 100–200+ hours of active effort</li>
      </ul>
    ),
  },
  {
    id: "features",
    title: "100% Automated Job Search",
    content: (
      <ul className="text-left space-y-2">
        <li>• Profile Analysis – Analyzed resume, skills, and career goals for optimal targeting</li>
        <li>• Job Discovery – Search across 50+ platforms for relevant opportunities</li>
        <li>• Application Optimization – Customized resume and cover letter for each position</li>
        <li>• Submission – Applications submitted 24/7 with perfect accuracy</li>
        <li>• Connections Created – Strategic LinkedIn connections and messaging</li>
      </ul>
    ),
  },
  {
    id: "testimonials",
    title: "AI Superiority",
    content:
      "Machine learning algorithms continuously analyze successful interaction patterns and update automation scripts accordingly, ensuring consistent performance even as target platforms evolve their interfaces.",
  },
  {
    id: "join",
    title: "Coming Soon",
    content: "Join our wait list today and step into the next generation of career building.",
    showButton: true,
    buttonText: "Join Now",
  },
]
