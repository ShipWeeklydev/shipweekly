import { SubmitProductForm } from "@/components/product/submit-form";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId, getProductsByUserId } from "@/lib/db/queries";
import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Edit Product",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const user = await getUserByClerkId(userId);
  if (!user) redirect("/onboarding");

  const { id } = await params;

  // Get user's products and find the one matching the ID
  const userProducts = await getProductsByUserId(user.id);
  const product = userProducts.find((p) => p.id === id);

  if (!product) notFound();

  return (
    <main className="flex-1 w-full bg-background min-h-svh p-6 md:p-12 lg:p-24 flex flex-col items-center">
      <div className="w-full max-w-2xl mb-8 flex flex-col gap-6">
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 w-fit">
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>
      <SubmitProductForm product={product} />
    </main>
  );
}
