/**
 * Maps a single display name to API firstName + optional lastName.
 * First token → firstName; remaining tokens → lastName.
 */
export function splitDisplayName(displayName: string): {
  firstName: string;
  lastName?: string;
} {
  const trimmed = displayName.trim();
  if (!trimmed) {
    return { firstName: '' };
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0] };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}
