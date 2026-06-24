"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from 'lucide-react';
import { navLinks, navCTA, brand } from "@/lib/data";

interface NavbarProps {
  cartCount?: number;
  onCartOpen?: () => void;
}

export default function Navbar({ cartCount = 0, onCartOpen }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold tracking-tight font-[family-name:var(--font-syne)] text-[#1a1a2e] group-hover:text-[#e94560] transition-colors duration-200">
                {brand.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e94560] mt-0.5" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-[#e94560]/10 hover:text-[#e94560] ${
                    pathname === link.href && !link.href.startsWith("#")
                      ? "text-[#e94560]"
                      : "text-[#1a1a2e]/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCartOpen}
                className="relative p-2.5 rounded-full bg-[#1a1a2e] text-white hover:bg-[#e94560] transition-colors duration-200"
                aria-label="Open cart"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#e94560] text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* CTA */}
              <Link
                href={getLinkHref(navCTA.href)}
                onClick={(e) => handleAnchorClick(e, navCTA.href)}
                className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-[#e94560] text-white text-sm font-semibold hover:bg-[#c73652] transition-all duration-200 shadow-[0_4px_14px_rgba(233,69,96,0.35)] hover:shadow-[0_4px_20px_rgba(233,69,96,0.5)]"
              >
                {navCTA.label}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-b border-black/5 shadow-lg md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-[#1a1a2e]/80 hover:bg-[#e94560]/10 hover:text-[#e94560] transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={getLinkHref(navCTA.href)}
                onClick={(e) => handleAnchorClick(e, navCTA.href)}
                className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center bg-[#e94560] text-white hover:bg-[#c73652] transition-colors duration-200"
              >
                {navCTA.label}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}