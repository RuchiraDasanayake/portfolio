import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  ArrowRight,
  Database,
  Cpu,
  Code,
  Terminal,
  Sun,
  Moon
} from 'lucide-react';

/**
 * ------------------------------------------------------------------
 * 1. CONFIGURATION & DATA
 * ------------------------------------------------------------------
 */
const DATA = {
  name: "Ruchira Dasanayake",
  role: "Associate Software Engineer & Data Scientist",
  tagline: "Exploring the possibilities of tomorrow through Data Science & AI.",
  location: "Colombo, Sri Lanka",
  about: "I am a passionate final-year undergraduate at SLIIT, dedicated to honing my programming skills and nurturing a profound love for mathematics. At 23 years old, I am poised to transition into the captivating field of Data Science, blending Software Engineering with AI innovation.",
  experience: [
    {
      company: "Innobot Health",
      role: "Associate Software Engineer",
      period: "Dec 2024 - Present",
      type: "Full-time · Hybrid",
      desc: "Specializing in Python, Robotic Process Automation (RPA), and building intelligent software solutions for healthcare.",
      icon: Briefcase
    }
  ],
  education: [
    {
      school: "SLIIT",
      degree: "BSc (Hons) in Information Technology (Data Science)",
      period: "2022 - 2026",
      desc: "Focusing on Database Management Systems, Machine Learning, and Big Data Analytics.",
      icon: GraduationCap
    },
    {
      school: "Nalanda College Colombo",
      degree: "Secondary Education",
      period: "2013 - 2022",
      desc: "Communication and Critical Thinking focus.",
      icon: GraduationCap
    }
  ],
  projects: [
    {
      title: "Text-Sage",
      category: "NLP & Web Analytics",
      desc: "Information Retrieval and Web Analytics module project. A smart text analysis tool designed to extract insights from unstructured data.",
      tech: ["Python", "NLP", "React"],
      links: [{ label: "View", url: "#" }]
    },
    {
      title: "End-to-End DW/BI Solution",
      category: "Data Engineering",
      desc: "A complete Data Warehousing and Business Intelligence solution using Brazilian E-Commerce datasets for advanced analytics.",
      tech: ["Data Warehousing", "ETL", "PowerBI"],
      links: []
    },
    {
      title: "House Price Prediction",
      category: "Machine Learning",
      desc: "Regression model based system developed using US-based Kaggle datasets to predict housing market trends.",
      tech: ["Python", "Scikit-Learn", "Pandas"],
      links: []
    }
  ],
  skills: [
    { name: "Python", level: 85, icon: Terminal },
    { name: "Data Science", level: 85, icon: Database },
    { name: "Machine Learning", level: 85, icon: Cpu },
    { name: "RPA", level: 90, icon: Code },
    { name: "Java", level: 70, icon: Code },
    { name: "AWS Cloud", level: 65, icon: Database },
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/ruchira-dasanayake-5baa27274/",
    github: "#", // Placeholder
    email: "mailto:contact@ruchira.dev" // Placeholder
  }
};

/**
 * ------------------------------------------------------------------
 * 2. CUSTOM HOOKS & UTILS
 * ------------------------------------------------------------------
 */
const useGoogleFonts = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@500;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); }
  }, []);
};

// Hook to detect when element enters viewport
const useOnScreen = (ref, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isVisible;
};

// Scramble Text Effect Hook
const useScramble = (text) => {
  const [display, setDisplay] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  return { display, scramble };
};

/**
 * ------------------------------------------------------------------
 * 3. THREE.JS BACKGROUND (Holographic Network)
 * ------------------------------------------------------------------
 */
const ThreeBackground = ({ isDark }) => {
  const mountRef = useRef(null);
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    if (!mountRef.current) return;
    
    let THREE;
    let scene, camera, renderer;
    let particleGroup, wireframeMesh;
    let animationFrameId;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const init = async () => {
      if (!window.THREE) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
          THREE = window.THREE;
          setupScene();
        };
        document.body.appendChild(script);
      } else {
        THREE = window.THREE;
        setupScene();
      }
    };

    const setupScene = () => {
      scene = new THREE.Scene();
      // Add fog for depth
      scene.fog = new THREE.FogExp2(isDarkRef.current ? 0x0a0a0a : 0xffffff, 0.001);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
      camera.position.z = 1200;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      particleGroup = new THREE.Group();
      scene.add(particleGroup);

      // --- 1. The Wireframe Core (Structured Data) ---
      const geometryWireframe = new THREE.IcosahedronGeometry(600, 1);
      const materialWireframe = new THREE.MeshBasicMaterial({
        color: isDarkRef.current ? 0x06b6d4 : 0x6366f1, // Cyan vs Indigo
        wireframe: true,
        transparent: true,
        opacity: 0.05, // Reduced opacity for subtlety
      });
      wireframeMesh = new THREE.Mesh(geometryWireframe, materialWireframe);
      particleGroup.add(wireframeMesh);

      // --- 2. The Particle Cloud (Raw Data) ---
      const geometryParticles = new THREE.BufferGeometry();
      const vertices = [];
      const particleCount = 800; // Reduced count for less distraction

      for (let i = 0; i < particleCount; i++) {
        const r = 800 + Math.random() * 400; // Spread out more
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        vertices.push(x, y, z);
      }

      geometryParticles.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      const materialParticles = new THREE.PointsMaterial({
        color: isDarkRef.current ? 0x06b6d4 : 0x4f46e5, 
        size: 2, // Smaller size
        transparent: true,
        opacity: 0.3, // Lower opacity
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometryParticles, materialParticles);
      particleGroup.add(particles);

      document.addEventListener('mousemove', onDocumentMouseMove);
      window.addEventListener('resize', handleResize);
      animate();
    };

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    const handleResize = () => {
      if (camera && renderer) {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Theme Transition Logic
      if (scene && wireframeMesh) {
         scene.fog.color.setHex(isDarkRef.current ? 0x0a0a0a : 0xffffff);
         
         // Interpolate colors
         const targetColor = new THREE.Color(isDarkRef.current ? 0x06b6d4 : 0x4f46e5);
         wireframeMesh.material.color.lerp(targetColor, 0.05);
         // Access particles mesh (child 1)
         if(particleGroup.children[1]) {
             particleGroup.children[1].material.color.lerp(targetColor, 0.05);
         }
      }

      if (particleGroup) {
        // Automatic Rotation - Slower
        particleGroup.rotation.y += 0.0005;
        wireframeMesh.rotation.x -= 0.0005; // Counter-rotate core

        // Interactive Tilt - Reduced Sensitivity
        targetX = mouseX * 0.0001;
        targetY = mouseY * 0.0001;
        
        particleGroup.rotation.y += 0.05 * (targetX - particleGroup.rotation.y);
        particleGroup.rotation.x += 0.05 * (targetY - particleGroup.rotation.x);
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    init();

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer) mountRef.current.removeChild(renderer.domElement);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 transition-colors duration-1000 ease-in-out ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#ffffff]'}`} 
    />
  );
};

/**
 * ------------------------------------------------------------------
 * 4. UI COMPONENTS (Spotlight & Effects)
 * ------------------------------------------------------------------
 */

const CustomCursor = ({ isDark }) => {
  const cursorRef = useRef(null);
  const trailerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trailer = trailerRef.current;
    
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      if (cursor) cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      if (trailer) {
        trailer.animate({
          left: `${clientX - 10}px`,
          top: `${clientY - 10}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button { cursor: none; }
        .cursor-dot {
          width: 8px; height: 8px; 
          background: ${isDark ? '#06b6d4' : '#4f46e5'};
          position: fixed; top: 0; left: 0;
          border-radius: 50%; pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%);
          transition: background 0.3s ease;
        }
        .cursor-trailer {
          width: 30px; height: 30px;
          border: 1px solid ${isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(79, 70, 229, 0.5)'};
          position: fixed; top: 0; left: 0;
          border-radius: 50%; pointer-events: none; z-index: 9998;
          transition: 0.1s ease-out, border 0.3s ease;
        }
      `}</style>
      <div ref={cursorRef} className="cursor-dot hidden md:block" />
      <div ref={trailerRef} className="cursor-trailer hidden md:block" />
    </>
  );
};

const ScrambleLink = ({ href, children, isDark, onClick }) => {
  const { display, scramble } = useScramble(children);
  
  return (
    <button 
      onClick={onClick}
      onMouseEnter={scramble}
      className={`relative group py-2 font-['Space_Grotesk'] font-bold tracking-widest text-sm uppercase transition-colors
        ${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-indigo-600'}
      `}
    >
      {display}
      <span className={`absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300
        ${isDark ? 'bg-cyan-500' : 'bg-indigo-600'}
      `}></span>
    </button>
  );
};

// Card with "Spotlight" effect
const SpotlightCard = ({ children, className = "", isDark }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={`relative rounded-2xl overflow-hidden border transition-colors duration-500
        ${isDark 
          ? 'bg-gray-900/40 border-white/10' 
          : 'bg-white border-slate-200'
        }
        ${className}
      `}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${isDark ? 'rgba(6,182,212,0.1)' : 'rgba(99,102,241,0.1)'}, transparent 40%)`,
        }}
      />
      <div className="relative h-full p-8 md:p-10">{children}</div>
    </div>
  );
};

const FadeInSection = ({ children, className }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, "-50px");

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({ children, number, isDark }) => (
  <FadeInSection className="flex items-end gap-6 mb-16 group cursor-none">
    <span className={`font-['Space_Grotesk'] text-5xl md:text-6xl opacity-50 group-hover:opacity-100 transition-opacity translate-y-1 ${isDark ? 'text-cyan-500' : 'text-indigo-600'}`}>{number}</span>
    <h2 className={`text-6xl md:text-7xl font-bold tracking-tight font-['Outfit'] transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>{children}</h2>
  </FadeInSection>
);

const ProjectCard = ({ project, isDark }) => (
  <SpotlightCard isDark={isDark} className="flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
    <div className="flex justify-between items-start mb-8">
      <div className={`px-4 py-2 rounded-full font-['Space_Grotesk'] text-sm uppercase tracking-widest font-bold transition-colors duration-500
        ${isDark ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' : 'bg-indigo-50 border border-indigo-200 text-indigo-700'}
      `}>
        {project.category}
      </div>
      <div className="flex gap-4">
         {project.links.map((link, idx) => (
           <a key={idx} href={link.url} className={`transition-colors ${isDark ? 'text-gray-500 hover:text-cyan-400' : 'text-slate-400 hover:text-indigo-600'}`}>
             <ExternalLink size={24} />
           </a>
         ))}
      </div>
    </div>
    
    <h3 className={`text-3xl font-bold mb-4 font-['Outfit'] transition-colors duration-500 ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-indigo-600'}`}>
      {project.title}
    </h3>
    
    <p className={`mb-10 text-lg leading-relaxed font-['Inter'] flex-grow transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
      {project.desc}
    </p>
    
    <div className={`flex flex-wrap gap-3 mt-auto pt-8 border-t transition-colors duration-500 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
      {project.tech.map((t, i) => (
        <span key={i} className={`text-sm font-['Space_Grotesk'] px-3 py-1 rounded-full transition-colors duration-500 ${isDark ? 'text-gray-400 bg-white/5' : 'text-slate-500 bg-slate-100'}`}>
          #{t}
        </span>
      ))}
    </div>
  </SpotlightCard>
);

const ExpCard = ({ item, isDark }) => (
  <FadeInSection className={`group border-l-2 ml-3 pl-10 pb-20 relative last:pb-0 transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-slate-200'}`}>
    <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 transition-all duration-300
      ${isDark 
        ? 'bg-black border-gray-600 group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.6)]' 
        : 'bg-white border-slate-300 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:shadow-lg'
      }
    `}></div>
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-3">
      <h3 className={`text-2xl md:text-3xl font-bold font-['Outfit'] transition-colors duration-500 ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-indigo-600'}`}>{item.role}</h3>
      <span className={`text-base font-['Space_Grotesk'] font-medium mt-2 sm:mt-0 transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{item.period}</span>
    </div>
    <div className={`text-lg mb-6 font-medium font-['Inter'] tracking-wide transition-colors duration-500 ${isDark ? 'text-cyan-500/90' : 'text-indigo-600/90'}`}>
      {item.company} <span className="text-gray-400 px-2">•</span> {item.type}
    </div>
    <p className={`text-lg md:text-xl leading-relaxed font-['Inter'] max-w-4xl transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
      {item.desc}
    </p>
  </FadeInSection>
);

const ScrollProgress = ({ isDark }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setWidth(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100]">
      <div 
        className={`h-full transition-all duration-100 ease-out ${isDark ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-indigo-600'}`} 
        style={{ width: `${width * 100}%` }}
      />
    </div>
  );
};

/**
 * ------------------------------------------------------------------
 * 5. MAIN APP
 * ------------------------------------------------------------------
 */
export default function Portfolio() {
  useGoogleFonts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen font-['Inter'] transition-colors duration-1000 ease-in-out overflow-x-hidden
      ${isDark ? 'text-gray-200 selection:bg-cyan-500/30 selection:text-white' : 'text-slate-800 selection:bg-indigo-200 selection:text-slate-900'}
    `}>
      
      <ScrollProgress isDark={isDark} />
      <ThreeBackground isDark={isDark} />
      <CustomCursor isDark={isDark} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-colors duration-500
        ${isDark ? 'bg-[#0a0a0a]/80 border-white/5' : 'bg-white/80 border-slate-200'}
      `}>
        <div className="w-[98%] max-w-[2000px] mx-auto h-24 flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <div 
            className={`text-3xl font-bold tracking-tighter cursor-none transition-colors font-['Space_Grotesk'] group
              ${isDark ? 'text-white hover:text-cyan-400' : 'text-slate-900 hover:text-indigo-600'}
            `}
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            RD<span className={`text-4xl transition-colors ${isDark ? 'text-cyan-500' : 'text-indigo-600'}`}>.</span>
          </div>
          
          {/* Desktop Nav + Toggle */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex gap-10">
              {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
                <ScrambleLink 
                  key={item} 
                  isDark={isDark} 
                  onClick={() => scrollTo(item.toLowerCase())}
                >
                  {item}
                </ScrambleLink>
              ))}
            </div>

            <div className="w-[1px] h-8 bg-gray-200/20"></div>

            {/* Theme Toggle in Nav */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12
                ${isDark ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
              `}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-6 md:hidden">
             <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300
                ${isDark ? 'bg-white/10 text-yellow-400' : 'bg-slate-100 text-slate-700'}
              `}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              className={`p-2 font-['Space_Grotesk'] font-bold tracking-widest transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className={`md:hidden border-b p-8 flex flex-col gap-8 h-screen transition-colors duration-500
            ${isDark ? 'bg-black border-gray-800' : 'bg-white border-slate-200'}
          `}>
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())}
                className={`text-left text-4xl font-['Space_Grotesk'] uppercase hover:translate-x-4 transition-all font-bold
                  ${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}
                `}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="w-[98%] max-w-[2000px] mx-auto pt-32 px-6 md:px-12 relative z-10">
        
        {/* HERO */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center">
          <div className="space-y-12 max-w-7xl">
            <FadeInSection>
              <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-full border backdrop-blur-sm transition-colors duration-500
                ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-slate-200 shadow-sm'}
              `}>
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-cyan-400' : 'bg-indigo-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isDark ? 'bg-cyan-500' : 'bg-indigo-600'}`}></span>
                </span>
                <span className={`text-sm font-['Space_Grotesk'] uppercase tracking-widest font-bold ${isDark ? 'text-cyan-300' : 'text-indigo-700'}`}>
                  Available for hire
                </span>
              </div>
            </FadeInSection>
            
            <FadeInSection>
              <h1 className={`text-7xl md:text-[8rem] font-bold leading-[0.9] tracking-tighter transition-colors duration-500 font-['Outfit'] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Crafting <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-cyan-400 to-purple-500' : 'from-indigo-600 to-violet-600'}`}>Intelligence</span> <br />
                from Data.
              </h1>
            </FadeInSection>
            
            <FadeInSection>
              <p className={`text-2xl md:text-3xl max-w-4xl font-['Inter'] font-light leading-relaxed transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                Hi, I'm <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Ruchira Dasanayake</span>. 
                I am a Data Scientist & Software Engineer bridging the gap between raw data and actionable intelligence.
              </p>
            </FadeInSection>
            
            <FadeInSection className="pt-8 flex flex-wrap gap-6">
              <a 
                href={DATA.socials.linkedin} 
                className={`px-10 py-5 font-bold text-base font-['Space_Grotesk'] tracking-widest rounded transition-all flex items-center gap-3
                  ${isDark ? 'bg-white text-black hover:bg-cyan-50' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl'}
                `}
              >
                LINKEDIN <ArrowRight size={20} />
              </a>
              <button 
                onClick={() => scrollTo('contact')} 
                className={`px-10 py-5 border font-bold text-base font-['Space_Grotesk'] tracking-widest rounded transition-all
                  ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-300 text-slate-900 hover:bg-white hover:shadow-md'}
                `}
              >
                CONTACT ME
              </button>
            </FadeInSection>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-32 md:py-48">
          <SectionTitle number="01." isDark={isDark}>The Narrative</SectionTitle>
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20 xl:gap-40">
            <FadeInSection className={`text-xl md:text-2xl leading-relaxed font-['Inter'] font-light space-y-8 transition-colors duration-500 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              <p>{DATA.about}</p>
              <p>
                Currently at <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Innobot Health</strong>, I integrate robotic process automation with modern software engineering practices. My work is not just about writing code—it's about designing systems that can learn, adapt, and scale.
              </p>
            </FadeInSection>
            
            <FadeInSection>
              <h3 className={`text-base font-['Space_Grotesk'] uppercase tracking-widest mb-10 pb-4 border-b font-bold transition-colors duration-500
                ${isDark ? 'text-white border-white/10' : 'text-slate-900 border-slate-200'}
              `}>Technical Arsenal</h3>
              <div className="space-y-8">
                {DATA.skills.map(skill => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between text-lg mb-3 font-medium">
                      <span className={`transition-colors flex items-center gap-3 font-['Space_Grotesk'] ${isDark ? 'text-gray-300 group-hover:text-cyan-400' : 'text-slate-700 group-hover:text-indigo-600'}`}>
                         <skill.icon size={20} /> {skill.name}
                      </span>
                      <span className={`font-['Space_Grotesk'] ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{skill.level}%</span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-slate-200'}`}>
                      <div 
                        className={`h-full transition-all duration-1000 ease-out ${isDark ? 'bg-cyan-500' : 'bg-indigo-600'}`} 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-32 md:py-48">
           <SectionTitle number="02." isDark={isDark}>The Journey</SectionTitle>
           <div className="grid xl:grid-cols-2 gap-20 xl:gap-32">
             <div>
               <FadeInSection className="flex items-center gap-4 mb-16">
                 <Briefcase className={`${isDark ? 'text-cyan-500' : 'text-indigo-600'}`} size={32} />
                 <h3 className={`text-4xl font-bold font-['Outfit'] ${isDark ? 'text-white' : 'text-slate-900'}`}>Professional</h3>
               </FadeInSection>
               {DATA.experience.map((item, idx) => <ExpCard key={idx} item={item} isDark={isDark} />)}
             </div>
             <div>
               <FadeInSection className="flex items-center gap-4 mb-16">
                 <GraduationCap className={`${isDark ? 'text-purple-500' : 'text-indigo-600'}`} size={32} />
                 <h3 className={`text-4xl font-bold font-['Outfit'] ${isDark ? 'text-white' : 'text-slate-900'}`}>Academic</h3>
               </FadeInSection>
               {DATA.education.map((item, idx) => (
                 <FadeInSection key={idx} className={`group border-l-2 ml-3 pl-10 pb-20 relative last:pb-0 transition-colors duration-500 ${isDark ? 'border-gray-800' : 'border-slate-200'}`}>
                    <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 transition-all duration-300
                      ${isDark 
                        ? 'bg-black border-gray-600 group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.6)]' 
                        : 'bg-white border-slate-300 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:shadow-lg'
                      }
                    `}></div>
                    <div className="flex flex-col mb-3">
                      <h3 className={`text-2xl md:text-3xl font-bold font-['Outfit'] transition-colors ${isDark ? 'text-white group-hover:text-purple-400' : 'text-slate-900 group-hover:text-indigo-600'}`}>{item.school}</h3>
                      <span className={`text-base font-['Space_Grotesk'] font-medium mt-2 transition-colors ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{item.period}</span>
                    </div>
                    <div className={`text-lg mb-4 font-medium font-['Outfit'] tracking-wide transition-colors ${isDark ? 'text-purple-400/90' : 'text-indigo-600/90'}`}>{item.degree}</div>
                    <p className={`text-lg leading-relaxed font-['Inter'] max-w-2xl transition-colors ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{item.desc}</p>
                 </FadeInSection>
               ))}
             </div>
           </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-32 md:py-48">
          <SectionTitle number="03." isDark={isDark}>Creations</SectionTitle>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {DATA.projects.map((project, idx) => (
              <FadeInSection key={idx}>
                <ProjectCard project={project} isDark={isDark} />
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 md:py-48 mb-20">
          <FadeInSection className={`border rounded-[3rem] p-12 md:p-32 text-center relative overflow-hidden group transition-all duration-500
            ${isDark 
              ? 'bg-gradient-to-br from-gray-900/50 to-black border-white/10' 
              : 'bg-white border-slate-200 shadow-2xl'
            }
          `}>
            <div className={`absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700
              ${isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500'
              }
            `}></div>
            
            <h2 className={`text-5xl md:text-8xl font-bold mb-10 font-['Outfit'] transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Ready to Collaborate?</h2>
            <p className={`text-2xl font-light font-['Inter'] max-w-3xl mx-auto mb-16 leading-relaxed transition-colors ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              I am currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a 
              href={`mailto:${DATA.socials.email}`}
              className={`inline-block px-12 py-6 text-lg font-bold rounded-full transition-all hover:-translate-y-2 font-['Space_Grotesk'] tracking-wide
                ${isDark 
                  ? 'bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-xl'
                }
              `}
            >
              Say Hello
            </a>
          </FadeInSection>
        </section>

      </main>

      <footer className={`py-16 border-t backdrop-blur-md transition-colors duration-500
        ${isDark ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-white/50'}
      `}>
        <div className="w-[98%] max-w-[2000px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-12">
          <div className={`font-['Space_Grotesk'] text-sm tracking-widest transition-colors ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
            © 2025 RUCHIRA DASANAYAKE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-10">
            <a href={DATA.socials.linkedin} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-slate-400 hover:text-indigo-600'}`}><Linkedin size={24} /></a>
            <a href={DATA.socials.github} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-slate-400 hover:text-indigo-600'}`}><Github size={24} /></a>
            <a href={`mailto:${DATA.socials.email}`} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-cyan-400' : 'text-slate-400 hover:text-indigo-600'}`}><Mail size={24} /></a>
          </div>
        </div>
      </footer>

    </div>
  );
}