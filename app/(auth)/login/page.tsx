import { AuthLayout } from "@/components/auth/auth-layout";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <AuthLayout>
      <SignIn 
        routing="hash"
        fallbackRedirectUrl="/onboarding" 
        signUpUrl="/signup"
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-primary text-primary-foreground hover:bg-primary/90",
            card: "shadow-none w-full max-w-sm p-0 bg-transparent",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-sm text-muted-foreground",
            socialButtonsBlockButton: 
              "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          }
        }}
      />
    </AuthLayout>
  );
}
