"use client";

import { motion } from "framer-motion";
import {
  Building2, ArrowRight, Users, BarChart3, Workflow,
  Code2, Clock, Zap, Shield, Phone, Mail
} from "lucide-react";
import Link from "next/link";
import { Logo } from "../components/Logo";

export default function KurumsalYazilim() {
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff5625]/10 border border-[#ff5625]/20 text-[#ff5625] text-xs font-bold uppercase tracking-widest mb-6">
            <Building2 className="w-3 h-3" /> Kurumsal Yazılım & KOBİ Çözümleri
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Excel&apos;den Kurtulun,<br />
            <span className="bg-gradient-to-r from-[#ffb5a0] to-[#ff5625] bg-clip-text text-transparent">
              İş Yükünüzü %70 Hafifletin
            </span>
          </h1>
          <p className="text-[#e7bdb2] text-lg max-w-2xl mb-10 leading-relaxed">
            Manuel süreçler, takım içi kopukluklar ve tekrar eden işler şirketinizin büyümesini engelliyor. Sizin iş yapış şeklinize özel, personeli yormayan sistemler kuruyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#contact" className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(255,86,37,0.4)]">
              Ücretsiz Analiz Al <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+905519565884" className="glass-card px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white hover:border-[#ff5625] transition-all">
              <Phone className="w-5 h-5 text-[#ffb5a0]" /> Hemen Ara
            </a>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ne Yapabiliriz?</h2>
        <p className="text-[#e7bdb2] mb-12">Şirketinizin ihtiyacına göre şekillenen, terzi işi çözümler.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Users, title: "Çalışan & Saha Takip Sistemi", desc: "Kim nerede, ne yapıyor? Saha ekibinizi anlık olarak takip edin. GPS tabanlı rota, mobil sipariş ve ziyaret raporları." },
            { icon: BarChart3, title: "Yönetici Dashboard'ları", desc: "Günlük ciro, hedefler, giderler. Şirketinizin nabzını tek bir grafikli ekrandan anlık olarak izleyin." },
            { icon: Workflow, title: "B2B & Bayi Portalı", desc: "WhatsApp'tan sipariş almak yerine bayilerinize özel şifreli panel. 7/24 kesintisiz sipariş ve cari hesap takibi." },
            { icon: Code2, title: "Sistem Entegrasyonları", desc: "Muhasebe programınız, e-ticaret siteniz ve kargo sisteminiz birbiriyle konuşmuyor mu? Her sistemi birbirine bağlıyoruz." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl group hover:border-[#ff5625] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#ff5625]/10 flex items-center justify-center mb-6 border border-[#ff5625]/20 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-[#ff5625]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
              <p className="text-[#e7bdb2] leading-relaxed">{desc}</p>
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
              { icon: Zap, title: "Hızlı Teslimat", desc: "Çoğu proje 3-6 hafta içinde teslim edilir. Sprint bazlı çalışıyoruz." },
              { icon: Shield, title: "Şeffaf Süreç", desc: "Her adımda bilgilendirilirsiniz. Sürpriz maliyet veya gecikme olmaz." },
              { icon: Clock, title: "Uzun Vadeli Destek", desc: "Teslim sonrası da yanınızdayız. Güncellemeler, iyileştirmeler dahil." },
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Projenizi birlikte değerlendirelim</h2>
          <p className="text-[#e7bdb2] mb-8">İlk analiz ve görüşme tamamen ücretsiz. Bütçenize ve ihtiyacınıza en uygun çözümü birlikte bulalım.</p>
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
