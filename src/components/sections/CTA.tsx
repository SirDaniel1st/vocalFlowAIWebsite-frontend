import { ArrowRight, PlayCircle, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container px-4 mx-auto text-center relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
          Transform Your Voice Experience Today
        </h2>
        
        <p className="text-xl mb-12 text-primary-foreground/90 max-w-2xl mx-auto">
          Join thousands of businesses using VocalFlow AI to create extraordinary 
          voice experiences and automate customer interactions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <Button 
            size="lg" 
            variant="secondary" 
            className="gap-2 text-primary hover:text-primary"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Calendar className="w-4 h-4" /> Schedule Demo
          </Button>
          
          <Button 
            size="lg" 
            variant="ghost" 
            className="gap-2 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <PlayCircle className="w-4 h-4" /> Watch Video
          </Button>
        </div>
        
        <p className="mt-8 text-sm text-primary-foreground/80">
          No credit card required · 14-day free trial · Cancel anytime
        </p>
      </div>
    </section>
  );
}