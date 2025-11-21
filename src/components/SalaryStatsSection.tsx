import { DollarSign, TrendingUp, Briefcase, Users } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

export function SalaryStatsSection() {
  const stats = [
    {
      icon: DollarSign,
      value: "$130k",
      label: "Average Full Stack Engineer Salary",
      description: "According to Glassdoor, Indeed, and Payscale",
      trend: "+12%",
    },
    {
      icon: TrendingUp,
      value: "13%",
      label: "Job Growth Rate",
      description: "Projected growth through 2030 (BLS)",
      trend: "Above Average",
    },
    {
      icon: Briefcase,
      value: "200k+",
      label: "Open Positions",
      description: "Full stack developer jobs available",
      trend: "High Demand",
    },
    {
      icon: Users,
      value: "85%",
      label: "Career Transition Success",
      description: "Members land developer roles",
      trend: "Proven Track Record",
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 relative overflow-hidden">
      {/* Futuristic Background Image with Red/Purple Filter */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/future.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'hue-rotate(120deg) saturate(1.5) brightness(0.8) contrast(1.2)',
            WebkitFilter: 'hue-rotate(120deg) saturate(1.5) brightness(0.8) contrast(1.2)',
          }}
        />
      </div>
      {/* Overlay for better content readability */}
      <div className="absolute inset-0 z-[1] bg-background/40 dark:bg-background/50" />
      
      <div className="container mx-auto px-4 relative z-[2]">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
              Why Become a <span className="text-primary">Full Stack Engineer</span>?
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
              The data speaks for itself. Full stack engineering is one of the most
              in-demand and highest-paying careers in tech today.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <FadeIn key={index} delay={index * 100} className="h-full">
                <Card className="text-center h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
                  <CardContent className="pt-8 pb-8 px-6 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-center mb-6">
                        <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors duration-300">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
                        <div className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">{stat.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {stat.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-primary font-bold pt-6 mt-auto">
                      {stat.trend}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={400}>
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground bg-background/50 inline-block px-4 py-2 rounded-full border">
              Sources: Bureau of Labor Statistics, Glassdoor, Indeed, Payscale
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
