/*
 * Lunar Interface reminder: graphite surface, moonstone type, signal cobalt,
 * asymmetric observatory framing, and purposeful motion. Bilingual copy must
 * feel concise and exact in both English and Persian, with RTL direction set
 * on the document when Persian is active.
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

type Language = "en" | "fa";

const heroImage = "/assets/orbit-hero-reference_edf85968.png";
const markImage = "/assets/orbit-mark.svg";

const copy = {
  en: {
    nav: {
      work: "Selected work",
      approach: "Approach",
      contact: "Contact",
      available: "available for select projects",
    },
    hero: {
      location: "New York · Worldwide",
      topline: "Independent designer / developer",
      eyebrow: "Creative technology / 2026",
      title: ["I make", "complex", "ideas legible", "in motion."],
      intro:
        "Orbit is the independent practice of Fuad M Rad — a designer and developer shaping identities, interfaces, and digital worlds with a pulse.",
      cta: "Enter the signal",
      scroll: "scroll to explore",
      note: "A portfolio in orbit around the useful, the strange, and the beautifully unfinished.",
      pointer: "pointer field / 01",
    },
    intro: {
      marker: "signal / 00",
      line1: "Good design does not simplify the world.",
      line2: "It gives people a better way through it.",
    },
    work: {
      eyebrow: "Selected work / 02",
      title1: "Signals",
      title2: "in the wild.",
      description:
        "A selection of identities, products, and digital experiences made with people who prefer the sharp route to the obvious one.",
      view: "View case study",
      archive: "more work available on request",
      ask: "Ask for the archive",
      specimen: "specimen",
      archiveLabel: "ARCHIVE / CALIBRATED",
    },
    approach: {
      eyebrow: "Approach / 03",
      title1: "Make the",
      title2: "signal clear.",
      description:
        "I start below the brief, where the useful question is usually quieter. Then I build a system that can hold a point of view, carry a feeling, and still work when the spotlight moves.",
      more: "More about the practice",
    },
    manifesto: {
      eyebrow: "Working note / ∞",
      title1: "Keep the strange",
      title2: "part.",
      note: "That is usually where the useful idea is hiding.",
      side: "Curiosity is a\nproduction method.",
    },
    footer: {
      eyebrow: "Have a signal to send?",
      title1: "Let’s make",
      title2: "something",
      title3: "move.",
      received: "Signal received 2026",
      copyright: "© 2026 مدرسی راد",
    },
    rail: ["signal", "specimens", "method", "contact"],
  },
  fa: {
    nav: {
      work: "پروژه‌های منتخب",
      approach: "رویکرد",
      contact: "تماس",
      available: "پذیرش پروژه‌های منتخب",
    },
    hero: {
      location: "خوشا شیراز و وصف بی مثالش",
      topline: "طراح / توسعه‌دهنده مستقل",
      eyebrow: "فناوری خلاق / 2585",
      title: ["ایده‌های", "پیچیده را", "قابل‌فهم", "و زنده می‌کنم."],
      intro:
        "اوربیت استودیوی مستقل فواد مدرسی راد است؛ طراح و توسعه‌دهنده‌ای که هویت‌ها، رابط‌ها و جهان‌های دیجیتال را با ضربان می‌سازد.",
      cta: "ورود به سیگنال",
      scroll: "برای کشف اسکرول کنید",
      note: "پورتفولیویی در مدارِ ایده‌های مفید، عجیب و زیبا که هنوز تمام نشده‌اند.",
      pointer: "میدان اشاره / ۰۱",
    },
    intro: {
      marker: "سیگنال / ۰۰",
      line1: "طراحی خوب جهان را ساده نمی‌کند.",
      line2: "فقط راه بهتری برای عبور از آن می‌سازد.",
    },
    work: {
      eyebrow: "پروژه‌های منتخب / ۰۲",
      title1: "سیگنال‌ها",
      title2: "در جهان واقعی.",
      description:
        "منتخبی از هویت‌ها، محصولات و تجربه‌های دیجیتال برای آدم‌هایی که مسیر دقیق را به راه حل‌های بدیهی ترجیح می‌دهند.",
      view: "مشاهده مطالعه موردی",
      archive: "پروژه‌های بیشتر با درخواست شما",
      ask: "درخواست آرشیو",
      specimen: "نمونه",
      archiveLabel: "آرشیو / کالیبره‌شده",
    },
    approach: {
      eyebrow: "رویکرد / ۰۳",
      title1: "سیگنال را",
      title2: "شفاف کن.",
      description:
        "من از زیرِ بریف شروع می‌کنم؛ جایی که سؤال مفید معمولاً آرام‌تر است. بعد سیستمی می‌سازم که دیدگاه، احساس و کارکرد را حتی پس از کنار رفتن نورافکن حفظ کند.",
      more: "درباره این رویکرد",
    },
    manifesto: {
      eyebrow: "یادداشت کاری / ∞",
      title1: "بخش عجیب را",
      title2: "نگه دار.",
      note: "معمولاً همان‌جاست که ایده مفید پنهان شده.",
      side: "کنجکاوی،\nروش تولید است.",
    },
    footer: {
      eyebrow: "سیگنالی برای فرستادن داری؟",
      title1: "بیایید چیزی",
      title2: "را به حرکت",
      title3: "درآوریم.",
      received: "سیگنال دریافت شد 2585",
      copyright: "© 2585 مدرسی راد",
    },
    rail: ["سیگنال", "نمونه‌ها", "روش", "تماس"],
  },
} as const;

const projects = [
  {
    index: "01",
    year: "2026",
    title: { en: "Kinetic Field", fa: "میدان جنبشی" },
    type: { en: "Identity · Digital experience", fa: "هویت · تجربه دیجیتال" },
    description: {
      en: "A living identity system for a cultural platform that turns research into a moving, navigable landscape.",
      fa: "سیستمی زنده برای یک پلتفرم فرهنگی که پژوهش را به منظره‌ای متحرک و قابل‌کاوش تبدیل می‌کند.",
    },
    tone: "cobalt",
  },
  {
    index: "02",
    year: "2025",
    title: { en: "Quiet Systems", fa: "سیستم‌های آرام" },
    type: { en: "Product direction · Interface", fa: "جهت‌گیری محصول · رابط" },
    description: {
      en: "A calm operating layer for a climate intelligence team, built to make complex signals easier to act on.",
      fa: "لایه‌ای آرام برای یک تیم هوش اقلیمی؛ ساخته‌شده برای تبدیل سیگنال‌های پیچیده به تصمیم‌های روشن.",
    },
    tone: "moon",
  },
  {
    index: "03",
    year: "2025",
    title: { en: "Atlas / 03", fa: "اطلس / ۰۳" },
    type: { en: "Strategy · Experience design", fa: "استراتژی · طراحی تجربه" },
    description: {
      en: "A modular visual language for a global studio working across cities, disciplines, and time zones.",
      fa: "زبانی بصری و ماژولار برای استودیویی جهانی که میان شهرها، رشته‌ها و منطقه‌های زمانی حرکت می‌کند.",
    },
    tone: "acid",
  },
];

const services = {
  en: [
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
  ],
  fa: [
    [
      "۰۱",
      "هدایت خلاق",
      "دیدگاه، ریتم و قواعدی که از ابتدا کالیبره می‌شوند تا کار در حرکت منسجم بماند.",
    ],
    [
      "۰۲",
      "سیستم‌های هویت",
      "زبان بصری با ساختاری کافی برای تکرار، و تنشی کافی برای زنده ماندن.",
    ],
    [
      "۰۳",
      "تجربه‌های دیجیتال",
      "رابط‌هایی که سیگنال‌های متراکم را به قدم بعدی روشن تبدیل می‌کنند، بدون حذف ظرافت‌ها.",
    ],
  ],
} as const;

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

function HeroObject({ pointerLabel }: { pointerLabel: string }) {
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
        <span>{pointerLabel}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return new URLSearchParams(window.location.search).get("lang") === "fa"
      ? "fa"
      : "en";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = copy[language];
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = language === "fa" ? "fa-IR" : "en";
    document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    return () => {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    };
  }, [language]);

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
  const toggleLanguage = () =>
    setLanguage(current => (current === "en" ? "fa" : "en"));

  return (
    <main className={`orbit-page ${language === "fa" ? "is-persian" : ""}`}>
      <div className="ambient-grain" />
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <aside className="section-rail" aria-label="Section index">
        <div className="rail-label">orbit / frame</div>
        {["top", "work", "approach", "contact"].map((id, index) => (
          <button
            key={id}
            className={activeSection === id ? "is-current" : ""}
            onClick={() => jumpTo(id)}
            aria-label={`Go to ${t.rail[index]}`}
          >
            <span>
              {language === "fa"
                ? ["۰۱", "۰۲", "۰۳", "۰۴"][index]
                : `0${index + 1}`}
            </span>
            <i />
            <b>{t.rail[index]}</b>
          </button>
        ))}
        <div className="rail-end">
          <span /> {language === "fa" ? "کالیبره" : "calibrated"}
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
            {t.nav.work} <span>02</span>
          </button>
          <button onClick={() => jumpTo("approach")}>
            {t.nav.approach} <span>03</span>
          </button>
          <button onClick={() => jumpTo("contact")}>
            {t.nav.contact} <span>04</span>
          </button>
        </nav>
        <div className="header-meta">
          <button
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label={
              language === "en" ? "Switch to Persian" : "Switch to English"
            }
          >
            <span className={language === "en" ? "active-language" : ""}>
              EN
            </span>
            <i />{" "}
            <span className={language === "fa" ? "active-language" : ""}>
              فارسی
            </span>
          </button>
          <span className="availability">
            <i /> {t.nav.available}
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
              {t.nav.work} <span>02</span>
            </button>
            <button onClick={() => jumpTo("approach")}>
              {t.nav.approach} <span>03</span>
            </button>
            <button onClick={() => jumpTo("contact")}>
              {t.nav.contact} <span>04</span>
            </button>
            <button className="mobile-language" onClick={toggleLanguage}>
              {language === "en" ? "فارسی" : "EN"}
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
          <span>{t.hero.topline}</span>
          <span>{t.hero.location}</span>
        </div>
        <div className="hero-layout section-frame">
          <div className="hero-copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {t.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.8 }}
            >
              <span>{t.hero.title[0]}</span>
              <span>{t.hero.title[1]}</span>
              <span>{t.hero.title[2]}</span>
              <em>{t.hero.title[3]}</em>
            </motion.h1>
            <motion.p
              className="hero-intro"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.7 }}
            >
              {t.hero.intro}
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.65 }}
            >
              <button className="signal-button" onClick={() => jumpTo("work")}>
                <span>{t.hero.cta}</span>
                <ArrowDownRight size={18} />
              </button>
              <span className="scroll-note">
                <MouseLine /> {t.hero.scroll}
              </span>
            </motion.div>
          </div>
          <div className="hero-visual-wrap">
            <HeroObject pointerLabel={t.hero.pointer} />
          </div>
        </div>
        <div className="hero-bottomline section-frame">
          <span className="hero-scroll-index">
            {language === "fa" ? "۰۱" : "01"} <span className="index-rule" />{" "}
            {language === "fa" ? "۰۴" : "04"}
          </span>
          <span className="hero-note">{t.hero.note}</span>
          <span className="hero-side-mark">⌁</span>
        </div>
      </section>

      <section
        className="intro-strip section-frame"
        aria-label={t.intro.marker}
      >
        <div className="strip-marker">
          <Circle size={8} fill="currentColor" /> {t.intro.marker}
        </div>
        <p>
          {t.intro.line1}
          <br />
          <strong>{t.intro.line2}</strong>
        </p>
        <span className="strip-arrow">
          <ArrowDownRight size={22} />
        </span>
      </section>

      <section id="work" className="work-section section-frame">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.work.eyebrow}</p>
            <h2>
              {t.work.title1}
              <br />
              <span>{t.work.title2}</span>
            </h2>
          </div>
          <p className="section-description">{t.work.description}</p>
        </div>
        <div className="project-list" ref={trackRef}>
          {projects.map((project, index) => (
            <motion.article
              className={`project-row ${activeProject === index ? "is-active" : ""}`}
              key={project.title.en}
              onMouseEnter={() => setActiveProject(index)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <div className="project-meta">
                <span className="project-index">
                  {language === "fa"
                    ? ["۰۱", "۰۲", "۰۳"][index]
                    : project.index}
                </span>
                <span className="project-year">{project.year}</span>
              </div>
              <div className="project-info">
                <h3>{project.title[language]}</h3>
                <p className="project-type">{project.type[language]}</p>
                <p className="project-description">
                  {project.description[language]}
                </p>
                <button
                  className="project-link"
                  aria-label={`${t.work.view}: ${project.title[language]}`}
                >
                  <span>{t.work.view}</span>
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
                  orbit /{" "}
                  {language === "fa"
                    ? ["۰۱", "۰۲", "۰۳"][index]
                    : project.index}{" "}
                  · {t.work.specimen}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="work-footer">
          <span>
            <ScanLine size={14} /> {t.work.archive}
          </span>
          <button onClick={() => jumpTo("contact")}>
            {t.work.ask} <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <section id="approach" className="approach-section">
        <div className="section-frame approach-inner">
          <div className="approach-intro">
            <p className="eyebrow">{t.approach.eyebrow}</p>
            <h2>
              {t.approach.title1}
              <br />
              <span>{t.approach.title2}</span>
            </h2>
            <p>{t.approach.description}</p>
            <button className="text-button" onClick={() => jumpTo("contact")}>
              {t.approach.more} <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="services-list">
            {services[language].map(([number, title, description]) => (
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
          <p className="eyebrow">{t.manifesto.eyebrow}</p>
          <h2>
            {t.manifesto.title1}
            <br />
            <em>{t.manifesto.title2}</em>
          </h2>
          <p>{t.manifesto.note}</p>
        </div>
        <div className="manifesto-side">
          <Move3d size={16} />
          <span>
            {t.manifesto.side.split("\n").map(line => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </span>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div className="section-frame footer-inner">
          <div className="footer-topline">
            <span>{t.nav.contact} / 04</span>
            <span>{t.footer.received}</span>
          </div>
          <div className="footer-copy">
            <p className="eyebrow">{t.footer.eyebrow}</p>
            <h2>
              {t.footer.title1}
              <br />
              <span>{t.footer.title2}</span>
              <br />
              <span>{t.footer.title3}</span>
            </h2>
            <a className="footer-email" href="https://fmdstudio.vercel.app/">
              Orbit.fmdstudio <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="footer-bottomline">
            <div className="footer-brand">
              <img src={markImage} alt="" className="brand-mark" />
              <span>
                orbit<span className="brand-dot">.</span>
              </span>
            </div>
            <span>{t.footer.copyright}</span>
            <div className="footer-links">
              {/* <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a> */}
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
