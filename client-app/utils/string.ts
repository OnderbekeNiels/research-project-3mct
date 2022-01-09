export default function formatTags(tags: string): string[] {
  if (!tags) return []
  return tags.split(/<|><|>/).filter((n) => n);
}
