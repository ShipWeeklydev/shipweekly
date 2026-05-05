import { AuthLayout } from "@/components/auth/auth-layout";
import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignUp 
        routing="hash"
        fallbackRedirectUrl="/onboarding" 
        signInUrl="/login"
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
