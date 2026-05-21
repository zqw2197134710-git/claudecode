import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export interface ContentData {
  slug: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

export function getContent(filename: string): ContentData | null {
  const filePath = path.join(contentDir, filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.md$/, "");

  return { slug, frontmatter: data, body: content };
}

export function getAllContent(): ContentData[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));
  return files.map((file) => getContent(file)!);
}
