/**
 * FlameScans Shared Utilities
 * Helper functions for FlameScans module
 */

export function cleanUrl(url: string): string {
  return 'https://flamecomics.xyz' + url.trim();
}

export function cleanText(str: string): string {
  return str.replace(/[\n\t]/g, '').trim();
}

export function cleanImage(imageUrl: string): string {
  // If image already has domain, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  // Otherwise, prepend FlameComics domain
  return 'https://flamecomics.xyz' + imageUrl;
}
