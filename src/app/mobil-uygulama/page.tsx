"use client";

import { motion } from "framer-motion";
import {
  Smartphone, ArrowRight, Calendar, MapPin, Bell,
  BarChart3, Shield, Zap, Star, Phone, Mail
} from "lucide-react";
import Link from "next/link";
import { Logo } from "../components/Logo";

export default function MobilUygulama() {
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
            <Smartphone className="w-3 h-3" /> Mobil Uygulama — iOS & Android
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            İşiniz Artık<br />
            <span className="bg-gradient-to-r from-[#ffb5a0] to-[#ff5625] bg-clip-text text-transparent">
              Müşterilerin Cebinde
            </span>
          </h1>
          <p className="text-[#e7bdb2] text-lg max-w-2xl mb-10 leading-relaxed">
            Randevu sisteminiz, sipariş takibiniz ya da çalışan uygulamanız — her ikisi için de (iOS & Android) hızlı, modern ve kullanımı kolay uygulamalar geliştiriyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/#contact" className="bg-[#ff5625] hover:bg-[#b12d00] text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(255,86,37,0.4)]">
              Projeyi Anlat <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+905519565884" className="glass-card px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 text-white hover:border-[#ff5625] transition-all">
              <Phone className="w-5 h-5 text-[#ffb5a0]" /> Hemen Ara
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ne Tür Uygulamalar Yapıyoruz?</h2>
        <p className="text-[#e7bdb2] mb-12">Sektörden bağımsız, ihtiyacınıza özel çözümler.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Calendar, title: "Randevu & Rezervasyon", desc: "Berber, güzellik salonu, klinik, spor salonu için müşteri randevu uygulaması." },
            { icon: MapPin, title: "Saha & Teslimat Takibi", desc: "Kurye, plasiyer veya saha ekibinizin anlık takibi. GPS entegrasyonlu." },
            { icon: Star, title: "Sadakat & Puan Sistemi", desc: "Müşterilerinizi ödüllendirin. Dijital puan kartı, kampanya ve bildirimler." },
            { icon: Bell, title: "Anlık Bildirimler", desc: "Sipariş durumu, randevu hatırlatması, kampanya duyuruları. Push notification." },
            { icon: BarChart3, title: "Raporlama & Analitik", desc: "Yönetici uygulamaları. Günlük raporlar, satış verileri, personel performansı." },
            { icon: Smartphone, title: "Özel İş Uygulamaları", desc: "Şirket içi araçlar, depo sayım, müşteri ziyaret raporlama ve daha fazlası." },
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">Sürecimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Keşif", desc: "İhtiyaçlarınızı ve hedeflerinizi dinleriz." },
              { step: "02", title: "Tasarım", desc: "Uygulama arayüzü ve kullanıcı akışı tasarlanır." },
              { step: "03", title: "Geliştirme", desc: "iOS & Android için kod yazılır, test edilir." },
              { step: "04", title: "Yayın & Destek", desc: "App Store & Play Store'a çıkılır. Destek devam eder." },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-extrabold text-[#ff5625]/30 mb-2">{step}</div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-[#e7bdb2] text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Zap, title: "React Native", desc: "Tek kod tabanı, iki platform. Daha hızlı geliştirme, daha düşük maliyet." },
            { icon: Shield, title: "App Store & Play Store", desc: "Yayın sürecini biz yönetiyoruz. Onay takibi, güncellemeler dahil." },
            { icon: Star, title: "Modern Tasarım", desc: "Kullanımı kolay, görsel olarak etkileyici arayüzler." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i}>
              <div className="w-14 h-14 rounded-full bg-[#ff5625]/10 border border-[#ff5625]/30 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-[#ff5625]" />
              </div>
              <h3 className="font-bold text-white mb-2">{title}</h3>
              <p className="text-[#e7bdb2] text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Fikrinizi uygulamaya dönüştürelim</h2>
          <p className="text-[#e7bdb2] mb-8">İlk görüşme ücretsiz. Fikrinizin hayata geçip geçemeyeceğini birlikte değerlendirelim.</p>
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
