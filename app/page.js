"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Search,
  User,
  Home,
  Star,
  MapPin,
  X,
  ShieldCheck,
  ChevronDown,
  Wrench,
  Hammer,
  Mail,
  Lock,
  ArrowRight,
  LogOut,
} from "lucide-react";

const PROS = [
  {
    id: 1,
    nome: "Antonio Russo",
    mestiere: "Idraulico",
    zona: "Vomero",
    rating: 4.9,
    recensioni: 87,
    img: "https://picsum.photos/seed/idraulico1/600/750",
    avatar: "https://picsum.photos/seed/antonio/100/100",
    didascalia: "Sostituzione completa impianto bagno, 2 giorni di lavoro.",
    prezzo: 180,
    verificato: true,
  },
  {
    id: 2,
    nome: "Giulia Ferraro",
    mestiere: "Pittrice edile",
    zona: "Chiaia",
    rating: 5.0,
    recensioni: 42,
    img: "https://picsum.photos/seed/pittrice1/600/750",
    avatar: "https://picsum.photos/seed/giulia/100/100",
    didascalia: "Tinteggiatura soggiorno, finitura effetto sabbiato.",
    prezzo: 320,
    verificato: true,
  },
  {
    id: 3,
    nome: "Marco Esposito",
    mestiere: "Falegname",
    zona: "Fuorigrotta",
    rating: 4.7,
    recensioni: 63,
    img: "https://picsum.photos/seed/falegname1/600/750",
    avatar: "https://picsum.photos/seed/marco/100/100",
    didascalia: "Libreria su misura in castagno massello.",
    prezzo: 450,
    verificato: false,
  },
  {
    id: 4,
    nome: "Sara Coppola",
    mestiere: "Elettricista",
    zona: "Vomero",
    rating: 4.8,
    recensioni: 51,
    img: "https://picsum.photos/seed/elettricista1/600/750",
    avatar: "https://picsum.photos/seed/sara/100/100",
    didascalia: "Rifacimento impianto elettrico a norma, 3 stanze.",
    prezzo: 260,
    verificato: true,
  },
];

const ZONE = ["Tutte le zone", "Vomero", "Chiaia", "Fuorigrotta"];
const COMMISSIONE = 0.12;
const DURATA_SESSIONE_MS = 30 * 24 * 60 * 60 * 1000;

export default function HomePage() {
  const [autenticato, setAutenticato] = useState(false);
  const [controlloIniziale, setControlloIniziale] = useState(true);

  useEffect(() => {
    const sessione = localStorage.getItem("artigianiup_sessione");
    if (sessione) {
      const { scadenza } = JSON.parse(sessione);
      if (Date.now() < scadenza) {
        setAutenticato(true);
      } else {
        localStorage.removeItem("artigianiup_sessione");
      }
    }
    setControlloIniziale(false);
  }, []);

  const effettuaLogin = (restaConnesso) => {
    if (restaConnesso) {
      localStorage.setItem(
        "artigianiup_sessione",
        JSON.stringify({ scadenza: Date.now() + DURATA_SESSIONE_MS })
      );
    }
    setAutenticato(true);
  };

  const effettuaLogout = () => {
    localStorage.removeItem("artigianiup_sessione");
    setAutenticato(false);
  };

  if (controlloIniziale) return null;

  return autenticato ? (
    <AppPrincipale onLogout={effettuaLogout} />
  ) : (
    <PaginaAccesso onLogin={effettuaLogin} />
  );
}

function PaginaAccesso({ onLogin }) {
  const [modo, setModo] = useState("login");
  const [restaConnesso, setRestaConnesso] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center py-8 font-sans">
      <div className="w-[380px] h-[800px] bg-[#0F1B19] rounded-[2.5rem] shadow-2xl overflow-hidden relative border-[6px] border-[#0F1B19] flex flex-col">
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#E8722C 1px, transparent 1px), linear-gradient(90deg, #E8722C 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex-1 overflow-y-auto px-7 pt-14 pb-8 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-md bg-[#E8722C]/15 border border-[#E8722C]/30 flex items-center justify-center">
              <Hammer size={15} className="text-[#E8722C]" />
            </div>
            <span className="text-white text-[13px] font-mono tracking-wide">ArtigianiUp</span>
          </div>

          <div className="flex items-center gap-2 mt-8 mb-1">
            <Wrench size={16} className="text-[#E8722C]" />
            <span className="text-[11px] tracking-[0.2em] text-[#E8722C] font-mono uppercase">
              {modo === "login" ? "Modulo accesso" : "Modulo registrazione"}
            </span>
          </div>
          <h1
            className="text-white text-[30px] leading-[1.08] mb-7"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            {modo === "login" ? (
              <>Bentornato,<br />al lavoro</>
            ) : (
              <>Apri il tuo<br />profilo</>
            )}
          </h1>

          <div className="flex bg-white/5 rounded-full p-1 mb-7 border border-white/10">
            <button
              onClick={() => setModo("login")}
              className={`flex-1 text-[12.5px] font-mono py-2 rounded-full transition ${
                modo === "login" ? "bg-[#E8722C] text-[#0F1B19] font-bold" : "text-white/40"
              }`}
            >
              ACCEDI
            </button>
            <button
              onClick={() => setModo("registrati")}
              className={`flex-1 text-[12.5px] font-mono py-2 rounded-full transition ${
                modo === "registrati" ? "bg-[#E8722C] text-[#0F1B19] font-bold" : "text-white/40"
              }`}
            >
              REGISTRATI
            </button>
          </div>

          <div className="space-y-4">
            {modo === "registrati" && <Campo icon={User} placeholder="Nome e cognome" />}
            <Campo icon={Mail} placeholder="Email" />
            <Campo icon={Lock} placeholder="Password" isPassword />
            {modo === "registrati" && (
              <Campo icon={Lock} placeholder="Conferma password" isPassword />
            )}
          </div>

          {modo === "login" && (
            <button
              onClick={() => setRestaConnesso((v) => !v)}
              className="flex items-center gap-2.5 mt-5"
            >
              <div
                className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                  restaConnesso ? "bg-[#E8722C] border-[#E8722C]" : "bg-transparent border-white/30"
                }`}
              >
                {restaConnesso && <div className="w-1.5 h-1.5 bg-[#0F1B19] rounded-[1px]" />}
              </div>
              <span className="text-white/70 text-[12.5px]">Resta connesso</span>
            </button>
          )}

          <button
            onClick={() => onLogin(modo === "login" ? restaConnesso : true)}
            className="mt-6 w-full bg-[#E8722C] text-[#0F1B19] font-mono text-[13px] font-bold tracking-wide py-3.5 rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            {modo === "login" ? "ACCEDI" : "CREA PROFILO"} <ArrowRight size={15} />
          </button>

          <div className="mt-5 border border-dashed border-white/20 rounded p-3 flex gap-2.5">
            <ShieldCheck size={16} className="text-[#E8722C] shrink-0 mt-0.5" />
            <p className="font-mono text-[10.5px] text-white/45 leading-relaxed">
              {restaConnesso && modo === "login" ? (
                <>
                  <span className="text-[#E8722C]">// sicurezza</span> — con "Resta
                  connesso" attivo resti autenticato fino a 30 giorni; dopo dovrai
                  reinserire la password, come con SPID.
                </>
              ) : (
                <>
                  <span className="text-[#E8722C]">// sicurezza</span> — senza "Resta
                  connesso" la sessione scade alla chiusura dell'app.
                </>
              )}
            </p>
          </div>

          <p className="text-center text-white/30 text-[11px] mt-6">
            {modo === "login" ? (
              <>Non hai un profilo? <span className="text-[#E8722C]">Registrati sopra</span></>
            ) : (
              <>Hai già un profilo? <span className="text-[#E8722C]">Accedi sopra</span></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Campo({ icon: Icon, placeholder, isPassword }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-white/20 pb-2.5">
      <Icon size={15} className="text-[#E8722C] shrink-0" />
      <input
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        className="bg-transparent text-white text-[13.5px] font-mono placeholder:text-white/35 outline-none w-full"
      />
    </div>
  );
}

function AppPrincipale({ onLogout }) {
  const [tab, setTab] = useState("home");
  const [liked, setLiked] = useState({});
  const [richiesta, setRichiesta] = useState(null);
  const [zona, setZona] = useState("Tutte le zone");
  const [menuAperto, setMenuAperto] = useState(false);

  const toggleLike = (id) => setLiked((s) => ({ ...s, [id]: !s[id] }));

  const prosFiltrati = useMemo(() => {
    if (zona === "Tutte le zone") return PROS;
    return PROS.filter((p) => p.zona === zona);
  }, [zona]);

  return (
    <div className="min-h-screen flex items-center justify-center py-8 font-sans">
      <div className="w-[380px] h-[780px] bg-[#0F1B19] rounded-[2.5rem] shadow-2xl overflow-hidden relative border-[6px] border-[#0F1B19] flex flex-col">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#E8722C 1px, transparent 1px), linear-gradient(90deg, #E8722C 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="h-8 flex items-center justify-between px-6 text-[11px] font-mono text-white/40 shrink-0 relative z-10">
          <span>9:41</span>
          <span className="text-[#E8722C]">ArtigianiUp</span>
        </div>

        <div className="px-5 pt-1 pb-3 shrink-0 border-b border-white/10 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hammer size={17} className="text-[#E8722C]" />
              <h1 className="text-xl font-bold tracking-tight text-white">ArtigianiUp</h1>
            </div>
            <button onClick={onLogout} className="text-white/40">
              <LogOut size={16} />
            </button>
          </div>

          <div className="relative mt-2.5">
            <button
              onClick={() => setMenuAperto((v) => !v)}
              className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-md px-3.5 py-2 text-[12.5px] text-white/70 font-mono"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#E8722C]" />
                {zona}
              </span>
              <ChevronDown size={14} className="text-white/30" />
            </button>
            {menuAperto && (
              <div className="absolute top-[110%] left-0 right-0 bg-[#16241F] border border-white/10 rounded-md shadow-lg z-30 overflow-hidden">
                {ZONE.map((z) => (
                  <button
                    key={z}
                    onClick={() => {
                      setZona(z);
                      setMenuAperto(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[12.5px] font-mono ${
                      z === zona ? "text-[#E8722C] font-semibold bg-[#E8722C]/5" : "text-white/60"
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10">
          {tab === "home" && prosFiltrati.length === 0 && (
            <p className="text-center text-[13px] text-white/40 pt-16 font-mono">
              Nessun professionista ancora in questa zona.
            </p>
          )}

          {tab === "home" &&
            prosFiltrati.map((p) => (
              <div key={p.id} className="relative bg-[#16241F] border border-white/10 rounded-xl overflow-hidden">
                <div className="absolute top-3 right-[-6px] z-10 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#0F1B19] border-2 border-[#E8722C] absolute left-[10px] top-1/2 -translate-y-1/2 z-10" />
                  <div
                    className="bg-[#E8722C] text-[#0F1B19] text-[13px] font-mono font-bold pl-4 pr-3 py-1.5 shadow-md"
                    style={{ clipPath: "polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)" }}
                  >
                    da €{p.prezzo}
                  </div>
                </div>

                <img src={p.img} alt={p.mestiere} className="w-full h-56 object-cover" />

                <div className="p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img src={p.avatar} className="w-8 h-8 rounded-md object-cover" alt={p.nome} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[14px] font-semibold text-white truncate">{p.nome}</span>
                        {p.verificato && <ShieldCheck size={14} className="text-[#E8722C] shrink-0" />}
                      </div>
                      <div className="text-[11.5px] text-white/40 font-mono">
                        {p.mestiere} · {p.zona}
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-[12px] text-white/70 shrink-0 font-mono">
                      <Star size={12} className="fill-[#E8722C] text-[#E8722C]" />
                      {p.rating}
                      <span className="text-white/30">({p.recensioni})</span>
                    </div>
                  </div>

                  <p className="text-[13px] text-white/70 leading-snug mb-2.5">{p.didascalia}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleLike(p.id)} className="flex items-center gap-1 text-white/50">
                        <Heart size={18} className={liked[p.id] ? "fill-[#E8722C] text-[#E8722C]" : ""} />
                      </button>
                      <MessageCircle size={18} className="text-white/50" />
                    </div>
                    <button
                      onClick={() => setRichiesta(p)}
                      className="text-[12.5px] font-mono font-bold text-[#0F1B19] bg-[#E8722C] px-3.5 py-1.5 rounded active:scale-95 transition"
                    >
                      RICHIEDI
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {tab === "search" && (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 pt-16">
              <Search size={28} className="text-white/20 mb-3" />
              <p className="text-[13px] text-white/40 font-mono">Cerca per mestiere, zona o nome</p>
            </div>
          )}

          {tab === "profile" && (
            <div className="pt-2">
              <div className="flex flex-col items-center text-center mb-5">
                <img src="https://picsum.photos/seed/antonio/120/120" className="w-20 h-20 rounded-md object-cover mb-2" />
                <div className="flex items-center gap-1">
                  <span className="text-[16px] font-semibold text-white">Antonio Russo</span>
                  <ShieldCheck size={15} className="text-[#E8722C]" />
                </div>
                <div className="text-[12.5px] text-white/40 font-mono flex items-center gap-1 mt-0.5">
                  <MapPin size={11} /> Napoli · Vomero
                </div>
                <div className="flex gap-4 mt-3 text-center font-mono">
                  <div>
                    <div className="text-[15px] font-semibold text-white">87</div>
                    <div className="text-[10.5px] text-white/40">Lavori</div>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-white">4.9</div>
                    <div className="text-[10.5px] text-white/40">Media</div>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-white">2</div>
                    <div className="text-[10.5px] text-white/40">Anni</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <img key={i} src={`https://picsum.photos/seed/lavoro${i}/200/200`} className="w-full aspect-square object-cover rounded" />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-white/10 bg-[#0F1B19] flex items-center justify-around py-2.5 relative z-10">
          {[
            { id: "home", icon: Home, label: "Feed" },
            { id: "search", icon: Search, label: "Cerca" },
            { id: "profile", icon: User, label: "Profilo" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className="flex flex-col items-center gap-0.5">
              <t.icon size={20} className={tab === t.id ? "text-[#E8722C]" : "text-white/30"} />
              <span className={`text-[10px] font-mono ${tab === t.id ? "text-[#E8722C] font-medium" : "text-white/30"}`}>
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {richiesta && (
          <div className="absolute inset-0 bg-black/60 flex items-end z-20">
            <div className="w-full bg-[#16241F] border-t border-white/10 rounded-t-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-white">Richiedi {richiesta.nome.split(" ")[0]}</h3>
                <button onClick={() => setRichiesta(null)}>
                  <X size={20} className="text-white/40" />
                </button>
              </div>
              <div className="space-y-2 text-[13px] font-mono mb-4">
                <div className="flex justify-between text-white/60">
                  <span>Servizio</span>
                  <span>€{richiesta.prezzo}.00</span>
                </div>
                <div className="flex justify-between text-white/40">
                  <span>Commissione piattaforma ({COMMISSIONE * 100}%)</span>
                  <span>€{(richiesta.prezzo * COMMISSIONE).toFixed(2)}</span>
                </div>
                <div className="border-t border-dashed border-white/20 pt-2 flex justify-between text-white font-semibold">
                  <span>Totale a te</span>
                  <span>€{(richiesta.prezzo * (1 + COMMISSIONE)).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => setRichiesta(null)}
                className="w-full bg-[#E8722C] text-[#0F1B19] py-3 rounded font-mono text-[13.5px] font-bold active:scale-[0.98] transition"
              >
                PAGA E CONFERMA CON STRIPE
              </button>
              <p className="text-center text-[10.5px] text-white/30 mt-2 font-mono">
                Al professionista arriva l'importo del servizio, la commissione resta alla piattaforma
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
