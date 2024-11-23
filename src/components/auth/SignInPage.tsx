import { SignIn } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";

export function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-primary hover:bg-primary/90 text-primary-foreground",
                card: "bg-transparent shadow-none",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-muted-foreground",
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}