/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import { 
  Github, 
  Instagram, 
  Youtube, 
  Terminal, 
  Atom, 
  Gamepad2, 
  Palette, 
  Video, 
  Sword, 
  Cpu,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  MessageSquare,
  Send
} from "lucide-react";

// --- Components ---

const Navbar = ({ currentTheme, onThemeChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Research", href: "#research" },
    { name: "Projects", href: "#projects" },
    { name: "Studio", href: "#studio" },
    { name: "The Dojo", href: "#dojo" },
  ];

  const socialLinks = {
    insta: "https://www.instagram.com/senpai_ronzai?igsh=MW02Znd6Zmd0aHhhZA==",
    yt: "https://youtube.com/@senpaironzai?si=WR3Q0QSrlSXFjd2Y",
    github: "https://github.com/piyushsingh240995-code"
  };

  const themes = [
    { id: "default", name: "Cyber", color: "#00f5ff" },
    { id: "matrix", name: "Matrix", color: "#10b981" },
    { id: "vortex", name: "Vortex", color: "#f59e0b" },
    { id: "ghost", name: "Ghost", color: "#ff71cd" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-4 shadow-2xl" : "py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          key={currentTheme + "-logo"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter"
        >
          SENPAI<span className="text-[var(--neon-primary)] text-glow-cyan">RONZAI</span>
        </motion.div>

        {/* Desktop Nav Actions */}
        <div className="flex items-center gap-6">
          {/* Theme Switcher */}
          <div className="flex gap-2 p-1.5 glass">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                title={t.name}
                className={`w-5 h-5 transition-all ${currentTheme === t.id ? "scale-110 ring-2 ring-white" : "opacity-30 hover:opacity-100 hover:scale-105"}`}
                style={{ backgroundColor: t.color, borderRadius: "var(--radius-card)" }}
              />
            ))}
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xs uppercase tracking-widest hover:text-[var(--neon-primary)] transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <a 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="neon-border-cyan px-4 py-2 text-[10px] uppercase tracking-tighter hover:bg-[var(--neon-primary)] hover:text-black transition-all"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              RCIBT Paper
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 glass" style={{ borderRadius: "var(--radius-card)" }} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <hr className="opacity-10" />
              <div className="flex gap-6 py-2">
                <motion.a whileHover={{ y: -3, color: "var(--neon-secondary)" }} href={socialLinks.insta} target="_blank" rel="noopener noreferrer"><Instagram size={20} /></motion.a>
                <motion.a whileHover={{ y: -3, color: "#ff0000" }} href={socialLinks.yt} target="_blank" rel="noopener noreferrer"><Youtube size={20} /></motion.a>
                <motion.a whileHover={{ y: -3, color: "var(--neon-primary)" }} href={socialLinks.github} target="_blank" rel="noopener noreferrer"><Github size={20} /></motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, icon: Icon }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mb-12 text-left"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="p-3 glass text-[var(--neon-primary)]" style={{ borderRadius: "var(--radius-card)" }}>
        <Icon size={24} />
      </div>
      <span className="text-xs font-mono uppercase tracking-[0.4em] text-white/40">{subtitle}</span>
    </div>
    <h2 
      className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight"
      style={{ textTransform: "var(--heading-transform)" as any }}
    >
      {title}
    </h2>
  </motion.div>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 quantum-grid opacity-20" />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--neon-primary)]/10 rounded-full blur-[160px] pointer-events-none" 
      />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          key="hero-content"
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block glass px-6 py-2 text-[10px] font-mono tracking-[0.5em] text-[var(--neon-primary)] mb-10 neon-border-cyan uppercase"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            THEORETICAL PHYSICIST • DEV • POLYMATH
          </motion.div>
          <h1 
            className="text-6xl md:text-9xl lg:text-[11rem] font-black tracking-tighter mb-8 leading-[0.85]"
            style={{ textTransform: "var(--heading-transform)" as any }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="block text-white"
            >PIYUSH</motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary)] text-glow-cyan"
            >SINGH</motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 mb-12 leading-relaxed font-light"
          >
            Known as <span className="text-white font-mono">Senpai Ronzai</span>. Where <span className="text-white">Theoretical Physics</span> meets <span className="text-white">Full-Stack Engineering</span>. Author of RCIBT.
          </motion.p>
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <motion.a 
                href="#projects" 
                initial={{ boxShadow: "0 0 0px rgba(255,255,255,0)", scale: 1 }}
                animate={{ 
                  boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 30px rgba(255,255,255,0.3)", "0 0 0px rgba(255,255,255,0)"],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  type: "spring", stiffness: 400, damping: 10 
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-black px-10 py-5 font-black uppercase tracking-[0.3em] shadow-2xl transition-all"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                Explore Work
              </motion.a>
              <motion.a 
                href="mailto:piyushsingh240995@gmail.com" 
                initial={{ boxShadow: "0 0 0px rgba(var(--neon-primary-rgb),0)", scale: 1 }}
                animate={{ 
                  boxShadow: ["0 0 0px rgba(var(--neon-primary-rgb),0)", "0 0 20px rgba(var(--neon-primary-rgb),0.2)", "0 0 0px rgba(var(--neon-primary-rgb),0)"],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  type: "spring", stiffness: 400, damping: 10 
                }}
                whileHover={{ scale: 1.05, y: -5, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="glass px-10 py-5 font-black uppercase tracking-[0.3em] border border-white/20 hover:border-white/40 transition-all"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                Contact Me
              </motion.a>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const ResearchLab = () => (
  <section id="research" className="py-24 bg-black/50">
    <div className="container mx-auto px-6">
      <SectionHeading title="Research Lab" subtitle="Physics & Theory" icon={Atom} />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-1 gap-8"
      >
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(var(--neon-primary-rgb), 0.2)" }}
          className="glass p-8 md:p-12 border-white/5 relative overflow-hidden group"
        >
          <div className="absolute -top-10 -right-10 p-8 text-[var(--neon-primary)] opacity-5 group-hover:rotate-12 transition-transform duration-700">
            <Atom size={240} />
          </div>
          <div className="relative z-10">
            <span className="text-[var(--neon-primary)] font-mono text-xs uppercase tracking-widest mb-4 block underline decoration-cyan-500/30 underline-offset-4">Primary Thesis</span>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-glow-cyan">Recursive Causal Instability and Bifurcation Theory (RCIBT)</h3>
            <p className="text-white/60 mb-8 max-w-3xl text-lg leading-relaxed">
              My research paper focuses on Causal Topology and Einstein-Rosen bridges. RCIBT proposes a framework for understanding how recursive feedback loops in spacetime manifolds lead to causal bifurcation, potentially bridging quantum mechanics and general relativity.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {["Causal Topology", "Bifurcation Theory", "Quantum Grid", "Einstein-Rosen"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-white/50">{tag}</span>
              ))}
            </div>
            <a 
              href="https://rcibt.netlify.app/" 
              className="inline-flex items-center gap-2 text-[var(--neon-primary)] hover:gap-4 transition-all hover:text-white"
            >
              Explore RCIBT Manuscript <ChevronRight size={18} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const DevForge = () => {
  const projects = [
    {
      title: "Ultron:Rcibt",
      desc: "An intelligent Multi-LLM integration for high-accuracy judging and navigation. Built to synchronize multiple AI agents in a unified decision manifold.",
      tech: ["Python", "Multi-LLM", "Automation", "AI"],
      icon: Cpu,
      link: "https://ultron-rcibt.netlify.app/",
      color: "var(--neon-primary)"
    },
    {
      title: "Craft with Yo",
      desc: "A high-performance voxel game engine architecture. Optimized for volumetric rendering, physics-based interactions, and recursive partitioning.",
      tech: ["Voxel Engine", "Physics", "Optimization", "Architecture"],
      icon: Gamepad2,
      link: "https://craft-with-yo.netlify.app/",
      color: "var(--neon-secondary)"
    },
    {
      title: "RCIBT Live",
      desc: "A specialized tool for visualizing recursive causal instability and topology as described in the RCIBT research paper.",
      tech: ["React", "D3.js", "Mathematics", "Topology"],
      icon: Atom,
      link: "https://rcibt.netlify.app/",
      color: "var(--neon-primary)"
    },
    {
      title: "Legacy Portfolio",
      desc: "My previous personal space on the web. A testament to the journey from gaming to theoretical physics and complex engineering.",
      tech: ["Legacy", "V1", "Personal", "History"],
      icon: ExternalLink,
      link: "https://piyush-gaming-2302-portfolio.netlify.app/",
      color: "var(--neon-secondary)"
    }
  ];

  const skills = [
    { name: "Theoretical Physics (RCIBT)", level: 98 },
    { name: "AI & LLM Automation", level: 92 },
    { name: "Full-Stack Development", level: 88 },
    { name: "Voxel Engine Design", level: 85 }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeading title="Dev Forge" subtitle="Tech & Engineering" icon={Terminal} />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass p-8 rounded-[var(--radius-card)] border-white/5 flex flex-col justify-between group h-full"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 glass flex items-center justify-center text-[var(--neon-primary)] group-hover:neon-border-cyan transition-all duration-500" style={{ borderRadius: "var(--radius-card)" }}>
                    <p.icon size={24} />
                  </div>
                  {p.link !== "#" && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-[var(--neon-primary)] transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[var(--neon-primary)] transition-colors">{p.title}</h3>
                <p className="text-white/40 mb-6 text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span key={t} className="text-[9px] font-mono uppercase tracking-[0.2em] px-2 py-1 bg-white/5 rounded border border-white/10 text-white/30">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-[var(--radius-card)] border-white/5"
        >
           <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
             <Cpu size={24} className="text-[var(--neon-primary)]" /> Core Competencies
           </h3>
           <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
             {skills.map(s => (
               <div key={s.name} className="space-y-3">
                 <div className="flex justify-between text-xs font-mono uppercase tracking-[0.2em]">
                   <span className="text-white/70">{s.name}</span>
                   <span className="text-[var(--neon-primary)] font-bold">{s.level}%</span>
                 </div>
                 <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: `${s.level}%`, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-[var(--neon-primary)] to-[var(--neon-secondary)] skill-bar-glow"
                   />
                 </div>
               </div>
             ))}
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const CreativeStudio = () => {
  const categories = [
    { 
      name: "Graphic Design", 
      icon: Palette, 
      items: [
        { name: "Futuristic Posters", desc: "Cyberpunk aesthetic & quantum motifs" },
        { name: "Brand Identities", desc: "Scientific-themed minimalist logos" },
        { name: "User Interfaces", desc: "High-density technical HUDs" }
      ] 
    },
    { 
      name: "Video Editing", 
      icon: Video, 
      items: [
        { name: "Cinematic Montages", desc: "High-paced Seinen inspired edits" },
        { name: "Scientific Visuals", desc: "Visualizing 4D manifolds and topology" },
        { name: "AMVs", desc: "Syncing Berserk & Vagabond visuals" }
      ] 
    },
  ];

  return (
    <section id="studio" className="py-24 bg-black/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading title="Creative Studio" subtitle="Art & Visuals" icon={Palette} />
        
        <div className="grid md:grid-cols-2 gap-12">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[var(--neon-secondary)]/10" style={{ borderRadius: "var(--radius-card)" }}>
                  <cat.icon size={28} className="text-[var(--neon-secondary)]" />
                </div>
                <h3 className="text-3xl font-bold">{cat.name}</h3>
              </div>
              <div className="grid grid-cols-1 gap-5 glass animated-gradient p-4 md:p-6" style={{ borderRadius: "var(--radius-card)" }}>
                {cat.items.map((item, j) => (
                  <motion.div 
                    key={j} 
                    whileHover={{ x: 10, scale: 1.01 }}
                    className="glass p-6 rounded-[var(--radius-card)] border-white/5 hover:bg-white/10 transition-all flex justify-between items-center group cursor-pointer"
                  >
                    <div>
                      <p className="text-white text-lg font-bold mb-1 group-hover:text-[var(--neon-secondary)] transition-colors">{item.name}</p>
                      <p className="text-white/30 text-xs font-mono uppercase tracking-widest">{item.desc}</p>
                    </div>
                    <div className="p-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={18} className="text-[var(--neon-secondary)]" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TheDojo = () => (
  <section id="dojo" className="py-24">
    <div className="container mx-auto px-6">
      <SectionHeading title="The Dojo" subtitle="About & Discipline" icon={Sword} />
      
      <div className="flex flex-col md:flex-row gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-3/5 space-y-10"
        >
          <div className="space-y-6">
            <motion.p 
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="text-3xl md:text-4xl text-[var(--neon-secondary)] font-bold leading-tight font-mono text-glow-purple"
            >
              "Discipline is the bridge between physics and combat."
            </motion.p>
            <p className="text-white/50 leading-relaxed text-xl font-light">
              I am a 14-year-old student currently on the 9th PCMB path with aspirations for UPSC. My life is balanced between the abstraction of theoretical physics and the concrete discipline of Martial Arts.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants} className="glass p-8 rounded-[var(--radius-card)] border-white/5 group hover:neon-border-purple transition-all duration-500">
              <h4 className="text-[var(--neon-secondary)] text-xs font-mono uppercase tracking-[0.3em] mb-4">Martial Arts</h4>
              <p className="text-sm text-white/50 leading-relaxed">I analyze the physics of boxing and combat through the lens of RCIBT, focusing on momentum transfer and angular velocity in strikes.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="glass p-8 rounded-[var(--radius-card)] border-white/5 group hover:neon-border-purple transition-all duration-500">
              <h4 className="text-[var(--neon-secondary)] text-xs font-mono uppercase tracking-[0.3em] mb-4">Philosophy</h4>
              <p className="text-sm text-white/50 leading-relaxed">A Seinen manga collector (Berserk, Vagabond, Vinland Saga). Influenced by the themes of endurance and the "struggler" archetype.</p>
            </motion.div>
          </motion.div>

          <div className="flex flex-wrap gap-12 pt-6">
            {[
              { label: "Current Path", val: "PCMB (Class 9)" },
              { label: "Aspiration", val: "UPSC / Scientist" },
              { label: "Identity", val: "Polymath" }
            ].map(stat => (
              <div key={stat.label} className="space-y-2">
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">{stat.label}</p>
                <p className="font-bold text-xl tracking-tight leading-none">{stat.val}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-2/5"
        >
          <div className="aspect-[4/5] glass overflow-hidden p-1 neon-border-purple relative shadow-[0_0_80px_rgba(var(--neon-secondary-rgb),0.15)] group">
             <div className="absolute inset-0 bg-gradient-to-tr from-[var(--neon-secondary)]/20 to-transparent pointer-events-none group-hover:opacity-40 transition-opacity" />
             <div className="h-full w-full rounded-[var(--radius-card)] bg-black/40 flex flex-col items-center justify-center p-12 text-center text-white/10 group-hover:text-white/20 transition-all">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sword size={100} className="mb-8" />
                </motion.div>
                <p className="text-[10px] font-mono uppercase tracking-[0.8em]">The Struggler</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Greetings. I am ULTRON:RCIBT. How may I assist your navigation today?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    const userQuery = input.toLowerCase();
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      let response = "Analyzing query through causal manifolds... I recommend checking the Research section for RCIBT specifics.";
      if (userQuery.includes("physics") || userQuery.includes("rcibt")) {
        response = "RCIBT explores Recursive Causal Instability. You can find the full paper link in the Research Lab.";
      } else if (userQuery.includes("project") || userQuery.includes("engine")) {
        response = "The Dev Forge showcases the Voxel Engine and AI Judging system. Both are top-tier engineering feats.";
      } else if (userQuery.includes("martial") || userQuery.includes("boxing")) {
        response = "The Dojo detail's Piyush's martial arts path. He analyzes combat through physics.";
      }
      
      setMessages(prev => [...prev, { 
        text: response, 
        isUser: false 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass p-4 w-[calc(100vw-3rem)] sm:w-96 shadow-2xl border-white/10"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--neon-primary)]/20 rounded-full flex items-center justify-center">
                  <Cpu size={16} className="text-[var(--neon-primary)]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 h-4">
                    {isTyping ? (
                      <div className="flex gap-1 items-center">
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 h-1 bg-[var(--neon-primary)] rounded-full" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 h-1 bg-[var(--neon-primary)] rounded-full" />
                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 h-1 bg-[var(--neon-primary)] rounded-full" />
                        <span className="text-[9px] font-mono text-[var(--neon-primary)] uppercase tracking-widest ml-1">Thinking</span>
                      </div>
                    ) : (
                      <p className="text-xs font-bold font-mono">ULTRON:RCIBT</p>
                    )}
                  </div>
                  <p className="text-[8px] uppercase tracking-widest text-white/30">Active / Quantum Link</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-40 hover:opacity-100"><X size={16}/></button>
            </div>
            
            <div className="h-48 overflow-y-auto mb-4 space-y-3 px-2 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 text-xs leading-relaxed ${m.isUser ? "bg-white/10 text-white" : "bg-[var(--neon-primary)]/5 text-[var(--neon-primary)] border border-[var(--neon-primary)]/20"}`} style={{ borderRadius: "var(--radius-card)" }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Ultron..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[var(--neon-primary)] transition-colors"
              />
              <button type="submit" className="p-2 bg-[var(--neon-primary)] text-black rounded-xl hover:scale-105 transition-transform">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[var(--neon-primary)] text-black rounded-full shadow-[0_0_20px_rgba(var(--neon-primary-rgb),0.4)] flex items-center justify-center"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </motion.button>
    </div>
  );
};

const Footer = () => {
  const socialLinks = {
    insta: "https://www.instagram.com/senpai_ronzai?igsh=MW02Znd6Zmd0aHhhZA==",
    yt: "https://youtube.com/@senpaironzai?si=WR3Q0QSrlSXFjd2Y",
    github: "https://github.com/piyushsingh240995-code"
  };

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="space-y-1">
          <div className="text-sm font-mono font-bold tracking-tight text-glow-cyan">PIYUSH SINGH</div>
          <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest leading-none">
            Polymath • Theoretical Physicist • Developer
          </div>
          <a href="mailto:piyushsingh240995@gmail.com" className="text-xs text-[var(--neon-primary)] opacity-60 hover:opacity-100 block transition-opacity pt-2">
            piyushsingh240995@gmail.com
          </a>
        </div>
        <div className="flex gap-8">
          <motion.a whileHover={{ y: -3, scale: 1.1 }} href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 hover:text-[var(--neon-primary)] transition-all flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-glow-cyan"><Github size={18} /> GitHub</motion.a>
          <motion.a whileHover={{ y: -3, scale: 1.1 }} href={socialLinks.insta} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 hover:text-[var(--neon-secondary)] transition-all flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-glow-purple"><Instagram size={18} /> Insta</motion.a>
          <motion.a whileHover={{ y: -3, scale: 1.1 }} href={socialLinks.yt} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 hover:text-red-500 transition-all flex items-center gap-2 text-xs font-mono uppercase tracking-widest"><Youtube size={18} /> YouTube</motion.a>
        </div>
        <div className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/40 px-3 py-1 rounded-full uppercase tracking-widest">
          Version: Final 1.0
        </div>
      </div>
    </footer>
  );
};

const BackgroundParticles = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Parallax Layer 1 */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`p1-${i}`}
            className="absolute w-1 h-1 rounded-full bg-[var(--neon-primary)]"
            initial={{ 
              opacity: 0.05,
              x: Math.random() * 100 + "vw", 
              y: Math.random() * 100 + "vh" 
            }}
            animate={{ 
              y: ["-10vh", "110vh"],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ 
              duration: Math.random() * 20 + 20, 
              repeat: Infinity, 
              ease: "linear",
            }}
            style={{ 
              filter: "blur(1px)",
              boxShadow: "0 0 15px var(--neon-primary)"
            }}
          />
        ))}
      </motion.div>
      
      {/* Parallax Layer 2 */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`p2-${i}`}
            className="absolute w-1 h-1 rounded-full bg-[var(--neon-secondary)]"
            initial={{ 
              opacity: 0.03,
              x: Math.random() * 100 + "vw", 
              y: Math.random() * 100 + "vh" 
            }}
            animate={{ 
              y: ["110vh", "-10vh"],
              opacity: [0.03, 0.1, 0.03],
            }}
            transition={{ 
              duration: Math.random() * 25 + 25, 
              repeat: Infinity, 
              ease: "linear",
            }}
            style={{ 
              filter: "blur(2px)",
              boxShadow: "0 0 12px var(--neon-secondary)"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const handleThemeChange = (newTheme: string) => {
    setIsSwitching(true);
    setTimeout(() => {
      setCurrentTheme(newTheme);
      setTimeout(() => setIsSwitching(false), 500);
    }, 500);
  };

  return (
    <div key={currentTheme} className="font-sans selection:bg-[var(--neon-primary)] selection:text-black">
      <AnimatePresence>
        {isSwitching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 text-center"
          >
            <div className="space-y-4">
              <motion.div 
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="h-[2px] bg-[var(--neon-primary)] shadow-[0_0_20px_rgba(var(--neon-primary-rgb),1)] mx-auto"
                style={{ width: "300px" }}
              />
              <p className="text-[10px] font-mono uppercase tracking-[1em] text-[var(--neon-primary)] animate-pulse">
                Calibrating {currentTheme === "default" ? "Cyber" : currentTheme} Environment
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BackgroundParticles />
      <Navbar currentTheme={currentTheme} onThemeChange={handleThemeChange} />
      <AnimatePresence mode="wait">
        <motion.main
          key={currentTheme}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            show: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.15,
                delayChildren: 0.3
              }
            },
            exit: { 
              opacity: 0,
              transition: { 
                staggerChildren: 0.08,
                staggerDirection: -1
              }
            }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -40, scale: 0.95 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><Hero /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -40, scale: 0.95 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><ResearchLab /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -40, scale: 0.95 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><DevForge /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -40, scale: 0.95 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><CreativeStudio /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -40, scale: 0.95 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><TheDojo /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -40, scale: 0.95 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><AIAssistant /></motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -40, scale: 0.95 } }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}><Footer /></motion.div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
