type SortOrder = 'asc' | 'desc';

interface Item {
  name: string;
  createdAt: string; // or Date if it's already a Date object
}

// Replace all digit sequences with their number-equivalent (remove leading zeros)
function normalizeString(str: string): string {
  return str.replace(/\d+/g, (match) => parseInt(match, 10).toString());
}

export default function sortItemsByNormalizedName(input: Item[], order: SortOrder = 'asc'): Item[] {
  return [...input].sort((a, b) => {
    const normA = normalizeString(a.name);
    const normB = normalizeString(b.name);

    return order === 'asc'
      ? normA.localeCompare(normB, undefined, { numeric: true })
      : normB.localeCompare(normA, undefined, { numeric: true });
  });
}
