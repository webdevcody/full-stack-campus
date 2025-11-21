import { BookOpen, Users, Briefcase, Code, Target, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

const benefits = [
  {
    icon: BookOpen,
    title: "Structured Learning Path",
    description: "Follow a proven curriculum designed by industry experts. No guesswork - just clear steps from beginner to full stack engineer.",
  },
  {
    icon: Users,
    title: "Active Community Support",
    description: "Join thousands of learners in our community. Get help, share projects, and network with peers and mentors.",
  },
  {
    icon: Briefcase,
    title: "Career Transition Support",
    description: "Get help with resumes, portfolios, and interview prep. Our community has helped hundreds land their first developer role.",
  },
  {
    icon: Code,
    title: "Real-World Projects",
    description: "Build portfolio projects that showcase your skills. Learn by doing, not just watching tutorials.",
  },
  {
    icon: Target,
    title: "Industry Connections",
    description: "Connect with experienced developers, hiring managers, and tech recruiters in our network.",
  },
  {
    icon: Zap,
    title: "Practical Experience",
    description: "Work on real applications using modern tools and technologies that employers actually use.",
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="w-full bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
              Everything You Need to <span className="text-primary">Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
              We've built a comprehensive platform that addresses every aspect of
              becoming a full stack engineer - from learning to landing your dream job.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <FadeIn key={index} delay={index * 100} className="h-full">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-muted hover:border-primary/20 group bg-card">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="rounded-lg bg-primary/10 p-3 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
