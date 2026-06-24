"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Mail, ArrowRight } from 'lucide-react';
import { brand, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  const footerSections = [
    {
      title: "Shop",
      links: [
        { label: "New Arrivals", href: "#products" },
        { label: "Best Sellers", href: "#featured" },
        { label: "Sale", href: "#products" },
        { label: "Collections", href: "#products" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Shipping Info", href: "#" },
        { label: "Returns", href: "#" },
        { label: "Size Guide", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Contact", href: "#newsletter" },
      ],
    },
  ];

  return (
    <footer className="bg-[#1a1a2e] text-white">
      {/* Top CTA Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#e94560] uppercase mb-1">
              Free Shipping
            </p>
            <p className="text-xl font-bold font-[family-name:var(--font-syne)]">
              On all orders over $75
            </p>
          </div>
          <Link
            href={getLinkHref("#products")}
            onClick={(e) => handleAnchorClick(e, "#products")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#e94560] text-white text-sm font-semibold hover:bg-[#c73652] transition-all duration-200 shadow-[0_4px_14px_rgba(233,69,96,0.35)]"
          >
            Start Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight font-[family-name:var(--font-syne)]">
                {brand.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e94560]" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Curated collections of premium products for the modern lifestyle.
              Quality you can feel, style you can trust.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e94560] transition-colors duration-200"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e94560] transition-colors duration-200"
              >
                <Twitter size={16} />
              </a>
              <a
                href={`mailto:${brand.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e94560] transition-colors duration-200"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}