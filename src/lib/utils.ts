/**
 * Get the correct API URL based on the current environment
 * This is important for GitHub Pages deployments
 * @param path The API path without leading slash
 * @returns The full API URL
 */
export function getApiUrl(path: string): string {
  // Check if we're running in the browser
  const isBrowser = typeof window !== 'undefined';
  
  // Check if we're on GitHub Pages
  const isGitHubPages = isBrowser && window.location.hostname.includes('github.io');
  
  // Check if we're in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Base path only needed in production
  const basePath = isProduction ? '/office-managment' : '';
  
  // If we're on GitHub Pages, we want to redirect API requests to our serverless functions
  // or just use localStorage (our current approach)
  if (isGitHubPages) {
    // Return null to indicate that the API should not be called
    // and the app should use localStorage instead
    return '';
  }
  
  return `${basePath}/api/${path}`;
}

/**
 * Check if the app should use offline mode
 * @returns boolean indicating if offline mode should be used
 */
export function shouldUseOfflineMode(): boolean {
  // Always use offline mode in static exports (GitHub Pages)
  if (process.env.IS_STATIC_EXPORT === 'true') {
    return true;
  }
  
  // Check if we're running in the browser
  const isBrowser = typeof window !== 'undefined';
  
  // Use offline mode if we're on GitHub Pages
  if (isBrowser && window.location.hostname.includes('github.io')) {
    return true;
  }
  
  return false;
} 