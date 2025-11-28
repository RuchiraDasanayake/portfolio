import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown, 
  Code, 
  Database, 
  Cpu, 
  Terminal,
  Briefcase,
  GraduationCap,
  ArrowRight
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
    { name: "Python", level: 90, icon: Terminal },
    { name: "Data Science", level: 85, icon: Database },
    { name: "Machine Learning", level: 80, icon: Cpu },
    { name: "RPA", level: 75, icon: Code },
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
// Inject Google Fonts
const useGoogleFonts = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700&family=Space+Grotesk:wght@300;400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); }
  }, []);
};

/**
 * ------------------------------------------------------------------
 * 3. THREE.JS BACKGROUND
 * ------------------------------------------------------------------
 */
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    let THREE;
    let scene, camera, renderer;
    let sphere;
    let animationFrameId;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const init = async () => {
      // Check for global THREE or inject script
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
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.z = 1000;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const particleCount = 2000;

      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        const r = 600; 
        const rVariation = r + (Math.random() * 30 - 15);
        const x = rVariation * Math.cos(theta) * Math.sin(phi);
        const y = rVariation * Math.sin(theta) * Math.sin(phi);
        const z = rVariation * Math.cos(phi);
        vertices.push(x, y, z);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      // Dual color particles (using vertex colors in a real app, simplified here to one nice cyan)
      const material = new THREE.PointsMaterial({
        color: 0x06b6d4, // Cyan-500
        size: 3,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      sphere = new THREE.Points(geometry, material);
      scene.add(sphere);

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
      if (sphere) {
        sphere.rotation.y += 0.001; 
        targetX = mouseX * 0.0005;
        targetY = mouseY * 0.0005;
        sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
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
      if (sphere) { sphere.geometry.dispose(); sphere.material.dispose(); }
      if (renderer) renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0a0a0a]" />;
};

/**
 * ------------------------------------------------------------------
 * 4. UI COMPONENTS (Custom Cursor & Modern Cards)
 * ------------------------------------------------------------------
 */

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trailer = trailerRef.current;
    
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Main dot follows instantly
      if (cursor) {
        cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      
      // Trailer follows with delay (using web animation API or simple timeout logic)
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
          width: 8px; height: 8px; background: #06b6d4;
          position: fixed; top: 0; left: 0;
          border-radius: 50%; pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%);
        }
        .cursor-trailer {
          width: 30px; height: 30px;
          border: 1px solid rgba(6, 182, 212, 0.5);
          position: fixed; top: 0; left: 0;
          border-radius: 50%; pointer-events: none; z-index: 9998;
          transition: 0.1s ease-out;
        }
      `}</style>
      <div ref={cursorRef} className="cursor-dot hidden md:block" />
      <div ref={trailerRef} className="cursor-trailer hidden md:block" />
    </>
  );
};

const SectionTitle = ({ children, number }) => (
  <div className="flex items-end gap-3 mb-12 group cursor-none">
    <span className="text-cyan-500 font-['Space_Grotesk'] text-4xl opacity-50 group-hover:opacity-100 transition-opacity translate-y-1">{number}</span>
    <h2 className="text-5xl font-bold text-white tracking-tight font-['Outfit']">{children}</h2>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`
    bg-gray-900/40 backdrop-blur-md 
    border border-white/10 
    rounded-2xl p-8 
    hover:border-cyan-500/40 hover:bg-gray-900/60 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)]
    transition-all duration-500 ease-out
    group
    ${className}
  `}>
    {children}
  </div>
);

const ProjectCard = ({ project }) => (
  <Card className="flex flex-col h-full hover:-translate-y-2">
    <div className="flex justify-between items-start mb-6">
      <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-['Space_Grotesk'] text-xs uppercase tracking-widest">
        {project.category}
      </div>
      <div className="flex gap-4">
         {project.links.map((link, idx) => (
           <a key={idx} href={link.url} className="text-gray-500 hover:text-cyan-400 transition-colors">
             <ExternalLink size={20} />
           </a>
         ))}
      </div>
    </div>
    
    <h3 className="text-2xl font-bold text-white mb-3 font-['Outfit'] group-hover:text-cyan-400 transition-colors">
      {project.title}
    </h3>
    
    <p className="text-gray-400 mb-8 text-sm leading-7 font-light font-['Outfit'] flex-grow">
      {project.desc}
    </p>
    
    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
      {project.tech.map((t, i) => (
        <span key={i} className="text-xs font-['Space_Grotesk'] text-gray-400">
          #{t}
        </span>
      ))}
    </div>
  </Card>
);

const ExpCard = ({ item }) => (
  <div className="group border-l-2 border-gray-800 ml-3 pl-8 pb-16 relative last:pb-0">
    <div className="absolute -left-[9px] top-2 w-4 h-4 bg-black border-2 border-gray-600 rounded-full group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.6)] transition-all duration-300"></div>
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
      <h3 className="text-xl font-bold text-white font-['Outfit'] group-hover:text-cyan-400 transition-colors">{item.role}</h3>
      <span className="text-sm font-['Space_Grotesk'] text-gray-500">{item.period}</span>
    </div>
    <div className="text-cyan-500/80 text-sm mb-4 font-medium font-['Outfit']">
      {item.company} <span className="text-gray-600 px-2">•</span> {item.type}
    </div>
    <p className="text-gray-400 text-base leading-relaxed max-w-2xl font-light font-['Outfit']">
      {item.desc}
    </p>
  </div>
);

/**
 * ------------------------------------------------------------------
 * 5. MAIN APP
 * ------------------------------------------------------------------
 */
export default function Portfolio() {
  useGoogleFonts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen text-gray-200 font-['Outfit'] selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      
      <ThreeBackground />
      <CustomCursor />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="text-2xl font-bold text-white tracking-tighter cursor-none hover:text-cyan-400 transition-colors font-['Space_Grotesk']"
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            RD<span className="text-cyan-500 text-3xl">.</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-xs font-['Space_Grotesk'] uppercase tracking-[0.2em] text-gray-400 font-medium">
            {['About', 'Experience', 'Projects', 'Contact'].map((item, i) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())}
                className="hover:text-white hover:tracking-[0.25em] transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-gray-800 p-8 flex flex-col gap-6">
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-left text-2xl font-['Space_Grotesk'] uppercase text-gray-400 hover:text-white hover:translate-x-2 transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* HERO */}
        <section id="home" className="min-h-screen flex flex-col justify-center pt-20">
          <div className="space-y-8 max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-['Space_Grotesk'] text-cyan-300 uppercase tracking-widest font-semibold">
                Available for hire
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-[1.05] tracking-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Intelligence</span> <br />
              from Data.
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl font-light leading-relaxed">
              Hi, I'm <span className="text-white font-medium">Ruchira Dasanayake</span>. 
              I am a Data Scientist & AI Engineer bridging the gap between raw data and actionable intelligence.
            </p>
            
            <div className="pt-8 flex flex-wrap gap-6">
              <a 
                href={DATA.socials.linkedin} 
                className="px-8 py-4 bg-white text-black font-bold text-sm font-['Space_Grotesk'] tracking-wide rounded hover:bg-cyan-50 transition-colors flex items-center gap-2"
              >
                LINKEDIN <ArrowRight size={16} />
              </a>
              <button 
                onClick={() => scrollTo('contact')} 
                className="px-8 py-4 border border-white/20 text-white font-bold text-sm font-['Space_Grotesk'] tracking-wide rounded hover:bg-white/10 transition-colors"
              >
                CONTACT ME
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-6 flex items-center gap-4 text-xs font-['Space_Grotesk'] tracking-widest text-gray-500 animate-pulse">
            SCROLL TO EXPLORE
            <div className="w-16 h-[1px] bg-gray-700"></div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-32">
          <SectionTitle number="01.">The Narrative</SectionTitle>
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-20">
            <div className="text-gray-400 text-lg leading-8 font-light space-y-6">
              <p>{DATA.about}</p>
              <p>
                Currently at <strong className="text-white">Innobot Health</strong>, I integrate robotic process automation with modern software engineering practices. My work is not just about writing code—it's about designing systems that can learn, adapt, and scale.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-['Space_Grotesk'] text-white uppercase tracking-widest mb-8 pb-2 border-b border-white/10">Technical Arsenal</h3>
              <div className="space-y-6">
                {DATA.skills.map(skill => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-gray-300 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                         <skill.icon size={16} /> {skill.name}
                      </span>
                      <span className="text-gray-600 font-['Space_Grotesk']">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 transition-all duration-1000 ease-out" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-32">
           <SectionTitle number="02.">The Journey</SectionTitle>
           <div className="grid lg:grid-cols-2 gap-16">
             <div>
               <div className="flex items-center gap-3 mb-10">
                 <Briefcase className="text-cyan-500" size={24} />
                 <h3 className="text-2xl font-bold text-white">Professional</h3>
               </div>
               {DATA.experience.map((item, idx) => <ExpCard key={idx} item={item} />)}
             </div>
             <div>
               <div className="flex items-center gap-3 mb-10">
                 <GraduationCap className="text-purple-500" size={24} />
                 <h3 className="text-2xl font-bold text-white">Academic</h3>
               </div>
               {DATA.education.map((item, idx) => (
                 <div key={idx} className="group border-l-2 border-gray-800 ml-3 pl-8 pb-16 relative last:pb-0">
                    <div className="absolute -left-[9px] top-2 w-4 h-4 bg-black border-2 border-gray-600 rounded-full group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-all duration-300"></div>
                    <div className="flex flex-col mb-2">
                      <h3 className="text-xl font-bold text-white font-['Outfit'] group-hover:text-purple-400 transition-colors">{item.school}</h3>
                      <span className="text-sm font-['Space_Grotesk'] text-gray-500 mt-1">{item.period}</span>
                    </div>
                    <div className="text-purple-400/80 text-sm mb-2 font-medium font-['Outfit']">{item.degree}</div>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-32">
          <SectionTitle number="03.">Creations</SectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DATA.projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 mb-20">
          <div className="bg-gradient-to-br from-gray-900/50 to-black border border-white/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Collaborate?</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12">
              I am currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a 
              href={`mailto:${DATA.socials.email}`}
              className="inline-block px-10 py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-1"
            >
              Say Hello
            </a>
          </div>
        </section>

      </main>

      <footer className="py-12 border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 font-['Space_Grotesk'] text-sm">
            © 2025 RUCHIRA DASANAYAKE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            <a href={DATA.socials.linkedin} className="text-gray-400 hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
            <a href={DATA.socials.github} className="text-gray-400 hover:text-cyan-400 transition-colors"><Github size={20} /></a>
            <a href={`mailto:${DATA.socials.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>

    </div>
  );
}