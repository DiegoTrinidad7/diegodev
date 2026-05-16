"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter, Sora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Home() {
  const [screen, setScreen] = useState("inicio");
  const [language, setLanguage] = useState("es");
  const [mood, setMood] = useState("azul");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [command, setCommand] = useState("");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [visitorMessage, setVisitorMessage] = useState("");
  const [visitorName, setVisitorName] = useState("");


function playTapSound() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(520, audioContext.currentTime);

    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.08);

    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  } catch (error) {
    console.log("Audio no disponible");
  }
}

const [savedMessages, setSavedMessages] = useState([]);

useEffect(() => {
  const stored = localStorage.getItem("diegoMessages");
  if (stored) setSavedMessages(JSON.parse(stored));
}, []);

async function saveVisitorMessage() {
  if (!visitorMessage.trim()) return;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: visitorName || "Visitante",
        email: "usuario@diego.dev",
        message: visitorMessage,
      }),
    });

    if (response.ok) {
      const newMessages = [
        {
          name: visitorName.trim() || "Visitante",
          text: visitorMessage,
          date: new Date().toLocaleString("es-MX"),
        },
        ...savedMessages,
      ].slice(0, 5);

      setSavedMessages(newMessages);

      localStorage.setItem(
        "diegoMessages",
        JSON.stringify(newMessages)
      );

      setVisitorName("");
      setVisitorMessage("");

      if (navigator.vibrate) {
        navigator.vibrate(25);
      }

      alert("Mensaje enviado 🚀");
    }
  } catch (error) {
    console.error(error);

    alert("Error enviando mensaje");
  }
}
  const [aiMessages, setAiMessages] = useState([
  {
    type: "bot",
    text: "Hola. Soy el asistente digital de Diego.dev.",
  },
]);

const [aiInput, setAiInput] = useState("");

const [activityFeed] = useState([
  "[12:41] Visual engine initialized.",
  "[12:44] Modules synchronized.",
  "[12:47] Identity core online.",
  "[12:50] Interactive system active.",
]);

const [nowPlaying] = useState({
  song: "Midnight Motion",
  artist: "Digital Atmosphere",
});
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [terminalLines, setTerminalLines] = useState([
    "sistema: Diego.dev iniciado correctamente",
    "tip: escribe help para ver comandos",
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  const move = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString(language === "es" ? "es-MX" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      setDate(
        now.toLocaleDateString(language === "es" ? "es-MX" : "en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const t = {
    es: {
      online: "En línea",
      badge: "Estudiante de Ingeniería en Tecnología de Software",
      heroTitle: "Diego.dev",
      heroSubtitle: "Un espacio digital que crece conmigo.",
      heroText:
        "Esta app web es mi lugar para mostrar quién soy, lo que aprendo, mis proyectos, mis ideas y mi evolución como desarrollador.",
      explore: "Explorar",
      contact: "Contacto",
      nav: {
        inicio: "Inicio",
        identidad: "Identidad",
        proyectos: "Proyectos",
        laboratorio: "Laboratorio",
        panel: "Panel",
        ia: "Asistente IA",
        galeria: "Galería",
        ideas: "Ideas",
        vision: "Visión",
        timeline: "Timeline",
        logros: "Logros",
        qr: "QR",
        terminal: "Terminal",
        contacto: "Contacto",
      },
    },
    en: {
      online: "Online",
      badge: "Software Engineering Student",
      heroTitle: "Diego.dev",
      heroSubtitle: "A digital space that grows with me.",
      heroText:
        "This web app is my place to show who I am, what I learn, my projects, my ideas and my evolution as a developer.",
      explore: "Explore",
      contact: "Contact",
      nav: {
        inicio: "Home",
        identidad: "Identity",
        proyectos: "Projects",
        laboratorio: "Lab",
        panel: "Dashboard",
        ia: "AI Assistant",
        galeria: "Gallery",
        ideas: "Ideas",
        vision: "Vision",
        timeline: "Timeline",
        logros: "Achievements",
        qr: "QR",
        terminal: "Terminal",
        contacto: "Contact",
      },
    },
  }[language];

  const content = {
  es: {
    panelEyebrow: "Panel vivo",
    panelTitle: "Datos reales dentro de la app.",
    panelText: "Esta sección muestra información dinámica para que Diego.dev se sienta como una app viva.",

    projectsEyebrow: "Proyectos",
    projectsTitle: "Lo que estoy construyendo.",
    projectsText: "Aquí muestro proyectos, ideas en desarrollo y módulos que forman parte de mi crecimiento como desarrollador.",

    galleryEyebrow: "Galería",
    galleryTitle: "Fotos, capturas y momentos.",
    galleryText: "Fotos, capturas de proyectos, avances de código y momentos que hacen que la app se sienta más humana.",

    contactEyebrow: "Contacto",
    contactTitle: "Redes y contacto.",
    contactText: "Mis enlaces principales para encontrarme, escribirme o ver lo que voy construyendo.",

    terminalEyebrow: "Consola",
    terminalTitle: "Consola interactiva.",
    terminalText: "Escribe comandos para descubrir partes del sistema.",
  },

  en: {
    panelEyebrow: "Live dashboard",
    panelTitle: "Real data inside the app.",
    panelText: "This section shows dynamic information so Diego.dev feels like a living app.",

    projectsEyebrow: "Projects",
    projectsTitle: "What I am building.",
    projectsText: "Here I show projects, ideas in development, and modules that are part of my growth as a developer.",

    galleryEyebrow: "Gallery",
    galleryTitle: "Photos, captures and moments.",
    galleryText: "Photos, project captures, code progress and moments that make the app feel more human.",

    contactEyebrow: "Contact",
    contactTitle: "Links and contact.",
    contactText: "My main links to find me, message me or see what I am building.",

    terminalEyebrow: "Console",
    terminalTitle: "Interactive console.",
    terminalText: "Write commands to discover parts of the system.",
  },
}[language];

  const accent = {
    azul: {
      glow: "from-blue-500/25 to-cyan-400/10",
      text: "text-blue-300",
      bg: "bg-blue-500",
      soft: "bg-blue-400/10 border-blue-400/20",
      ring: "ring-blue-400/30",
    },
    morado: {
      glow: "from-purple-500/25 to-blue-400/10",
      text: "text-purple-300",
      bg: "bg-purple-500",
      soft: "bg-purple-400/10 border-purple-400/20",
      ring: "ring-purple-400/30",
    },
    verde: {
      glow: "from-emerald-500/20 to-cyan-400/10",
      text: "text-emerald-300",
      bg: "bg-emerald-500",
      soft: "bg-emerald-400/10 border-emerald-400/20",
      ring: "ring-emerald-400/30",
    },
    rojo: {
      glow: "from-red-500/25 to-orange-400/10",
      text: "text-red-300",
      bg: "bg-red-500",
      soft: "bg-red-400/10 border-red-400/20",
      ring: "ring-red-400/30",
    },
  }[mood];

  const menu = [
  { id: "inicio", label: t.nav.inicio, icon: "⌂" },
  { id: "identidad", label: t.nav.identidad, icon: "ID" },
  { id: "proyectos", label: t.nav.proyectos, icon: "▣" },
  { id: "ia", label: t.nav.ia, icon: "AI" },
  { id: "timeline", label: t.nav.timeline, icon: "↗" },
  { id: "terminal", label: t.nav.terminal, icon: ">" },
  { id: "contacto", label: t.nav.contacto, icon: "@" },
];


  const skills = [
    { name: "Java", value: 65 },
    { name: "Diseño UI", value: 55 },
    { name: "React", value: 35 },
    { name: "Next.js", value: 30 },
    { name: "IA", value: 25 },
    { name: "Backend", value: 20 },
  ];


  
const timeline = [
  {
    year: "2025",
    title: "Primer contacto con programación",
    text: "Inicio en lógica, desarrollo de software y creación de proyectos interactivos dentro del entorno tecnológico.",
  },

  {
    year: "2026",
    title: "Exploración digital",
    text: "Construcción de interfaces visuales, experiencias web, sistemas interactivos y conceptos conectados con IA.",
  },

  {
    year: "Ahora",
    title: "Diego.dev",
    text: "Creación de un espacio personal enfocado en identidad digital, diseño futurista y experiencias tecnológicas modernas.",
  },

  {
    year: "Próximo",
    title: "Ecosistema inteligente",
    text: "Desarrollo de plataformas conectadas con inteligencia artificial, automatización, visualización de datos y herramientas digitales avanzadas.",
  },
];


  const manifesto = [
  "No diseño páginas.",
  "Diseño experiencias digitales.",
  "Cada módulo tiene intención.",
  "Cada detalle comunica identidad.",
  "Diego.dev no busca verse moderno.",
  "Busca sentirse vivo.",
];


  const quickQuestions = [
    { question: "¿Quién soy?", answer: "Soy Diego, estudiante mexicano de Ingeniería en Tecnología de Software." },
    { question: "¿Qué estoy construyendo?", answer: "Estoy construyendo Diego.dev, una app web personal con identidad, proyectos, galería, IA, panel y contacto." },
    { question: "¿Qué me interesa?", answer: "Me interesa el desarrollo web, diseño de interfaces, IA, videojuegos y sistemas interactivos." },
    { question: "¿Cómo contactarme?", answer: "Puedes usar Instagram, correo, GitHub o WhatsApp desde la sección de contacto." },
  ];

  const contact = [
    { label: "Instagram", value: "@tmxzdiego", text: "Mi perfil principal, avances, ideas y contenido personal.", href: "https://instagram.com/tmxzdiego", color: "text-pink-300" },
    { label: "GitHub", value: "GitHub", text: "Repositorios, pruebas, código y futuros proyectos.", href: "https://github.com/DiegoTrinidad7", color: "text-blue-300" },
    { label: "Email", value: "tmxzdiego@gmail.com", text: "Contacto formal, oportunidades y mensajes importantes.", href: "mailto:tmxzdiego@gmail.com", color: "text-cyan-300" },
    { label: "WhatsApp", value: "Disponible", text: "Contacto directo para ideas, proyectos o colaboración.", href: "https://wa.me/529871130924", color: "text-emerald-300" },
  ];
function sendFakeAI() {
  if (!aiInput.trim()) return;

  const input = aiInput.toLowerCase();

  let response =
    "Sistema activo. No encontré información relacionada.";

  if (input.includes("quien eres")) {
    response =
      "Soy el asistente digital de Diego.dev.";
  }

  if (input.includes("proyectos")) {
    response =
      "Actualmente Diego desarrolla interfaces visuales, experiencias interactivas y sistemas personales.";
  }

  if (input.includes("tecnologias")) {
    response =
      "React, Next.js, JavaScript, Tailwind CSS, Java y Framer Motion.";
  }

  if (input.includes("contacto")) {
    response =
      "Puedes contactar a Diego mediante Instagram, GitHub o correo electrónico.";
  }

  setAiMessages((prev) => [
    ...prev,
    {
      type: "user",
      text: aiInput,
    },
    {
      type: "bot",
      text: response,
    },
  ]);

  setAiInput("");
}
  function runCommand(e) {
    e.preventDefault();

    const input = command.trim().toLowerCase();
    if (!input) return;

    const responses = {
      help: "comandos: whoami, proyectos, contacto, ia, lab, galeria, timeline, logros, qr, vision, rojo, azul, verde, morado, limpiar",
      whoami: "Diego — estudiante de Ingeniería en Tecnología de Software construyendo Diego.dev.",
      proyectos: "Abriendo Proyectos...",
      contacto: "Abriendo Contacto...",
      ia: "Abriendo Asistente IA...",
      lab: "Abriendo Laboratorio...",
      galeria: "Abriendo Galería...",
      timeline: "Abriendo Timeline...",
      logros: "Abriendo Logros...",
      qr: "Abriendo QR personal...",
      vision: "Abriendo Visión...",
      rojo: "Mood rojo activado.",
      azul: "Mood azul activado.",
      verde: "Mood verde activado.",
      morado: "Mood morado activado.",
      neo: "Neo: easter egg encontrado.",
      desbloquear: "Acceso al laboratorio concedido.",
    };

    if (input === "limpiar" || input === "clear") {
      setTerminalLines([]);
      setCommand("");
      return;
    }

    if (input === "proyectos") setScreen("proyectos");
    if (input === "contacto") setScreen("contacto");
    if (input === "ia") setScreen("ia");
    if (input === "lab" || input === "desbloquear") setScreen("laboratorio");
    if (input === "galeria") setScreen("galeria");
    if (input === "timeline") setScreen("timeline");
    if (input === "logros") setScreen("logros");
    if (input === "qr") setScreen("qr");
    if (input === "vision") setScreen("vision");
    if (input === "rojo") setMood("rojo");
    if (input === "azul") setMood("azul");
    if (input === "verde") setMood("verde");
    if (input === "morado") setMood("morado");

    setTerminalLines((prev) => [
      ...prev,
      `diego@dev:~$ ${command}`,
      responses[input] || "comando no encontrado. escribe help",
    ]);

    setCommand("");
  }

  return (
    <main className={`${inter.className} relative min-h-screen overflow-hidden bg-[#060817] text-white`}>
      <Background mood={mood} />
      <ParticleField />
<ScanOverlay screen={screen} />

      <div
  className="pointer-events-none fixed z-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl transition-transform duration-100"
  style={{
    transform: `translate(${mouse.x - 160}px, ${mouse.y - 160}px)`,
  }}
/>

      <AnimatePresence>{showIntro && <IntroScreen accent={accent} />}</AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1450px] flex-col p-3 pb-28 md:p-6">
       <div className="mb-5 flex flex-wrap gap-4">
  <div className="rounded-full border border-white/10 bg-black/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-emerald-300">
    System Online
  </div>

  <div className="rounded-full border border-white/10 bg-black/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-blue-300">
    14 Modules Active
  </div>

  <div className="rounded-full border border-white/10 bg-black/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-purple-300">
    Visual Engine Running
  </div>
</div>

<Header
  menu={menu}
  screen={screen}
  setScreen={setScreen}
  language={language}
  setLanguage={setLanguage}
  online={t.online}
  mood={mood}
  setMood={setMood}
  accent={accent}
/>

        <div className="grid flex-1 gap-7 pt-7 xl:grid-cols-[280px_1fr]">
          <SidePanel
            menu={menu}
            screen={screen}
            setScreen={setScreen}
            mood={mood}
            setMood={setMood}
            accent={accent}
            musicPlaying={musicPlaying}
            setMusicPlaying={setMusicPlaying}
          />

          <section className="min-h-[72vh] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-2xl md:rounded-[2.2rem] md:p-10">
            <AnimatePresence mode="wait">
              {screen === "inicio" && (
                <Screen key="inicio" accent={accent}>
                  <div className="grid items-start gap-12 grid-cols-1 xl:grid-cols-[0.92fr_0.88fr]">
                    <div className="pt-2">
                      <Pill accent={accent}>{t.badge}</Pill>

                      <h1 className={`${sora.className} mt-6 max-w-full break-words text-[2.1rem] font-bold leading-[0.95] tracking-[-0.05em] text-white md:text-[3.8rem]`}>
                        {t.heroTitle}
                      </h1>

                      <h2
  className={`${sora.className} mt-7 max-w-full text-[2rem] font-bold leading-[1.05] tracking-[-0.05em] text-white md:mt-10 md:text-[4rem]`}
>
  {t.heroSubtitle}
</h2>

                      <p className="mt-6 max-w-[420px] break-words text-[14.5px] leading-7 text-zinc-400">
                        {t.heroText}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-3">
                        <ActionButton accent={accent} onClick={() => setScreen("identidad")}>
                          {t.explore}
                        </ActionButton>

                        <GhostButton onClick={() => setScreen("contacto")}>
                          {t.contact}
                        </GhostButton>

                        <GhostButton onClick={() => setScreen("terminal")}>
                          Terminal
                        </GhostButton>

              
                      </div>

                      <QuickStats accent={accent} />
                      <div className="mt-10">
  <AnonymousMessage accent={accent} />
  <div className="mt-10">
  <DigitalOrigin accent={accent} />
</div>
</div>
                      
                    
                      <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/25 p-6">
  <p className={`text-xs uppercase tracking-[0.2em] ${accent.text}`}>
    Activity Feed
  </p>

  <div className="mt-5 space-y-4">
    {activityFeed.map((item, index) => (
      <div
        key={index}
        className="text-sm text-zinc-400"
      >
        {item}
      </div>
    ))}
  </div>
</div>
                    </div>

                    <div className="grid content-start gap-5">
                      <HeroPhoto accent={accent} />
                  
                    </div>
                  </div>
                </Screen>
              )}

              {screen === "identidad" && (
  <Screen key="identidad" accent={accent}>
    <PageHeader
  accent={accent}
  eyebrow={content.panelEyebrow}
  title={content.panelTitle}
  text={content.panelText}
/>

    <div className="grid gap-14 xl:grid-cols-[0.72fr_1.28fr]">
      <Panel>
       <div className="px-3 pt-3">
  <PhotoBox path="/images/profile" title="Foto principal" />
</div>

        <h3 className={`${sora.className} mt-8 break-words text-center text-3xl font-bold tracking-[-0.04em]`}>
          Diego
        </h3>

        <p className="mt-2 break-words text-center text-xs uppercase tracking-[0.22em] text-zinc-500">
          @TMXZDIEGO
        </p>
      </Panel>

      <div className="grid gap-14 pt-4">
      <div className="pt-3">
  <BigQuote accent={accent}>
          No se trata de parecer programador. Se trata de construir hasta convertirme en uno.
        </BigQuote>
        </div>

       <div className="grid gap-8 lg:grid-cols-3">
          <InfoBox title="Origen" value="México" />
          <InfoBox title="Carrera" value="Software" />
         <InfoBox title="Estado" value="En progreso" />
        </div>

        <Panel>
          <p className={`break-words text-xs uppercase tracking-[0.22em] ${accent.text}`}>
            Nota personal
          </p>

          <p className="mt-6 break-words text-base leading-9 text-zinc-300">
            Diego.dev será una carta de presentación interactiva: diseño,
            código, fotos, ideas, proyectos, contacto y una guía digital que
            explique quién soy.
          </p>
        </Panel>

        <QuickAbout
          questions={quickQuestions}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          accent={accent}
        />

        <FloatingIdeas accent={accent} />
      </div>
    </div>
  </Screen>
)}

              {screen === "proyectos" && (
  <Screen key="proyectos" accent={accent}>
    <PageHeader
      accent={accent}
      eyebrow="Proyectos"
      title="Lo que estoy construyendo."
      text="Aquí muestro proyectos, ideas en desarrollo y módulos que forman parte de mi crecimiento como desarrollador."
    />

    <div className="mb-12 grid gap-7 xl:grid-cols-3">
      {currentlyBuilding.map((item) => (
        <div
          key={item.title}
          className="rounded-[2rem] border border-white/10 bg-black/25 p-7"
        >
          <p className={`text-xs uppercase tracking-[0.2em] ${accent.text}`}>
            {item.status}
          </p>

          <h3 className={`${sora.className} mt-5 text-2xl font-bold text-white`}>
            {item.title}
          </h3>

          <p className="mt-5 text-sm leading-8 text-zinc-400">
            {item.text}
          </p>
        </div>
      ))}
    </div>

    <div className="mb-12 rounded-[2rem] border border-white/10 bg-black/25 p-7">
      <p className={`text-xs uppercase tracking-[0.22em] ${accent.text}`}>
        Stack tecnológico
      </p>

      <h3 className={`${sora.className} mt-5 text-3xl font-bold text-white`}>
        Herramientas que estoy usando y aprendiendo.
      </h3>

      <div className="mt-7 flex flex-wrap gap-3">
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-zinc-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>

    <div className="grid gap-10 md:grid-cols-2 2xl:grid-cols-3">
      {projects.map((item) => (
        <FeatureCard key={item.title} item={item} accent={accent} />
      ))}
    </div>
  </Screen>
)}


              {screen === "ia" && (
  <Screen key="ia" accent={accent}>
    <PageHeader
      accent={accent}
      eyebrow="Asistente IA"
      title="Sistema de interacción inteligente."
      text="El asistente digital permite explorar módulos, tecnologías, proyectos y elementos del ecosistema Diego.dev."
    />

    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <Panel>
        <div className="space-y-4 rounded-[2rem] border border-white/10 bg-black/30 p-6 min-h-[420px]">
          {aiMessages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-7 ${
                message.type === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-white/[0.05] text-zinc-300"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <input
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Escribe una pregunta..."
            className="w-full rounded-full border border-white/10 bg-black/40 px-6 py-4 text-sm text-white outline-none"
          />

          <button
            onClick={sendFakeAI}
            className={`rounded-full px-6 py-4 text-sm font-bold text-white ${accent.bg}`}
          >
            Enviar
          </button>
        </div>
      </Panel>

      <div className="grid gap-7">
        <Panel>
          <p className={`text-xs uppercase tracking-[0.2em] ${accent.text}`}>
            Capacidades
          </p>

          <div className="mt-6 space-y-4 text-sm text-zinc-300">
            <p>• Explorar proyectos</p>
            <p>• Mostrar tecnologías</p>
            <p>• Explicar módulos</p>
            <p>• Acceder a información del sistema</p>
            <p>• Navegación inteligente</p>
          </div>
        </Panel>

        <Panel>
          <p className={`text-xs uppercase tracking-[0.2em] ${accent.text}`}>
            Estado del sistema
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">
                AI Core
              </span>

              <span className="text-emerald-300">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">
                Neural Engine
              </span>

              <span className="text-blue-300">
                RUNNING
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">
                Visual Sync
              </span>

              <span className="text-purple-300">
                ONLINE
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  </Screen>
)}
              
      

             

              {screen === "timeline" && (
                <Screen key="timeline" accent={accent}>
                  <PageHeader accent={accent} eyebrow="Timeline" title="Mi camino como desarrollador." text="Una vista tipo línea de tiempo para mostrar cómo va creciendo mi aprendizaje y mi proyecto personal." />

                  <div className="space-y-7">
                    {timeline.map((item, index) => (
                      <TimelineItem key={item.title} item={item} index={index} accent={accent} />
                    ))}
                  </div>
                </Screen>
              )}




      

              {screen === "terminal" && (
                <Screen key="terminal" accent={accent}>
                  <PageHeader accent={accent} eyebrow="Terminal" title="Terminal interactiva." text="Escribe comandos para descubrir partes del sistema." />

                  <Panel>
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-red-400" />
                        <span className="h-3 w-3 rounded-full bg-yellow-400" />
                        <span className="h-3 w-3 rounded-full bg-green-400" />
                      </div>
                      <p className="break-words text-xs uppercase tracking-[0.18em] text-zinc-500">
                        diego-terminal
                      </p>
                    </div>

                    <div className="min-h-72 overflow-auto rounded-3xl border border-white/10 bg-black/40 p-6 font-mono text-sm leading-8 text-zinc-300">
                      {terminalLines.map((line, index) => (
                        <p className="break-words" key={`${line}-${index}`}>
                          {line}
                        </p>
                      ))}
                    </div>

                    <form onSubmit={runCommand} className="mt-5 flex flex-col gap-4 md:flex-row">
                      <input
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        placeholder="help, whoami, proyectos, contacto, ia, lab..."
                        className="w-full min-w-0 rounded-full border border-white/10 bg-black/30 px-5 py-4 font-mono text-sm text-zinc-300 outline-none"
                      />
                      <button className={`rounded-full px-6 py-4 text-sm font-bold uppercase tracking-widest text-white ${accent.bg}`}>
                        Run
                      </button>
                    </form>
                  </Panel>
                </Screen>
              )}

              {screen === "contacto" && (
                <Screen key="contacto" accent={accent}>
                  <PageHeader accent={accent} eyebrow="Contacto" title="Redes y contacto." text="Mis enlaces principales para encontrarme, escribirme o ver lo que voy construyendo." />

                  <div className="grid gap-7 md:grid-cols-2 2xl:grid-cols-4">
                    {contact.map((item) => (
                      <ContactCard key={item.label} item={item} />
                    ))}
                  </div>
                </Screen>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
      <MobileDock
  screen={screen}
  setScreen={setScreen}
  accent={accent}
/>
    </main>
  );
}
function MobileDock({
  screen,
  setScreen,
  accent,
}) {
  const items = [
    {
      id: "inicio",
      icon: "⌂",
    },
    {
      id: "ia",
      icon: "AI",
    },
    {
      id: "proyectos",
      icon: "▣",
    },
    {
      id: "terminal",
      icon: ">_",
    },
    {
      id: "contacto",
      icon: "@",
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-[92vw] max-w-[420px] -translate-x-1/2 justify-between rounded-full border border-white/10 bg-black/80 px-3 py-3 backdrop-blur-2xl xl:hidden">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setScreen(item.id)}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold transition ${
            screen === item.id
              ? `${accent.bg} text-white shadow-[0_0_25px_rgba(59,130,246,0.45)]`
              : "text-zinc-500"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
function IntroScreen({ accent }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          className={`mx-auto mb-8 h-24 w-24 rounded-full border border-white/10 border-t-white/80 bg-gradient-to-br ${accent.glow}`}
        />

        <motion.h1
          initial={{ letterSpacing: "0.8em", opacity: 0 }}
          animate={{ letterSpacing: "0.28em", opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg font-black uppercase text-blue-300 md:text-2xl"
        >
          DIEGO.DEV
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-xs uppercase tracking-[0.3em] text-zinc-500"
        >
          Inicializando sistema personal
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function Background({ mood }) {
  const dots = useMemo(() => Array.from({ length: 10 }), []);

  const color =
    mood === "morado"
      ? "rgba(168,85,247,0.14)"
      : mood === "verde"
      ? "rgba(16,185,129,0.12)"
      : mood === "rojo"
      ? "rgba(239,68,68,0.13)"
      : "rgba(37,99,235,0.15)";

  return (
    <>
      <div
        className="fixed inset-0"
        style={{
          background: `radial-gradient(circle at top left, ${color}, transparent 34%), linear-gradient(to bottom, #060817, #030712, #060817)`,
        }}
      />
      <div className="fixed inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:110px_110px]" />
      {dots.map((_, i) => (
        <div
          key={i}
          className="fixed h-1 w-1 rounded-full bg-white/25"
          style={{
            left: `${12 + ((i * 19) % 78)}%`,
            top: `${14 + ((i * 31) % 70)}%`,
          }}
        />
      ))}
    </>
  );
}

function Header({ menu, screen, setScreen, language, setLanguage, online, mood, setMood, accent }) {
  return (
   <header className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-3 py-4 backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
       <button
  onClick={() => setScreen("inicio")}
  className="mr-5 flex shrink-0 items-center gap-3 text-left"
>
  <img
    src="/images/logo.png"
    alt="Diego.dev"
    className="h-8 w-8 rounded-xl object-cover shadow-[0_0_20px_rgba(59,130,246,0.4)] md:h-9 md:w-9"
  />

  <div>
    <h1
      className={`${sora.className} text-xs font-bold tracking-[0.18em] text-blue-300 md:text-sm`}
    >
      DIEGO.DEV
    </h1>

    <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-500">
      Digital Identity System
    </p>
  </div>
</button>

    <div className="hidden flex-1 gap-2 overflow-x-auto scrollbar-hide 2xl:flex">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
                screen === item.id
                  ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.28)]"
                  : "text-zinc-400 hover:bg-white/5 hover:text-blue-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.12em] text-zinc-300 outline-none"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs uppercase tracking-[0.16em] text-emerald-300">
              {online}
            </span>
          </div>
        </div>
      </div>
<div className="mt-4 grid grid-cols-4 gap-2 xl:hidden">

</div>

<div className="mt-4 grid grid-cols-4 gap-2 xl:hidden">
  {["azul", "morado", "verde", "rojo"].map((item) => (
    <button
      key={item}
      onClick={() => {
        setMood(item);
        if (navigator.vibrate) navigator.vibrate(15);
      }}
      className={`rounded-2xl border px-3 py-3 text-[11px] font-bold capitalize transition ${
        mood === item
          ? `${accent.bg} border-white/20 text-white shadow-[0_0_18px_rgba(59,130,246,0.28)]`
          : "border-white/10 bg-black/30 text-zinc-400"
      }`}
    >
      {item}
    </button>
  ))}
</div>
      <div className="mt-4 flex gap-2 overflow-x-auto 2xl:hidden">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] ${
              screen === item.id
                ? "bg-blue-500 text-white"
                : "bg-white/[0.04] text-zinc-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}

function SidePanel({
  menu,
  screen,
  setScreen,
  mood,
  setMood,
  accent,
  musicPlaying,
  setMusicPlaying,
}) {
  return (
    <aside className="hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-2xl xl:block">
      <div className={`rounded-3xl border p-5 ${accent.soft}`}>
        <p className={`text-xs uppercase tracking-[0.22em] ${accent.text}`}>
          Launchpad
        </p>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Centro de navegación del sistema.
        </p>
      </div>

      <div className="mt-4 space-y-2">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex w-full min-w-0 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
              screen === item.id
                ? `${accent.bg} text-white shadow-[0_0_22px_rgba(59,130,246,0.22)]`
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="w-7 shrink-0 text-xs font-bold">{item.icon}</span>
            <span className="break-words">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-3xl border border-white/10 bg-black/25 p-5">
        <p className={`text-xs uppercase tracking-[0.22em] ${accent.text}`}>
          Mood
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["azul", "morado", "verde", "rojo"].map((item) => (
            <button
              key={item}
              onClick={() => setMood(item)}
              className={`rounded-2xl border px-3 py-3 text-xs capitalize ${
                mood === item
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-black/20 text-zinc-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <MusicWidget musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} accent={accent} />
    </aside>
  );
}

function MusicWidget({
  musicPlaying,
  setMusicPlaying,
  accent,
}) {
  const bars = [25, 55, 35, 75, 45, 65, 30];

  return (
    <div className="mt-4 rounded-[2rem] border border-white/10 bg-black/25 p-5">
      <div className="flex items-center justify-between">
        <p
          className={`text-xs uppercase tracking-[0.2em] ${accent.text}`}
        >
          Now Playing
        </p>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />

          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Live
          </span>
        </div>
      </div>

      <h3
        className={`${sora.className} mt-5 text-xl font-bold text-white`}
      >
        Midnight Motion
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Digital Atmosphere
      </p>

      <div className="mt-6 flex h-16 items-end gap-2">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{
              height: musicPlaying
                ? [
                    `${height}%`,
                    `${Math.min(height + 18, 100)}%`,
                    `${height}%`,
                  ]
                : "18%",
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.07,
            }}
            className={`w-full rounded-full ${accent.bg}`}
          />
        ))}
      </div>

      <button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className={`mt-6 w-full rounded-full px-5 py-3 text-sm font-bold text-white ${accent.bg}`}
      >
        {musicPlaying ? "Pause Visualizer" : "Start Visualizer"}
      </button>
    </div>
  );
}

function Screen({ children, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.985 }}
      transition={{ duration: 0.22 }}
      className={`min-w-0 rounded-[2rem] ring-1 ${accent?.ring || "ring-blue-400/20"}`}
    >
     <div className="rounded-[2rem] p-4 md:p-10">
        <div className="min-w-0 rounded-[1.6rem]">{children}</div>
      </div>
    </motion.div>
  );
}

function PageHeader({ eyebrow, title, text, accent }) {
  return (
    <div className="mb-28 px-2 md:px-4">
      <p
        className={`text-xs uppercase tracking-[0.28em] ${accent.text}`}
      >
        {eyebrow}
      </p>

      <h2
        className={`${sora.className} mt-10 max-w-full text-[2.4rem] font-bold leading-[1.02] tracking-[-0.05em] text-white md:text-[4rem]`}
      >
        {title}
      </h2>

      <p className="mt-10 max-w-[820px] text-[15px] leading-9 text-zinc-400">
        {text}
      </p>
    </div>
  );
}

function Pill({ children, accent }) {
  return (
    <p className={`inline-flex max-w-full rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] ${accent.soft} ${accent.text}`}>
      <span className="break-words">{children}</span>
    </p>
  );
}

function Panel({ children }) {
  return (
    <div className="group relative min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:bg-white/[0.055]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_45%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SmartImage({ base, alt, mode = "cover" }) {
  const sources = [`${base}.png`, `${base}.jpg`, `${base}.jpeg`, `${base}.webp`];
  const [index, setIndex] = useState(0);

  if (index >= sources.length) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 p-6 text-center text-sm text-zinc-500">
        <div className="min-w-0">
          <p className="break-words">No se encontró la imagen</p>
          <p className="mt-1 break-words text-xs">{base}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={sources[index]}
      alt={alt}
      onError={() => setIndex(index + 1)}
      className={`absolute inset-0 h-full w-full ${
        mode === "contain" ? "object-contain" : "object-cover"
      }`}
    />
  );
}

function HeroPhoto({ accent }) {
  return (
    <div className="relative min-w-0 overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/25 p-4 shadow-2xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow}`} />

      <div className="relative h-[430px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/30">
        <SmartImage base="/images/hero" alt="Imagen principal" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mt-4 rounded-[1.7rem] border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
        <p className="break-words text-[11px] uppercase tracking-[0.18em] text-blue-300">
          Imagen principal
        </p>

        <h3 className={`${sora.className} mt-3 break-words text-2xl font-bold text-white`}>
          Diego.dev
        </h3>

        <p className="mt-3 break-words text-sm leading-7 text-zinc-300">
          Identidad, diseño, código e ideas en una sola experiencia.
        </p>
      </div>
    </div>
  );
}

function PhotoBox({ path, title }) {
  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/30 p-4">
      <div className="relative flex h-[430px] items-center justify-center overflow-hidden rounded-[1.4rem] bg-black/40">
        <SmartImage base={path} alt={title} mode="contain" />
      </div>
    </div>
  );
}

function PhotoCard({ item }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/25">
      <div className="relative h-72 overflow-hidden">
        <SmartImage base={item.path} alt={item.title} />
      </div>

      <div className="border-t border-white/10 bg-black/50 px-5 py-5">
        <p className="break-words text-base font-semibold text-zinc-200">
          {item.title}
        </p>
      </div>
    </div>
  );
}

function Launchpad({ modules, setScreen, accent }) {
  return (
    <div className="grid min-w-0 gap-4 md:grid-cols-2">
      {modules.map((module) => (
        <button
          key={module.id}
          onClick={() => setScreen(module.id)}
          className="group min-w-0 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/25 p-5 text-left transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
        >
          <p className={`break-words text-[11px] uppercase tracking-[0.16em] ${accent.text}`}>
            {module.label}
          </p>
          <h3 className={`${sora.className} mt-3 break-words text-xl font-bold`}>
            {module.title}
          </h3>
          <p className="mt-3 break-words text-sm leading-6 text-zinc-400">
            {module.text}
          </p>
          <p className={`mt-5 break-words text-[11px] uppercase tracking-[0.16em] opacity-70 transition group-hover:opacity-100 ${accent.text}`}>
            Abrir →
          </p>
        </button>
      ))}
    </div>
  );
}

function ActionButton({ children, onClick, accent }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white shadow-[0_0_28px_rgba(59,130,246,0.25)] transition hover:scale-105 ${accent.bg}`}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition hover:bg-white/10"
    >
      {children}
    </button>
  );
}

function QuickStats({ accent }) {
  const stats = [
    { label: "Sistema", value: "ONLINE", text: "La aplicación está activa." },
    { label: "Módulos", value: "14", text: "Secciones interactivas." },
    { label: "Estado", value: "BUILDING", text: "Proyecto en crecimiento." },
  ];

  return (
    <div className="mt-8 grid w-full gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <div key={item.label} className="min-w-0 overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/25 p-4 transition hover:border-white/20 hover:bg-white/[0.05]">
          <p className="break-words text-[10px] uppercase tracking-[0.12em] text-zinc-500">
            {item.label}
          </p>
          <h3 className={`${sora.className} mt-3 break-words text-lg font-bold ${accent.text}`}>
            {item.value}
          </h3>
          <p className="mt-3 break-words text-xs leading-5 text-zinc-400">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function QuickAbout({ questions, activeQuestion, setActiveQuestion, accent }) {
  return (
    <Panel>
      <p className={`break-words text-xs uppercase tracking-[0.22em] ${accent.text}`}>
        Sobre mí rápido
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3">
          {questions.map((item, index) => (
            <button
              key={item.question}
              onClick={() => setActiveQuestion(index)}
              className={`w-full min-w-0 rounded-2xl border px-4 py-4 text-left text-sm transition ${
                activeQuestion === index
                  ? `${accent.soft} text-white`
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06]"
              }`}
            >
              <span className="break-words">{item.question}</span>
            </button>
          ))}
        </div>

        <div className="min-w-0 rounded-2xl border border-white/10 bg-black/30 p-6 text-sm leading-8 text-zinc-300">
          <p className="break-words">{questions[activeQuestion].answer}</p>
        </div>
      </div>
    </Panel>
  );
}

function FloatingIdeas({ accent }) {
  const ideas = [
    "Sistema IA",
    "Visual Engine",
    "Interactive UI",
    "Digital Identity",
    "Creative Code",
    "Future Projects",
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {ideas.map((idea, index) => (
        <div
          key={`${idea}-${index}`}
          className={`max-w-full rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] ${accent.soft} ${accent.text}`}
        >
          <span className="break-words">{idea}</span>
        </div>
      ))}
    </div>
  );
}

const projects = [
  {
    tag: "En desarrollo",
    title: "NeuroMarket",
    text: "Marketplace inteligente que conecta productos, tendencias y comportamiento digital en tiempo real mediante IA predictiva.",
    status: "Activo",
  },

  {
    tag: "Próximo",
    title: "Aether OS",
    text: "Sistema visual futurista para organizar ideas, proyectos, tareas y recuerdos dentro de un entorno interactivo minimalista.",
    status: "Concepto",
  },

  {
    tag: "Planeado",
    title: "Ghost Protocol",
    text: "Red social privada enfocada en identidades digitales anónimas, comunicación cifrada y experiencias inmersivas.",
    status: "Investigación",
  },

  {
    tag: "Experimental",
    title: "Vision AI",
    text: "Motor de inteligencia artificial capaz de analizar imágenes, detectar patrones y generar interfaces dinámicas automáticamente.",
    status: "Labs",
  },
];
const currentlyBuilding = [
  {
    title: "Diego.dev V1",
    text:
      "Mi identidad digital, proyectos, contacto, galería y sistema visual en una sola app.",
    status: "En desarrollo",
  },

  {
    title: "Asistente IA",
    text:
      "Una guía inteligente capaz de responder preguntas sobre mí, mis proyectos y tecnologías.",
    status: "Próximo",
  },

  {
    title: "Dashboard vivo",
    text:
      "Panel dinámico con actividad, música, estadísticas y estado del sistema en tiempo real.",
    status: "Planeado",
  },
];

const stack = [
  "React",
  "Next.js",
  "JavaScript",
  "Tailwind",
  "Framer Motion",
  "Java",
  "GitHub",
  "Diseño UI",
];



function FeatureCard({ item, accent }) {
  return (
    <div className="group relative min-w-0 overflow-hidden rounded-[2.3rem] border border-white/10 bg-black/25 p-5 md:p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
      <div className={`absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br ${accent.glow}`} />
      <div className="relative z-10 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className={`break-words text-xs uppercase tracking-[0.18em] ${accent.text}`}>
            {item.tag}
          </p>
          <span className="max-w-full rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-zinc-400">
            {item.status}
          </span>
        </div>

        <h3 className={`${sora.className} mt-5 break-words text-2xl font-bold leading-tight tracking-[-0.03em] text-white md:text-3xl`}>
          {item.title}
        </h3>

        <p className="mt-5 break-words text-sm leading-8 text-zinc-400">{item.text}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className={`h-2 w-2 rounded-full ${accent.bg}`} />
          <p className="break-words text-xs uppercase tracking-[0.16em] text-zinc-500">
            Proyecto en evolución
          </p>
        </div>
      </div>
    </div>
  );
}

function SimpleCard({ item, accent }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-7 transition hover:border-white/20 hover:bg-white/[0.06]">
      <p className={`break-words text-xs uppercase tracking-[0.18em] ${accent.text}`}>
        Idea
      </p>
      <h3 className={`${sora.className} mt-5 break-words text-2xl font-bold leading-tight tracking-[-0.03em] md:text-3xl`}>
        {item.title}
      </h3>
      <p className="mt-5 break-words text-sm leading-8 text-zinc-400">{item.text}</p>
    </div>
  );
}

function DashboardCard({ item, accent }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-7">
      <p className={`break-words text-xs uppercase tracking-[0.18em] ${accent.text}`}>
        {item.title}
      </p>
      <h3 className={`${sora.className} mt-5 break-words text-2xl font-bold tracking-[-0.03em] md:text-3xl`}>
        {item.value}
      </h3>
      <p className="mt-5 break-words text-sm leading-8 text-zinc-400">{item.text}</p>
    </div>
  );
}

function SkillTree({ skills, accent }) {
  return (
    <Panel>
      <p className={`break-words text-xs uppercase tracking-[0.22em] ${accent.text}`}>
        Skill Tree
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.name} className="min-w-0">
            <div className="mb-3 flex justify-between gap-4 text-sm">
              <span className="break-words text-zinc-300">{skill.name}</span>
              <span className="text-zinc-500">{skill.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className={`h-2 rounded-full ${accent.bg}`} style={{ width: `${skill.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function TimelineItem({ item, index, accent }) {
  return (
    <div className="grid gap-5 md:grid-cols-[130px_1fr]">
      <div className="flex items-start gap-3">
        <div className={`mt-1 h-4 w-4 shrink-0 rounded-full ${accent.bg}`} />
        <p className={`${sora.className} break-words text-xl font-bold ${accent.text}`}>
          {item.year}
        </p>
      </div>

      <div className="min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-7">
        <p className="break-words text-xs uppercase tracking-[0.18em] text-zinc-500">
          Paso {index + 1}
        </p>
        <h3 className={`${sora.className} mt-4 break-words text-2xl font-bold tracking-[-0.03em] md:text-3xl`}>
          {item.title}
        </h3>
        <p className="mt-5 break-words text-sm leading-8 text-zinc-400">{item.text}</p>
      </div>
    </div>
  );
}

function AchievementCard({ item, accent }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-7 transition hover:border-white/20 hover:bg-white/[0.06]">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent.bg} text-xl font-black text-white`}>
        ✓
      </div>

      <p className={`mt-6 break-words text-xs uppercase tracking-[0.18em] ${accent.text}`}>
        {item.level}
      </p>

      <h3 className={`${sora.className} mt-4 break-words text-2xl font-bold tracking-[-0.03em]`}>
        {item.title}
      </h3>

      <p className="mt-5 break-words text-sm leading-8 text-zinc-400">{item.text}</p>
    </div>
  );
}

function QRBox({ accent }) {
  return (
    <Panel>
      <div className="flex justify-center">
        <div className="relative h-72 w-72 overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 p-4">
          <img
            src="/images/qr.png"
            alt="QR"
            className="h-full w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </div>

      <p className="mt-6 text-center text-sm leading-7 text-zinc-400">
        Escanea este código para abrir Diego.dev rápidamente desde cualquier dispositivo.
      </p>
    </Panel>
  );
}

function BigQuote({ children, accent }) {
  return (
    <div className={`min-w-0 overflow-hidden rounded-[2rem] border p-7 ${accent.soft}`}>
      <p className="break-words font-mono text-sm leading-9 text-blue-100">“{children}”</p>
    </div>
  );
}


function InfoBox({ title, value }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/25 p-6">
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
        {title}
      </p>

      <p
        className={`${sora.className} mt-5 text-[1.18rem] font-bold leading-tight text-white md:text-[1.35rem] xl:text-[1.45rem]`}
      >
        {value}
      </p>
    </div>
  );
}
function ParticleField() {
  const particles = useMemo(() => Array.from({ length: 26 }), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-blue-300/30 blur-[1px]"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 53) % 100}%`,
          }}
          animate={{
            y: [0, -35, 0],
            opacity: [0.15, 0.7, 0.15],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 5 + (index % 5),
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}

function ScanOverlay({ screen }) {
  return (
    <motion.div
      key={screen}
      className="pointer-events-none fixed inset-0 z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.25, 0] }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 bg-blue-400/10 blur-3xl"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}


function TapGame({
  accent,
  score,
  bestScore,
  addPoint,
}) {
  const orbs = useMemo(
    () => Array.from({ length: 9 }),
    []
  );

  return (
    <Panel>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p
            className={`text-xs uppercase tracking-[0.2em] ${accent.text}`}
          >
            Mini juego
          </p>

          <h3
            className={`${sora.className} mt-3 text-2xl font-bold text-white`}
          >
            Atrapa energía
          </h3>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500">
            Score
          </p>

          <p
            className={`${sora.className} text-2xl font-bold ${accent.text}`}
          >
            {score}
          </p>
        </div>
      </div>

      <div className="relative mt-6 h-64 overflow-hidden rounded-[2rem] border border-white/10 bg-black/35">
        {orbs.map((_, index) => (
          <motion.button
            key={index}
            onClick={addPoint}
            className={`absolute h-12 w-12 rounded-full ${accent.bg} shadow-[0_0_30px_rgba(59,130,246,0.45)]`}
            style={{
              left: `${8 + ((index * 31) % 78)}%`,
              top: `${10 + ((index * 47) % 72)}%`,
            }}
            animate={{
              y: [0, -18, 0],
              scale: [1, 1.12, 1],
              opacity: [0.75, 1, 0.75],
            }}
            transition={{
              duration: 1.8 + index * 0.12,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
        <span className="text-sm text-zinc-400">
          Mejor récord
        </span>

        <span
          className={`${sora.className} font-bold ${accent.text}`}
        >
          {bestScore}
        </span>
      </div>
    </Panel>
  );
}

function InteractiveZone({
  accent,
  visitorMessage,
  setVisitorMessage,
  saveVisitorMessage,
  savedMessages,
}) {
  return (
    <div className="grid gap-5">
      <Panel>
        <p className={`text-xs uppercase tracking-[0.2em] ${accent.text}`}>
          Visitor Message
        </p>

        <h3 className={`${sora.className} mt-4 text-2xl font-bold text-white`}>
          Deja un mensaje
        </h3>

        <textarea
          value={visitorMessage}
          onChange={(e) => setVisitorMessage(e.target.value)}
          placeholder="Escribe algo."
          className="mt-5 min-h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none"
        />

        <button
          onClick={saveVisitorMessage}
          className={`mt-4 rounded-full px-6 py-3 text-sm font-bold text-white ${accent.bg}`}
        >
          Guardar
        </button>

        <div className="mt-5 space-y-3">
          {savedMessages.map((msg, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <p className="text-sm text-zinc-300">{msg.text}</p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                {msg.date}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
function ContactCard({ item }) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noreferrer"
      className="group min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-7 transition hover:border-white/20 hover:bg-white/[0.06]"
    >
      <p className={`break-words text-xs uppercase tracking-[0.18em] ${item.color}`}>
        {item.label}
      </p>
      <h3 className={`${sora.className} mt-5 break-words text-xl font-bold md:text-2xl`}>
        {item.value}
      </h3>
      <p className="mt-5 break-words text-sm leading-8 text-zinc-400">{item.text}</p>
      <p className="mt-7 break-words text-xs uppercase tracking-[0.18em] text-blue-300 opacity-70 transition group-hover:opacity-100">
        Abrir →
      </p>
    </a>
  );
}
function AnonymousMessage({ accent }) {
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!message.trim()) return;

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
      <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">
        MENSAJE ANÓNIMO
      </p>

      <h2
        className={`${sora.className} mt-3 text-[2rem] font-bold text-white`}
      >
        Deja algo en el sistema
      </h2>

      <p className="mt-3 max-w-[520px] text-zinc-400">
        Escribe un pensamiento, frase o mensaje anónimo dentro del núcleo digital.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe algo..."
        className="mt-6 h-[140px] w-full resize-none rounded-[1.5rem] border border-white/10 bg-black/40 p-5 text-white outline-none transition focus:border-white/20"
      />

      <button
        onClick={handleSave}
        className={`mt-5 rounded-[1.2rem] px-6 py-3 text-white transition ${accent.button}`}
      >
        Guardar mensaje
      </button>

      {saved && (
        <p className="mt-4 text-sm text-emerald-400">
          Mensaje guardado dentro del núcleo.
        </p>
      )}
    </div>
  );
}
function DigitalOrigin({ accent }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
      <p className={`text-[11px] uppercase tracking-[0.25em] ${accent.text}`}>
        ORIGEN DIGITAL
      </p>

      <h2 className={`${sora.className} mt-3 text-[2rem] font-bold text-white`}>
        Toda identidad comienza en algún lugar.
      </h2>

      <p className="mt-3 max-w-[520px] text-sm leading-7 text-zinc-400">
        Desde México, construyendo experiencias digitales, proyectos e ideas que crecen con el tiempo.
      </p>

      <div className="mt-6 overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/40">
        <iframe
          title="Origen Digital"
          src="https://www.google.com/maps?q=Mexico&output=embed"
          className="h-[330px] w-full grayscale invert contrast-125"
          loading="lazy"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-zinc-400">
          Señal activa
        </span>

        <span className={`rounded-full border px-4 py-2 text-xs ${accent.soft} ${accent.text}`}>
          México
        </span>
      </div>
    </div>
  );
}