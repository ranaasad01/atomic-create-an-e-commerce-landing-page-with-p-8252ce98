"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Check, Truck, RefreshCw, Shield, Sparkles, Heart, ChevronRight } from 'lucide-react';
import { brand, categories, type Category } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Aura Wireless Headphones",
    category: "tech",
    price: 129,
    originalPrice: 179,
    rating: 4.8,
    reviewCount: 312,
    image: "https://naztech.com/cdn/shop/files/15869NZTAura360ANCWirelessHeadphonesMidnight-001.jpg?v=1726857645",
    badge: "Best Seller",
    description: "Studio-quality sound with 40-hour battery life and featherlight comfort.",
  },
  {
    id: 2,
    name: "Linen Oversized Blazer",
    category: "fashion",
    price: 189,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 148,
    image: "https://magiclinen.com/cdn/shop/products/HEBER-blazer-in-natural-melage-ROME-pants-in-natural-melange-OLINDA-top-in-white-1.jpg?v=1717593916&width=1946",
    badge: "New",
    description: "Effortlessly tailored in breathable linen for every occasion.",
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Set",
    category: "home",
    price: 74,
    originalPrice: 95,
    rating: 4.7,
    reviewCount: 204,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    description: "Handcrafted matte ceramic for a ritual-worthy morning brew.",
  },
  {
    id: 4,
    name: "Minimal Leather Watch",
    category: "lifestyle",
    price: 245,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 89,
    image: "https://www.centricinstruments.com/cdn/shop/products/MKIII39-vintageblack-leatherbrown.jpg?v=1638167902",
    badge: undefined,
    description: "Swiss movement, Italian leather strap, and a dial that speaks quietly.",
  },
  {
    id: 5,
    name: "Merino Knit Turtleneck",
    category: "fashion",
    price: 112,
    originalPrice: 145,
    rating: 4.6,
    reviewCount: 267,
    image: "https://www.slam.com/cdn/shop/files/A102006S00_W09_SEAWOOLTURTLENECK_F_00102_06101.jpg?v=1726740199&width=1946",
    badge: "Sale",
    description: "Ultra-fine merino wool that feels like a second skin all winter.",
  },
  {
    id: 6,
    name: "Smart Desk Lamp",
    category: "tech",
    price: 89,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 193,
    image: "https://m.media-amazon.com/images/I/715olWL+xXL._AC_UF894,1000_QL80_.jpg",
    badge: "New",
    description: "Tunable white light with wireless charging base and touch dimmer.",
  },
  {
    id: 7,
    name: "Linen Throw Pillow Set",
    category: "home",
    price: 58,
    originalPrice: undefined,
    rating: 4.5,
    reviewCount: 321,
    image: "https://m.media-amazon.com/images/I/81g-wfGYICL.jpg",
    badge: undefined,
    description: "Stone-washed linen covers in earthy tones, set of two.",
  },
  {
    id: 8,
    name: "Leather Card Wallet",
    category: "lifestyle",
    price: 65,
    originalPrice: 80,
    rating: 4.8,
    reviewCount: 412,
    image: "https://www.popovleather.com/cdn/shop/files/leather-5-card-wallet-popov-leather-1174379443.jpg?v=1750466630",
    badge: "Best Seller",
    description: "Full-grain leather, RFID-blocking, holds up to 8 cards slim.",
  },
];

const featuredProduct = {
  name: "The Aura Collection",
  subtitle: "Curated for the modern minimalist",
  description:
    "Every piece in the Aura Collection is chosen for its craftsmanship, longevity, and quiet confidence. No trends. No noise. Just objects worth owning.",
  image: "https://m.media-amazon.com/images/I/61OHT6RIzXL._AC_UF1000,1000_QL80_.jpg",
  stats: [
    { value: "2,400+", label: "Happy customers" },
    { value: "4.8", label: "Average rating" },
    { value: "60-day", label: "Free returns" },
  ],
};

const reviews = [
  {
    id: 1,
    name: "Mara Jensen",
    location: "New York, NY",
    rating: 5,
    text: "The leather watch arrived beautifully packaged. It looks far more expensive than it is. I've received so many compliments.",
    product: "Minimal Leather Watch",
    avatar: "https://www.ageist.com/wp-content/uploads/2024/05/IMG_5448-683x1024.jpg",
  },
  {
    id: 2,
    name: "Tom Okafor",
    location: "London, UK",
    rating: 5,
    text: "Lumière has completely changed how I shop online. The curation is impeccable and shipping was faster than expected.",
    product: "Linen Oversized Blazer",
    avatar: "https://new.aronewsonline.com/wp-content/uploads/2015/07/celestine-thomas-okafor.jpg",
  },
  {
    id: 3,
    name: "Suki Tanaka",
    location: "Tokyo, JP",
    rating: 5,
    text: "The ceramic pour-over set is a work of art. My mornings feel like a ritual now. Worth every penny.",
    product: "Ceramic Pour-Over Set",
    avatar: "https://covers.libro.fm/9781792227080_1120.jpg",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $75",
    description: "Fast, tracked delivery on every qualifying order. No surprises at checkout.",
  },
  {
    icon: RefreshCw,
    title: "60-Day Free Returns",
    description: "Changed your mind? Return anything within 60 days, no questions asked.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description: "Every product is verified for quality before it reaches your door.",
  },
  {
    icon: Sparkles,
    title: "Curated with Care",
    description: "Our team hand-selects every item for design, durability, and value.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={12}
            className={
              i <= Math.round(rating)
                ? "fill-[#e94560] text-[#e94560]"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <span className="text-xs text-[#1a1a2e]/50 font-medium">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)" },
  hover: { y: -6, boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 20px 40px -12px rgba(0,0,0,0.18)" },
};

const imageZoom: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
};

function ProductCard({ product }: { product: typeof products[0] }) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)" }}
    >
      <motion.div variants={cardHover} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-[#f5f4f0]">
          <motion.img
            variants={imageZoom}
            transition={{ duration: 0.45, ease: "easeOut" }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                product.badge === "Sale"
                  ? "bg-[#e94560] text-white"
                  : product.badge === "New"
                  ? "bg-[#1a1a2e] text-white"
                  : "bg-amber-400 text-[#1a1a2e]"
              }`}
            >
              {product.badge}
            </span>
          )}
          {/* Discount pill */}
          {discount && (
            <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[11px] font-bold bg-white/90 text-[#e94560] border border-[#e94560]/20">
              -{discount}%
            </span>
          )}
          {/* Wishlist */}
          <button
            onClick={() => setWishlisted((w) => !w)}
            aria-label="Toggle wishlist"
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
          >
            <Heart
              size={15}
              className={wishlisted ? "fill-[#e94560] text-[#e94560]" : "text-[#1a1a2e]/60"}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <p className="text-[11px] font-semibold tracking-widest text-[#e94560] uppercase">
            {product.category}
          </p>
          <h3 className="text-[#1a1a2e] font-semibold text-sm leading-snug font-[family-name:var(--font-syne)]">
            {product.name}
          </h3>
          <p className="text-[#1a1a2e]/55 text-xs leading-relaxed flex-1">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-[#1a1a2e] font-bold text-base">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[#1a1a2e]/35 text-sm line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a2e] text-white text-xs font-semibold hover:bg-[#e94560] transition-colors duration-200"
            >
              <ShoppingBag size={12} />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="bg-[#fafaf8] overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center pt-20 pb-16 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f4f0] via-[#fafaf8] to-[#f0eee8]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #1a1a2e 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Accent glow */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-[#e94560]/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#1a1a2e]/5 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e94560]/10 border border-[#e94560]/20 text-[#e94560] text-xs font-semibold tracking-wide">
                  <Sparkles size={12} />
                  New arrivals just dropped
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-[#1a1a2e] font-[family-name:var(--font-syne)] text-balance"
              >
                Style that
                <br />
                <span className="text-[#e94560]">speaks</span> for
                <br />
                itself.
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-[#1a1a2e]/60 text-lg leading-relaxed max-w-md text-pretty"
              >
                Lumière brings together the finest in fashion, tech, and home goods. Every product is chosen for its craft, not its hype.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#e94560] text-white font-semibold text-sm hover:bg-[#c73652] transition-all duration-200 shadow-[0_4px_14px_rgba(233,69,96,0.35)] hover:shadow-[0_6px_20px_rgba(233,69,96,0.45)]"
                >
                  Shop the Collection
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#featured"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-black/10 text-[#1a1a2e] font-semibold text-sm hover:border-[#e94560]/40 hover:text-[#e94560] transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  See Featured
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-2">
                {[
                  { value: "12K+", label: "Orders shipped" },
                  { value: "4.9", label: "Store rating" },
                  { value: "200+", label: "Products" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-2xl font-bold text-[#1a1a2e] font-[family-name:var(--font-syne)]">
                      {stat.value}
                    </span>
                    <span className="text-xs text-[#1a1a2e]/50">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Hero image collage */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:flex items-center justify-center"
            >
              <motion.div
                variants={slideInRight}
                className="relative w-full max-w-md"
              >
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]">
                  <img
                    src="https://www.telluride.com/site/assets/files/34621/unit_66_living.2000x1125.webp"
                    alt="Lumière collection lifestyle"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/30 via-transparent to-transparent" />
                </div>

                {/* Floating card 1 */}
                <motion.div
                  initial={{ opacity: 0, x: 40, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.55, ease: "easeOut" }}
                  className="absolute -right-10 top-12 bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-black/5 w-44"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#f5f4f0] flex-shrink-0">
                      <img
                        src="https://www.centricinstruments.com/cdn/shop/products/MKIII39-vintageblack-leatherbrown.jpg?v=1638167902"
                        alt="Watch"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#1a1a2e] leading-tight">
                        Minimal Watch
                      </p>
                      <p className="text-[11px] text-[#e94560] font-bold">$245</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating card 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -40, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.55, ease: "easeOut" }}
                  className="absolute -left-10 bottom-16 bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-black/5"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={10} className="fill-[#e94560] text-[#e94560]" />
                    ))}
                  </div>
                  <p className="text-[11px] font-semibold text-[#1a1a2e]">
                    "Absolutely love it."
                  </p>
                  <p className="text-[10px] text-[#1a1a2e]/50 mt-0.5">Mara J. — verified buyer</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="py-14 border-y border-black/5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {valueProps.map((vp) => (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e94560]/10 flex items-center justify-center flex-shrink-0">
                  <vp.icon size={18} className="text-[#e94560]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a2e] leading-tight">
                    {vp.title}
                  </p>
                  <p className="text-xs text-[#1a1a2e]/55 leading-relaxed mt-0.5 hidden sm:block">
                    {vp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section id="products" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold tracking-widest text-[#e94560] uppercase mb-2"
              >
                The Shop
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a2e] font-[family-name:var(--font-syne)] text-balance"
              >
                Explore the collection
              </motion.h2>
            </div>
            <motion.p
              variants={fadeInUp}
              className="text-[#1a1a2e]/55 max-w-xs text-sm leading-relaxed"
            >
              From everyday essentials to statement pieces, every item is chosen for lasting quality.
            </motion.p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat: Category) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-[#1a1a2e] text-white shadow-[0_2px_8px_rgba(26,26,46,0.25)]"
                    : "bg-white border border-black/10 text-[#1a1a2e]/70 hover:border-[#e94560]/30 hover:text-[#e94560]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {(filtered ?? []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-[#1a1a2e]/40 text-sm">
              No products in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED EDITORIAL ───────────────────────────────────────────── */}
      <section id="featured" className="py-24 md:py-32 bg-[#1a1a2e] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-square shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#e94560]/20 via-transparent to-transparent" />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl border border-white/5 pointer-events-none" />
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-7"
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold tracking-widest text-[#e94560] uppercase"
              >
                Featured Collection
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold tracking-tight text-white font-[family-name:var(--font-syne)] text-balance leading-tight"
              >
                {featuredProduct.name}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-white/60 text-base leading-relaxed text-pretty"
              >
                {featuredProduct.description}
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-3 gap-4 py-6 border-y border-white/10"
              >
                {featuredProduct.stats.map((stat) => (
                  <motion.div key={stat.label} variants={fadeInUp} className="flex flex-col gap-1">
                    <span className="text-2xl font-bold text-white font-[family-name:var(--font-syne)]">
                      {stat.value}
                    </span>
                    <span className="text-xs text-white/50">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Checklist */}
              <motion.ul variants={staggerContainer} className="flex flex-col gap-3">
                {[
                  "Ethically sourced materials",
                  "Carbon-neutral shipping",
                  "Lifetime quality guarantee",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeInUp}
                    className="flex items-center gap-3 text-sm text-white/75"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#e94560]/20 border border-[#e94560]/40 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#e94560]" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeInUp}>
                <Link
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#e94560] text-white font-semibold text-sm hover:bg-[#c73652] transition-all duration-200 shadow-[0_4px_14px_rgba(233,69,96,0.35)]"
                >
                  Shop the Aura Collection
                  <ChevronRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 bg-[#f5f4f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold tracking-widest text-[#e94560] uppercase mb-3"
            >
              Social Proof
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a2e] font-[family-name:var(--font-syne)] text-balance"
            >
              Loved by thousands
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#1a1a2e]/55 mt-4 max-w-md mx-auto text-sm leading-relaxed"
            >
              Real customers, real opinions. Here's what people are saying about their Lumière experience.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`bg-white rounded-2xl p-6 border border-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] flex flex-col gap-4 ${
                  i === 1 ? "md:mt-6" : ""
                }`}
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-[#e94560] text-[#e94560]" />“The leather watch arrived beautifully packaged. It looks far more expensive than it is.”</div>
                <p className="text-[#1a1a2e]/80 text-sm leading-relaxed flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-[#f5f4f0] flex-shrink-0">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1a1a2e]">{review.name}</p>
                    <p className="text-[11px] text-[#1a1a2e]/45">{review.location}</p>
                  </div>
                  <span className="ml-auto text-[10px] text-[#e94560] font-medium bg-[#e94560]/8 px-2 py-0.5 rounded-full">
                    {review.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-14 flex flex-wrap items-center justify-center gap-8 text-[#1a1a2e]/40 text-xs font-semibold tracking-widest uppercase"
          >
            {["Vogue", "Monocle", "Wallpaper*", "Dezeen", "Hypebeast"].map((pub) => (
              <span key={pub} className="hover:text-[#1a1a2e]/70 transition-colors duration-200 cursor-default">
                {pub}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Accent glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#e94560]/6 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={scaleIn}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e94560]/10 border border-[#e94560]/20 text-[#e94560] text-xs font-semibold tracking-wide">
                <Sparkles size={12} />
                Join the community
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a2e] font-[family-name:var(--font-syne)] text-balance"
            >
              Get early access to new drops
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-[#1a1a2e]/55 text-base leading-relaxed text-pretty"
            >
              Subscribe for exclusive first looks, member-only discounts, and curated style guides delivered to your inbox.
            </motion.p>

            <motion.div variants={fadeInUp} className="w-full max-w-md">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#e94560]/10 border border-[#e94560]/20 text-[#e94560] font-semibold text-sm"
                >
                  <Check size={16} />
                  You're on the list. Welcome to Lumière.
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex gap-2 p-1.5 rounded-full bg-[#f5f4f0] border border-black/8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-transparent px-4 text-sm text-[#1a1a2e] placeholder:text-[#1a1a2e]/35 outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#e94560] text-white text-sm font-semibold hover:bg-[#c73652] transition-colors duration-200 shadow-[0_2px_8px_rgba(233,69,96,0.3)] whitespace-nowrap"
                  >
                    Subscribe
                  </motion.button>
                </form>
              )}
            </motion.div>

            <motion.p variants={fadeIn} className="text-[11px] text-[#1a1a2e]/35">
              No spam, ever. Unsubscribe at any time.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
