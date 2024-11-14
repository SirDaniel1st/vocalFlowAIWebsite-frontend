import { Mic, Wand2, Brain } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Mic,
    title: "Voice Cloning",
    description: "Clone any voice with just 3 minutes of audio, maintaining perfect emotion and tone."
  },
  {
    icon: Wand2,
    title: "Text to Speech",
    description: "Convert any text into natural-sounding speech using our advanced AI technology."
  },
  {
    icon: Brain,
    title: "Voice Enhancement",
    description: "Automatically enhance voice quality and remove background noise."
  }
];

export function Features() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Powerful Features for Voice Innovation</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur transform hover:scale-105 transition-transform duration-300">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}