/**
 * Get the correct API URL based on the current environment
 * This is important for GitHub Pages deployments
 * @param path The API path without leading slash
 * @returns The full API URL
 */
export function getApiUrl(path: string): string {
  // In production (GitHub Pages), use the external API service
  if (process.env.NODE_ENV === 'production') {
    return `${process.env.API_BASE_URL}/api/${path}`;
  }
  
  // In development, use relative URLs
  return `/api/${path}`;
}

/**
 * Check if the app should use offline mode
 * @returns boolean indicating if offline mode should be used
 */
export function shouldUseOfflineMode(): boolean {
  // Only use offline mode if explicitly set
  if (process.env.FORCE_OFFLINE === 'true') {
    return true;
  }
  
  // If we have an API_BASE_URL set, don't use offline mode
  if (process.env.API_BASE_URL) {
    return false;
  }
  
  return false;
} 