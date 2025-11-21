import { Users, Calendar, MessageSquare, TrendingUp, Award, Network } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

const communityFeatures = [
  {
    icon: Users,
    stat: "10,000+",
    label: "Active Members",
    description: "Join a thriving community of learners and developers",
  },
  {
    icon: MessageSquare,
    stat: "50+",
    label: "Daily Discussions",
    description: "Get help and share knowledge in our active forums",
  },
  {
    icon: Calendar,
    stat: "Weekly",
    label: "Workshops & Events",
    description: "Live coding sessions, Q&As, and networking events",
  },
  {
    icon: Network,
    stat: "500+",
    label: "Mentors",
    description: "Connect with experienced developers and industry experts",
  },
  {
    icon: TrendingUp,
    stat: "85%",
    label: "Job Placement Rate",
    description: "Members successfully transition to developer roles",
  },
  {
    icon: Award,
    stat: "1,000+",
    label: "Projects Built",
    description: "Real portfolio projects created by our community",
  },
];

export function CommunitySection() {
  return (
    <section id="community" className="w-full bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
              Join a Thriving <span className="text-primary">Community</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Learning full stack development is easier when you're part of a supportive community. Connect with peers, get mentorship, and accelerate your journey.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {communityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeIn key={index} delay={index * 100} className="h-full">
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 group border-muted hover:border-primary/20 bg-card">
                  <CardHeader>
                    <div className="flex justify-center mb-6">
                      <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-4xl font-bold mb-2 tracking-tight">
                      {feature.stat}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-foreground/80">
                      {feature.label}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={400}>
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground font-medium">
              Study groups, code reviews, pair programming sessions, and career support - all included in your membership.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
