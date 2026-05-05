"use client";

import { useActionState, useEffect } from "react";
import { updateProfile } from "@/lib/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { User } from "@/lib/db/schema";

type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]> | null;
};

const initialState: ActionState = {
  success: false,
};

async function actionWrapper(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const result = await updateProfile(formData);
  return result as ActionState;
}

export function SettingsForm({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState(actionWrapper, initialState);

  const getFieldError = (field: string) => {
    if (state.error && typeof state.error === "object" && !Array.isArray(state.error)) {
      const fieldErrors = (state.error as Record<string, string[]>)[field];
      return fieldErrors ? fieldErrors[0] : null;
    }
    return null;
  };

  const globalError = typeof state.error === "string" ? state.error : null;

  return (
    <form action={formAction} className="flex flex-col gap-6 w-full max-w-xl bg-card p-6 rounded-xl border shadow-sm">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-bold">Public Profile</h2>
        <p className="text-sm text-muted-foreground">
          This is how you appear on the leaderboard and product pages.
        </p>
      </div>

      {globalError && (
        <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md">
          {globalError}
        </div>
      )}

      {state.success && (
        <div className="p-3 text-sm font-medium text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/50 rounded-md">
          Profile updated successfully!
        </div>
      )}

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username (Cannot be changed)</Label>
          <Input id="username" value={`@${user.username}`} disabled className="bg-muted/50 cursor-not-allowed" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Display Name</Label>
          <Input id="name" name="name" defaultValue={user.name || ""} placeholder="John Doe" maxLength={50} />
          {getFieldError("name") && <p className="text-sm text-destructive">{getFieldError("name")}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Input id="bio" name="bio" defaultValue={user.bio || ""} placeholder="Indie hacker building awesome things" maxLength={160} />
          {getFieldError("bio") && <p className="text-sm text-destructive">{getFieldError("bio")}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="twitterHandle">Twitter Handle</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
            <Input id="twitterHandle" name="twitterHandle" defaultValue={user.twitterHandle || ""} placeholder="elonmusk" className="pl-8" />
          </div>
          {getFieldError("twitterHandle") && <p className="text-sm text-destructive">{getFieldError("twitterHandle")}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="githubHandle">GitHub Handle</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
            <Input id="githubHandle" name="githubHandle" defaultValue={user.githubHandle || ""} placeholder="octocat" className="pl-8" />
          </div>
          {getFieldError("githubHandle") && <p className="text-sm text-destructive">{getFieldError("githubHandle")}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="websiteUrl">Personal Website</Label>
          <Input id="websiteUrl" name="websiteUrl" type="url" defaultValue={user.websiteUrl || ""} placeholder="https://yourdomain.com" />
          {getFieldError("websiteUrl") && <p className="text-sm text-destructive">{getFieldError("websiteUrl")}</p>}
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-fit mt-4">
        {isPending ? (
          <><Loader2 className="mr-2 size-4 animate-spin" /> Saving changes...</>
        ) : (
          "Save Profile"
        )}
      </Button>
    </form>
  );
}
