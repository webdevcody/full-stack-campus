import { UserPlus, BookOpen, Code, Briefcase, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Sign Up & Join",
    description: "Create your account and join our community. Get instant access to resources, forums, and learning materials.",
    timeline: "Day 1",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Follow the Learning Path",
    description: "Work through our structured curriculum at your own pace. Learn frontend, backend, and full stack integration.",
    timeline: "Weeks 1-6",
  },
  {
    number: "03",
    icon: Code,
    title: "Build Real Projects",
    description: "Apply what you learn by building portfolio projects. Get code reviews and feedback from mentors and peers.",
    timeline: "Weeks 7-12",
  },
  {
    number: "04",
    icon: Briefcase,
    title: "Land Your Dream Job",
    description: "Get career support with resume reviews, interview prep, and job search guidance. Connect with hiring managers.",
    timeline: "Weeks 13+",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
              A clear, proven path from beginner to full stack engineer. No confusion, no guesswork - just a structured journey to your new career.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <FadeIn key={index} delay={index * 150} className="h-full">
                  <Card className="relative h-full hover:shadow-md transition-shadow border-muted">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="rounded-lg bg-primary/10 p-3">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-mono text-muted-foreground/60 font-bold">
                              {step.number}
                            </span>
                            <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                              {step.timeline}
                            </span>
                          </div>
                          <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed pl-14">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={600}>
            <div className="mt-16 text-center">
              <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center justify-center gap-3 mb-4 text-primary">
                    <CheckCircle2 className="h-8 w-8" />
                    <h3 className="text-2xl font-bold">
                      Average Timeline: 6-12 Months
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Most members land their first full stack engineer role within 6-12 months of starting. 
                    Your pace depends on your schedule and prior experience. We're here to support you every step of the way.
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
