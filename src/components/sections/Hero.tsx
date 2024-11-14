import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] bg-grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient" />
      <div className="container px-4 mx-auto text-center relative z-10">
        <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 text-primary border-0">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Revolutionizing Voice AI Technology</span>
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-text-gradient">
          Automate Customer Engagement,
          <br />
          Unlock Growth
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Transform your customer interactions with AI-powered voice technology. 
          Create personalized experiences, automate support, and scale your business 
          with enterprise-grade voice solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
            Request a Demo <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="group">
            Learn More 
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}