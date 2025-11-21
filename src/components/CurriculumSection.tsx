import { Globe, Layers, Server } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { FadeIn } from "~/components/ui/fade-in";

const frontendTech = [
  "React",
  "TypeScript",
  "Next.js",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "JavaScript ES6+",
];

const backendTech = [
  "Node.js",
  "Express.js",
  "RESTful APIs",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
];

const fullStackSkills = [
  "Authentication & Authorization",
  "Database Design",
  "API Integration",
  "Deployment & DevOps",
  "Testing & Debugging",
  "Version Control (Git)",
];

const categories = [
  {
    icon: Globe,
    title: "Frontend Development",
    technologies: frontendTech,
    description: "Build modern, responsive user interfaces",
  },
  {
    icon: Server,
    title: "Backend Development",
    technologies: backendTech,
    description: "Create robust server-side applications",
  },
  {
    icon: Layers,
    title: "Full Stack Integration",
    technologies: fullStackSkills,
    description: "Connect frontend and backend seamlessly",
  },
];

export function CurriculumSection() {
  return (
    <section id="curriculum" className="w-full bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
              What You'll <span className="text-primary">Learn</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Master the complete full stack engineering skillset. From frontend frameworks to backend APIs, you'll learn everything needed to build production-ready applications.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <FadeIn key={index} delay={index * 150} className="h-full">
                <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/20 group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-lg bg-primary/10 p-3 group-hover:rotate-3 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{category.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {category.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-sm py-1 px-3 hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={500}>
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground mb-4 font-medium">
              Plus: Industry best practices, code reviews, portfolio building, and career guidance
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
