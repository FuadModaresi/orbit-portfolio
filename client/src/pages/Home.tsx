/*
 * Lunar Interface reminder: graphite surface, moonstone type, signal cobalt,
 * asymmetric observatory framing, and purposeful motion. Keep interaction
 * tactile, quiet, and legible.
 */
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Circle,
  Menu,
  Move3d,
  Plus,
  ScanLine,
  X,
} from "lucide-react";

const heroImage = "/assets/orbit-hero-reference.png";
const markImage = "/assets/orbit-mark.svg";

const projects = [
  {
    index: "01",
    year: "2026",
    title: "Kinetic Field",
    type: "Identity · Digital experience",
    description:
      "A living identity system for a cultural platform that turns research into a moving, navigable landscape.",
    tone: "cobalt",
  },
  {
    index: "02",
    year: "2025",
    title: "Quiet Systems",
    type: "Product direction · Interface",
    description:
      "A calm operating layer for a climate intelligence team, built to make complex signals easier to act on.",
    tone: "moon",
  },
  {
    index: "03",
    year: "2025",
    title: "Atlas / 03",
    type: "Strategy · Experience design",
    description:
      "A modular visual language for a global studio working across cities, disciplines, and time zones.",
    tone: "acid",
  },
];

const services = [
  [
    "01",
    "Creative direction",
    "Point of view, rhythm, and rules — calibrated early so the work can stay coherent as it moves.",
  ],
  [
    "02",
    "Identity systems",
    "A visual language with enough structure to repeat, and enough tension to remain alive.",
  ],
  [
    "03",
    "Digital experiences",
    "Interfaces that turn dense signals into a clear next step without sanding away the nuance.",
  ],
];

function usePointerTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 80, damping: 18, mass: 0.7 });
  const springY = useSpring(rotateY, { stiffness: 80, damping: 18, mass: 0.7 });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(x * 20);
      rotateX.set(y * -20);
    };
    const reset = () => {
      rotateY.set(0);
      rotateX.set(0);
    };

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", reset);
    };
  }, [rotateX, rotateY]);

  return { ref, springX, springY };
}

function HeroObject() {
  const { ref, springX, springY } = usePointerTilt();
  const orbX = useTransform(springY, [-20, 20], [-16, 16]);
  const orbY = useTransform(springX, [-20, 20], [12, -12]);

  return (
    <div
      ref={ref}
      className="hero-object-stage"
      aria-label="Interactive 3D orbit object. Move your cursor across it."
    >
      <motion.div
        className="orbit-rings"
        style={{ rotateX: springX, rotateY: springY }}
      >
        <span className="ring ring-one" />
        <span className="ring ring-two" />
        <span className="ring ring-three" />
      </motion.div>
      <motion.div
        className="orbital-core"
        style={{ x: orbX, y: orbY, rotateX: springX, rotateY: springY }}
      >
        <div className="orb-glow" />
        <div className="orb-surface">
          <span className="orb-highlight" />
          <span className="orb-shadow" />
          <span className="orb-grid" />
        </div>
      </motion.div>
      <motion.span className="signal-dot" style={{ x: orbX, y: orbY }} />
      <div className="object-caption">
        <span className="caption-line" />
        <span>pointer field / 01</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = ["top", "work", "approach", "contact"];
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
      const current = sectionIds.reduce((visible, id) => {
        const section = document.getElementById(id);
        if (!section) return visible;
        return section.getBoundingClientRect().top <= window.innerHeight * 0.34
          ? id
          : visible;
      }, "top");
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const jumpTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <main className="orbit-page">
      <div className="ambient-grain" />
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <aside className="section-rail" aria-label="Section index">
        <div className="rail-label">orbit / frame</div>
        {[
          ["top", "01", "signal"],
          ["work", "02", "specimens"],
          ["approach", "03", "method"],
          ["contact", "04", "contact"],
        ].map(([id, number, label]) => (
          <button
            key={id}
            className={activeSection === id ? "is-current" : ""}
            onClick={() => jumpTo(id)}
            aria-label={`Go to ${label}`}
          >
            <span>{number}</span>
            <i />
            <b>{label}</b>
          </button>
        ))}
        <div className="rail-end">
          <span /> calibrated
        </div>
      </aside>

      <header className={`site-header ${menuOpen ? "menu-is-open" : ""}`}>
        <button
          className="brand-lockup"
          onClick={() => jumpTo("top")}
          aria-label="Orbit home"
        >
          <img src={markImage} alt="" className="brand-mark" />
          <span className="brand-name">
            orbit<span className="brand-dot">.</span>
          </span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => jumpTo("work")}>
            Selected work <span>02</span>
          </button>
          <button onClick={() => jumpTo("approach")}>
            Approach <span>03</span>
          </button>
          <button onClick={() => jumpTo("contact")}>
            Contact <span>04</span>
          </button>
        </nav>
        <div className="header-meta">
          <span className="availability">
            <i /> available for select projects
          </span>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <button onClick={() => jumpTo("work")}>
              Selected work <span>02</span>
            </button>
            <button onClick={() => jumpTo("approach")}>
              Approach <span>03</span>
            </button>
            <button onClick={() => jumpTo("contact")}>
              Contact <span>04</span>
            </button>
          </nav>
        )}
      </header>

      <section id="top" className="hero-section">
        <div
          className="hero-image-layer"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="hero-topline section-frame">
          <span>Independent designer / developer</span>
          <span>New York · Worldwide</span>
        </div>
        <div className="hero-layout section-frame">
          <div className="hero-copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Creative technology / 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.8 }}
            >
              I make complex
              <span>ideas legible</span>
              <em>in motion.</em>
            </motion.h1>
            <motion.p
              className="hero-intro"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.7 }}
            >
              Orbit is the independent practice of Maya Chen — a designer and
              developer shaping identities, interfaces, and digital worlds with
              a pulse.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.65 }}
            >
              <button className="signal-button" onClick={() => jumpTo("work")}>
                <span>Enter the signal</span>
                <ArrowDownRight size={18} />
              </button>
              <span className="scroll-note">
                <MouseLine /> scroll to explore
              </span>
            </motion.div>
          </div>
          <div className="hero-visual-wrap">
            <HeroObject />
          </div>
        </div>
        <div className="hero-bottomline section-frame">
          <span className="hero-scroll-index">
            01 <span className="index-rule" /> 04
          </span>
          <span className="hero-note">
            A portfolio in orbit around the useful, the strange, and the
            beautifully unfinished.
          </span>
          <span className="hero-side-mark">⌁</span>
        </div>
      </section>

      <section
        className="intro-strip section-frame"
        aria-label="Practice statement"
      >
        <div className="strip-marker">
          <Circle size={8} fill="currentColor" /> signal / 00
        </div>
        <p>
          Good design does not simplify the world.
          <br />
          <strong>It gives people a better way through it.</strong>
        </p>
        <span className="strip-arrow">
          <ArrowDownRight size={22} />
        </span>
      </section>

      <section id="work" className="work-section section-frame">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work / 02</p>
            <h2>
              Signals
              <br />
              <span>in the wild.</span>
            </h2>
          </div>
          <p className="section-description">
            A selection of identities, products, and digital experiences made
            with people who prefer the sharp route to the obvious one.
          </p>
        </div>

        <div className="project-list" ref={trackRef}>
          {projects.map((project, index) => (
            <motion.article
              className={`project-row ${activeProject === index ? "is-active" : ""}`}
              key={project.title}
              onMouseEnter={() => setActiveProject(index)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <div className="project-meta">
                <span className="project-index">{project.index}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="project-type">{project.type}</p>
                <p className="project-description">{project.description}</p>
                <button
                  className="project-link"
                  aria-label={`View ${project.title} project`}
                >
                  <span>View case study</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>
              <div className={`project-image-wrap tone-${project.tone}`}>
                <div
                  className={`specimen-art specimen-${index + 1}`}
                  aria-hidden="true"
                >
                  <span className="specimen-disc" />
                  <span className="specimen-arc arc-a" />
                  <span className="specimen-arc arc-b" />
                  <span className="specimen-slab" />
                  <span className="specimen-marker" />
                  <span className="specimen-gridlines" />
                </div>
                <span className="project-image-label">
                  orbit / {project.index} · specimen
                </span>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="work-footer">
          <span>
            <ScanLine size={14} /> more work available on request
          </span>
          <button onClick={() => jumpTo("contact")}>
            Ask for the archive <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <section id="approach" className="approach-section">
        <div className="section-frame approach-inner">
          <div className="approach-intro">
            <p className="eyebrow">Approach / 03</p>
            <h2>
              Make the
              <br />
              <span>signal clear.</span>
            </h2>
            <p>
              I start below the brief, where the useful question is usually
              quieter. Then I build a system that can hold a point of view,
              carry a feeling, and still work when the spotlight moves.
            </p>
            <button className="text-button" onClick={() => jumpTo("contact")}>
              More about the practice <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="services-list">
            {services.map(([number, title, description]) => (
              <div className="service-item" key={number}>
                <span className="service-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Plus size={18} className="service-plus" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="manifesto-section section-frame">
        <div className="manifesto-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="manifesto-copy">
          <p className="eyebrow">Working note / ∞</p>
          <h2>
            Keep the strange
            <br />
            <em>part.</em>
          </h2>
          <p>That is usually where the useful idea is hiding.</p>
        </div>
        <div className="manifesto-side">
          <Move3d size={16} />
          <span>
            Curiosity is a<br />
            production method.
          </span>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div className="section-frame footer-inner">
          <div className="footer-topline">
            <span>Contact / 04</span>
            <span>Signal received 2026</span>
          </div>
          <div className="footer-copy">
            <p className="eyebrow">Have a signal to send?</p>
            <h2>
              Let’s make
              <br />
              <span>something move.</span>
            </h2>
            <a className="footer-email" href="mailto:hello@orbit.studio">
              hello@orbit.studio <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="footer-bottomline">
            <div className="footer-brand">
              <img src={markImage} alt="" className="brand-mark" />
              <span>
                orbit<span className="brand-dot">.</span>
              </span>
            </div>
            <span>© 2026 fuadModaresiRad orbit.fmdstudio</span>
            <div className="footer-links">
              <a
                href="https://fmdstudio.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                fmdstudio
              </a>
              <a href="https://www.are.na" target="_blank" rel="noreferrer">
                Are.na
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function MouseLine() {
  return (
    <span className="mouse-line" aria-hidden="true">
      <span />
    </span>
  );
}
