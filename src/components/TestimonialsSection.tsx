import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { FadeIn } from "~/components/ui/fade-in";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full Stack Engineer at Google",
    before: "Marketing Manager",
    after: "$145k/year",
    image: "SC",
    quote: "I transitioned from marketing to full stack engineering in 8 months. The community support and structured curriculum made all the difference. Now I'm building products used by millions.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Senior Full Stack Developer at Stripe",
    before: "Retail Worker",
    after: "$160k/year",
    image: "MJ",
    quote: "No CS degree, no problem. This community taught me everything I needed. The real-world projects gave me confidence, and the portfolio I built landed me multiple offers.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Full Stack Engineer at Airbnb",
    before: "Teacher",
    after: "$135k/year",
    image: "ER",
    quote: "Best career decision I ever made. The mentorship and peer learning accelerated my growth. I went from zero coding experience to a full stack engineer in less than a year.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Full Stack Developer at Netflix",
    before: "Customer Service",
    after: "$150k/year",
    image: "DK",
    quote: "The structured learning path eliminated all the guesswork. I knew exactly what to learn and in what order. The community helped me through every challenge.",
    rating: 5,
  },
  {
    name: "Jessica Martinez",
    role: "Full Stack Engineer at Microsoft",
    before: "Graphic Designer",
    after: "$140k/year",
    image: "JM",
    quote: "I loved the practical approach. Instead of just watching tutorials, I built real applications. That experience was invaluable in interviews.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Full Stack Developer at Amazon",
    before: "Sales Rep",
    after: "$155k/year",
    image: "AT",
    quote: "The career support was incredible. Resume reviews, mock interviews, and networking events helped me land my dream job. Worth every penny.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full bg-background py-16 sm:py-24 relative">
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
      
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
              Success <span className="text-primary">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Join thousands who've transformed their careers and landed their dream jobs as full stack engineers.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 100} className="h-full">
              <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Quote className="h-12 w-12 text-primary rotate-12" />
                </div>
                <CardContent className="pt-8 p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {testimonial.image}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-bold text-base">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed flex-1 relative z-10">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between text-xs pt-4 border-t mt-auto">
                    <span className="text-muted-foreground">
                      Before: <span className="font-medium text-foreground">{testimonial.before}</span>
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      Now: {testimonial.after}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
