"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MailIcon } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call for Sprint 3
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-3 w-full p-5 bg-card border rounded-xl shadow-sm">
      <div className="flex items-center gap-2 text-foreground font-semibold">
        <MailIcon className="size-5 text-primary" />
        Join 10,000+ Builders
      </div>
      <p className="text-sm text-muted-foreground">
        Get the top 5 shipped products delivered to your inbox every Sunday.
      </p>
      
      <form onSubmit={subscribe} className="flex gap-2 mt-2">
        <Input 
          type="email" 
          placeholder="your@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          disabled={status === "loading" || status === "success"}
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? "..." : status === "success" ? "Subscribed!" : "Subscribe"}
        </Button>
      </form>
      
      {status === "success" && (
        <p className="text-xs text-green-600 font-medium mt-1">
          Thanks for subscribing! Check your inbox.
        </p>
      )}
    </div>
  );
}
