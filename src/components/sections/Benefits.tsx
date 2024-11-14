import { Bot, Clock, ChartBar, Shield } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const benefits = [
  {
    icon: Bot,
    title: "Automate Routine Calls",
    description: "Handle customer inquiries 24/7 with AI-powered voice assistants that understand context and respond naturally."
  },
  {
    icon: Clock,
    title: "Save Valuable Time",
    description: "Reduce response times by 80% while maintaining high-quality customer interactions through intelligent automation."
  },
  {
    icon: ChartBar,
    title: "Increase Efficiency",
    description: "Scale your customer support operations without increasing headcount, handling multiple conversations simultaneously."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and compliance with GDPR, HIPAA, and other regulatory standards to protect sensitive data."
  }
];

export function Benefits() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20" />
      <div className="container px-4 mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose VocalFlow AI</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transform your business communications with cutting-edge AI technology
            that delivers real results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group relative overflow-hidden border-none bg-card/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-6 relative">
                <div className="flex gap-4 items-start">
                  <div className="rounded-lg p-2.5 bg-primary/10 text-primary">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>
                    <Separator className="my-2 opacity-30" />
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}