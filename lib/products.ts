export type Category = "sofas" | "chairs" | "tables" | "beds" | "storage";

export type Bilingual = { en: string; zh: string };

export type Product = {
  slug: string;
  name: Bilingual;
  description: Bilingual;
  category: Category;
  priceCents: number;
  images: string[];
  dimensions?: { w: number; d: number; h: number; unit: "cm" };
  materials?: Bilingual;
  featured?: boolean;
};

export const CATEGORIES: Category[] = [
  "sofas",
  "chairs",
  "tables",
  "beds",
  "storage",
];

export const PRODUCTS: Product[] = [
  {
    slug: "lumiere-sofa",
    name: { en: "Lumière Sofa", zh: "镜光沙发" },
    description: {
      en: "A low-slung three-seat sofa in full-grain leather, hand-stitched over a kiln-dried oak frame. Down-wrapped cushions deepen with use.",
      zh: "三人沙发，低调而舒展。全粒面皮革手工缝制，包覆窑干橡木框架。羽绒坐垫，越坐越贴身。",
    },
    category: "sofas",
    priceCents: 489000,
    images: [
      "/images/products/lumiere-sofa.jpg",
    ],
    dimensions: { w: 224, d: 96, h: 78, unit: "cm" },
    materials: {
      en: "Full-grain leather, kiln-dried oak, goose down",
      zh: "全粒面皮革、窑干橡木、鹅绒",
    },
    featured: true,
  },
  {
    slug: "atelier-armchair",
    name: { en: "Atelier Armchair", zh: "工坊扶手椅" },
    description: {
      en: "A reading chair shaped over forty hours at the bench. Steam-bent oak arms, vegetable-tanned leather seat.",
      zh: "阅读椅，匠人于工作台前手作四十小时。蒸汽弯曲橡木扶手，植鞣皮坐面。",
    },
    category: "chairs",
    priceCents: 168000,
    images: [
      "/images/products/atelier-armchair.jpg",
    ],
    dimensions: { w: 78, d: 84, h: 86, unit: "cm" },
    materials: {
      en: "Steam-bent oak, vegetable-tanned leather, brass nails",
      zh: "蒸汽弯曲橡木、植鞣皮、黄铜钉",
    },
    featured: true,
  },
  {
    slug: "marais-dining-table",
    name: { en: "Marais Dining Table", zh: "玛黑餐桌" },
    description: {
      en: "A single-slab oak top finished with twelve coats of hardwax oil. Trestle base in solid brass-tipped oak.",
      zh: "整板橡木桌面，十二层硬蜡油涂装。橡木支架，端部以实心黄铜收口。",
    },
    category: "tables",
    priceCents: 348000,
    images: [
      "/images/products/marais-dining-table.jpg",
    ],
    dimensions: { w: 220, d: 92, h: 75, unit: "cm" },
    materials: {
      en: "Single-slab European oak, brass",
      zh: "整板欧洲橡木、黄铜",
    },
    featured: true,
  },
  {
    slug: "rive-side-table",
    name: { en: "Rive Side Table", zh: "里弗边几" },
    description: {
      en: "A diminutive side table in turned oak with a cast brass collar. Pleasing in pairs.",
      zh: "小巧边几，旋制橡木，配铸造黄铜套环。成对摆放，相映成趣。",
    },
    category: "tables",
    priceCents: 78000,
    images: [
      "/images/products/rive-side-table.jpg",
    ],
    dimensions: { w: 42, d: 42, h: 55, unit: "cm" },
    materials: { en: "Turned oak, cast brass", zh: "旋制橡木、铸造黄铜" },
  },
  {
    slug: "lune-bed",
    name: { en: "Lune Bed", zh: "月相床" },
    description: {
      en: "A platform bed with a tall upholstered headboard in natural linen. Slat support, no box spring needed.",
      zh: "平板床架，亚麻包覆高床头。板条承托，无需弹簧底座。",
    },
    category: "beds",
    priceCents: 298000,
    images: [
      "/images/products/lune-bed.jpg",
    ],
    dimensions: { w: 200, d: 215, h: 120, unit: "cm" },
    materials: { en: "Oak, natural linen", zh: "橡木、天然亚麻" },
    featured: true,
  },
  {
    slug: "ombre-credenza",
    name: { en: "Ombre Credenza", zh: "暗影矮柜" },
    description: {
      en: "Four sliding doors in fumed oak, hand-rubbed to a soft sheen. Adjustable interior shelves.",
      zh: "四扇推门，烟熏橡木手工抛光，呈现柔和光泽。柜内层板高度可调。",
    },
    category: "storage",
    priceCents: 256000,
    images: [
      "/images/products/ombre-credenza.jpg",
    ],
    dimensions: { w: 200, d: 48, h: 78, unit: "cm" },
    materials: { en: "Fumed oak, brass pulls", zh: "烟熏橡木、黄铜拉手" },
  },
  {
    slug: "claire-dining-chair",
    name: { en: "Claire Dining Chair", zh: "克莱餐椅" },
    description: {
      en: "A light, durable dining chair with a sculpted oak back and a leather sling seat.",
      zh: "轻盈耐久的餐椅，雕塑感橡木椅背，皮革吊坐面。",
    },
    category: "chairs",
    priceCents: 86000,
    images: [
      "/images/products/claire-dining-chair.jpg",
    ],
    dimensions: { w: 46, d: 52, h: 82, unit: "cm" },
    materials: { en: "Oak, leather", zh: "橡木、皮革" },
  },
  {
    slug: "fjord-bookcase",
    name: { en: "Fjord Bookcase", zh: "峡湾书架" },
    description: {
      en: "An open bookcase with adjustable shelves and a brass top rail. Anchors to the wall.",
      zh: "开放式书架，层板可调，顶部黄铜横档。需固定于墙体。",
    },
    category: "storage",
    priceCents: 184000,
    images: [
      "/images/products/fjord-bookcase.jpg",
    ],
    dimensions: { w: 110, d: 38, h: 210, unit: "cm" },
    materials: { en: "Oak, brass", zh: "橡木、黄铜" },
  },
  {
    slug: "petit-loveseat",
    name: { en: "Petit Loveseat", zh: "双人小沙发" },
    description: {
      en: "A two-seat sofa for smaller rooms. Same construction as our Lumière, scaled to apartments.",
      zh: "为小房间设计的双人沙发，与镜光沙发同构，比例更宜公寓。",
    },
    category: "sofas",
    priceCents: 348000,
    images: [
      "/images/products/petit-loveseat.jpg",
    ],
    dimensions: { w: 168, d: 92, h: 78, unit: "cm" },
    materials: {
      en: "Full-grain leather, oak, down",
      zh: "全粒面皮革、橡木、羽绒",
    },
  },
  {
    slug: "atelier-stool",
    name: { en: "Atelier Stool", zh: "工坊凳" },
    description: {
      en: "A three-legged stool turned from a single piece of oak. The first thing every apprentice makes.",
      zh: "三足凳，由一整块橡木旋制而成。每位学徒入门必作之物。",
    },
    category: "chairs",
    priceCents: 32000,
    images: [
      "/images/products/atelier-stool.jpg",
    ],
    dimensions: { w: 34, d: 34, h: 46, unit: "cm" },
    materials: { en: "Solid oak", zh: "实心橡木" },
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeatured() {
  return PRODUCTS.filter((p) => p.featured);
}
