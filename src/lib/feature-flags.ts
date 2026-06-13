// Client-readable feature flags. Set VITE_FEATURE_* env vars to "true" to enable.
export const featureFlags = {
  trademarkSearch: import.meta.env.VITE_FEATURE_TRADEMARK_SEARCH === "true",
} as const;
