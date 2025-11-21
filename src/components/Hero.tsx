import { Button } from "~/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Rocket, Play, Crown } from "lucide-react";
import { FadeIn } from "~/components/ui/fade-in";
import { Card, CardContent } from "~/components/ui/card";

export function Hero() {
  return (
    <section className="w-full bg-background relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/hero.png"
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter:
              "hue-rotate(120deg) saturate(1.5) brightness(0.8) contrast(1.2)",
            WebkitFilter:
              "hue-rotate(120deg) saturate(1.5) brightness(0.8) contrast(1.2)",
          }}
        />
      </div>
      {/* Overlay for better content readability */}
      <div className="absolute inset-0 z-[1] bg-background/40 dark:bg-background/50" />
      {/* Background Pattern */}
      <div className="absolute inset-0 z-[1] h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 relative z-[2] min-h-[calc(100vh-3.5rem)] flex flex-col">
        {/* Top notification banner */}
        <FadeIn delay={0} className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            New Cohort Starting Soon
          </div>
        </FadeIn>

        {/* Main centered content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <FadeIn delay={100}>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
                Transform Your Career: Become a{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Full Stack Engineer
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
                Master frontend and backend development, build real-world
                projects, and launch your software engineering career. Join
                thousands learning full stack development in our supportive
                community.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button size="lg" className="text-base h-12 px-8" asChild>
                <Link to="/sign-up" search={{ redirect: undefined }}>
                  <Rocket className="mr-2 h-4 w-4" />
                  Start for Free
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base h-12 px-8"
                asChild
              >
                <a href="#curriculum">
                  <Play className="mr-2 h-4 w-4" />
                  See How it Works
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
