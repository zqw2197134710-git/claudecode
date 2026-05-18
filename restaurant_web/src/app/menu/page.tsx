import { getContent } from "@/lib/content";
import MenuClient from "@/components/MenuClient";

interface Dish {
  name: string;
  description: string;
  category: string;
}

interface Category {
  name: string;
  dishes: Dish[];
}

interface MenuPrices {
  priceSingle: number;
  priceDouble: number;
  priceOriginal: number;
}

function parseMenu(body: string): Category[] {
  const categories: Category[] = [];
  const blocks = body.split(/\n(?=## )/);

  for (const block of blocks) {
    const headingMatch = block.match(/^## (.+)/);
    if (!headingMatch) continue;

    const name = headingMatch[1].trim();
    const lines = block.replace(/^## .+\n?/, "").trim().split("\n");
    const dishes: Dish[] = [];

    let inTable = false;
    for (const line of lines) {
      if (line.includes("|---")) {
        inTable = true;
        continue;
      }
      if (!inTable) continue;
      const match = line.match(/^\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/);
      if (match) {
        dishes.push({
          name: match[1].trim(),
          description: match[2].trim(),
          category: name,
        });
      }
    }

    if (dishes.length > 0) {
      categories.push({ name, dishes });
    }
  }

  return categories;
}

export default function MenuPage() {
  const data = getContent("menu.md");

  if (!data) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-20 text-center text-text-muted">
        菜单内容加载中...
      </main>
    );
  }

  const categories = parseMenu(data.body);
  const prices: MenuPrices = {
    priceSingle: Number(data.frontmatter.price_single) || 69.9,
    priceDouble: Number(data.frontmatter.price_double) || 139.8,
    priceOriginal: Number(data.frontmatter.price_original) || 99.9,
  };

  return (
    <MenuClient
      priceSingle={prices.priceSingle}
      priceDouble={prices.priceDouble}
      priceOriginal={prices.priceOriginal}
      categories={categories}
    />
  );
}
