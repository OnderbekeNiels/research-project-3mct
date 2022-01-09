export default function formatTags(tags: string): string[] {
  return tags.split(/<|><|>/).filter((n) => n);
}
