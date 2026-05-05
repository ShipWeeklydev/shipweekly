// ============================================
// Product Submission Form Copy
// ============================================

export const PRODUCT_FORM = {
  createTitle: "Submit Your Product",
  editTitle: "Edit Product",
  createDescription: "Ship it to the weekly leaderboard. Fill in the details below.",
  editDescription: "Update your product details below.",
  fields: {
    name: {
      label: "Product Name *",
      placeholder: "My Awesome SaaS",
    },
    tagline: {
      label: "Tagline *",
      placeholder: "A short, catchy description",
    },
    description: {
      label: "Description *",
      placeholder: "Tell builders what your product does, why it exists, and who it's for.",
    },
    websiteUrl: {
      label: "Website URL *",
      placeholder: "https://yourproduct.com",
    },
    logo: {
      label: "Logo",
      hint: "Upload your product logo (square recommended).",
    },
    screenshots: {
      label: "Screenshots",
      hint: "Upload up to 5 screenshots of your product.",
    },
    categories: {
      label: "Categories",
      placeholder: "AI, SaaS, Productivity",
      hint: "Comma-separated.",
    },
    techStack: {
      label: "Tech Stack",
      placeholder: "Next.js, Neon, Clerk, Tailwind",
      hint: "Comma-separated. This powers the Stack Reveal feature.",
    },
    mrr: {
      label: "Monthly Revenue (cents)",
      placeholder: "0",
      hint: "Enter in cents (e.g. $24 = 2400). Powers the MRR Badge.",
    },
  },
  submitButton: "Ship It 🚀",
  editButton: "Save Changes",
  submittingText: "Submitting...",
  savingText: "Saving...",
} as const;
