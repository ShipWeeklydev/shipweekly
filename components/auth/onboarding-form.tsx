"use client";

import { useActionState } from "react";
import { completeOnboarding } from "@/lib/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const initialState = {
  success: false,
  error: null as string | Record<string, string[]> | null,
};

// We wrap the action to match useActionState signature
async function actionWrapper(prevState: any, formData: FormData) {
  return await completeOnboarding(formData);
}

export function OnboardingForm() {
  const [state, formAction, isPending] = useActionState(actionWrapper, initialState);

  // Type helper for field errors
  const getFieldError = (field: string) => {
    if (state.error && typeof state.error === "object" && !Array.isArray(state.error)) {
      const fieldErrors = (state.error as Record<string, string[]>)[field];
      return fieldErrors ? fieldErrors[0] : null;
    }
    return null;
  };

  const globalError = typeof state.error === "string" ? state.error : null;

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1 text-center mb-4">
        <h1 className="text-2xl font-bold text-foreground">Complete your profile</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Pick a username to join the arena.
        </p>
      </div>

      {globalError && (
        <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md">
          {globalError}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Username <span className="text-destructive">*</span></Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="johndoe"
            className="pl-8 bg-background"
            required
            pattern="[a-zA-Z0-9_]+"
            title="Only letters, numbers, and underscores allowed"
          />
        </div>
        {getFieldError("username") && (
          <p className="text-sm text-destructive font-medium">{getFieldError("username")}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Short Bio</Label>
        <Input
          id="bio"
          name="bio"
          type="text"
          placeholder="Building the next big thing"
          className="bg-background"
          maxLength={160}
        />
        {getFieldError("bio") && (
          <p className="text-sm text-destructive font-medium">{getFieldError("bio")}</p>
        )}
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Profile & Continue"
        )}
      </Button>
    </form>
  );
}
