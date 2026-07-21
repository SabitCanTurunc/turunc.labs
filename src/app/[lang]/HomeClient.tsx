"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Menu, ArrowRight, CheckCircle2, BarChart3, Store,
  Check, Building2, ArrowUpRight, Calendar, Mail, Phone, MapPin, X,
  Send, Loader2, Clock, Zap, Code2, Users, AtSign,
  Barcode, Workflow, Sparkles, Terminal, ChevronLeft, ChevronRight
} from "lucide-react";
import { Logo } from "../components/Logo";
import type { Dictionary } from "@/dictionaries";
import { rtlLocales } from "@/dictionaries";
import type { Locale } from "@/dictionaries";

// Stagger variants for hero text
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface HomeClientProps {
  dict: Dictionary;
  lang: Locale;
}

export default function HomeClient({ dict, lang }: HomeClientProps) {
  const router = useRouter();
  const isRtl = (rtlLocales as string[]).includes(lang);
  const [activeSection, setActiveSection] = useState("labs");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Portfolio Carousel state and ref
  const portfolioScrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollPortfolio = (direction: 'left' | 'right') => {
    if (portfolioScrollRef.current) {
      const { scrollLeft, clientWidth } = portfolioScrollRef.current;
      const cardWidth = clientWidth > 1024 ? (clientWidth + 32) / 3 : clientWidth > 768 ? (clientWidth + 32) / 2 : clientWidth + 32;
      portfolioScrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollUpdate = () => {
    if (portfolioScrollRef.current) {
      const { scrollLeft, clientWidth } = portfolioScrollRef.current;
      const cardWidth = clientWidth > 1024 ? (clientWidth + 32) / 3 : clientWidth > 768 ? (clientWidth + 32) / 2 : clientWidth + 32;
      const index = Math.min(4, Math.max(0, Math.round(scrollLeft / cardWidth)));
      setActiveSlide(index);
    }
  };

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState(dict.modal.defaultSubject);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Legal modal state
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalContent, setLegalContent] = useState<{ title: string; content: string }>({ title: "", content: "" });
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState("https://api.whatsapp.com/send?phone=905519565884");

  // Language switcher
  const switchLanguage = (targetLang: Locale) => {
    router.push(`/${targetLang}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["labs", "solutions", "portfolio", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ambient glow mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const glowElements = document.querySelectorAll('.glow-effect');
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      glowElements.forEach((glow) => {
        const el = glow as HTMLElement;
        const moveX = x * 40;
        const moveY = y * 40;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openModal = (subjectTitle = dict.modal.defaultSubject) => {
    setModalSubject(
      subjectTitle === dict.modalSubjects.consulting
        ? dict.modalSubjects.consulting
        : subjectTitle
    );
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openLegalModal = (type: "privacy" | "terms") => {
    setLegalContent({
      title: type === "privacy" ? dict.legal.privacyTitle : dict.legal.termsTitle,
      content: type === "privacy" ? dict.legal.privacyContent : dict.legal.termsContent,
    });
    setIsLegalModalOpen(true);
  };

  const closeLegalModal = () => {
    setIsLegalModalOpen(false);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") || "";
    const surname = formData.get("surname") || "";
    const phone = formData.get("phone") || "";
    const businessTypeRaw = formData.get("businessType") || dict.modal.unspecified;
    const needs = formData.get("needs") || dict.modal.unspecified;
    const subject = modalSubject || dict.modal.defaultSubject;

    const businessTypeMap: Record<string, string> = {
      esnaf: dict.modal.businessTypes.esnaf,
      kobi: dict.modal.businessTypes.kobi,
      kurumsal: dict.modal.businessTypes.kurumsal,
      girisim: dict.modal.businessTypes.girisim,
      Belirtilmedi: dict.modal.unspecified,
    };

    const businessLabel = businessTypeMap[businessTypeRaw.toString()] || businessTypeRaw.toString();

    const lines = [
      `*${dict.modal.whatsappHeader}*`,
      "",
      `*${dict.modal.whatsappSubject}* ${subject}`,
      `*${dict.modal.whatsappName}* ${name} ${surname}`,
      `*${dict.modal.whatsappPhone}* ${phone}`,
      `*${dict.modal.whatsappBusiness}* ${businessLabel}`,
      `*${dict.modal.whatsappNeeds}* ${needs}`
    ];

    const message = lines.join("\r\n");
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=905519565884&text=${encodedMessage}`;
    setLastWhatsappUrl(whatsappUrl);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(whatsappUrl, "_blank");
    }, 600);
  };

  // Nav items using dict
  const navItems = [
    { label: dict.nav.solutions, id: "labs" },
    { label: dict.nav.services, id: "solutions" },
    { label: dict.nav.portfolio, id: "portfolio" },
    { label: dict.nav.contact, id: "contact" },
  ];

  const mobileNavItems = [
    { label: dict.nav.solutions, id: "labs", accent: true },
    { label: dict.nav.services, id: "solutions", accent: false },
    { label: dict.nav.portfolio, id: "portfolio", accent: false },
    { label: dict.nav.contact, id: "contact", accent: false },
  ];

  const portfolioItems = [
    {
      title: dict.portfolio.items[0].title,
      tag: dict.portfolio.items[0].tag,
      desc: dict.portfolio.items[0].desc,
      img: "/atlas-ais-preview.png",
      badges: ["Next.js", "UI/UX", "Web App"],
      modal: "Atlas A.I.S.",
      url: "https://atlasais.org.tr/"
    },
    {
      title: dict.portfolio.items[1].title,
      tag: dict.portfolio.items[1].tag,
      desc: dict.portfolio.items[1].desc,
      img: "/vitem-preview.png",
      badges: ["Next.js", "Tailwind CSS", "SEO"],
      modal: "Vitem Mobilya",
      url: "https://vitem-snowy.vercel.app/en"
    },
    {
      title: dict.portfolio.items[2].title,
      tag: dict.portfolio.items[2].tag,
      desc: dict.portfolio.items[2].desc,
      img: "/kardelen-pvc-preview.png",
      badges: ["Next.js", "Corporate", "SEO"],
      modal: "Kardelen PVC",
      url: "https://kardelen-pvc.vercel.app/"
    },
  ];

  return (
    <>
      {/* TopNavBar */}
      <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-gutter py-4 backdrop-blur-xl border-b transition-all duration-300 ${isScrolled ? "bg-[#0b1326]/90 border-[#ff5625]/30 shadow-2xl" : "bg-surface-glass border-border-glass"}`}>
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo />
          </motion.div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`relative py-1.5 font-body-md text-body-md font-bold transition-colors group ${
                  isActive ? "text-[#ffb5a0]" : "text-[#e7bdb2] hover:text-white"
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#ffb5a0] rounded-full shadow-[0_0_12px_rgba(255,181,160,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ffb5a0]/50 rounded-full transition-all duration-300 group-hover:w-full" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Dropdown */}
          {(() => {
            const langOptions: { code: Locale; flag: string; label: string }[] = [
              { code: "tr", flag: "🇹🇷", label: "TR" },
              { code: "en", flag: "🇬🇧", label: "EN" },
              { code: "ar", flag: "🇸🇦", label: "AR" },
            ];
            const active = langOptions.find((o) => o.code === lang) ?? langOptions[0];
            return (
              <div className="hidden sm:block relative">
                <button
                  onClick={() => setIsLangDropdownOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-glass border border-border-glass rounded-lg text-sm font-bold text-[#e7bdb2] hover:text-white hover:border-[#ff5625]/50 transition-all duration-200"
                >
                  <span className="text-base leading-none">{active.flag}</span>
                  <span className="tracking-wider">{active.label}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsLangDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[120px] bg-[#0b1326]/95 backdrop-blur-xl border border-border-glass rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
                      >
                        {langOptions.map((o) => (
                          <button
                            key={o.code}
                            onClick={() => { setIsLangDropdownOpen(false); switchLanguage(o.code); }}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold transition-all duration-150 ${
                              lang === o.code
                                ? "bg-[#ff5625]/20 text-[#ff5625]"
                                : "text-[#e7bdb2] hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span className="text-base leading-none">{o.flag}</span>
                            <span className="tracking-wider">{o.label}</span>
                            {lang === o.code && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ff5625]" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            );
          })()}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#e7bdb2] hover:text-white p-2 rounded-lg glass-card focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[73px] left-0 w-full z-40 bg-[#0b1326]/95 backdrop-blur-2xl border-b border-border-glass md:hidden overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-1">
              {mobileNavItems.map(({ label, id, accent }) => (
                <button
                  key={id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      const el = document.getElementById(id);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 150);
                  }}
                  className={`text-left text-lg font-medium py-3 border-b border-border-glass transition-colors ${accent ? "text-[#ffb5a0]" : "text-[#e7bdb2] hover:text-white"}`}
                >
                  {label}
                </button>
              ))}

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 py-3 border-b border-border-glass">
                <span className="text-[#e7bdb2]/60 text-sm">Dil / Lang / لغة:</span>
                <div className="flex items-center gap-1 bg-surface-glass border border-border-glass rounded-lg p-1">
                  {([{ code: "tr" as Locale, flag: "🇹🇷" }, { code: "en" as Locale, flag: "🇬🇧" }, { code: "ar" as Locale, flag: "🇸🇦" }]).map((o) => (
                    <button
                      key={o.code}
                      onClick={() => { setIsMobileMenuOpen(false); switchLanguage(o.code); }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                        lang === o.code
                          ? "bg-[#ff5625] text-white shadow-[0_0_10px_rgba(255,86,37,0.4)]"
                          : "text-[#e7bdb2] hover:text-white"
                      }`}
                    >
                      <span className="text-sm leading-none">{o.flag}</span>
                      <span>{o.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setIsMobileMenuOpen(false); openModal(dict.modalSubjects.consulting); }}
                className="w-full glass-card py-3 rounded-lg font-bold text-white text-center mt-4"
              >
                {dict.mobileMenu.consulting}
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); openModal(dict.modal.defaultSubject); }}
                className="w-full bg-[#ff5625] text-white py-3 rounded-lg font-bold text-center shadow-lg shadow-[#ff5625]/30"
              >
                {dict.mobileMenu.meeting}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main id="labs" className="relative min-h-screen pt-24 md:pt-32 pb-16 md:pb-section-gap grid-bg overflow-hidden flex items-center">
        <div className="max-w-container-max mx-auto px-4 md:px-gutter grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffb5a0]/10 border border-[#ffb5a0]/20 w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-[#ffb5a0] pulse"></span>
              <span className="text-label-sm font-label-sm text-[#ffb5a0] uppercase tracking-widest">{dict.hero.badge}</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="font-headline-display text-headline-lg-mobile md:text-headline-display text-white mb-6">
              {dict.hero.headline1} <br/>
              <span className="gradient-text">{dict.hero.headline2}</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="font-body-lg text-body-lg text-[#e7bdb2] max-w-xl mb-8 md:mb-12">
              {dict.hero.description} <span className="text-[#ffb5a0] font-bold">{dict.hero.descriptionHighlight}</span>{dict.hero.descriptionEnd}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openModal(dict.modal.defaultSubject)}
                className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(255,86,37,0.4)]"
              >
                {dict.hero.cta1} <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openModal(dict.modalSubjects.consulting)}
                className="glass-card px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white hover:border-[#ff5625]"
              >
                {dict.hero.cta2}
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-8 mt-12">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#4edea3]" />
                <span className="text-label-sm font-label-sm text-[#e7bdb2]">{dict.hero.badge1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#4edea3]" />
                <span className="text-label-sm font-label-sm text-[#e7bdb2]">{dict.hero.badge2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#4edea3]" />
                <span className="text-label-sm font-label-sm text-[#e7bdb2]">{dict.hero.badge3}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Terminal Card — hidden on small screens */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative hidden md:block"
          >
            <div className="glass-card p-4 rounded-2xl relative z-20 overflow-hidden shadow-2xl border-[#ffb5a0]/20">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <span className="text-[10px] text-[#e7bdb2] font-mono flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#ffb5a0]" /> turunc.terminal -- bash
                </span>
              </div>

              <div className="bg-[#05080F] rounded-xl p-6 aspect-video flex flex-col justify-between relative overflow-hidden border border-border-glass">
                <div className="font-mono text-xs text-[#4edea3]/70 space-y-1.5 opacity-80">
                  <p className="flex items-center gap-2">$ <span className="text-white">turunc-labs init --optimize-business</span></p>
                  <p className="text-[#e7bdb2]">&gt; Analyzing manual workflows... [OK]</p>
                  <p className="text-[#e7bdb2]">&gt; Deploying custom automation agents... [OK]</p>
                  <p className="text-[#ffb5a0] animate-pulse">&gt; System efficiency boosted by +70% 🚀</p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="glass-card bg-[#171f33]/90 p-6 rounded-xl border-[#ffb5a0]/40 flex flex-col items-center gap-2 shadow-2xl backdrop-blur-xl"
                  >
                    <span className="font-headline-lg text-[#ffb5a0] text-headline-lg">+50</span>
                    <span className="text-label-sm font-label-sm text-[#e7bdb2] uppercase tracking-wider">{dict.hero.terminalStat}</span>
                  </motion.div>
                </div>

                <div className="flex justify-between items-end text-[10px] font-mono text-[#e7bdb2]/60 pt-4 border-t border-border-glass">
                  <span>STATUS: ACTIVE_MONITORING</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping"></span> ONLINE</span>
                </div>
              </div>
            </div>

            <div className="glow-effect absolute -top-20 -right-20 w-80 h-80 bg-[#ffb5a0]/20 rounded-full blur-[100px] pointer-events-none transition-transform duration-300 ease-out"></div>
            <div className="glow-effect absolute -bottom-20 -left-20 w-80 h-80 bg-[#ff5625]/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-300 ease-out"></div>
          </motion.div>
        </div>
      </main>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 md:py-section-gap relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 md:px-gutter">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#ffb5a0] font-mono-label text-label-sm tracking-[0.2em] uppercase mb-4 block">{dict.solutions.label}</span>
            <h2 className="font-headline-lg text-headline-lg text-white mb-4">{dict.solutions.heading}</h2>
            <p className="text-[#e7bdb2] max-w-2xl mx-auto font-body-md text-body-md">
              {dict.solutions.subheading}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Esnaf Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 md:p-10 rounded-2xl group flex flex-col justify-between h-full hover:border-[#ffb5a0] transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ffb5a0]/10 flex items-center justify-center mb-8 border border-[#ffb5a0]/20 group-hover:scale-110 transition-transform">
                  <Store className="w-6 h-6 text-[#ffb5a0]" />
                </div>
                <h3 className="font-headline-md text-headline-md text-white mb-4">{dict.solutions.esnaf.title}</h3>
                <p className="text-[#e7bdb2] mb-8 font-body-md text-body-md">
                  {dict.solutions.esnaf.description}
                </p>
                <ul className="space-y-4 mb-12">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#ffb5a0] flex-shrink-0" />
                    <span className="text-[#e7bdb2] font-body-md">{dict.solutions.esnaf.feature1}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#ffb5a0] flex-shrink-0" />
                    <span className="text-[#e7bdb2] font-body-md">{dict.solutions.esnaf.feature2}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#ffb5a0] flex-shrink-0" />
                    <span className="text-[#e7bdb2] font-body-md">{dict.solutions.esnaf.feature3}</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openModal(dict.modalSubjects.esnafPaketi)}
                className="text-[#ffb5a0] font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-wider text-label-sm w-fit"
              >
                {dict.solutions.esnaf.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Corporate Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 md:p-10 rounded-2xl group flex flex-col justify-between h-full hover:border-[#ff5625] transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#ff5625]/10 flex items-center justify-center mb-8 border border-[#ff5625]/20 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-[#ff5625]" />
                </div>
                <h3 className="font-headline-md text-headline-md text-white mb-4">{dict.solutions.corporate.title}</h3>
                <p className="text-[#e7bdb2] mb-8 font-body-md text-body-md">
                  {dict.solutions.corporate.description}
                </p>
                <ul className="space-y-4 mb-12">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#ffb5a0] flex-shrink-0" />
                    <span className="text-[#e7bdb2] font-body-md">{dict.solutions.corporate.feature1}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#ffb5a0] flex-shrink-0" />
                    <span className="text-[#e7bdb2] font-body-md">{dict.solutions.corporate.feature2}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#ffb5a0] flex-shrink-0" />
                    <span className="text-[#e7bdb2] font-body-md">{dict.solutions.corporate.feature3}</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openModal(dict.modalSubjects.kurumsalYazilim)}
                className="text-[#ff5625] font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-wider text-label-sm w-fit"
              >
                {dict.solutions.corporate.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-section-gap bg-[#131b2e]/30 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 md:px-gutter grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="glass-card p-2 rounded-2xl overflow-hidden shadow-2xl rotate-1 group hover:rotate-0 transition-transform duration-500 border-[#ffb5a0]/20">
              <img
                className="w-full h-auto rounded-xl object-cover"
                alt={dict.features.imgAlt}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyS3BxDqhIydEvjXqIxoVWwKX2q64d7zW2U4kVDvyiUkbGxzMGvESB9HM6YSGNRiXOyUg_svtoKoRWc2ZyTAItYzt7QA4ZLO2CKFrYeljLdCJxheeyGstB1inxkI-4dppYHZDEHNOODwkg4djfbbYfQzC4WmhzyNT-Bl1olXN-lU-f3SprUrHQhqXjQdkFOxp0kUApqcOFVB9f4TImNtA18ZGFFvNRp4rCvXPoS6ljzXw1naHivcQElw"
              />
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass-card p-6 rounded-xl border-[#ffb5a0]/40 hidden md:block shadow-2xl backdrop-blur-xl bg-[#0b1326]/90"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5625] pulse"></span>
                <span className="font-bold text-white text-headline-md">%70</span>
              </div>
              <p className="text-label-sm font-label-sm text-[#e7bdb2] uppercase">{dict.features.timeSaving}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-[#ffb5a0] font-mono-label text-label-sm tracking-[0.2em] uppercase mb-4 block">{dict.features.label}</span>
            <h2 className="font-headline-lg text-headline-lg text-white mb-6">{dict.features.heading}</h2>
            <p className="font-body-lg text-body-lg text-[#e7bdb2] mb-12">
              {dict.features.description}
            </p>

            <div className="grid gap-8">
              <div className="flex gap-6 group">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-surface-glass border border-border-glass flex items-center justify-center group-hover:border-[#ffb5a0] transition-colors">
                  <Clock className="w-6 h-6 text-[#ffb5a0]" />
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-white mb-2">{dict.features.item1Title}</h4>
                  <p className="text-[#e7bdb2] font-body-md">{dict.features.item1Desc}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-surface-glass border border-border-glass flex items-center justify-center group-hover:border-[#ffb5a0] transition-colors">
                  <Users className="w-6 h-6 text-[#ffb5a0]" />
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-white mb-2">{dict.features.item2Title}</h4>
                  <p className="text-[#e7bdb2] font-body-md">{dict.features.item2Desc}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-surface-glass border border-border-glass flex items-center justify-center group-hover:border-[#ffb5a0] transition-colors">
                  <Code2 className="w-6 h-6 text-[#ffb5a0]" />
                </div>
                <div>
                  <h4 className="font-headline-md text-headline-md text-white mb-2">{dict.features.item3Title}</h4>
                  <p className="text-[#e7bdb2] font-body-md">{dict.features.item3Desc}</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openModal(dict.modalSubjects.otomasyon)}
              className="mt-8 md:mt-10 bg-[#ff5625] hover:bg-[#b12d00] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,86,37,0.3)]"
            >
              {dict.features.cta} <Zap className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Custom Solutions Bento Grid */}
      <section className="py-16 md:py-section-gap relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 md:px-gutter">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#ffb5a0] font-mono-label text-label-sm tracking-[0.2em] uppercase mb-4 block">{dict.bento.label}</span>
            <h2 className="font-headline-lg text-headline-lg text-white mb-4">{dict.bento.heading}</h2>
            <p className="text-[#e7bdb2] max-w-2xl mx-auto font-body-md text-body-md">
              {dict.bento.subheading}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4">
            {/* Field Sales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ border: "1px solid #ffb5a0" }}
              className="md:col-span-6 lg:col-span-7 glass-card p-5 md:p-8 rounded-2xl flex flex-col justify-between overflow-hidden relative group"
            >
              <div>
                <MapPin className="w-8 h-8 text-[#ffb5a0] mb-6" />
                <h4 className="font-headline-md text-headline-md text-white mb-4">{dict.bento.fieldSales.title}</h4>
                <p className="text-[#e7bdb2] font-body-md max-w-md">{dict.bento.fieldSales.desc}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 relative z-10">
                <div className="flex items-center gap-2 bg-surface-glass border border-border-glass rounded-lg p-3 w-fit backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#ff5625] pulse"></span>
                  <span className="text-label-sm font-label-sm text-[#ffb5a0]">{dict.bento.fieldSales.badge}</span>
                </div>
                <ul className="flex gap-4">
                  <li className="text-[11px] font-mono text-[#e7bdb2] uppercase">{dict.bento.fieldSales.tag1}</li>
                  <li className="text-[11px] font-mono text-[#e7bdb2] uppercase">{dict.bento.fieldSales.tag2}</li>
                </ul>
                <button
                  onClick={() => openModal(dict.modalSubjects.sahaSatis)}
                  className="mt-2 text-[#ffb5a0] text-label-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-4 transition-all w-fit"
                >
                  {dict.bento.fieldSales.cta} <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <MapPin className="w-64 h-64 text-[#ffb5a0]" />
              </div>
            </motion.div>

            {/* Smart Warehouse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ border: "1px solid #ffb5a0" }}
              className="md:col-span-6 lg:col-span-5 glass-card p-5 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-surface-glass border border-border-glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Barcode className="w-8 h-8 text-[#ffb5a0]" />
              </div>
              <h4 className="font-headline-md text-headline-md text-white mb-4">{dict.bento.warehouse.title}</h4>
              <p className="text-[#e7bdb2] font-body-md mb-6">{dict.bento.warehouse.desc}</p>
              <div className="w-full bg-[#05080F] border border-border-glass rounded-lg p-4 font-mono text-[11px] text-[#ffb5a0] flex items-center justify-between shadow-inner">
                <span>{dict.bento.warehouse.scanning} [88231]</span>
                <span className="w-4 h-4 border-2 border-[#ffb5a0] border-t-transparent rounded-full animate-spin"></span>
              </div>
              <button
                onClick={() => openModal(dict.modalSubjects.akilliDepo)}
                className="mt-5 text-[#ffb5a0] text-label-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-4 transition-all"
              >
                {dict.bento.warehouse.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Executive Dashboards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ border: "1px solid #ffb5a0" }}
              className="md:col-span-6 lg:col-span-4 glass-card p-5 md:p-8 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                <BarChart3 className="w-8 h-8 text-[#ffb5a0] mb-6" />
                <h4 className="font-headline-md text-headline-md text-white mb-4">{dict.bento.dashboard.title}</h4>
                <p className="text-[#e7bdb2] font-body-md mb-8">{dict.bento.dashboard.desc}</p>
              </div>
              <div className="flex items-end gap-2 h-20 pt-2">
                <motion.div animate={{ height: ["40%", "60%", "40%"] }} transition={{ duration: 3, repeat: Infinity }} className="w-full bg-[#ffb5a0]/20 rounded-t"></motion.div>
                <motion.div animate={{ height: ["60%", "80%", "60%"] }} transition={{ duration: 3, repeat: Infinity, delay: 0.3 }} className="w-full bg-[#ffb5a0]/40 rounded-t"></motion.div>
                <motion.div animate={{ height: ["90%", "70%", "90%"] }} transition={{ duration: 3, repeat: Infinity, delay: 0.6 }} className="w-full bg-[#ffb5a0]/60 rounded-t"></motion.div>
                <motion.div animate={{ height: ["50%", "90%", "50%"] }} transition={{ duration: 3, repeat: Infinity, delay: 0.9 }} className="w-full bg-[#ffb5a0]/40 rounded-t"></motion.div>
                <motion.div animate={{ height: ["75%", "100%", "75%"] }} transition={{ duration: 3, repeat: Infinity, delay: 1.2 }} className="w-full bg-[#ffb5a0] rounded-t"></motion.div>
              </div>
              <button
                onClick={() => openModal(dict.modalSubjects.yoneticiPaneli)}
                className="mt-4 text-[#ffb5a0] text-label-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-4 transition-all w-fit"
              >
                {dict.bento.dashboard.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* B2B Portal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ border: "1px solid #ff5625" }}
              className="md:col-span-6 lg:col-span-8 glass-card p-5 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:gap-8 items-center group"
            >
              <div className="flex-1">
                <Workflow className="w-8 h-8 text-[#ffb5a0] mb-6" />
                <h4 className="font-headline-md text-headline-md text-white mb-4">{dict.bento.b2b.title}</h4>
                <p className="text-[#e7bdb2] font-body-md mb-6">{dict.bento.b2b.desc}</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-label-sm font-label-sm text-[#ffb5a0]">
                    <Check className="w-4 h-4" /> {dict.bento.b2b.feature1}
                  </li>
                  <li className="flex items-center gap-2 text-label-sm font-label-sm text-[#ffb5a0]">
                    <Check className="w-4 h-4" /> {dict.bento.b2b.feature2}
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-64 glass-card bg-[#222a3e]/50 p-6 rounded-xl border-border-glass group-hover:scale-105 transition-transform duration-500 shadow-inner">
                <div className="w-full h-8 bg-surface-glass rounded mb-4 flex items-center px-3 text-[11px] font-mono text-[#e7bdb2]">B2B PORTAL v2.0</div>
                <div className="space-y-3">
                  <div className="w-full h-2 bg-surface-glass rounded"></div>
                  <div className="w-3/4 h-2 bg-surface-glass rounded"></div>
                  <button
                    onClick={() => openModal(dict.modalSubjects.b2bPortal)}
                    className="w-full py-2 bg-[#ff5625] hover:bg-[#b12d00] text-white text-[11px] font-bold rounded uppercase mt-4 transition-colors shadow-[0_0_15px_rgba(255,86,37,0.3)]"
                  >
                    {dict.bento.b2b.btnLabel}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-section-gap relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 md:px-gutter">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[#ffb5a0] font-mono-label text-label-sm tracking-[0.2em] uppercase mb-4 block">{dict.portfolio.label}</span>
              <h2 className="font-headline-lg text-headline-lg text-white">{dict.portfolio.heading}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollPortfolio(isRtl ? 'right' : 'left')}
                className="w-11 h-11 rounded-xl glass-card border border-border-glass flex items-center justify-center text-white hover:border-[#ff5625] hover:bg-[#ff5625]/20 transition-all shadow-lg cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-[#ffb5a0]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollPortfolio(isRtl ? 'left' : 'right')}
                className="w-11 h-11 rounded-xl glass-card border border-border-glass flex items-center justify-center text-white hover:border-[#ff5625] hover:bg-[#ff5625]/20 transition-all shadow-lg cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-[#ffb5a0]" />
              </motion.button>
            </div>

          </div>

          <div
            ref={portfolioScrollRef}
            onScroll={handleScrollUpdate}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none select-none cursor-grab active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                onClick={() => item.url ? window.open(item.url, '_blank') : openModal(item.modal)}
                className="snap-start shrink-0 w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.3333%-21.3333px)] group flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 glass-card p-1 border-border-glass relative">
                  <img
                    className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                    alt={item.title}
                    src={item.img}
                  />
                  {item.url && (
                    <div className="absolute top-3 right-3 bg-[#0b1326]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#ffb5a0]/40 flex items-center gap-1.5 text-[10px] font-bold text-[#ffb5a0] shadow-lg opacity-90 group-hover:opacity-100 transition-all group-hover:bg-[#ff5625] group-hover:text-white group-hover:border-[#ff5625]">
                      {dict.portfolio.liveTag} <ArrowUpRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#ffb5a0] font-mono text-[11px] tracking-widest uppercase">{item.tag}</span>
                  <div className="h-px bg-[#ffb5a0]/20 flex-1"></div>
                </div>
                <h4 className="font-headline-md text-headline-md text-white mb-2 group-hover:text-[#ffb5a0] transition-colors flex items-center gap-1.5">
                  {item.title}
                  {item.url && <ArrowUpRight className="w-4 h-4 text-[#ffb5a0] inline-block shrink-0 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                </h4>
                <p className="text-[#e7bdb2] font-body-md mb-4">{item.desc}</p>
                <div className="flex gap-2 items-center mt-auto justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {item.badges.map((badge, bi) => (
                      <span key={bi} className="px-3 py-1 rounded bg-surface-glass border border-border-glass text-[10px] font-bold text-[#e7bdb2] uppercase">{badge}</span>
                    ))}
                  </div>
                  <span className="text-[#ffb5a0] text-label-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    {item.url ? dict.portfolio.visitSite : dict.portfolio.detail} {item.url ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowRight className="w-3 h-3" />}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Progress Indicators */}
          <div className="flex justify-center items-center gap-2.5 mt-6">
            {portfolioItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (portfolioScrollRef.current) {
                    const { clientWidth } = portfolioScrollRef.current;
                    const cardWidth = clientWidth > 1024 ? (clientWidth + 32) / 3 : clientWidth > 768 ? (clientWidth + 32) / 2 : clientWidth + 32;
                    portfolioScrollRef.current.scrollTo({
                      left: idx * cardWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-8 bg-[#ff5625] shadow-[0_0_10px_rgba(255,86,37,0.5)]' : 'w-2 bg-[#ffb5a0]/20 hover:bg-[#ffb5a0]/40'}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-section-gap relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 md:px-gutter">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card bg-[#ff5625]/10 p-8 sm:p-12 md:p-20 rounded-[24px] md:rounded-[32px] text-center relative overflow-hidden border-[#ffb5a0]/30 shadow-2xl"
          >
            <div className="relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-white mb-6 md:mb-8">
                {dict.cta.heading1} <br className="hidden md:block"/> <span className="gradient-text">{dict.cta.heading2}</span>{dict.cta.heading3}
              </h2>
              <p className="font-body-md text-body-md md:font-body-lg md:text-body-lg text-[#e7bdb2] max-w-2xl mx-auto mb-8 md:mb-12">
                {dict.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(dict.modal.defaultSubject)}
                  className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,86,37,0.5)]"
                >
                  <Calendar className="w-5 h-5" /> {dict.cta.btn1}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(dict.modalSubjects.consulting)}
                  className="glass-card px-8 py-4 rounded-lg font-bold text-white hover:border-[#ff5625] transition-all"
                >
                  {dict.cta.btn2}
                </motion.button>
              </div>
            </div>

            <div className="glow-effect absolute -top-24 -right-24 w-96 h-96 bg-[#ffb5a0]/20 rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out"></div>
            <div className="glow-effect absolute -bottom-24 -left-24 w-96 h-96 bg-[#ff5625]/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out"></div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="w-full bg-[#060d20] border-t border-border-glass overflow-hidden relative">
        <div className="max-w-container-max mx-auto px-4 md:px-gutter py-16">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="md:max-w-xs">
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-[#e7bdb2] text-body-md font-body-md leading-relaxed mb-6">
                {dict.footer.description}
              </p>
              <div className="flex gap-3">
                <a
                  href="mailto:turunc.labs@gmail.com"
                  className="text-[#e7bdb2] hover:text-[#ffb5a0] transition-all p-2 rounded-lg glass-card"
                  aria-label="Email"
                ><AtSign className="w-5 h-5" /></a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">{dict.footer.servicesTitle}</h4>
                <ul className="space-y-3">
                  <li><a className="text-[#e7bdb2] hover:text-[#ffb5a0] transition-colors text-sm" href="#" onClick={(e) => { e.preventDefault(); openModal(dict.modalSubjects.esnafPaketi); }}>{dict.footer.links.esnaf}</a></li>
                  <li><a className="text-[#e7bdb2] hover:text-[#ffb5a0] transition-colors text-sm" href="#" onClick={(e) => { e.preventDefault(); openModal(dict.modalSubjects.kurumsalYazilim); }}>{dict.footer.links.corporate}</a></li>
                  <li><a className="text-[#e7bdb2] hover:text-[#ffb5a0] transition-colors text-sm" href="#" onClick={(e) => { e.preventDefault(); openModal(dict.modalSubjects.eTicaret); }}>{dict.footer.links.ecommerce}</a></li>
                  <li><a className="text-[#e7bdb2] hover:text-[#ffb5a0] transition-colors text-sm" href="#" onClick={(e) => { e.preventDefault(); openModal(dict.modalSubjects.mobilUygulama); }}>{dict.footer.links.mobile}</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">{dict.footer.contactTitle}</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-[#e7bdb2] text-sm">
                    <Mail className="w-4 h-4 text-[#ffb5a0] flex-shrink-0" />
                    <a href="mailto:turunc.labs@gmail.com" className="hover:text-white transition-colors">turunc.labs@gmail.com</a>
                  </li>
                  <li className="flex items-center gap-2 text-[#e7bdb2] text-sm">
                    <Phone className="w-4 h-4 text-[#ffb5a0] flex-shrink-0" />
                    <a href="tel:+905519565884" className="hover:text-white transition-colors">0 (551) 956 58 84</a>
                  </li>
                  <li className="flex items-center gap-2 text-[#e7bdb2] text-sm">
                    <MapPin className="w-4 h-4 text-[#ffb5a0] flex-shrink-0" />
                    <span>Defne / Hatay</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border-glass flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-[#e7bdb2]/60 text-sm">
              {dict.footer.copyright}
            </span>
            <div className="flex gap-6">
              <button
                onClick={() => openLegalModal('privacy')}
                className="text-[#e7bdb2]/60 hover:text-[#ffb5a0] transition-all text-sm text-left"
              >{dict.footer.privacy}</button>
              <button
                onClick={() => openLegalModal('terms')}
                className="text-[#e7bdb2]/60 hover:text-[#ffb5a0] transition-all text-sm text-left"
              >{dict.footer.terms}</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#05080F]/80 backdrop-blur-md"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative glass-card bg-[#171f33]/95 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col z-10 border border-[#ffb5a0]/40"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-[#e7bdb2] hover:text-white glass-card rounded-full p-2 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="bg-[#222a3e]/80 px-6 py-8 border-b border-border-glass text-center">
                <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl text-[#ffb5a0] border border-[#ffb5a0]/30">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white font-headline-md" id="modal-title">{modalSubject} {dict.modal.title}</h3>
                <p className="text-[#e7bdb2] text-sm mt-2 font-body-md">{dict.modal.subtitle}</p>
              </div>

              <div className="p-6">
                {!isSuccess ? (
                  <form onSubmit={submitForm} className="space-y-4 font-body-md">
                    <input type="hidden" name="subject" value={modalSubject} />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#e7bdb2] mb-1">{dict.modal.firstName}</label>
                        <input type="text" name="name" required className="w-full px-4 py-2.5 bg-[#05080F] border border-border-glass rounded-lg text-white focus:border-[#ffb5a0] focus:ring-1 focus:ring-[#ffb5a0] outline-none transition-all placeholder:text-[#e7bdb2]/40" placeholder="Ahmet" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#e7bdb2] mb-1">{dict.modal.lastName}</label>
                        <input type="text" name="surname" required className="w-full px-4 py-2.5 bg-[#05080F] border border-border-glass rounded-lg text-white focus:border-[#ffb5a0] focus:ring-1 focus:ring-[#ffb5a0] outline-none transition-all placeholder:text-[#e7bdb2]/40" placeholder="Yılmaz" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#e7bdb2] mb-1">{dict.modal.phone}</label>
                      <input type="tel" name="phone" required className="w-full px-4 py-2.5 bg-[#05080F] border border-border-glass rounded-lg text-white focus:border-[#ffb5a0] focus:ring-1 focus:ring-[#ffb5a0] outline-none transition-all placeholder:text-[#e7bdb2]/40" placeholder="05XX XXX XX XX" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#e7bdb2] mb-1">{dict.modal.businessType}</label>
                      <select name="businessType" className="w-full px-4 py-2.5 bg-[#05080F] border border-border-glass rounded-lg text-white focus:border-[#ffb5a0] focus:ring-1 focus:ring-[#ffb5a0] outline-none transition-all" defaultValue="">
                        <option value="" disabled className="bg-[#0b1326] text-[#e7bdb2]/60">{dict.modal.businessTypePlaceholder}</option>
                        <option value="esnaf" className="bg-[#0b1326] text-white">{dict.modal.businessTypes.esnaf}</option>
                        <option value="kobi" className="bg-[#0b1326] text-white">{dict.modal.businessTypes.kobi}</option>
                        <option value="kurumsal" className="bg-[#0b1326] text-white">{dict.modal.businessTypes.kurumsal}</option>
                        <option value="girisim" className="bg-[#0b1326] text-white">{dict.modal.businessTypes.girisim}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#e7bdb2] mb-1">{dict.modal.needs}</label>
                      <textarea name="needs" rows={3} className="w-full px-4 py-2.5 bg-[#05080F] border border-border-glass rounded-lg text-white focus:border-[#ffb5a0] focus:ring-1 focus:ring-[#ffb5a0] outline-none transition-all placeholder:text-[#e7bdb2]/40 resize-none" placeholder={dict.modal.needsPlaceholder}></textarea>
                    </div>

                    <motion.button
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-[#ff5625] hover:bg-[#b12d00] text-white font-bold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,86,37,0.4)] transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> {dict.modal.submitting}</>
                      ) : (
                        <>{dict.modal.submit} <Send className="w-4 h-4" /></>
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 font-body-md"
                  >
                    <div className="w-16 h-16 bg-[#25D366]/20 border border-[#25D366]/40 rounded-full flex items-center justify-center mx-auto mb-4 text-[#25D366] shadow-[0_0_25px_rgba(37,211,102,0.3)]">
                      <Send className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 font-headline-md">{dict.modal.successTitle}</h4>
                    <p className="text-[#e7bdb2] mb-6 max-w-sm mx-auto">{dict.modal.successDesc}</p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={lastWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#1ebd5b] text-white font-bold py-2.5 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30"
                      >
                        {dict.modal.openWhatsApp} <Send className="w-4 h-4" />
                      </a>
                      <button
                        onClick={closeModal}
                        className="glass-card hover:border-[#4edea3] text-white font-medium py-2.5 px-6 rounded-lg transition-all"
                      >
                        {dict.modal.close}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Legal Modal (Privacy Policy / Terms of Service) */}
      <AnimatePresence>
        {isLegalModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#05080F]/80 backdrop-blur-md"
              onClick={closeLegalModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative glass-card bg-[#171f33]/95 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col z-10 border border-[#ffb5a0]/40"
              role="dialog"
              aria-modal="true"
              aria-labelledby="legal-modal-title"
            >
              <button
                onClick={closeLegalModal}
                className="absolute top-4 right-4 text-[#e7bdb2] hover:text-white glass-card rounded-full p-2 transition-colors z-10"
                aria-label={dict.modal.close}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="bg-[#222a3e]/80 px-6 py-6 border-b border-border-glass">
                <h3 className="text-xl font-bold text-white font-headline-md" id="legal-modal-title">{legalContent.title}</h3>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="text-[#e7bdb2] font-body-md text-body-md leading-relaxed whitespace-pre-line">
                  {legalContent.content}
                </div>
              </div>

              <div className="p-4 border-t border-border-glass flex justify-end">
                <button
                  onClick={closeLegalModal}
                  className="glass-card hover:border-[#ff5625] text-white font-medium py-2 px-6 rounded-lg transition-all"
                >
                  {dict.modal.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
