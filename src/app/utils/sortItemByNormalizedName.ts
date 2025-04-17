import { IFileData } from "../interfaces/Interfaces";

type SortOrder = 'asc' | 'desc';

// Replace all digit sequences with their number-equivalent (remove leading zeros)
function normalizeString(str: string): string {
  return str.replace(/\d+/g, (match) => parseInt(match, 10).toString());
}

export default function sortItemsByNormalizedName(input: IFileData[], order: SortOrder = 'asc'): IFileData[] {
  return [...input].sort((a, b) => {
    const normA = normalizeString(a.filename);
    const normB = normalizeString(b.filename);

    return order === 'asc'
      ? normA.localeCompare(normB, undefined, { numeric: true })
      : normB.localeCompare(normA, undefined, { numeric: true });
  });
}
