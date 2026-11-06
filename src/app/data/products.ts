
import type { Product } from "./componets/productCard";

export const products: Product[] = [
  {
    id: 1,
    name: "পেঁয়াজ",
    slug: "peyaj",
    emoji: "🧅",
    unit: "প্রতি কেজি",
    price: 64,
    change: 3.5,
  },
  {
    id: 2,
    name: "আলু",
    slug: "alu",
    emoji: "🥔",
    unit: "প্রতি কেজি",
    price: 35,
    change: 2.0,
  },
  {
    id: 3,
    name: "বেগুন",
    slug: "begun",
    emoji: "🍆",
    unit: "প্রতি কেজি",
    price: 44,
    change: -1.5,
  },
  {
    id: 4,
    name: "রুই মাছ",
    slug: "rui-mach",
    emoji: "🐟",
    unit: "প্রতি কেজি",
    price: 340,
    change: -2.5,
  },
  {
    id: 5,
    name: "ডিম",
    slug: "dim",
    emoji: "🥚",
    unit: "প্রতি ডজন",
    price: 145,
    change: 3.0,
  },
  {
    id: 6,
    name: "সয়াবিন তেল",
    slug: "soyabin-tel",
    emoji: "🛢️",
    unit: "প্রতি লিটার",
    price: 175,
    change: 0,
  },
];
