// Utility function to decode JWT and extract username claim
export function getUsernameFromToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username || null;
  } catch {
    return null;
  }
}
