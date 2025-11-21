import { Button } from "~/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Rocket, Shield, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { FadeIn } from "~/components/ui/fade-in";

export function FinalCTASection() {
  return (
    <section className="w-full bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] opacity-50"></div>
              <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700"></div>
              <div className="absolute -bottom-24 -left-24 h-48 w-48 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors duration-700"></div>
              
              <CardContent className="pt-16 pb-16 px-8 relative z-10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                    Ready to Transform Your Career?
                  </h2>
                  <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                    Join thousands of successful full stack engineers who started exactly where you are now. 
                    Your future as a full stack engineer starts today.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button size="lg" className="text-lg h-14 px-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300" asChild>
                    <Link to="/sign-up">
                      <Rocket className="mr-2 h-5 w-5 animate-pulse" />
                      Start Your Journey Now
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-primary/20 hover:bg-primary/5" asChild>
                    <Link to="#pricing">
                      View Pricing Plans
                    </Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-primary/10">
                  <div className="text-center group/item">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-primary/10 p-4 group-hover/item:bg-primary/20 transition-colors duration-300">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">Money-Back Guarantee</h3>
                    <p className="text-sm text-muted-foreground">
                      30-day money-back guarantee if you're not satisfied
                    </p>
                  </div>
                  <div className="text-center group/item">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-primary/10 p-4 group-hover/item:bg-primary/20 transition-colors duration-300">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">Start Immediately</h3>
                    <p className="text-sm text-muted-foreground">
                      Get instant access to all resources and community
                    </p>
                  </div>
                  <div className="text-center group/item">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full bg-primary/10 p-4 group-hover/item:bg-primary/20 transition-colors duration-300">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">Proven Results</h3>
                    <p className="text-sm text-muted-foreground">
                      85% of members successfully transition to developer roles
                    </p>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <p className="text-sm text-muted-foreground inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm">
                    Limited spots available. Join now and start building your future as a full stack engineer.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
