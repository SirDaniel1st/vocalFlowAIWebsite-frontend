import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "VocalFlow AI has revolutionized our content production. We can now create professional voice-overs in minutes instead of days.",
    name: "Sarah Chen",
    role: "Content Director at MediaTech",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    quote: "The voice cloning technology is incredible. It's helped us scale our educational content across multiple languages effortlessly.",
    name: "Michael Rodriguez",
    role: "EdTech Founder",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
  },
  {
    quote: "The quality and naturalness of the generated voices are unmatched. It's become an essential tool in our development pipeline.",
    name: "Emily Watson",
    role: "Game Developer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  }
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">What Our Users Say</h2>
        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 bg-secondary/50">
                  <CardContent className="p-8">
                    <p className="text-lg mb-6 text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}