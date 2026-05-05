// ============================================
// Empty State Messages
// Used across leaderboard, discover, etc.
// ============================================

export const EMPTY_STATES = {
  leaderboard: {
    title: "No products shipped yet!",
    description: (weekNumber: number, weekYear: number) =>
      `Be the first to launch a product in Week ${weekNumber}, ${weekYear}.`,
  },
  discover: {
    title: "No products found",
    description: "Try adjusting your search terms or filters.",
  },
  search: {
    placeholder: "Search products by name or tagline...",
    button: "Search",
    clearFilters: "Clear filters",
    showingResultsFor: "Showing results for",
  },
} as const;

export const DISCOVER_PAGE = {
  title: "Discover Products",
  description: "Find the best products shipped by builders worldwide.",
} as const;
