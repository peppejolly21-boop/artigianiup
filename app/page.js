"use client";

import { useState, useMemo } from "react";
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

export default function HomePage() {
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
      <div className="w-[380px] h-[780px] bg-panna rounded-[2.5rem] shadow-2xl overflow-hidden relative border-[6px] border-ink flex flex-col">
        <div className="h-8 flex items-center justify-between px-6 text-[11px] font-mono text-ink/70 shrink-0">
          <span>9:41</span>
          <span>ArtigianiUp</span>
        </div>

        <div className="px-5 pt-1 pb-3 shrink-0 border-b border-ink/10">
          <h1 className="text-2xl font-bold tracking-tight text-ink">ArtigianiUp</h1>

          <div className="relative mt-2">
            <button
              onClick={() => setMenuAperto((v) => !v)}
              className="w-full flex items-center justify-between bg-white rounded-full px-3.5 py-2 text-[12.5px] text-ink/80 shadow-sm"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-petrolio" />
                {zona}
              </span>
              <ChevronDown size={14} className="text-ink/40" />
            </button>
            {menuAperto && (
              <div className="absolute top-[110%] left-0 right-0 bg-white rounded-xl shadow-lg z-30 overflow-hidden">
                {ZONE.map((z) => (
                  <button
                    key={z}
                    onClick={() => {
                      setZona(z);
                      setMenuAperto(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[12.5px] ${
                      z === zona ? "text-petrolio font-semibold bg-petrolio/5" : "text-ink/70"
                    }`}
                  >
                    {z}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {tab === "home" && prosFiltrati.length === 0 && (
            <p className="text-center text-[13px] text-ink/50 pt-16">
              Nessun professionista ancora in questa zona.
            </p>
          )}

          {tab === "home" &&
            prosFiltrati.map((p) => (
              <div key={p.id} className="relative bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="absolute top-3 right-[-6px] z-10 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-panna border-2 border-ottone absolute left-[10px] top-1/2 -translate-y-1/2 z-10" />
                  <div
                    className="bg-ottone text-white text-[13px] font-mono pl-4 pr-3 py-1.5 shadow-md"
                    style={{ clipPath: "polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)" }}
                  >
                    da €{p.prezzo}
                  </div>
                </div>

                <img src={p.img} alt={p.mestiere} className="w-full h-56 object-cover" />

                <div className="p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <img src={p.avatar} className="w-8 h-8 rounded-full object-cover" alt={p.nome} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[14px] font-semibold text-ink truncate">{p.nome}</span>
                        {p.verificato && <ShieldCheck size={14} className="text-petrolio shrink-0" />}
                      </div>
                      <div className="text-[11.5px] text-ink/55">
                        {p.mestiere} · {p.zona}
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-[12px] text-ink/80 shrink-0">
                      <Star size={12} className="fill-ottone text-ottone" />
                      {p.rating}
                      <span className="text-ink/40">({p.recensioni})</span>
                    </div>
                  </div>

                  <p className="text-[13px] text-ink/85 leading-snug mb-2.5">{p.didascalia}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleLike(p.id)} className="flex items-center gap-1 text-ink/70">
                        <Heart size={18} className={liked[p.id] ? "fill-[#B4472C] text-[#B4472C]" : ""} />
                      </button>
                      <MessageCircle size={18} className="text-ink/70" />
                    </div>
                    <button
                      onClick={() => setRichiesta(p)}
                      className="text-[12.5px] font-semibold text-white bg-petrolio px-3.5 py-1.5 rounded-full active:scale-95 transition"
                    >
                      Richiedi
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {tab === "search" && (
            <div className="flex flex-col items-center justify-center h-full text-center px-6 pt-16">
              <Search size={28} className="text-ink/30 mb-3" />
              <p className="text-[13px] text-ink/50">Cerca per mestiere, zona o nome</p>
            </div>
          )}

          {tab === "profile" && (
            <div className="pt-2">
              <div className="flex flex-col items-center text-center mb-5">
                <img src="https://picsum.photos/seed/antonio/120/120" className="w-20 h-20 rounded-full object-cover mb-2" />
                <div className="flex items-center gap-1">
                  <span className="text-[16px] font-semibold text-ink">Antonio Russo</span>
                  <ShieldCheck size={15} className="text-petrolio" />
                </div>
                <div className="text-[12.5px] text-ink/55 flex items-center gap-1 mt-0.5">
                  <MapPin size={11} /> Napoli · Vomero
                </div>
                <div className="flex gap-4 mt-3 text-center">
                  <div>
                    <div className="text-[15px] font-semibold text-ink">87</div>
                    <div className="text-[10.5px] text-ink/50">Lavori</div>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-ink">4.9</div>
                    <div className="text-[10.5px] text-ink/50">Media</div>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold text-ink">2</div>
                    <div className="text-[10.5px] text-ink/50">Anni</div>
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

        <div className="shrink-0 border-t border-ink/10 bg-panna flex items-center justify-around py-2.5">
          {[
            { id: "home", icon: Home, label: "Feed" },
            { id: "search", icon: Search, label: "Cerca" },
            { id: "profile", icon: User, label: "Profilo" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className="flex flex-col items-center gap-0.5">
              <t.icon size={20} className={tab === t.id ? "text-petrolio" : "text-ink/35"} />
              <span className={`text-[10px] ${tab === t.id ? "text-petrolio font-medium" : "text-ink/35"}`}>
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {richiesta && (
          <div className="absolute inset-0 bg-black/40 flex items-end z-20">
            <div className="w-full bg-white rounded-t-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-ink">Richiedi {richiesta.nome.split(" ")[0]}</h3>
                <button onClick={() => setRichiesta(null)}>
                  <X size={20} className="text-ink/50" />
                </button>
              </div>
              <div className="space-y-2 text-[13px] font-mono mb-4">
                <div className="flex justify-between text-ink/70">
                  <span>Servizio</span>
                  <span>€{richiesta.prezzo}.00</span>
                </div>
                <div className="flex justify-between text-ink/50">
                  <span>Commissione piattaforma ({COMMISSIONE * 100}%)</span>
                  <span>€{(richiesta.prezzo * COMMISSIONE).toFixed(2)}</span>
                </div>
                <div className="border-t border-dashed border-ink/20 pt-2 flex justify-between text-ink font-semibold">
                  <span>Totale a te</span>
                  <span>€{(richiesta.prezzo * (1 + COMMISSIONE)).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => setRichiesta(null)}
                className="w-full bg-petrolio text-white py-3 rounded-full text-[13.5px] font-semibold active:scale-[0.98] transition"
              >
                Paga e conferma con Stripe
              </button>
              <p className="text-center text-[10.5px] text-ink/40 mt-2">
                Al professionista arriva l'importo del servizio, la commissione resta alla piattaforma
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
    }
