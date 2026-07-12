"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart, ArrowRight, CreditCard, Package, BarChart3,
  Truck, Star, Shield, Zap, Phone, Mail
} from "lucide-react";
import Link from "next/link";
import { Logo } from "../components/Logo";

export default function ETicaret() {
  return (
    <div className="min-h-screen bg-[#05080F] text-[#dbe2fd]">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-4 bg-[#0b1326]/90 backdrop-blur-xl border-b border-white/10">
        <Link href="/" className="flex items-center"><Logo sizeClassName="text-xl" /></Link>
        <Link href="/#contact" className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-5 py-2 rounded-lg font-bold text-sm transition-all">
          Görüşme Ayarla
        </Link>
      </header>

      <section className="pt-32 pb-20 px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffb5a0]/10 border border-[#ffb5a0]/20 text-[#ffb5a0] text-xs font-bold uppercase tracking-widest mb-6">
            <ShoppingCart className="w-3 h-3" /> E-Ticaret & Online Satış Sistemleri
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Kendi Mağazanız,<br />
            <span className="bg-gradient-to-r from-[#ffb5a0] to-[#ff5625] bg-clip-text text-transparent">
              Sıfır Komisyon
            </span>
          </h1>
          <p className="text-[#e7bdb2] text-lg max-w-2xl mb-10 leading-relaxed">
            Trendyol ve Hepsiburada&apos;ya komisyon ödemek yerine kendi e-ticaret altyapınızı kurun. Ürünlerinizi, fiyatlarınızı ve müşterilerinizi siz yönetin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#contact" className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(255,86,37,0.4)]">
              Mağaza Kuralım <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+905519565884" className="glass-card px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white hover:border-[#ff5625] transition-all">
              <Phone className="w-5 h-5 text-[#ffb5a0]" /> Hemen Ara
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">E-Ticaret Paketine Neler Dahil?</h2>
        <p className="text-[#e7bdb2] mb-12">Her şey dahil — mağaza açılışından satış sonrası yönetimine kadar.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: ShoppingCart, title: "Ürün & Kategori Yönetimi", desc: "Sınırsız ürün, varyant desteği (renk, beden), toplu ürün yükleme." },
            { icon: CreditCard, title: "Güvenli Ödeme Entegrasyonu", desc: "Kredi kartı, havale, kapıda ödeme. İyzico ve PayTR entegrasyonu." },
            { icon: Truck, title: "Kargo Entegrasyonu", desc: "Yurtiçi Kargo, MNG, Aras ile otomatik kargo takibi ve bildirim." },
            { icon: Package, title: "Stok & Sipariş Yönetimi", desc: "Anlık stok takibi, sipariş durumu, iade yönetimi hepsi tek panelden." },
            { icon: BarChart3, title: "Satış Raporları & Analitik", desc: "Hangi ürün çok satıyor, hangi saatte sipariş geliyor? Tüm veriniz elinizde." },
            { icon: Star, title: "Müşteri Yorum Sistemi", desc: "Ürün yorumları, müşteri puanlaması. Güven oluşturun, satışı artırın." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 rounded-2xl group hover:border-[#ff5625] transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[#ffb5a0]/10 flex items-center justify-center mb-4 border border-[#ffb5a0]/20 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-[#ffb5a0]" />
              </div>
              <h3 className="font-bold text-white mb-2">{title}</h3>
              <p className="text-[#e7bdb2] text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-[#0b1326]/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">Neden Kendi Mağazanız?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Komisyon Yok", desc: "Marketplace'lere %15-25 komisyon yerine kendi mağazanızdan %100 kâr." },
              { icon: Shield, title: "Müşterin Senin", desc: "Müşteri verileriniz sizin. Remarketing, sadakat programları tamamen kontrolünüzde." },
              { icon: BarChart3, title: "Marka Gücü", desc: "Kendi alan adınız, kendi tasarımınız. Marka kimliği güçleniyor." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#ff5625]/10 border border-[#ff5625]/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#ff5625]" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-[#e7bdb2] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Mağazanızı birlikte açalım</h2>
          <p className="text-[#e7bdb2] mb-8">İlk görüşme ve demo ücretsiz. Ne istediğinizi anlatın, size uygun çözümü sunalım.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact" className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
              Görüşme Ayarla <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="mailto:turunc.labs@gmail.com" className="glass-card px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white hover:border-[#ff5625] transition-all">
              <Mail className="w-5 h-5 text-[#ffb5a0]" /> Mail At
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 px-4 text-center">
        <p className="text-[#e7bdb2]/50 text-sm">
          © 2026 turunc.labs — <Link href="/" className="hover:text-[#ffb5a0] transition-colors">Ana Sayfaya Dön</Link>
        </p>
      </footer>
    </div>
  );
}
