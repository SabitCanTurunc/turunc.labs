"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Menu, ArrowRight, CheckCircle2, BarChart3, TrendingUp, Smile, Store, 
  Check, Building2, ArrowUpRight, Calendar, Mail, Phone, MapPin, X, 
  Coffee, Send, Loader2, Clock, Zap, Code2, Users
} from "lucide-react";

// Stagger variants for the hero text
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

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState("Keşif Görüşmesi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (subjectTitle = "Keşif Görüşmesi") => {
    setModalSubject(subjectTitle === "Danışmanlık" ? "Ücretsiz Danışmanlık" : subjectTitle);
    setIsSuccess(false);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b transition-all duration-300 ${isScrolled ? "shadow-md py-0 border-slate-200" : "py-0 border-transparent"}`} id="navbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 flex items-center cursor-pointer mr-4" 
                    onClick={() => window.scrollTo(0,0)}
                  >
                      <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-dark whitespace-nowrap">
                          turunc<span className="text-turunc">.labs</span>
                      </span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="hidden lg:flex items-center space-x-6 xl:space-x-8"
                  >
                      <a href="#hizmetler" className="text-slate-600 hover:text-turunc font-medium transition-colors whitespace-nowrap text-sm xl:text-base">Kime Hitap Ediyoruz?</a>
                      <a href="#projeler" className="text-slate-600 hover:text-turunc font-medium transition-colors whitespace-nowrap text-sm xl:text-base">Projelerimiz</a>
                      <button onClick={() => openModal('Danışmanlık')} className="text-slate-600 hover:text-turunc font-medium transition-colors whitespace-nowrap text-sm xl:text-base">Ücretsiz Danışmanlık</button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openModal('Keşif Görüşmesi')} 
                        className="bg-turunc hover:bg-turunc-dark text-white px-5 py-2.5 xl:px-6 rounded-full font-semibold shadow-lg shadow-turunc/30 whitespace-nowrap text-sm xl:text-base"
                      >
                          Keşif Görüşmesi
                      </motion.button>
                  </motion.div>

                  <div className="lg:hidden flex items-center">
                      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-turunc focus:outline-none p-2 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors">
                          <Menu className="w-6 h-6" />
                      </button>
                  </div>
              </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden bg-white border-b border-slate-200 absolute w-full shadow-xl overflow-hidden"
                >
                    <div className="px-4 pt-2 pb-6 space-y-2 sm:px-6">
                        <a href="#hizmetler" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-turunc hover:bg-turunc-50 transition-colors">Kime Hitap Ediyoruz?</a>
                        <a href="#projeler" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-turunc hover:bg-turunc-50 transition-colors">Projelerimiz</a>
                        <button onClick={() => { setIsMobileMenuOpen(false); openModal('Danışmanlık'); }} className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-turunc hover:bg-turunc-50 transition-colors">Ücretsiz Danışmanlık</button>
                        <div className="pt-2">
                            <button onClick={() => { setIsMobileMenuOpen(false); openModal('Keşif Görüşmesi'); }} className="block w-full text-center bg-turunc hover:bg-turunc-dark text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-turunc/30 transition-colors">Keşif Görüşmesi Ayarla</button>
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
      </nav>

      <main>
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[100dvh] flex items-center snap-start">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-turunc-50 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                      className="text-center lg:text-left z-10"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-turunc-50 text-turunc font-medium text-sm mb-6">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turunc opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-turunc"></span>
                            </span>
                            İşinizi dijitale taşımanın tam zamanı
                        </motion.div>
                        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark leading-tight mb-6">
                            Siz Sadece İşinize Odaklanın, <br />
                            <span className="gradient-text">Geri Kalanı Bize Bırakın.</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                            Excel dosyalarından, personeli yoran manuel işlerden ve birbirinden kopuk çalışan sistemlerden sıkıldınız mı? <strong>İçinde kod olan her problemi çözüyor</strong>, işletmenizin üzerindeki hantallığı alıyoruz.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openModal('Keşif Görüşmesi')} 
                              className="bg-turunc hover:bg-turunc-dark text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-turunc/30 flex items-center justify-center gap-2"
                            >
                                Keşif Görüşmesi Ayarla <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openModal('Danışmanlık')} 
                              className="bg-white border-2 border-slate-200 hover:border-turunc text-slate-700 hover:text-turunc px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                            >
                                Ücretsiz Danışmanlık Alın
                            </motion.button>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium flex-wrap">
                            <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Hızlı Teslimat</div>
                            <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Şeffaf Fiyatlandırma</div>
                            <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> 7/24 Destek</div>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 50, rotate: 10 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="relative hidden lg:block z-10"
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-turunc to-orange-300 animate-blob opacity-20"></div>
                            <motion.div 
                              whileHover={{ rotate: 0, scale: 1.02 }}
                              className="absolute inset-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col transform rotate-2 transition-transform duration-500"
                            >
                                <div className="h-8 bg-slate-100 border-b flex items-center px-3 gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 p-6 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-turunc-100 flex items-center justify-center text-turunc">
                                            <BarChart3 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
                                            <div className="h-3 w-32 bg-slate-100 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div className="h-24 bg-slate-50 rounded-lg border border-slate-100 p-3 flex flex-col justify-end">
                                             <motion.div initial={{ height: 0 }} animate={{ height: "50%" }} transition={{ duration: 1, delay: 0.5 }} className="w-full bg-turunc rounded opacity-50"></motion.div>
                                        </div>
                                        <div className="h-24 bg-slate-50 rounded-lg border border-slate-100 p-3 flex flex-col justify-end gap-1">
                                            <motion.div initial={{ height: 0 }} animate={{ height: "75%" }} transition={{ duration: 1, delay: 0.7 }} className="w-3/4 bg-blue-400 rounded opacity-50"></motion.div>
                                            <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 1, delay: 0.9 }} className="w-full bg-turunc rounded"></motion.div>
                                        </div>
                                    </div>
                                    <div className="mt-auto bg-turunc-50 text-turunc-dark p-3 rounded-lg text-sm font-medium flex justify-between items-center">
                                        Satışlar %45 Arttı!
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", delay: 1 }}
                              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <Smile className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-800">Mutlu Müşteriler</div>
                                        <div className="text-xs text-slate-500">+50 Başarılı Proje</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        <section id="hizmetler" className="py-20 bg-white min-h-[100dvh] flex flex-col justify-center snap-start">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-turunc font-bold tracking-wide uppercase text-sm mb-2">Çözümlerimiz</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Her Ölçeğe Uygun, Anlaşılır Teknoloji</h3>
                    <p className="text-slate-600 text-lg">Yazılım jargonuna boğulmadan, sadece işinizi nasıl büyüteceğinize odaklanıyoruz. Siz kimsiniz?</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                      className="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-turunc-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                        
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-turunc mb-6 border border-slate-100">
                                <Store className="w-7 h-7" />
                            </div>
                            <h4 className="text-2xl font-bold text-dark mb-3">Esnaf ve Küçük İşletmeler</h4>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                &quot;İnternette bulunmak istiyorum ama nereden başlayacağımı bilmiyorum&quot; diyorsanız, doğru yerdesiniz. Dükkanınızı dijitale taşıyor, yeni müşteriler bulmanızı sağlıyoruz.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-slate-700 font-medium"><Check className="w-5 h-5 text-turunc mr-3" /> Google Haritalar & SEO Kurulumu</li>
                                <li className="flex items-center text-slate-700 font-medium"><Check className="w-5 h-5 text-turunc mr-3" /> Randevu veya Sipariş Sistemi</li>
                                <li className="flex items-center text-slate-700 font-medium"><Check className="w-5 h-5 text-turunc mr-3" /> Uygun Fiyatlı, Yönetimi Kolay Web Sitesi</li>
                            </ul>
                            <button onClick={() => openModal('Esnaf Paketi')} className="text-turunc font-bold flex items-center hover:text-turunc-dark transition-colors">
                                Detaylı Bilgi Al <ArrowRight className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                      className="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 group-hover:bg-turunc-100/50"></div>
                        
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-800 mb-6 border border-slate-100">
                                <Building2 className="w-7 h-7" />
                            </div>
                            <h4 className="text-2xl font-bold text-dark mb-3">Kurumsal Şirketler & KOBİ'ler</h4>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Excel tablolarında kayboluyor, süreçleri manuel mi yönetiyorsunuz? Operasyonel yükünüzü hafifletecek, personel ve iş takibini otomatikleştirecek çözümler sunuyoruz.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-slate-700 font-medium"><Check className="w-5 h-5 text-turunc mr-3 flex-shrink-0" /> Özel Şirket İçi Yazılımlar (Çalışan, Stok, Depo Takibi)</li>
                                <li className="flex items-center text-slate-700 font-medium"><Check className="w-5 h-5 text-turunc mr-3 flex-shrink-0" /> Rutin İşlerin Otomasyonu (İş yükünüzü %70 hafifletin)</li>
                                <li className="flex items-center text-slate-700 font-medium"><Check className="w-5 h-5 text-turunc mr-3 flex-shrink-0" /> Sistem Entegrasyonları (Muhasebe, E-ticaret vb.)</li>
                            </ul>
                            <button onClick={() => openModal('Kurumsal Yazılım')} className="text-turunc font-bold flex items-center hover:text-turunc-dark transition-colors">
                                Projeyi Görüşelim <ArrowRight className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

        <section className="py-20 bg-white border-t border-slate-100 overflow-hidden relative min-h-[100dvh] flex flex-col justify-center snap-start">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="lg:w-1/2"
                    >
                        <h2 className="text-turunc font-bold tracking-wide uppercase text-sm mb-2">Kodun Olduğu Her Yerdeyiz</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-dark mb-6 leading-tight">
                            İş Yükünüzü Hafifletiyor, <br className="hidden md:block" />Sizi Özgürleştiriyoruz
                        </h3>
                        <p className="text-slate-600 text-lg mb-8">
                            İşletmenizdeki verimsiz manuel süreçleri analiz ediyor, teknoloji ile otomatikleştiriyoruz. Sizin yerinize çalışan, hata yapmayan sistemlerle zaman ve maliyet tasarrufu sağlıyoruz.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-turunc-50 flex items-center justify-center text-turunc">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-dark mb-1">Manuel İşlere Son</h4>
                                    <p className="text-slate-600">Excel kopyala-yapıştır işleri, manuel veri girişleri ve raporlamaları otomatize ederek personelinize asıl işi için zaman kazandırıyoruz.</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-dark mb-1">Çalışan ve Süreç Takibi</h4>
                                    <p className="text-slate-600">Saha personelinden, üretim hattına kadar kim nerede ne yapıyor? Tüm süreçleri tek bir merkezden, şeffaf şekilde yönetin.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                                    <Code2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-dark mb-1">Kusursuz Entegrasyon</h4>
                                    <p className="text-slate-600">Kullandığınız muhasebe programı, web siteniz ve kargo sisteminiz birbiriyle konuşmuyor mu? Kod girebilen her sistemi birbirine bağlıyoruz.</p>
                                </div>
                            </div>
                        </div>
                        
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openModal('Otomasyon İhtiyacı')} 
                          className="mt-10 bg-dark hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-xl shadow-slate-900/20"
                        >
                            İş Yükümü Hafiflet <Zap className="w-5 h-5 text-turunc" />
                        </motion.button>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="lg:w-1/2 relative mt-12 lg:mt-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-turunc-100 to-blue-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                          alt="Veri Analizi ve Otomasyon" 
                          className="rounded-3xl shadow-2xl border-4 border-white w-full object-cover aspect-[4/3]"
                        />
                        
                        {/* Floating Badges */}
                        <motion.div 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -top-6 -left-4 md:-left-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-turunc-100 flex items-center justify-center text-turunc">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-800">%70 Zaman Tasarrufu</div>
                                    <div className="text-xs text-slate-500">Otomasyon Sayesinde</div>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                          animate={{ y: [0, 10, 0] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                          className="absolute -bottom-6 -right-4 md:-right-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-800">Sıfır İnsan Hatası</div>
                                    <div className="text-xs text-slate-500">Sistem Entegrasyonu</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Özel Sistemler / Bento Grid */}
        <section className="py-24 bg-slate-900 relative overflow-hidden min-h-[100dvh] flex flex-col justify-center snap-start">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-turunc-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-turunc font-bold tracking-wide uppercase text-sm mb-2">Sınırları Zorlayın</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">İhtiyacınıza Özel Ne Yapabiliriz?</h3>
                    <p className="text-slate-400 text-lg">Hazır paket programlara mahkum değilsiniz. Sizin iş yapış şeklinize özel, personelinizi yormayacak "Terzi İşi" yazılımlar üretiyoruz.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bento 1: Saha Satış */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-3xl group hover:border-turunc-500/50 transition-colors"
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                            <div className="flex-1">
                                <div className="w-12 h-12 bg-turunc-500/20 text-turunc-400 rounded-xl flex items-center justify-center mb-6">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-3">Saha Satış & Plasiyer Takibi</h4>
                                <p className="text-slate-400 mb-6">Sahadaki ekibinizin nerede olduğunu anlık görün, müşteri ziyaretlerini, alınan siparişleri ve tahsilatları direkt merkeze, muhasebe programınıza düşürün.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-turunc-500 mr-2 flex-shrink-0" /> GPS Tabanlı Rota Takibi</li>
                                    <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-turunc-500 mr-2 flex-shrink-0" /> Mobil Sipariş Ekranı</li>
                                </ul>
                            </div>
                            <div className="w-full md:w-64 h-48 bg-slate-900 rounded-2xl border border-slate-700 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-turunc-500/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 bg-slate-800 p-3 rounded-xl border border-slate-600 shadow-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="h-2 w-16 bg-turunc-500 rounded"></div>
                                        <div className="text-xs text-turunc-400 font-bold animate-pulse">CANLI</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-white flex items-center justify-center text-xs text-white">AY</div>
                                        <div>
                                            <div className="text-sm font-medium text-white">Ali Yılmaz</div>
                                            <div className="text-xs text-slate-400">Müşteride (Sipariş Alıyor)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bento 2: Barkod / Akıllı Depo */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-3xl group hover:border-blue-500/50 transition-colors flex flex-col"
                    >
                        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                            <Store className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Akıllı Depo & Stok</h4>
                        <p className="text-slate-400 text-sm mb-6">Cep telefonunuzu barkod okuyucuya dönüştürün. Hangi rafta ne var saniyeler içinde bulun.</p>
                        <div className="mt-auto h-32 bg-slate-900 rounded-2xl border border-slate-700 p-4 flex flex-col justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-inner">
                            <div className="w-full h-8 flex gap-1 justify-center mb-2 opacity-80">
                                <div className="w-1 h-full bg-slate-400"></div><div className="w-2 h-full bg-slate-400"></div><div className="w-1 h-full bg-slate-400"></div><div className="w-3 h-full bg-slate-400"></div><div className="w-1 h-full bg-slate-400"></div><div className="w-2 h-full bg-slate-400"></div><div className="w-1 h-full bg-slate-400"></div><div className="w-2 h-full bg-slate-400"></div>
                            </div>
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] z-10"></div>
                            <div className="text-center text-blue-400 font-mono text-xs mt-2 animate-pulse">TARANIYOR...</div>
                        </div>
                    </motion.div>

                    {/* Bento 3: AI Raporlama */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-3xl group hover:border-purple-500/50 transition-colors flex flex-col"
                    >
                        <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Yönetici Panelleri</h4>
                        <p className="text-slate-400 text-sm mb-6">Şirketinizin nabzını tutun. Günlük ciro, giderler ve hedefleri tek bir grafikli ekrandan anlık izleyin.</p>
                        <div className="mt-auto h-32 bg-slate-900 rounded-2xl border border-slate-700 p-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-500 flex items-end gap-2 shadow-inner">
                             <motion.div animate={{ height: ["40%", "50%", "40%"] }} transition={{ duration: 3, repeat: Infinity }} className="w-1/4 bg-purple-500/40 rounded-t-sm"></motion.div>
                             <motion.div animate={{ height: ["60%", "70%", "60%"] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="w-1/4 bg-purple-500/60 rounded-t-sm"></motion.div>
                             <motion.div animate={{ height: ["80%", "60%", "80%"] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="w-1/4 bg-purple-500/80 rounded-t-sm"></motion.div>
                             <motion.div animate={{ height: ["100%", "90%", "100%"] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} className="w-1/4 bg-purple-500 rounded-t-sm"></motion.div>
                        </div>
                    </motion.div>

                    {/* Bento 4: Müşteri Portalı */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-3xl group hover:border-green-500/50 transition-colors flex flex-col md:flex-row gap-8 items-center"
                    >
                         <div className="w-full md:w-64 h-48 bg-slate-900 rounded-2xl border border-slate-700 relative overflow-hidden group-hover:scale-105 transition-transform duration-500 p-5 flex flex-col shadow-inner">
                              <div className="flex items-center gap-2 mb-4">
                                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center"><Store className="w-4 h-4 text-slate-400"/></div>
                                  <div className="w-24 h-3 bg-slate-700 rounded"></div>
                              </div>
                              <div className="w-full h-16 bg-slate-800 rounded-xl mb-auto border border-slate-700 p-2 flex items-center justify-between">
                                  <div className="w-12 h-12 bg-slate-700 rounded-lg"></div>
                                  <div className="flex flex-col gap-1 w-1/2">
                                      <div className="w-full h-2 bg-slate-600 rounded"></div>
                                      <div className="w-1/2 h-2 bg-slate-600 rounded"></div>
                                  </div>
                                  <div className="w-6 h-6 rounded-full border border-green-500 text-green-500 flex items-center justify-center text-[10px]">+</div>
                              </div>
                              <div className="w-full py-2 border border-green-500/30 bg-green-500/10 rounded flex items-center justify-center text-green-400 text-sm font-bold mt-4 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                  Siparişi Onayla
                              </div>
                         </div>
                         <div className="flex-1">
                                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-6">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-3">B2B & Bayi Sipariş Portalı</h4>
                                <p className="text-slate-400 mb-4">Müşterileriniz veya bayileriniz WhatsApp'tan sipariş vermek yerine, onlara özel açacağınız şifreli panele girerek kendi siparişlerini oluştursun, ödemelerini yapsın.</p>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" /> 7/24 Kesintisiz Sipariş</li>
                                    <li className="flex items-center text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" /> Anlık Cari Hesap ve Ekstre</li>
                                </ul>
                         </div>
                    </motion.div>
                </div>
            </div>
        </section>

        <section id="projeler" className="py-20 bg-slate-50 border-t border-slate-200 min-h-[100dvh] flex flex-col justify-center snap-start">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
                >
                    <div className="max-w-2xl">
                        <h2 className="text-turunc font-bold tracking-wide uppercase text-sm mb-2">Portfolyo</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-dark">Değer Yarattığımız Projeler</h3>
                        <p className="mt-4 text-slate-600 text-lg">Müşterilerimizin sorunlarını dinledik, onlara en uygun dijital çözümleri ürettik. İşte bazı başarı hikayelerimiz.</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal('Projeler Hakkında')} 
                      className="hidden md:flex bg-white border border-slate-300 hover:border-turunc text-slate-700 hover:text-turunc px-6 py-3 rounded-full font-semibold transition-colors items-center gap-2 whitespace-nowrap"
                    >
                        Tüm Projeleri İncele <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { title: "Lezzet Durağı Dijitalleşiyor", tag: "Esnaf Çözümü", desc: "Yerel bir restoran için komisyonsuz online sipariş ve masadan QR menü sistemi geliştirdik. Paket servis cirosu %30 arttı.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", color: "bg-white", textColor: "text-turunc", badges: ["QR Menü", "E-Ticaret"] },
                      { title: "Global Lojistik B2B Portalı", tag: "Kurumsal Yazılım", desc: "Müşterilerin yük takibini yapabildiği, teklif alabildiği karmaşık lojistik operasyonlarını tek ekrana toplayan özel portal.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", color: "bg-dark", textColor: "text-white", badges: ["Özel Yazılım (SaaS)", "API"] },
                      { title: "Aktif Yaşam Fitness App", tag: "Mobil Uygulama", desc: "Spor salonu üyeleri için randevu, antrenman takibi ve diyetisyen görüşmelerini barındıran kullanıcı dostu mobil uygulama.", img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", color: "bg-turunc", textColor: "text-white", badges: ["iOS & Android", "UI/UX"] }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -10 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group flex flex-col"
                      >
                          <div className="h-48 bg-slate-200 relative overflow-hidden">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <div className={`absolute top-4 left-4 ${item.color}/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold ${item.textColor}`}>{item.tag}</div>
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                              <h4 className="text-xl font-bold text-dark mb-2 group-hover:text-turunc transition-colors">{item.title}</h4>
                              <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                              <div className="flex flex-wrap gap-2 mt-auto">
                                  {item.badges.map((badge, bi) => (
                                      <span key={bi} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium">{badge}</span>
                                  ))}
                              </div>
                          </div>
                      </motion.div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-24 relative overflow-hidden min-h-[100dvh] flex flex-col justify-center snap-start">
            <div className="absolute inset-0 bg-dark"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-dark to-slate-900"></div>
            
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-turunc rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600 rounded-full blur-[120px] pointer-events-none"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
            >
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                    İşinizi büyütmek için gereken adımı <span className="text-turunc">bugün</span> atın.
                </h2>
                <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                    Sorununuzu dinleyelim, bütçenize ve hedeflerinize en uygun teknolojik çözümü birlikte bulalım. İlk görüşme ve analiz tamamen ücretsiz!
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal('Keşif Görüşmesi')} 
                      className="bg-turunc hover:bg-turunc-light text-white px-8 py-4 rounded-xl font-bold text-xl shadow-[0_0_30px_rgba(255,69,0,0.4)] hover:shadow-[0_0_50px_rgba(255,69,0,0.6)] flex items-center justify-center gap-2"
                    >
                        <Calendar className="w-6 h-6" /> Keşif Görüşmesi Ayarla
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal('Danışmanlık')} 
                      className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2"
                    >
                        Ücretsiz Danışmanlık Alın
                    </motion.button>
                </div>
            </motion.div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 pt-16 pb-8 snap-start">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                  <div className="col-span-1 md:col-span-2">
                      <div className="text-2xl font-extrabold tracking-tighter text-dark mb-4">
                          turunc<span className="text-turunc">.labs</span>
                      </div>
                      <p className="text-slate-500 mb-6 max-w-sm">
                          Yazılımı anlaşılabilir kılıyor, işletmelerin dijital dünyada hak ettikleri yeri almalarını sağlıyoruz.
                      </p>
                      <div className="flex space-x-4 text-slate-400">
                          <motion.a whileHover={{ y: -3, color: '#FF4500' }} href="#" className="transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                          </motion.a>
                          <motion.a whileHover={{ y: -3, color: '#FF4500' }} href="#" className="transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                          </motion.a>
                          <motion.a whileHover={{ y: -3, color: '#FF4500' }} href="#" className="transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                          </motion.a>
                      </div>
                  </div>

                  <div>
                      <h4 className="font-bold text-dark mb-4">Hizmetler</h4>
                      <ul className="space-y-2 text-slate-500">
                          <li><a href="#" className="hover:text-turunc transition-colors">Esnaf Paketleri</a></li>
                          <li><a href="#" className="hover:text-turunc transition-colors">Kurumsal Yazılım</a></li>
                          <li><a href="#" className="hover:text-turunc transition-colors">E-Ticaret Sistemleri</a></li>
                          <li><a href="#" className="hover:text-turunc transition-colors">Mobil Uygulamalar</a></li>
                      </ul>
                  </div>

                  <div>
                      <h4 className="font-bold text-dark mb-4">İletişim</h4>
                      <ul className="space-y-3 text-slate-500">
                          <li>
                              <a href="mailto:turunc.labs@gmail.com" className="flex items-center gap-2 hover:text-turunc transition-colors">
                                  <Mail className="w-4 h-4 text-turunc flex-shrink-0" /> turunc.labs@gmail.com
                              </a>
                          </li>
                          <li>
                              <a href="tel:+905519565884" className="flex items-center gap-2 hover:text-turunc transition-colors">
                                  <Phone className="w-4 h-4 text-turunc flex-shrink-0" /> 0 (551) 956 58 84
                              </a>
                          </li>
                          <li className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-turunc flex-shrink-0" /> Defne / Hatay
                          </li>
                      </ul>
                  </div>
              </div>
              
              <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-slate-400 text-sm">© 2026 turunc.labs. Tüm hakları saklıdır.</p>
                  <div className="flex gap-4 text-sm text-slate-400">
                      <a href="#" className="hover:text-turunc">Gizlilik Politikası</a>
                      <a href="#" className="hover:text-turunc">Kullanım Şartları</a>
                  </div>
              </div>
          </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
                onClick={closeModal}
              />

              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col z-10"
              >
                  <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors z-10">
                      <X className="w-5 h-5" />
                  </button>

                  <div className="bg-turunc-50 px-6 py-8 border-b border-turunc-100 text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-turunc">
                          <Coffee className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-dark" id="modal-title">{modalSubject} Ayarla</h3>
                      <p className="text-slate-600 text-sm mt-2">Bize biraz işinizden bahsedin, size nasıl yardımcı olabileceğimizi bulalım. En kısa sürede dönüş yapacağız.</p>
                  </div>

                  <div className="p-6">
                      {!isSuccess ? (
                        <form onSubmit={submitForm} className="space-y-4">
                            <input type="hidden" name="subject" value={modalSubject} />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Adınız</label>
                                    <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-turunc outline-none transition-all placeholder:text-slate-400" placeholder="Ahmet" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Soyadınız</label>
                                    <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-turunc outline-none transition-all placeholder:text-slate-400" placeholder="Yılmaz" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon Numaranız</label>
                                <input type="tel" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-turunc outline-none transition-all placeholder:text-slate-400" placeholder="05XX XXX XX XX" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">İşletme Tipi</label>
                                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-turunc outline-none transition-all bg-white text-slate-700" defaultValue="">
                                    <option value="" disabled>Seçiniz...</option>
                                    <option value="esnaf">Esnaf / Yerel İşletme</option>
                                    <option value="kobi">KOBİ</option>
                                    <option value="kurumsal">Kurumsal Şirket</option>
                                    <option value="girisim">Yeni Girişim / Startup</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Kısaca İhtiyacınız (Opsiyonel)</label>
                                <textarea rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-turunc outline-none transition-all placeholder:text-slate-400 resize-none" placeholder="Web sitesi kurmak istiyorum..."></textarea>
                            </div>

                            <motion.button 
                              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                              type="submit" 
                              disabled={isSubmitting} 
                              className={`w-full bg-turunc hover:bg-turunc-dark text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                  <><Loader2 className="w-5 h-5 animate-spin" /> Gönderiliyor...</>
                                ) : (
                                  <>Gönder ve Randevu Oluştur <Send className="w-4 h-4" /></>
                                )}
                            </motion.button>
                        </form>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-8"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold text-dark mb-2">Talebiniz Alındı!</h4>
                            <p className="text-slate-600">Harika bir adım attınız. Ekibimiz sizinle en kısa sürede iletişime geçecek.</p>
                            <button onClick={closeModal} className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-6 rounded-lg transition-colors">
                                Kapat
                            </button>
                        </motion.div>
                      )}
                  </div>
              </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
