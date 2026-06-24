export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "#products" },
  { label: "Featured", href: "#featured" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
];

export const navCTA = {
  label: "Shop Now",
  href: "#products",
};

export const brand = {
  name: "Lumière",
  tagline: "Modern Shopping, Elevated",
  email: "hello@lumiere.shop",
  instagram: "@lumiere.shop",
  twitter: "@lumiereshop",
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
};

export type Category = {
  id: string;
  label: string;
};

export const categories: Category[] = [
  { id: "all", label: "All Products" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "tech", label: "Tech" },
  { id: "fashion", label: "Fashion" },
  { id: "home", label: "Home" },
];