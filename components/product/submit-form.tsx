"use client";

import { useActionState, useState } from "react";
import { submitProduct, editProduct } from "@/lib/actions/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Product } from "@/lib/db/schema";
import { ImageUpload } from "./image-upload";
import { MultiImageUpload } from "./multi-image-upload";

type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]> | null;
};

const initialState: ActionState = { success: false };

async function submitWrapper(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return (await submitProduct(formData)) as ActionState;
}

async function editWrapper(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return (await editProduct(formData)) as ActionState;
}

export function SubmitProductForm({ product }: { product?: Product }) {
  const isEditing = !!product;
  const [logoUrl, setLogoUrl] = useState(product?.logoUrl ?? "");
  const [screenshots, setScreenshots] = useState<string[]>(product?.screenshots ?? []);
  const [state, formAction, isPending] = useActionState(
    isEditing ? editWrapper : submitWrapper,
    initialState
  );

  const getFieldError = (field: string) => {
    if (state.error && typeof state.error === "object") {
      const errors = (state.error as Record<string, string[]>)[field];
      return errors?.[0] ?? null;
    }
    return null;
  };

  const globalError = typeof state.error === "string" ? state.error : null;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Product" : "Submit Your Product"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update your product details below."
            : "Ship it to the weekly leaderboard. Fill in the details below."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-5">
          {isEditing && <input type="hidden" name="productId" value={product.id} />}

          {globalError && (
            <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md">
              {globalError}
            </div>
          )}

          {/* Product Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" defaultValue={product?.name ?? ""} placeholder="My Awesome SaaS" maxLength={60} required />
            {getFieldError("name") && <p className="text-sm text-destructive">{getFieldError("name")}</p>}
          </div>

          {/* Tagline */}
          <div className="grid gap-2">
            <Label htmlFor="tagline">Tagline *</Label>
            <Input id="tagline" name="tagline" defaultValue={product?.tagline ?? ""} placeholder="A short, catchy description" maxLength={120} required />
            {getFieldError("tagline") && <p className="text-sm text-destructive">{getFieldError("tagline")}</p>}
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" defaultValue={product?.description ?? ""} placeholder="Tell builders what your product does, why it exists, and who it's for." rows={5} maxLength={2000} required />
            {getFieldError("description") && <p className="text-sm text-destructive">{getFieldError("description")}</p>}
          </div>

          {/* Website URL */}
          <div className="grid gap-2">
            <Label htmlFor="websiteUrl">Website URL *</Label>
            <Input id="websiteUrl" name="websiteUrl" type="url" defaultValue={product?.websiteUrl ?? ""} placeholder="https://yourproduct.com" required />
            {getFieldError("websiteUrl") && <p className="text-sm text-destructive">{getFieldError("websiteUrl")}</p>}
          </div>

          {/* Logo URL */}
          <div className="grid gap-2">
            <Label>Logo</Label>
            <input type="hidden" name="logoUrl" value={logoUrl} />
            <ImageUpload 
              value={logoUrl} 
              onChange={(url) => setLogoUrl(url)} 
              onRemove={() => setLogoUrl("")} 
            />
            <p className="text-xs text-muted-foreground">Upload your product logo (square recommended).</p>
            {getFieldError("logoUrl") && <p className="text-sm text-destructive">{getFieldError("logoUrl")}</p>}
          </div>

          {/* Screenshots */}
          <div className="grid gap-2">
            <Label>Screenshots</Label>
            <input type="hidden" name="screenshots" value={JSON.stringify(screenshots)} />
            <MultiImageUpload 
              value={screenshots} 
              onChange={(urls) => setScreenshots(urls)} 
              onRemove={(url) => setScreenshots(screenshots.filter((s) => s !== url))} 
            />
            <p className="text-xs text-muted-foreground">Upload up to 5 screenshots of your product.</p>
          </div>

          {/* Categories */}
          <div className="grid gap-2">
            <Label htmlFor="categories">Categories</Label>
            <Input id="categories" name="categories" defaultValue={product?.categories?.join(", ") ?? ""} placeholder="AI, SaaS, Productivity" />
            <p className="text-xs text-muted-foreground">Comma-separated.</p>
          </div>

          {/* Tech Stack */}
          <div className="grid gap-2">
            <Label htmlFor="techStack">Tech Stack</Label>
            <Input id="techStack" name="techStack" defaultValue={product?.techStack?.join(", ") ?? ""} placeholder="Next.js, Neon, Clerk, Tailwind" />
            <p className="text-xs text-muted-foreground">Comma-separated. This powers the Stack Reveal feature.</p>
          </div>

          {/* MRR */}
          <div className="grid gap-2">
            <Label htmlFor="mrrCents">Monthly Revenue (cents)</Label>
            <Input id="mrrCents" name="mrrCents" type="number" defaultValue={product?.mrrCents ?? 0} placeholder="0" min={0} />
            <p className="text-xs text-muted-foreground">Enter in cents (e.g. $24 = 2400). Powers the MRR Badge.</p>
          </div>

          <Button type="submit" disabled={isPending} className="w-fit mt-2">
            {isPending ? (
              <><Loader2 className="mr-2 size-4 animate-spin" /> {isEditing ? "Saving..." : "Submitting..."}</>
            ) : (
              isEditing ? "Save Changes" : "Ship It 🚀"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
