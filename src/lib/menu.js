import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const menuFilePath = path.join(process.cwd(), 'public', 'menu.md');

export function getMenu() {
  if (!fs.existsSync(menuFilePath)) {
    return [];
  }
  const fileContents = fs.readFileSync(menuFilePath, 'utf8');
  const { data } = matter(fileContents);
  return data.links || [];
}
