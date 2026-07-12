"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import {
  Store, CheckCircle2, ArrowRight, MapPin, ShoppingCart,
  QrCode, Star, Phone, Mail, Globe, Clock, Zap, Shield
} from "lucide-react";
import Link from "next/link";
import { Logo } from "../components/Logo";

export default function EsnafPaketi() {
  return (
    <div className="min-h-screen bg-[#05080F] text-[#dbe2fd]">
      {/* Nav */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-4 bg-[#0b1326]/90 backdrop-blur-xl border-b border-white/10">
        <Link href="/" className="flex items-center"><Logo sizeClassName="text-xl" /></Link>
        <Link
          href="/#contact"
          className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-5 py-2 rounded-lg font-bold text-sm transition-all"
        >
          Görüşme Ayarla
        </Link>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffb5a0]/10 border border-[#ffb5a0]/20 text-[#ffb5a0] text-xs font-bold uppercase tracking-widest mb-6">
            <Store className="w-3 h-3" /> Esnaf & Küçük İşletme Paketi
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Dükkanınızı Dijitale Taşıyın,<br />
            <span className="bg-gradient-to-r from-[#ffb5a0] to-[#ff5625] bg-clip-text text-transparent">
              Yeni Müşteriler Kazanın
            </span>
          </h1>
          <p className="text-[#e7bdb2] text-lg max-w-2xl mb-10 leading-relaxed">
            Google&apos;da bulunmak istiyorsunuz ama nereden başlayacağınızı bilmiyorsunuz. İnternette yalnız değilsiniz. Sizi adım adım dijital dünyaya taşıyor, müşteri kitlenizi genişletiyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#contact"
              className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(255,86,37,0.4)]"
            >
              Ücretsiz Görüşme Al <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+905519565884"
              className="glass-card px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white hover:border-[#ff5625] transition-all"
            >
              <Phone className="w-5 h-5 text-[#ffb5a0]" /> Hemen Ara
            </a>
          </div>
        </motion.div>
      </section>

      {/* What's included */}
      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Pakete Neler Dahil?</h2>
        <p className="text-[#e7bdb2] mb-12">Tek seferlik kurulum, sonrasında bakımı bize bırakın.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Globe, title: "Profesyonel Web Sitesi", desc: "İşletmenizi en iyi şekilde tanıtan, mobil uyumlu, hızlı bir web sitesi." },
            { icon: MapPin, title: "Google Haritalar & SEO", desc: "\"Yakınımda berber\" gibi aramalarda ilk sıralarda çıkmanızı sağlıyoruz." },
            { icon: ShoppingCart, title: "Online Sipariş Sistemi", desc: "Komisyon ödemeden kendi sisteminizden sipariş alın." },
            { icon: QrCode, title: "QR Menü / Ürün Kataloğu", desc: "Masaya QR kod, müşteri telefonuna direkt menü." },
            { icon: Clock, title: "Randevu Yönetimi", desc: "Telefonda randevu almakla zaman kaybetmeyin, sistem yönetsin." },
            { icon: Star, title: "Yorum & Değerlendirme Yönetimi", desc: "Google yorumlarınızı takip edin, itibarınızı koruyun." },
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

      {/* Why us */}
      <section className="py-16 px-4 md:px-6 bg-[#0b1326]/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">Neden turunc.labs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Hızlı Kurulum", desc: "Projeniz ortalama 7-14 gün içinde yayına giriyor." },
              { icon: Shield, title: "Şeffaf Fiyat", desc: "Gizli maliyet yok. Ne ödeyeceğinizi önceden bilirsiniz." },
              { icon: Phone, title: "7/24 Destek", desc: "Bir sorun çıktığında yanınızdayız. Hafta sonu da." },
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

      {/* CTA */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            İlk adımı bugün atın — görüşme ücretsiz!
          </h2>
          <p className="text-[#e7bdb2] mb-8">Size özel bir yol haritası çıkaralım. Hiçbir taahhüt yok.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
            >
              Görüşme Ayarla <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="mailto:turunc.labs@gmail.com"
              className="glass-card px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white hover:border-[#ff5625] transition-all"
            >
              <Mail className="w-5 h-5 text-[#ffb5a0]" /> Mail At
            </a>
          </div>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="border-t border-white/10 py-8 px-4 text-center">
        <p className="text-[#e7bdb2]/50 text-sm">
          © 2026 turunc.labs — <Link href="/" className="hover:text-[#ffb5a0] transition-colors">Ana Sayfaya Dön</Link>
        </p>
      </footer>
    </div>
  );
}
