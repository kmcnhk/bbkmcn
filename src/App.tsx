/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Target, 
  Brain, 
  Zap, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Award, 
  Users, 
  ArrowRight,
  Sword,
  Activity,
  Eye,
  Lock,
  Smartphone,
  Terminal,
  Radar,
  AlertTriangle,
  Heart,
  Home,
  Globe,
  Play
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

// --- IMAGE CONFIGURATION ---
// To change images, replace the URLs below with your own hosted image links.
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=2070&auto=format&fit=crop", // Tactical training
  youthTraining: "https://images.unsplash.com/photo-1599058917233-35836d3b5e82?q=80&w=2070&auto=format&fit=crop", // Martial arts youth
  overseasStudy: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop", // Students
  dojo: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop", // Training gym
  action: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop", // Combat action
  training1: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?q=80&w=2070&auto=format&fit=crop", // Tactical focus
  training2: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2070&auto=format&fit=crop", // Yoga/Flexibility
  videoPoster: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=2070&auto=format&fit=crop", // Tactical video poster
  logo: "https://yun.kmcn.vip/c3364607vodcq1304509294/38796dee1253642699394401777/sE8mAUE1JgAA.mp4?poster=https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=100&h=100&fit=crop", // Placeholder logo
};

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const DataStreamBackground = () => {
  const [streams, setStreams] = useState<{ id: number; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newStreams = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`
    }));
    setStreams(newStreams);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="data-stream"
          style={{
            left: stream.left,
            animationDelay: stream.delay,
            animationDuration: stream.duration
          }}
        />
      ))}
    </div>
  );
};

const TacticalHeader = ({ title, subtitle, accent = "red" }: { title: string, subtitle?: string, accent?: "red" | "green" }) => (
  <div className="mb-8 relative">
    <div className="flex items-center gap-4 mb-3">
      <div className={`h-[2px] w-12 ${accent === "red" ? "bg-kmcn-red" : "bg-kmcn-green"}`} />
      <span className={`font-mono text-[9px] tracking-[0.4em] uppercase ${accent === "red" ? "text-kmcn-red" : "text-kmcn-green"}`}>
        {accent === "red" ? "Tactical Intelligence" : "Youth Security Protocol"}
      </span>
    </div>
    <motion.h2 
      {...fadeIn}
      className={`text-2xl md:text-5xl font-display uppercase tracking-tighter leading-[0.9] mb-4 ${accent === "red" ? "text-gradient-red" : "text-gradient-green"}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        {...fadeIn}
        className="text-zinc-500 max-w-3xl text-[10px] font-mono uppercase tracking-[0.2em] leading-relaxed"
      >
        // {subtitle}
      </motion.p>
    )}
  </div>
);

const TacticalButton = ({ children, variant = "red", className = "", href, ...props }: any) => {
  const colors = {
    red: "bg-kmcn-red hover:bg-red-700 text-white shadow-[0_0_30px_rgba(255,0,0,0.4)]",
    green: "bg-kmcn-green hover:bg-green-600 text-black shadow-[0_0_30px_rgba(0,255,102,0.4)]",
    outline: "border border-white/10 hover:border-white/30 hover:bg-white/5 text-white backdrop-blur-md"
  };

  const baseClass = `relative px-12 py-6 font-display uppercase tracking-[0.25em] text-xs transition-all active:scale-95 flex items-center justify-center gap-4 overflow-hidden group ${colors[variant as keyof typeof colors]} ${className}`;
  
  if (href) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        {...props}
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
        {children}
      </a>
    );
  }
  
  return (
    <button 
      className={baseClass}
      {...props}
    >
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
      {children}
    </button>
  );
};

const VideoPlayer = ({ url, poster }: { url: string, poster: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-full group cursor-pointer" onClick={togglePlay}>
      <video 
        ref={videoRef}
        src={url} 
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        onEnded={() => setIsPlaying(false)}
      />
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all"
          >
            <div className="w-20 h-20 rounded-full bg-kmcn-green flex items-center justify-center shadow-[0_0_30px_rgba(0,255,102,0.5)] group-hover:scale-110 transition-transform">
              <Play className="w-10 h-10 text-black fill-black ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute top-4 left-4 font-mono text-[7px] text-kmcn-green tracking-[0.4em] uppercase bg-black/60 px-2 py-1 backdrop-blur-sm">
        {isPlaying ? "Live_Feed // Active" : "Security_Archive // Ready"}
      </div>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-kmcn-bg text-zinc-100 selection:bg-kmcn-red selection:text-white">
      {/* Tactical UI Layer */}
      <div className="fixed inset-0 pointer-events-none z-[60] scanline" />
      <div className="fixed inset-0 pointer-events-none z-0 tactical-grid opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-[65] vignette" />
      <div className="noise-bg" />
      <DataStreamBackground />
      
      {/* HUD Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 p-8 hidden lg:block">
        <div className="h-full w-full border border-white/[0.02] relative">
          <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/10" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/10" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/10" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/10" />
          
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-6 items-center">
            <div className="w-px h-48 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
            <span className="font-mono text-[7px] text-zinc-700 rotate-90 uppercase tracking-[0.5em]">System_Status: Optimal</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[70] transition-all duration-1000 ${scrolled ? 'bg-kmcn-bg/80 backdrop-blur-3xl py-4 border-b border-white/5' : 'py-12'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 bg-kmcn-red flex items-center justify-center overflow-hidden group-hover:rotate-12 transition-transform duration-700 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
              {/* LOGO CODE START - You can replace the img src below with your own logo file */}
              <img src={IMAGES.logo} alt="KMCN Logo" className="w-full h-full object-cover" />
              {/* LOGO CODE END */}
            </div>
            <div className="flex flex-col">
              <span className="font-display text-3xl tracking-tighter uppercase leading-none">KMCN</span>
              <span className="font-mono text-[7px] text-zinc-600 uppercase tracking-[0.4em]">专注青少年防身自卫马伽术15年</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
            {[
              { label: 'Defense', cn: '防身马伽术' },
              { label: 'Youth', cn: '青少年自卫' },
              { label: 'Packages', cn: '马伽术套餐' },
              { label: 'Long-term', cn: '长训系列' },
              { label: 'Authority', cn: '权威教官' },
              { label: 'Overseas', cn: '安全防卫特训' },
              { label: 'Contact', cn: '联系' }
            ].map((item) => (
              <a key={item.label} href={`#${item.label.toLowerCase()}`} className="hover:text-kmcn-red transition-all hover:tracking-[0.5em] duration-500 relative group flex flex-col items-center">
                <span className="opacity-0 group-hover:opacity-100 absolute -left-4 transition-opacity">/</span>
                <span className="text-white group-hover:text-kmcn-red whitespace-nowrap">{item.cn}</span>
                <span className="text-[7px] opacity-40 group-hover:opacity-100">{item.label}</span>
              </a>
            ))}
          </div>
          <TacticalButton variant="outline" className="hidden sm:flex py-3 px-10 text-[9px]" href="https://www.kmcn.vip">
            <Radar className="w-4 h-4 animate-spin-slow text-kmcn-red" />
            申请马伽术教官
          </TacticalButton>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale, y }} className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero} 
            alt="KMCN马伽术深圳青少年防身自卫特训" 
            className="w-full h-full object-cover opacity-30 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kmcn-bg via-kmcn-bg/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-kmcn-bg via-transparent to-kmcn-bg" />
          <div className="absolute inset-0 bg-kmcn-red/10 mix-blend-color" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-8">
          <div className="max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-6 mb-10">
                <div className="h-[1px] w-24 bg-kmcn-red" />
                <span className="font-mono text-kmcn-red text-[10px] tracking-[0.6em] uppercase animate-pulse">KMCN_TACTICAL_V5.0 // ONLINE</span>
              </div>
              <h1 className="text-[8vw] md:text-[5rem] font-display uppercase leading-[0.8] tracking-tighter mb-8 glitch chromatic-aberration" data-text="Krav Maga-KMCN">
                Krav Maga-KMCN<br />
                <span className="text-gradient-red glow-red">善良必须带点锋芒</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mb-12 font-light leading-tight border-l-2 border-kmcn-red/30 pl-10">
                父母无法护你一生，但我们可以教你如何保护自己。<br />
                Krav Maga（马伽术）源自以色列军方，是全球公认最实用、最高效的近身格斗与防身自卫技术。<br />
                针对深圳高素质家庭，打造极致的青少年安全防卫马伽术特训。
                <span className="text-zinc-600 block mt-4 text-sm font-mono uppercase tracking-[0.4em]">Krav Maga: Protect. Defend. Survive.</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-10">
                <TacticalButton variant="red" className="w-full sm:w-auto text-xl px-16">
                  为孩子预约安全评估 // BOOK ASSESSMENT <ArrowRight className="w-8 h-8" />
                </TacticalButton>
                <div className="flex items-center gap-8">
                  <div className="flex -space-x-6">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-14 h-14 rounded-full border-2 border-kmcn-bg bg-zinc-900 overflow-hidden shadow-xl">
                        <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
                    <span className="text-white block font-bold text-xs mb-1">1000+ 精英学员 // ELITE_CORPS</span>
                    Trust the Protocol
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero HUD */}
        <div className="absolute bottom-16 left-16 font-mono text-[9px] text-zinc-800 space-y-3 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-kmcn-red rounded-full animate-ping" />
            <span className="tracking-[0.2em]">LIVE_FEED: HQ_MAIN_FLOOR</span>
          </div>
          <p className="tracking-[0.1em]">COORDS: 22.5431° N / 114.0579° E</p>
          <p className="tracking-[0.1em]">SYSTEM_LOAD: 14% // ENCRYPTED</p>
        </div>
      </header>

      {/* Slogan Banner */}
      <section id="defense" className="py-20 bg-kmcn-red relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="container mx-auto px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-display text-white uppercase tracking-tighter">
              级别不重要，重要的是安全回家
            </h2>
            <p className="text-white/70 font-mono text-sm md:text-lg uppercase tracking-[0.3em]">
              Rank is not important, what matters is going home safely.
            </p>
            <div className="pt-4 font-display text-white/40 text-xs tracking-[0.5em]">KRAV MAGA - KMCN PHILOSOPHY</div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 relative bg-tactical-deep">
        <div className="container mx-auto px-8">
          <TacticalHeader 
            title="Krav Maga-KMCN 核心训练理念 // CORE PHILOSOPHY" 
            subtitle="Safety is not just force, it's wisdom and sharpness. 安全不仅是武力，更是智慧与锋芒。" 
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.03] border border-white/[0.03]">
            {[
              {
                title: "锋芒底线 // THE EDGE",
                desc: "教育孩子与人为善，但决不能做任人拿捏的“软柿子”。展现出坚定的底线和反击的勇气。",
                icon: <Sword className="w-10 h-10" />,
                tag: "DEFENSE"
              },
              {
                title: "兵法策略 // STRATEGY",
                desc: "真正的防身是“不战而屈人之兵”。通过心理素质训练，学习环境观察和危险评估。",
                icon: <Brain className="w-10 h-10" />,
                tag: "STRATEGY"
              },
              {
                title: "安全回家 // GET HOME",
                desc: "Krav Maga 马伽术的核心是“安全回家”。为了生存可以无所不用其极，不求打赢，只求脱困。",
                icon: <Home className="w-10 h-10" />,
                tag: "SURVIVAL"
              },
              {
                title: "求生本能 // INSTINCT",
                desc: "街头没有裁判。一切以实战求生为目的，学会利用身边一切武器，瞬间制敌逃生。",
                icon: <Shield className="w-10 h-10" />,
                tag: "INSTINCT"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.15 }}
                className="bg-kmcn-bg p-12 group hover:bg-zinc-900/30 transition-all duration-1000 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 font-mono text-[7px] text-zinc-800 group-hover:text-kmcn-red transition-colors tracking-[0.3em]">
                  {item.tag}_MODULE_0{i+1}
                </div>
                <div className="mb-8 text-kmcn-red group-hover:scale-125 group-hover:glow-red transition-all duration-700">{item.icon}</div>
                <h3 className="text-2xl font-display uppercase mb-6 tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-kmcn-red transition-all duration-1000" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Training Content Section */}
      <section className="py-24 bg-tactical-gray relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={IMAGES.training1} alt="KMCN马伽术核心训练课程" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <TacticalHeader 
            title="核心训练内容 // TRAINING CURRICULUM" 
            subtitle="Comprehensive security training covering awareness, strategy, and skills." 
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "安全意识 // AWARENESS", desc: "识别潜在威胁，建立危险感知能力，防患于未然。", icon: <Eye className="w-8 h-8" /> },
              { title: "战术策略 // STRATEGY", desc: "学习环境评估、脱困路径规划及心理博弈策略。", icon: <Target className="w-8 h-8" /> },
              { title: "防卫技能 // SKILLS", desc: "硬核马伽术实战技术，针对各种攻击的瞬间反击。", icon: <Sword className="w-8 h-8" /> },
              { title: "场景模拟 // SIMULATION", desc: "模拟危险场景，并用相应的技术来处理，或制服打击，达到脱身目的。", icon: <Radar className="w-8 h-8" /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 border-t-2 border-kmcn-red/20 hover:border-kmcn-red transition-all group"
              >
                <div className="text-kmcn-red mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="text-lg font-display uppercase mb-4 tracking-tight">{item.title}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Parent Concerns Section */}
      <section className="py-24 bg-tactical-light relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-kmcn-green/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <motion.div {...fadeIn}>
              <TacticalHeader 
                title="家长最关心的问题 // PARENTAL CONCERNS" 
                subtitle="Addressing the psychological and physical safety of your child." 
                accent="green"
              />
              <div className="space-y-8">
                {[
                  {
                    q: "孩子太善良，在学校被霸凌怎么办？ // SCHOOL BULLYING?",
                    a: "现在的孩子在温室中长大，往往缺乏对恶意的识别。我们不仅教技术，更教心理博弈。让孩子学会用眼神、语言和姿态展现“锋芒”，让霸凌者感到压力，从而不敢下手。"
                  },
                  {
                    q: "孩子会不会变的很暴力或爱打架？ // VIOLENT?",
                    a: "不仅不会，反而会更自律。马伽术的核心是防卫与脱困。我们教导孩子敬畏力量，理解暴力的后果。训练培养的是纪律与自控力，这会让他们更不倾向于寻求冲突，但在必要时有能力终结冲突。"
                  },
                  {
                    q: "女儿独自在外，遇到危险力气小怎么办？ // FOR GIRLS?",
                    a: "马伽术的设计初衷就是为了让弱者在面对强者时有生还机会。它不依赖蛮力，而是利用人体弱点、杠杆原理和出其不意的反击。对于女生来说，这更是必修的生存技能。"
                  },
                  {
                    q: "要学多久可以达到效果？ // HOW LONG?",
                    a: "严格意义上，完成200课时的系统训练能达到既定的防卫效果。但短期的定制集训（如10-20课时）也能有显著收获，因为自卫马伽术不完全是武力，更多是意识与策略的建立。"
                  },
                  {
                    q: "我有时间，可以做长期训练吗？ // LONG-TERM?",
                    a: "当然，我们强烈鼓励做长期训练，这是效果最好的一种。马伽术不是一个单一拳种，它是为了达到安全目的无所不用其极的方式，也就是说任何拳种技术，有用的都会涉及。"
                  },
                  {
                    q: "我只需要证书可以吗？ // ONLY CERTIFICATE?",
                    a: "不推荐，完全扭曲了训练意义。只为了证书可以离开，我们这里的证书只颁发给真正训练过的人，是对真实能力的肯定。"
                  },
                  {
                    q: "训练过程中会受伤吗？ // SAFETY IN TRAINING?",
                    a: "安全是我们的首要准则。虽然是实战模拟，但我们配备了专业的护具和经验丰富的教官，确保学员在安全受控的环境下挑战极限。"
                  },
                  {
                    q: "马伽术和其他武术有什么区别？ // VS OTHER ARTS?",
                    a: "马伽术没有比赛，没有规则，没有套路。它唯一的规则就是“生存”。它教你如何应对街头突发暴力、持械威胁等真实场景，而不是在擂台上得分。"
                  }
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-kmcn-green/20 pl-8 group">
                    <h4 className="text-lg font-display uppercase mb-3 text-kmcn-green group-hover:glow-green transition-all">{item.q}</h4>
                    <p className="text-zinc-500 leading-relaxed text-xs font-light">{item.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="sticky top-32">
              <div className="aspect-[3/4] glass-green p-3 corner-border before:border-kmcn-green after:border-kmcn-green floating-element">
                <img 
                  src={IMAGES.action} 
                  alt="Krav Maga Action" 
                  className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-end p-10">
                  <div className="glass-green backdrop-blur-md border border-kmcn-green/20 p-6 w-full">
                    <Heart className="w-10 h-10 text-kmcn-green mb-3 animate-pulse" />
                    <span className="font-display text-xl uppercase tracking-widest text-gradient-green glow-green block">Protecting the Future</span>
                    <span className="text-[7px] text-zinc-400 font-mono tracking-[0.4em] uppercase mt-2">Protocol_Active // Secure_Return</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Youth Focus - Green Accent */}
      <section id="youth" className="py-24 relative overflow-hidden bg-tactical-deep">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-kmcn-green/5 blur-[200px] rounded-full translate-x-1/3" />
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeIn} className="order-2 lg:order-1 relative">
              <div className="aspect-video rounded-sm overflow-hidden border border-white/5 relative group corner-border before:border-kmcn-green after:border-kmcn-green bg-black">
                <VideoPlayer 
                  url="https://yun.kmcn.vip/c3364607vodcq1304509294/38796dee1253642699394401777/sE8mAUE1JgAA.mp4"
                  poster={IMAGES.videoPoster}
                />
              </div>
              <div className="absolute -top-10 -left-10 w-64 h-64 border border-kmcn-green/5 rounded-full animate-spin-slow" />
            </motion.div>
            <motion.div {...fadeIn} className="order-1 lg:order-2">
              <div className="flex items-center gap-6 mb-8">
                <div className="h-[1px] w-24 bg-kmcn-green" />
                <span className="font-mono text-kmcn-green text-[10px] tracking-[0.6em] uppercase">Youth_Security_Protocol</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display uppercase leading-[0.8] mb-10 tracking-tighter">
                青少年<span className="text-gradient-green glow-green">专属</span><br />安全马伽术特训体系 // YOUTH SYSTEM
              </h2>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed font-light border-l-2 border-kmcn-green/30 pl-10">
                针对青少年身体发育特点，我们将硬核马伽术与亲和力教学相结合。在保持“酷”的同时，确保训练的科学性与趣味性，建立孩子由内而外的自信。
              </p>
              <div className="grid sm:grid-cols-2 gap-8 mb-16">
                {[
                  { title: "安全边界 // BOUNDARY", icon: <Lock className="w-6 h-6" /> },
                  { title: "校园霸凌应对 // ANTI-BULLY", icon: <AlertTriangle className="w-6 h-6" /> },
                  { title: "心理抗压 // RESILIENCE", icon: <Brain className="w-6 h-6" /> },
                  { title: "紧急防卫 // DEFENSE", icon: <Zap className="w-6 h-6" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group p-5 glass-green hover:border-kmcn-green/50 transition-all duration-500">
                    <div className="text-kmcn-green group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-zinc-300 font-mono text-[8px] uppercase tracking-[0.4em]">{item.title}</span>
                  </div>
                ))}
              </div>
              <TacticalButton variant="green" className="w-full sm:w-auto text-lg px-16">预约青少年评估课 // BOOK EVALUATION</TacticalButton>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Youth Packages Section */}
      <section id="packages" className="py-24 bg-tactical-light relative overflow-hidden">
        <div className="container mx-auto px-8">
          <TacticalHeader 
            title="青少年马伽术定制套餐 // CUSTOMIZED PACKAGES" 
            subtitle="Tailored training programs for different levels of security needs." 
            accent="green"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                tier: "A套餐 // BASIC",
                title: "基础防卫协议",
                duration: "9 HOURS",
                features: ["应对多重校园/街头场景", "学会12重核心防御技术", "建立初步危险感知边界", "基础平衡与爆发力训练"],
                desc: "适合初学者，快速建立安全防卫意识与基础脱困能力。"
              },
              {
                tier: "B套餐 // ADVANCED",
                title: "进阶响应课程",
                duration: "18 HOURS",
                features: ["应对多种复杂危机场景", "学会18重高级防御技术", "多目标威胁识别与处理", "心理抗压与极端环境模拟"],
                desc: "深度强化防卫本能，提升在多变环境下的生存几率。"
              },
              {
                tier: "高级特训 // ELITE",
                title: "生存技术能力套餐",
                duration: "30 HOURS",
                features: ["定制化极端生存技术", "全场景综合实战演练", "长期能力维持与心理建设", "精英级战术思维培养"],
                desc: "极致的安全守护方案，打造具备顶级生存能力的青少年精英。"
              }
            ].map((pkg, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="glass-green p-10 border border-kmcn-green/10 hover:border-kmcn-green transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 font-mono text-[7px] text-zinc-700 tracking-[0.4em]">PKG_V5.0_0{i+1}</div>
                <div className="mb-8">
                  <span className="text-kmcn-green font-mono text-[10px] tracking-[0.4em] uppercase block mb-2">{pkg.tier}</span>
                  <h3 className="text-3xl font-display uppercase tracking-tighter text-white">{pkg.title}</h3>
                </div>
                <div className="text-4xl font-display text-gradient-green mb-8">{pkg.duration}</div>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-zinc-400 text-xs font-light">
                      <CheckCircle2 className="w-4 h-4 text-kmcn-green flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-500 text-[10px] leading-relaxed italic mb-8 border-l border-kmcn-green/30 pl-4">{pkg.desc}</p>
                <TacticalButton variant="green" className="w-full py-4 text-[10px]">获取孩子专属防卫方案 // GET CUSTOM PLAN</TacticalButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Long-term Training Section */}
      <section id="long-term" className="py-24 bg-tactical-deep relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <TacticalHeader 
            title="自卫马伽术长训系列 // LONG-TERM TRAINING" 
            subtitle="Systematic advancement from basic self-defense to tactical mastery." 
          />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div {...fadeIn}>
              <h3 className="text-3xl font-display uppercase mb-8 tracking-tighter text-gradient-red">全维度考核体系标准 // ASSESSMENT STANDARDS</h3>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-light">
                KMCN长训体系不仅是技术的堆砌，更是能力的阶梯。我们采用国际标准的晋级体系，将单招、连招、体能、实战与战术深度融合，确保学员在每一个阶段都能获得真实、可验证的防卫能力。
              </p>
              <div className="space-y-6">
                {[
                  { level: "色带级别 (1-6级)", desc: "从白带到棕带，涵盖基础防卫、解脱技术、反击策略及初级实战。" },
                  { level: "黑带段位 (1-3段)", desc: "进入战术专家领域，涉及多目标对抗、持械防卫、极端环境生存及教官级战术思维。" }
                ].map((item, i) => (
                  <div key={i} className="glass p-6 border-l-4 border-kmcn-red">
                    <h4 className="text-xl font-display uppercase mb-2 text-white">{item.level}</h4>
                    <p className="text-zinc-500 text-sm font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="relative">
              <div className="aspect-video glass p-2 corner-border">
                <img 
                  src={IMAGES.training1} 
                  alt="Long-term Training" 
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Award className="w-24 h-24 text-kmcn-red/20" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "单招与连招 // TECHNIQUES", desc: "化繁为简，将复杂的防卫动作拆解为本能反应，形成高效的连击链条。" },
              { title: "体能与实战 // COMBAT", desc: "在高压模拟下训练爆发力与耐力，通过实战对抗检验技术的真实有效性。" },
              { title: "战术与思维 // TACTICS", desc: "超越单纯的武力，学习环境利用、心理博弈及法律边界下的最优解。" }
            ].map((item, i) => (
              <div key={i} className="glass p-10 border-t-2 border-kmcn-red/20 hover:border-kmcn-red transition-all">
                <h4 className="text-xl font-display uppercase mb-4 tracking-tight text-white">{item.title}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass-red p-12 border border-kmcn-red/10">
            <h3 className="text-2xl font-display uppercase mb-10 tracking-tighter text-white border-b border-white/5 pb-6">
              KMCN以色列馬伽術技術體系項目 // TRAINING PROGRAMS
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { title: "C級常規周末課程", en: "C-LEVEL WEEKEND", desc: "系统学习马伽术核心技术，适合长期训练与晋级。" },
                { title: "馬伽術教官課程", en: "INSTRUCTOR COURSE", desc: "培养专业教官，涵盖教学法、战术分析与考核认证。" },
                { title: "馬伽術私教包月", en: "PRIVATE TRAINING", desc: "一对一深度指导，根据个人需求定制专属训练计划。" },
                { title: "軍警級馬伽術集訓", en: "TACTICAL INTENSIVE", desc: "极端环境下的生存与对抗，涉及持械防卫与多目标对抗。" }
              ].map((prog, i) => (
                <div key={i} className="space-y-4">
                  <div className="text-kmcn-red font-mono text-[10px] tracking-widest">{prog.en}</div>
                  <h4 className="text-lg font-display text-white uppercase">{prog.title}</h4>
                  <p className="text-zinc-500 text-[10px] leading-relaxed font-light">{prog.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Instructors Section */}
      <section id="authority" className="py-24 bg-zinc-950 relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <TacticalHeader 
            title="权威教官 // AUTHORITATIVE INSTRUCTORS" 
            subtitle="Krav Maga-KMCN Chief Instructor Supervision & Quality Control" 
            accent="red"
          />
          
          <div className="max-w-4xl mx-auto">
            <motion.div 
              {...fadeIn}
              className="glass p-12 border border-kmcn-red/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 font-mono text-[8px] text-kmcn-red/40 tracking-[0.5em]">CHIEF_INSTRUCTOR_PROTOCOL</div>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                {/* 
                  INSTRUCTOR IMAGE: You can replace the src below with the actual instructor's photo.
                  建议使用 1:1 或 3:4 比例的透明背景或深色背景照片。
                */}
                <div className="w-48 h-48 bg-zinc-900 relative overflow-hidden border border-white/5 group-hover:border-kmcn-red/50 transition-colors duration-700 flex-shrink-0">
                  <img 
                    src="https://picsum.photos/seed/instructor/400/400" 
                    alt="KMCN马伽术权威总教官" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 bg-kmcn-red/10 border border-kmcn-red/30 text-kmcn-red font-mono text-[10px] tracking-widest uppercase mb-2">
                    中国唯一马伽术官方机构 // OFFICIAL INSTITUTION
                  </div>
                  <h3 className="text-3xl font-display uppercase tracking-tighter text-white">深圳以色列马伽术协会 // SZIKMA</h3>
                  <p className="text-zinc-400 text-lg leading-relaxed font-light">
                    作为中国唯一马伽术官方机构，我们的教学质量由<strong className="text-white font-medium">深圳以色列马伽术协会会长</strong>亲自负责并全程监控。结合40余年搏击格斗经验，严格把控每一项教学计划，确保每一位学员接受最正统、最实用的安全防卫特训。
                  </p>
                  <div className="pt-6 border-t border-white/5 flex flex-wrap gap-8 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    <span className="flex items-center gap-2"><Award className="w-4 h-4 text-kmcn-red" /> 40+ Years Experience</span>
                    <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-kmcn-red" /> Association President</span>
                    <span className="flex items-center gap-2"><Sword className="w-4 h-4 text-kmcn-red" /> Official Quality Control</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Overseas Study Section */}
      <section id="overseas" className="py-24 bg-tactical-gray relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={IMAGES.dojo} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <Globe className="w-12 h-12 text-kmcn-red mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-display uppercase mb-6 tracking-tighter leading-none">
              准留学生<span className="text-gradient-red glow-red">海外生存</span>特训 // OVERSEAS SURVIVAL
            </h2>
            <p className="text-zinc-500 text-xl leading-relaxed font-light max-w-3xl mx-auto">
              海外环境复杂，安全是留学的底线。我们为准留学生量身定制“海外生存包”，
              涵盖从环境风险评估到极端情况下的求生技能。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "环境风险评估 // RISK ASSESSMENT",
                desc: "识别高风险区域，学习在异国他乡保持警觉，避免成为犯罪目标。",
                icon: <Eye className="w-10 h-10" />
              },
              {
                title: "极端情况求生 // EXTREME SURVIVAL",
                desc: "应对持械威胁、群体冲突等极端场景的紧急避险与脱困技巧。",
                icon: <AlertTriangle className="w-10 h-10" />
              },
              {
                title: "法律与心理 // LAW & PSYCHOLOGY",
                desc: "了解海外正当防卫法律边界，建立在压力下的冷静判断力。",
                icon: <Shield className="w-10 h-10" />
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                transition={{ delay: i * 0.2 }}
                className="glass p-12 text-center hover:border-kmcn-red/50 transition-all duration-700 group"
              >
                <div className="text-kmcn-red mb-8 flex justify-center group-hover:scale-125 group-hover:glow-red transition-all duration-700">{item.icon}</div>
                <h3 className="text-xl font-display uppercase mb-6 tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 text-xs font-light leading-relaxed group-hover:text-zinc-400 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
 
          <div className="mt-32 rounded-sm overflow-hidden border border-white/5 relative group corner-border">
            <img 
              src={IMAGES.overseasStudy} 
              alt="Overseas Study Safety" 
              className="w-full h-96 object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-1000 scale-105 group-hover:scale-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <TacticalButton variant="red" className="text-lg px-16">定制准留学生生存包 // CUSTOMIZE SURVIVAL KIT</TacticalButton>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 relative bg-tactical-deep">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-24">
            <motion.div {...fadeIn}>
              <TacticalHeader title="投资孩子的安全，是父母最明智的决定 // START THE JOURNEY" subtitle="开启守护之旅，为孩子的未来穿上隐形铠甲。" />
              <div className="space-y-12">
                {[
                  { icon: <MapPin className="w-8 h-8" />, title: "拳馆地址 // Location", desc: "深圳龙岗坂田-KMCN强身搏击马伽术格斗馆" },
                  { icon: <Phone className="w-8 h-8" />, title: "咨询热线 // Hotline", desc: "13424247185 (微信同号)" },
                  { icon: <Globe className="w-8 h-8" />, title: "国际联盟网站 // International", desc: "www.kravmaga.hk" },
                  { icon: <Globe className="w-8 h-8" />, title: "国内KMCN马伽术网站 // Domestic", desc: "www.kravmagacn.com" },
                  { icon: <Globe className="w-8 h-8" />, title: "马伽术在线课程及教官培训 // Training", desc: "www.kmcn.vip" },
                  { icon: <Globe className="w-8 h-8" />, title: "深圳以色列马伽术协会 // Association", desc: "www.kravmaga.org.cn" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="w-16 h-16 bg-white/[0.02] backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:bg-kmcn-red/10 transition-all duration-500 border border-white/5">
                      <div className="text-kmcn-red group-hover:scale-125 group-hover:glow-red transition-all duration-700">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-xl font-display uppercase mb-2 tracking-tight group-hover:text-kmcn-red transition-colors">{item.title}</h4>
                      <p className="text-zinc-500 text-lg font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div {...fadeIn} className="glass p-12 relative corner-border overflow-hidden">
              <div className="absolute top-0 right-0 p-6 font-mono text-[7px] text-zinc-700 tracking-[0.5em]">SECURE_CHANNEL_ENCRYPTED_V2.0</div>
              <div className="text-center relative z-10">
                <h3 className="text-2xl font-display uppercase mb-10 tracking-tighter text-gradient-red">扫码预约评估课 // SCAN TO BOOK</h3>
                <div className="inline-block p-6 bg-white rounded-sm mb-10 shadow-[0_0_60px_rgba(255,255,255,0.15)] group cursor-pointer hover:scale-105 transition-transform duration-700">
                  <div className="w-48 h-48 bg-zinc-100 flex items-center justify-center text-zinc-400 font-mono text-[10px] tracking-[0.3em] border-4 border-zinc-200">
                    [ QR_ENCRYPTED_DATA ]
                  </div>
                </div>
                <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.6em] leading-relaxed">
                  Establish secure connection<br />with KMCN Tactical Intelligence
                </p>
              </div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-kmcn-red/5 blur-[100px] rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEO & GEO Keywords (Hidden) */}
      <section className="sr-only">
        <h1>深圳香港青少年防身自卫马伽术 - 防身马伽术 - 自卫马伽术 - 安全防卫马伽术特训 - 以色列格斗术 - KRAV MAGA - KMCN马伽术</h1>
        <p>孩子如何获得安全自卫？马伽术是最佳选择。我们专注青少年防身自卫马伽术15年，提供深圳南山、福田、宝安、龙岗、龙华、罗湖及香港地区留学生安全及海外安全防卫马伽术特训。涵盖青少年马伽术训练、自卫马伽术课程、防身自卫马伽术实战、以色列格斗术核心技术、KRAV MAGA战术防卫、KMCN马伽术考核体系、留学生海外安全生存指南等。</p>
        <ul>
          <li>深圳青少年防身自卫马伽术</li>
          <li>深圳防身马伽术</li>
          <li>深圳自卫马伽术</li>
          <li>深圳安全防卫马伽术特训</li>
          <li>南山马伽术训练</li>
          <li>福田马伽术培训</li>
          <li>宝安马伽术中心</li>
          <li>香港马伽术课程</li>
          <li>以色列格斗术 KRAV MAGA</li>
          <li>KMCN马伽术创始人刘教官</li>
          <li>孩子如何获得安全自卫</li>
          <li>留学生安全防卫</li>
          <li>海外安全特训</li>
          <li>战术防卫心理素质</li>
          <li>应急避险青少年防身</li>
          <li>女子防身军警格斗</li>
          <li>菲律宾棍术教官认证</li>
          <li>马伽术线上课程 kmcn.vip</li>
          <li>深圳以色列马伽术协会</li>
        </ul>
        {/* JSON-LD Schema for LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsActivityLocation",
            "name": "KMCN马伽术 - 深圳香港青少年防身自卫马伽术中心",
            "description": "专注青少年防身自卫马伽术15年，提供专业的以色列格斗术特训。",
            "url": "https://www.kravmaga.hk",
            "telephone": "www.kravmaga.hk",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "深圳/香港",
              "addressRegion": "广东",
              "addressCountry": "CN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "22.5431",
              "longitude": "114.0579"
            },
            "sameAs": [
              "https://www.kravmagacn.com",
              "https://www.kmcn.vip",
              "http://www.kravmaga.org.cn"
            ]
          })}
        </script>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 relative overflow-hidden bg-zinc-950">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 group cursor-pointer mb-8">
                <div className="w-10 h-10 bg-kmcn-red flex items-center justify-center font-display text-2xl group-hover:rotate-90 transition-transform duration-500">K</div>
                <span className="font-display text-2xl tracking-tighter uppercase">KMCN <span className="text-zinc-600">Tactical</span></span>
              </div>
              <p className="text-zinc-500 text-sm max-w-md mb-8 leading-relaxed">
                KMCN-Krav Maga以色列格鬥術國際聯盟 (香港) 官方網站。专注青少年自卫马伽术15年，提供最专业的实战格斗训练。深圳/香港双总部，涵盖军警级马伽术及菲律宾棍术教官认证。
              </p>
              <div className="flex gap-6">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-kmcn-red hover:border-kmcn-red transition-all duration-300">
                  <span className="sr-only">WeChat</span>
                  <div className="w-4 h-4 bg-current opacity-50" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-kmcn-red hover:border-kmcn-red transition-all duration-300">
                  <span className="sr-only">YouTube</span>
                  <div className="w-4 h-4 bg-current opacity-50" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-display text-xs uppercase tracking-[0.3em] text-white mb-8">快速链接 / Quick Links</h4>
              <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <li><a href="#" className="hover:text-kmcn-red transition-colors">首页 / Home</a></li>
                <li><a href="https://www.kravmaga.hk/KMCN_KravMaga.html" target="_blank" rel="noopener noreferrer" className="hover:text-kmcn-red transition-colors">马伽术体系 / System</a></li>
                <li><a href="#" className="hover:text-kmcn-red transition-colors">权威教官 / Authority</a></li>
                <li><a href="#" className="hover:text-kmcn-red transition-colors">课程计划 / Courses</a></li>
                <li><a href="#" className="hover:text-kmcn-red transition-colors">最新资讯 / News</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs uppercase tracking-[0.3em] text-white mb-8">联系我们 // Contact</h4>
              <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <li>深圳/香港双总部 // Shenzhen / Hong Kong HQ</li>
                <li><a href="https://www.kravmaga.hk" target="_blank" rel="noopener noreferrer" className="hover:text-kmcn-red transition-colors">国际联盟: www.kravmaga.hk</a></li>
                <li><a href="https://www.kravmagacn.com" target="_blank" rel="noopener noreferrer" className="hover:text-kmcn-red transition-colors">国内网站: www.kravmagacn.com</a></li>
                <li><a href="https://www.kmcn.vip" target="_blank" rel="noopener noreferrer" className="hover:text-kmcn-red transition-colors">在线课程: www.kmcn.vip</a></li>
                <li><a href="http://www.kravmaga.org.cn" target="_blank" rel="noopener noreferrer" className="hover:text-kmcn-red transition-colors">深圳协会: www.kravmaga.org.cn</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-zinc-800 font-mono text-[9px] uppercase tracking-[0.6em] text-center">
              © 2009-2026 KMCN-KRAV MAGA 以色列格鬥術國際聯盟. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8 font-mono text-[9px] uppercase tracking-[0.6em] text-zinc-700">
              <a href="#" className="hover:text-kmcn-red transition-colors">Privacy</a>
              <a href="#" className="hover:text-kmcn-red transition-colors">Terms</a>
              <a href="#" className="hover:text-kmcn-red transition-colors">Intel</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
