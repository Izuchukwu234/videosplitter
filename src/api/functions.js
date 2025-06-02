// Format the split count with commas
export function formatSplitCount(count) {
  return new Intl.NumberFormat('en-US').format(count);
}

// Check if we're running in development mode
const isDev = process.env.NODE_ENV === 'development';

// Fetch the total split count from Cloudflare D1
export async function fetchSplitCount() {
  if (isDev) {
    console.log('Running in development mode - using mock split count');
    return 301023; // Mock count for local development
  }

  try {
    const response = await fetch('/get-split-count');
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error fetching split count:', error);
    return null;
  }
}