import { useState, useEffect, useRef } from "react";

const COLORS = {
  ocean: "#0A2342",
  wave: "#1B4F8A",
  seafoam: "#2E86AB",
  aqua: "#00C9B1",
  sand: "#F5E6C8",
  coral: "#FF6B6B",
  gold: "#FFB347",
  white: "#F8FBFF",
  muted: "#8AACC8",
  dark: "#060F1E",
  glass: "rgba(255,255,255,0.08)",
  glassBorder: "rgba(255,255,255,0.15)",
};

const WavePattern = () => (
  <svg viewBox="0 0 400 80" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", opacity: 0.15 }}>
    <path d="M0,40 C100,10 200,70 400,40 L400,80 L0,80 Z" fill={COLORS.aqua} />
    <path d="M0,55 C80,30 200,75 400,50 L400,80 L0,80 Z" fill={COLORS.seafoam} opacity="0.6" />
  </svg>
);

const BoatIcon = ({ size = 24, color = COLORS.aqua }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 17l2-8h14l2 8H3z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8 9V5l4-2 4 2v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 20c2 1.5 5 1.5 5 0s3-1.5 5 0 3 1.5 5 0 3-1.5 5 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const MapIcon = ({ size = 22, color = COLORS.muted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const BookIcon = ({ size = 22, color = COLORS.muted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const UserIcon = ({ size = 22, color = COLORS.muted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const HomeIcon = ({ size = 22, color = COLORS.muted }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const StarIcon = ({ filled = true, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? COLORS.gold : "none"} stroke={COLORS.gold} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const ArrowLeft = ({ size = 20, color = COLORS.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const LocationPin = ({ size = 16, color = COLORS.coral }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const boats = [
  { id: 1, name: "Maria Ligaya", operator: "Kuya Rodel", rating: 4.8, reviews: 124, capacity: 12, available: 5, from: "Mactan Pier", to: "Olango Island", departure: "9:00 AM", price: 150, eta: "25 min", tags: ["Life Vests", "GPS", "Cargo OK"], status: "On Time" },
  { id: 2, name: "Balud ni Cebu", operator: "Tito Nanding", rating: 4.6, reviews: 89, capacity: 8, available: 3, from: "Mactan Pier", to: "Caohagan Island", departure: "9:30 AM", price: 200, eta: "40 min", tags: ["Life Vests", "GPS"], status: "Boarding" },
  { id: 3, name: "Dagat Kalma", operator: "Manong Efren", rating: 4.9, reviews: 203, capacity: 15, available: 9, from: "Mactan Pier", to: "Nalusuan Island", departure: "10:00 AM", price: 175, eta: "35 min", tags: ["Life Vests", "GPS", "Cargo OK", "Snorkeling"], status: "On Time" },
];

const mockLocations = [
  { name: "Mactan Pier", type: "origin" },
  { name: "Olango Island", type: "destination" },
  { name: "Caohagan Island", type: "destination" },
  { name: "Nalusuan Island", type: "destination" },
  { name: "Malapascua Island", type: "destination" },
  { name: "Camotes Island", type: "destination" },
];

// ─── SCREENS ────────────────────────────────────────────────────────────────

const SplashScreen = ({ onNext }) => {
  useEffect(() => { const t = setTimeout(onNext, 2200); return () => clearTimeout(t); }, []);
  return (
    <div style={{ ...styles.screen, background: `linear-gradient(160deg, ${COLORS.dark} 0%, ${COLORS.ocean} 50%, ${COLORS.wave} 100%)`, justifyContent: "center", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.aqua}22, transparent 70%)`, top: "10%", left: "50%", transform: "translateX(-50%)" }} />
      <WavePattern />
      <div style={{ textAlign: "center", zIndex: 2 }}>
        <div style={{ animation: "float 3s ease-in-out infinite", display: "inline-block", marginBottom: 16 }}>
          <BoatIcon size={72} color={COLORS.aqua} />
        </div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 42, fontWeight: 700, color: COLORS.white, letterSpacing: -1, lineHeight: 1.1 }}>
          Bangka<span style={{ color: COLORS.aqua }}>Go</span>
        </div>
        <div style={{ fontFamily: "Georgia, serif", color: COLORS.muted, fontSize: 13, marginTop: 8, letterSpacing: 3, textTransform: "uppercase" }}>
          Cebu Island Transport
        </div>
        <div style={{ marginTop: 48, display: "flex", gap: 6, justifyContent: "center" }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: i === 0 ? 24 : 8, height: 8, borderRadius: 4, background: i === 0 ? COLORS.aqua : COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, transition: "all 0.3s" }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }`}</style>
    </div>
  );
};

const OnboardingScreen = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const slides = [
    { icon: "🚤", title: "Book Your Bangka", body: "Find and reserve local bangka rides to any island in Cebu — fast, easy, and fair for all." },
    { icon: "📍", title: "Track in Real Time", body: "Watch your boat move live on the map. Know exactly when it arrives at your pier." },
    { icon: "🌊", title: "Safe & Organized", body: "Digital manifests, GPS tracking, and LGU oversight keep every trip safe and transparent." },
  ];
  const s = slides[step];
  return (
    <div style={{ ...styles.screen, background: `linear-gradient(170deg, ${COLORS.dark} 0%, ${COLORS.ocean} 100%)`, justifyContent: "flex-end", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 120, animation: "float 4s ease-in-out infinite", filter: "drop-shadow(0 20px 40px rgba(0,201,177,0.3))" }}>{s.icon}</div>
      </div>
      <WavePattern />
      <div style={{ background: `linear-gradient(0deg, ${COLORS.dark} 0%, transparent 100%)`, padding: "60px 28px 40px", zIndex: 2 }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, fontWeight: 700, color: COLORS.white, marginBottom: 12 }}>{s.title}</div>
        <div style={{ color: COLORS.muted, fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>{s.body}</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {slides.map((_, i) => <div key={i} style={{ flex: i === step ? 3 : 1, height: 4, borderRadius: 2, background: i === step ? COLORS.aqua : COLORS.glass, transition: "all 0.4s" }} />)}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {step < slides.length - 1 ? (
            <>
              <button onClick={onNext} style={{ ...styles.btnGhost, flex: 1 }}>Skip</button>
              <button onClick={() => setStep(s => s + 1)} style={{ ...styles.btnPrimary, flex: 2 }}>Next →</button>
            </>
          ) : (
            <button onClick={onNext} style={{ ...styles.btnPrimary, flex: 1 }}>Get Started</button>
          )}
        </div>
      </div>
    </div>
  );
};

const LoginScreen = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("passenger");
  return (
    <div style={{ ...styles.screen, background: `linear-gradient(160deg, ${COLORS.dark}, ${COLORS.ocean})`, justifyContent: "center", padding: "0 28px", overflow: "hidden", position: "relative" }}>
      <WavePattern />
      <div style={{ zIndex: 2, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <BoatIcon size={48} color={COLORS.aqua} />
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: COLORS.white, marginTop: 12 }}>Welcome Back</div>
          <div style={{ color: COLORS.muted, fontSize: 14 }}>Sign in to BangkaGo</div>
        </div>
        <div style={{ display: "flex", gap: 0, background: COLORS.glass, borderRadius: 12, border: `1px solid ${COLORS.glassBorder}`, marginBottom: 24, overflow: "hidden" }}>
          {["passenger", "bangkero", "admin"].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "10px 0", background: role === r ? COLORS.aqua : "transparent", color: role === r ? COLORS.dark : COLORS.muted, border: "none", fontWeight: role === r ? 700 : 400, fontSize: 12, cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize" }}>
              {r === "bangkero" ? "Bangkero" : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
        {[{ label: "Email", val: email, set: setEmail, type: "email" }, { label: "Password", val: pass, set: setPass, type: "password" }].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{f.label}</div>
            <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.label} style={{ ...styles.input }} />
          </div>
        ))}
        <button onClick={() => onLogin(role)} style={{ ...styles.btnPrimary, width: "100%", marginTop: 8 }}>Sign In</button>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span style={{ color: COLORS.muted, fontSize: 14 }}>No account? </span>
          <span onClick={onRegister} style={{ color: COLORS.aqua, fontSize: 14, cursor: "pointer", fontWeight: 600 }}>Register</span>
        </div>
      </div>
    </div>
  );
};

const RegisterScreen = ({ onBack, onDone }) => {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("passenger");
  const [form, setForm] = useState({ name: "", email: "", phone: "", pass: "" });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ ...styles.screen, background: `linear-gradient(160deg, ${COLORS.dark}, ${COLORS.ocean})`, overflow: "hidden hidden", position: "relative" }}>
      <div style={{ padding: "52px 28px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={styles.iconBtn}><ArrowLeft /></button>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: COLORS.white, fontWeight: 700 }}>Create Account</div>
      </div>
      <div style={{ flex: 1, padding: "0 28px 32px", overflowY: "auto" }}>
        <div style={{ display: "flex", gap: 0, background: COLORS.glass, borderRadius: 12, border: `1px solid ${COLORS.glassBorder}`, marginBottom: 28, overflow: "hidden" }}>
          {["passenger", "bangkero"].map(r => (
            <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "11px 0", background: role === r ? COLORS.aqua : "transparent", color: role === r ? COLORS.dark : COLORS.muted, border: "none", fontWeight: role === r ? 700 : 400, fontSize: 13, cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize" }}>
              {r === "bangkero" ? "🚤 Bangkero" : "👤 Passenger"}
            </button>
          ))}
        </div>
        {[{ k: "name", label: "Full Name", placeholder: "Juan dela Cruz" },
          { k: "email", label: "Email", placeholder: "juan@email.com" },
          { k: "phone", label: "Phone", placeholder: "+63 9XX XXX XXXX" },
          { k: "pass", label: "Password", placeholder: "••••••••" }].map(f => (
          <div key={f.k} style={{ marginBottom: 16 }}>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{f.label}</div>
            <input value={form[f.k]} onChange={e => upd(f.k, e.target.value)} placeholder={f.placeholder} style={styles.input} type={f.k === "pass" ? "password" : "text"} />
          </div>
        ))}
        {role === "bangkero" && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>License Number</div>
            <input placeholder="MARINA-XXXX-XXXX" style={styles.input} />
          </div>
        )}
        <button onClick={onDone} style={{ ...styles.btnPrimary, width: "100%", marginTop: 8 }}>Create Account</button>
      </div>
      <WavePattern />
    </div>
  );
};

const MapDot = ({ x, y, pulse }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)" }}>
    {pulse && <div style={{ position: "absolute", width: 28, height: 28, borderRadius: "50%", border: `2px solid ${COLORS.aqua}`, animation: "ping 1.5s ease-out infinite", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />}
    <div style={{ width: 14, height: 14, borderRadius: "50%", background: pulse ? COLORS.aqua : COLORS.coral, border: "2px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }} />
    <style>{`@keyframes ping { 0%{transform:translate(-50%,-50%) scale(1);opacity:1} 100%{transform:translate(-50%,-50%) scale(2.5);opacity:0} }`}</style>
  </div>
);

const HomeScreen = ({ role, onBook, onViewBoat, onNavigate }) => {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 1500); return () => clearInterval(t); }, []);

  const boatX = 120 + Math.sin(tick * 0.4) * 18;
  const boatY = 110 + Math.cos(tick * 0.3) * 10;

  return (
    <div style={{ ...styles.screen, background: COLORS.dark }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(180deg, ${COLORS.ocean}, ${COLORS.dark})`, padding: "52px 24px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 2 }}>Good morning 👋</div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: COLORS.white, fontWeight: 700 }}>Find your Bangka</div>
          </div>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.aqua}, ${COLORS.seafoam})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🧑</div>
        </div>
        {/* Search bar */}
        <div style={{ marginTop: 20, background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <LocationPin size={18} color={COLORS.aqua} />
          <div style={{ color: COLORS.muted, fontSize: 14 }}>Where are you going?</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 80px" }}>
        {/* Live Map Preview */}
        <div style={{ margin: "16px 16px 0", borderRadius: 20, overflow: "hidden", position: "relative", height: 180 }}>
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, #0d3b6e 0%, #1a5276 40%, #1e6b8a 70%, #117a8b 100%)`, position: "relative" }}>
            {/* Fake sea map */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }} viewBox="0 0 300 180">
              <path d="M20,80 Q60,60 100,75 Q140,90 180,70 Q220,50 260,65 Q290,75 300,70 L300,180 L0,180 Z" fill="#1a7fa0" />
              <ellipse cx="60" cy="90" rx="35" ry="20" fill="#2e8b57" opacity="0.7" />
              <ellipse cx="220" cy="70" rx="28" ry="16" fill="#2e8b57" opacity="0.7" />
              <ellipse cx="150" cy="110" rx="20" ry="12" fill="#2e8b57" opacity="0.5" />
              <text x="50" y="96" fontSize="8" fill="white" opacity="0.9" fontWeight="bold">Olango</text>
              <text x="208" y="76" fontSize="8" fill="white" opacity="0.9" fontWeight="bold">Caohagan</text>
              <text x="136" y="116" fontSize="8" fill="white" opacity="0.9" fontWeight="bold">Nalusuan</text>
              {/* Route line */}
              <path d="M120,120 Q140,95 150,80" stroke={COLORS.aqua} strokeWidth="1.5" strokeDasharray="4,3" fill="none" opacity="0.8" />
            </svg>
            <MapDot x={boatX} y={boatY} pulse />
            <MapDot x={60} y={90} />
            <MapDot x={225} y={68} />
            <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.6)", borderRadius: 8, padding: "4px 10px", color: COLORS.aqua, fontSize: 11, fontWeight: 700 }}>● LIVE</div>
            <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(0,0,0,0.6)", borderRadius: 8, padding: "5px 12px", color: COLORS.white, fontSize: 12 }}>3 boats active nearby</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ padding: "20px 16px 0" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: "🚤", label: "Book Ride", action: onBook, color: COLORS.aqua },
              { icon: "📦", label: "Cargo", action: () => {}, color: COLORS.gold },
              { icon: "🗺️", label: "Track Trip", action: () => onNavigate("map"), color: COLORS.coral },
              { icon: "📋", label: "Manifest", action: () => {}, color: "#A29BFE" },
            ].map(a => (
              <button key={a.label} onClick={a.action} style={{ flex: 1, background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 14, padding: "14px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 22 }}>{a.icon}</div>
                <div style={{ color: a.color, fontSize: 11, fontWeight: 600 }}>{a.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Available Bangkas */}
        <div style={{ padding: "24px 16px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: COLORS.white, fontSize: 18, fontWeight: 700 }}>Available Bangkas</div>
            <div style={{ color: COLORS.aqua, fontSize: 13, cursor: "pointer" }}>See all</div>
          </div>
          {boats.map(b => (
            <div key={b.id} onClick={() => onViewBoat(b)} style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 18, padding: "16px", marginBottom: 12, cursor: "pointer", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: b.status === "Boarding" ? COLORS.gold : COLORS.aqua, borderRadius: "4px 0 0 4px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 15 }}>{b.name}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}>by {b.operator}</div>
                </div>
                <div style={{ background: b.status === "Boarding" ? `${COLORS.gold}22` : `${COLORS.aqua}22`, border: `1px solid ${b.status === "Boarding" ? COLORS.gold : COLORS.aqua}`, borderRadius: 8, padding: "3px 10px", color: b.status === "Boarding" ? COLORS.gold : COLORS.aqua, fontSize: 11, fontWeight: 700 }}>
                  {b.status}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "10px 0 6px" }}>
                <LocationPin size={13} color={COLORS.muted} />
                <span style={{ color: COLORS.muted, fontSize: 12 }}>{b.from}</span>
                <span style={{ color: COLORS.muted, fontSize: 12 }}> → </span>
                <LocationPin size={13} color={COLORS.coral} />
                <span style={{ color: COLORS.muted, fontSize: 12 }}>{b.to}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ color: COLORS.muted, fontSize: 12 }}>⏰ {b.departure}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12 }}>🪑 {b.available}/{b.capacity}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }}><StarIcon size={12} /><span style={{ color: COLORS.gold, fontSize: 12 }}>{b.rating}</span></div>
                </div>
                <div style={{ color: COLORS.aqua, fontWeight: 700, fontSize: 16 }}>₱{b.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Demand Insight */}
        <div style={{ margin: "8px 16px 0", background: `linear-gradient(135deg, ${COLORS.ocean}80, ${COLORS.seafoam}40)`, border: `1px solid ${COLORS.aqua}44`, borderRadius: 18, padding: "16px" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 28 }}>🤖</div>
            <div>
              <div style={{ color: COLORS.aqua, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>AI Demand Prediction</div>
              <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.6 }}>
                <span style={{ color: COLORS.white }}>High demand predicted</span> for Mactan→Olango this Saturday 8–11 AM. Book early to secure a seat.
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                {["Sat", "Sun", "Mon"].map((d, i) => (
                  <div key={d} style={{ flex: 1, background: COLORS.glass, borderRadius: 8, padding: "6px 0", textAlign: "center" }}>
                    <div style={{ color: COLORS.muted, fontSize: 10 }}>{d}</div>
                    <div style={{ height: 30, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "4px 8px 0" }}>
                      <div style={{ width: "100%", height: `${[90, 60, 40][i]}%`, background: [COLORS.coral, COLORS.gold, COLORS.aqua][i], borderRadius: "3px 3px 0 0", minHeight: 8 }} />
                    </div>
                    <div style={{ color: [COLORS.coral, COLORS.gold, COLORS.aqua][i], fontSize: 10, fontWeight: 700 }}>{["High", "Med", "Low"][i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoatDetailScreen = ({ boat, onBack, onBook }) => (
  <div style={{ ...styles.screen, background: COLORS.dark }}>
    <div style={{ background: `linear-gradient(180deg, ${COLORS.ocean} 0%, ${COLORS.dark} 100%)`, padding: "52px 20px 24px" }}>
      <button onClick={onBack} style={{ ...styles.iconBtn, marginBottom: 16 }}><ArrowLeft /></button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: COLORS.white, fontWeight: 700 }}>{boat.name}</div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 3 }}>Operated by {boat.operator}</div>
          <div style={{ display: "flex", gap: 4, marginTop: 8, alignItems: "center" }}>
            {[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= Math.floor(boat.rating)} size={14} />)}
            <span style={{ color: COLORS.gold, fontSize: 13, marginLeft: 4 }}>{boat.rating}</span>
            <span style={{ color: COLORS.muted, fontSize: 13 }}>({boat.reviews} reviews)</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: COLORS.aqua, fontWeight: 800, fontSize: 28 }}>₱{boat.price}</div>
          <div style={{ color: COLORS.muted, fontSize: 12 }}>per person</div>
        </div>
      </div>
    </div>

    <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 100px" }}>
      {/* Route Card */}
      <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 18, padding: "18px", marginBottom: 16 }}>
        <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Route Details</div>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: COLORS.muted, fontSize: 11 }}>FROM</div>
            <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 15, marginTop: 2 }}>{boat.from}</div>
            <div style={{ color: COLORS.gold, fontSize: 13 }}>{boat.departure}</div>
          </div>
          <div style={{ textAlign: "center", padding: "0 12px" }}>
            <div style={{ color: COLORS.muted, fontSize: 10 }}>{boat.eta}</div>
            <div style={{ height: 2, width: 60, background: `linear-gradient(90deg, ${COLORS.aqua}, ${COLORS.coral})`, margin: "4px 0", borderRadius: 1 }} />
            <div style={{ fontSize: 16 }}>🚤</div>
          </div>
          <div style={{ flex: 1, textAlign: "right" }}>
            <div style={{ color: COLORS.muted, fontSize: 11 }}>TO</div>
            <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 15, marginTop: 2 }}>{boat.to}</div>
            <div style={{ color: COLORS.coral, fontSize: 13 }}>Est. arrival</div>
          </div>
        </div>
      </div>

      {/* Capacity */}
      <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 18, padding: "18px", marginBottom: 16 }}>
        <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Seat Availability</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Array.from({ length: boat.capacity }).map((_, i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: i < (boat.capacity - boat.available) ? `${COLORS.coral}44` : `${COLORS.aqua}33`, border: `1px solid ${i < (boat.capacity - boat.available) ? COLORS.coral : COLORS.aqua}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
              {i < (boat.capacity - boat.available) ? "👤" : ""}
            </div>
          ))}
        </div>
        <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 10 }}>{boat.available} seats available of {boat.capacity}</div>
      </div>

      {/* Features */}
      <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 18, padding: "18px", marginBottom: 16 }}>
        <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Features & Safety</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {boat.tags.map(t => (
            <div key={t} style={{ background: `${COLORS.aqua}22`, border: `1px solid ${COLORS.aqua}55`, borderRadius: 20, padding: "5px 14px", color: COLORS.aqua, fontSize: 12, fontWeight: 600 }}>✓ {t}</div>
          ))}
          <div style={{ background: `${COLORS.gold}22`, border: `1px solid ${COLORS.gold}55`, borderRadius: 20, padding: "5px 14px", color: COLORS.gold, fontSize: 12, fontWeight: 600 }}>✓ Digital Manifest</div>
        </div>
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: `linear-gradient(0deg, ${COLORS.dark} 70%, transparent)` }}>
      <button onClick={onBook} style={{ ...styles.btnPrimary, width: "100%" }}>Book Now — ₱{boat.price}</button>
    </div>
  </div>
);

const BookingScreen = ({ boat, onBack, onConfirm }) => {
  const [pax, setPax] = useState(1);
  const [cargo, setCargo] = useState(false);
  const [payment, setPayment] = useState("gcash");
  return (
    <div style={{ ...styles.screen, background: COLORS.dark }}>
      <div style={{ padding: "52px 20px 20px", background: `linear-gradient(180deg, ${COLORS.ocean}, ${COLORS.dark})` }}>
        <button onClick={onBack} style={{ ...styles.iconBtn, marginBottom: 12 }}><ArrowLeft /></button>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, color: COLORS.white, fontWeight: 700 }}>Confirm Booking</div>
        <div style={{ color: COLORS.muted, fontSize: 13 }}>{boat.name} • {boat.from} → {boat.to}</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 100px" }}>
        {/* Passengers */}
        <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 18, padding: "18px", marginBottom: 14 }}>
          <div style={{ color: COLORS.muted, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Passengers</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ color: COLORS.white, fontSize: 15 }}>Number of seats</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button onClick={() => setPax(p => Math.max(1, p - 1))} style={{ ...styles.countBtn }}>−</button>
              <span style={{ color: COLORS.white, fontSize: 20, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{pax}</span>
              <button onClick={() => setPax(p => Math.min(boat.available, p + 1))} style={{ ...styles.countBtn }}>+</button>
            </div>
          </div>
        </div>

        {/* Cargo */}
        <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 18, padding: "18px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: COLORS.white, fontSize: 15 }}>Add Cargo</div>
              <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}>Small parcel delivery</div>
            </div>
            <div onClick={() => setCargo(c => !c)} style={{ width: 48, height: 26, borderRadius: 13, background: cargo ? COLORS.aqua : COLORS.glass, border: `1px solid ${cargo ? COLORS.aqua : COLORS.glassBorder}`, cursor: "pointer", position: "relative", transition: "all 0.3s" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: COLORS.white, position: "absolute", top: 2, left: cargo ? 24 : 2, transition: "all 0.3s" }} />
            </div>
          </div>
          {cargo && <input placeholder="Describe your cargo..." style={{ ...styles.input, marginTop: 12 }} />}
        </div>

        {/* Payment */}
        <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 18, padding: "18px", marginBottom: 14 }}>
          <div style={{ color: COLORS.muted, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Payment Method</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["gcash", "paymaya", "cash"].map(m => (
              <button key={m} onClick={() => setPayment(m)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: payment === m ? `${COLORS.aqua}33` : "transparent", border: `1px solid ${payment === m ? COLORS.aqua : COLORS.glassBorder}`, color: payment === m ? COLORS.aqua : COLORS.muted, fontSize: 12, fontWeight: payment === m ? 700 : 400, cursor: "pointer", textTransform: "capitalize" }}>
                {m === "gcash" ? "💙 GCash" : m === "paymaya" ? "💚 Maya" : "💵 Cash"}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div style={{ background: `linear-gradient(135deg, ${COLORS.ocean}80, ${COLORS.seafoam}40)`, border: `1px solid ${COLORS.aqua}44`, borderRadius: 18, padding: "18px" }}>
          <div style={{ color: COLORS.muted, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14 }}>Trip Summary</div>
          {[
            { label: "Base fare", val: `₱${boat.price} × ${pax}` },
            { label: "Service fee", val: "₱10" },
            { label: cargo ? "Cargo fee" : "Cargo", val: cargo ? "₱50" : "None" },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: COLORS.muted, fontSize: 13 }}>{r.label}</span>
              <span style={{ color: COLORS.white, fontSize: 13 }}>{r.val}</span>
            </div>
          ))}
          <div style={{ height: 1, background: COLORS.glassBorder, margin: "12px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: COLORS.white, fontWeight: 700 }}>Total</span>
            <span style={{ color: COLORS.aqua, fontWeight: 800, fontSize: 18 }}>₱{boat.price * pax + 10 + (cargo ? 50 : 0)}</span>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: `linear-gradient(0deg, ${COLORS.dark} 70%, transparent)` }}>
        <button onClick={onConfirm} style={{ ...styles.btnPrimary, width: "100%" }}>Confirm & Pay</button>
      </div>
    </div>
  );
};

const ConfirmScreen = ({ boat, onHome }) => {
  const manifestId = `BG-${Date.now().toString(36).toUpperCase()}`;
  return (
    <div style={{ ...styles.screen, background: COLORS.dark, justifyContent: "center", padding: "0 24px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 16, animation: "float 3s ease-in-out infinite" }}>✅</div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, color: COLORS.white, fontWeight: 700, marginBottom: 8 }}>Booking Confirmed!</div>
        <div style={{ color: COLORS.muted, fontSize: 14, marginBottom: 32 }}>Your digital manifest has been issued.</div>
        <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 20, padding: "24px", marginBottom: 24, textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: COLORS.muted, fontSize: 12 }}>MANIFEST ID</span>
            <span style={{ color: COLORS.aqua, fontWeight: 700, fontFamily: "monospace", fontSize: 13 }}>{manifestId}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: COLORS.muted, fontSize: 12 }}>Boat</span>
            <span style={{ color: COLORS.white, fontSize: 13 }}>{boat.name}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: COLORS.muted, fontSize: 12 }}>Route</span>
            <span style={{ color: COLORS.white, fontSize: 13 }}>{boat.from} → {boat.to}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: COLORS.muted, fontSize: 12 }}>Departure</span>
            <span style={{ color: COLORS.gold, fontSize: 13 }}>{boat.departure}</span>
          </div>
          <div style={{ marginTop: 16, height: 60, background: `repeating-linear-gradient(90deg, ${COLORS.dark} 0px, ${COLORS.dark} 4px, ${COLORS.glass} 4px, ${COLORS.glass} 8px)`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${COLORS.glassBorder}` }}>
            <div style={{ color: COLORS.aqua, fontSize: 10, letterSpacing: 4, fontFamily: "monospace" }}>||| ||| || |||||| |||</div>
          </div>
          <div style={{ color: COLORS.muted, fontSize: 10, textAlign: "center", marginTop: 6 }}>Digital Manifest — Valid for LGU inspection</div>
        </div>
        <button onClick={onHome} style={{ ...styles.btnPrimary, width: "100%" }}>Back to Home</button>
      </div>
      <WavePattern />
    </div>
  );
};

const MapScreen = ({ onNavigate }) => {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 1200); return () => clearInterval(t); }, []);
  const positions = [
    { x: 110 + Math.sin(tick * 0.5) * 15, y: 130 + Math.cos(tick * 0.4) * 8, name: "Maria Ligaya", status: "Active" },
    { x: 220 + Math.sin(tick * 0.3 + 1) * 12, y: 100 + Math.cos(tick * 0.5 + 1) * 10, name: "Balud ni Cebu", status: "Boarding" },
    { x: 170 + Math.sin(tick * 0.4 + 2) * 10, y: 180 + Math.cos(tick * 0.3 + 2) * 8, name: "Dagat Kalma", status: "Active" },
  ];

  return (
    <div style={{ ...styles.screen, background: COLORS.dark }}>
      <div style={{ padding: "52px 20px 16px", background: `linear-gradient(180deg, ${COLORS.ocean}, ${COLORS.dark})`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: COLORS.white, fontWeight: 700 }}>Live Tracking</div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.aqua, animation: "ping 1.5s ease-out infinite" }} />
          <span style={{ color: COLORS.aqua, fontSize: 12, fontWeight: 700 }}>3 Active</span>
        </div>
      </div>

      {/* Full Map */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, #0d3b6e 0%, #1a5276 40%, #1e6b8a 70%, #0e4d6e 100%)` }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }} viewBox="0 0 375 500" preserveAspectRatio="none">
            <path d="M30,120 Q80,100 130,115 Q180,130 230,110 Q280,90 340,105 Q370,115 375,110 L375,500 L0,500 Z" fill="#1a7fa0" />
            <ellipse cx="80" cy="135" rx="40" ry="22" fill="#2e7d5e" />
            <ellipse cx="260" cy="110" rx="32" ry="18" fill="#2e7d5e" />
            <ellipse cx="175" cy="165" rx="24" ry="14" fill="#2e7d5e" opacity="0.8" />
            <ellipse cx="320" cy="200" rx="18" ry="12" fill="#2e7d5e" opacity="0.6" />
            <text x="64" y="140" fontSize="9" fill="white" opacity="0.9" fontWeight="bold">Olango</text>
            <text x="243" y="115" fontSize="9" fill="white" opacity="0.9" fontWeight="bold">Caohagan</text>
            <text x="158" y="170" fontSize="9" fill="white" opacity="0.9" fontWeight="bold">Nalusuan</text>
            <text x="305" y="205" fontSize="9" fill="white" opacity="0.9" fontWeight="bold">Gilutungan</text>
            {/* Grid */}
            {[100,150,200,250,300,350,400].map(y => <line key={y} x1="0" y1={y} x2="375" y2={y} stroke="white" strokeWidth="0.3" opacity="0.1" />)}
            {[50,100,150,200,250,300,350].map(x => <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="white" strokeWidth="0.3" opacity="0.1" />)}
            {/* Route dashes */}
            <path d={`M${positions[0].x},${positions[0].y} Q140,135 80,135`} stroke={COLORS.aqua} strokeWidth="1.5" strokeDasharray="5,4" fill="none" opacity="0.7" />
          </svg>
          {positions.map((p, i) => (
            <div key={i} style={{ position: "absolute", left: p.x, top: p.y, transform: "translate(-50%,-50%)" }}>
              <div style={{ position: "absolute", width: 30, height: 30, borderRadius: "50%", border: `2px solid ${p.status === "Boarding" ? COLORS.gold : COLORS.aqua}`, animation: "ping 2s ease-out infinite", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animationDelay: `${i * 0.5}s` }} />
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.ocean}, ${COLORS.wave})`, border: `2px solid ${p.status === "Boarding" ? COLORS.gold : COLORS.aqua}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: `0 4px 16px ${p.status === "Boarding" ? COLORS.gold : COLORS.aqua}55`, cursor: "pointer" }}>🚤</div>
              <div style={{ position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.8)", borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap", color: COLORS.white, fontSize: 10, fontWeight: 600 }}>{p.name}</div>
            </div>
          ))}
          {/* Pier dot */}
          <div style={{ position: "absolute", left: "50%", top: "70%", transform: "translate(-50%,-50%)" }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: COLORS.coral, border: "3px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.8)", borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap", color: COLORS.coral, fontSize: 10, fontWeight: 700 }}>📍 Your Location</div>
          </div>
          {/* OSM Credit */}
          <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.5)", borderRadius: 4, padding: "2px 6px", color: COLORS.muted, fontSize: 9 }}>© OpenStreetMap</div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{ background: COLORS.ocean, borderTop: `1px solid ${COLORS.glassBorder}`, padding: "16px 16px 80px" }}>
        <div style={{ color: COLORS.muted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Active Boats</div>
        <div style={{ display: "flex", gap: 10 }}>
          {positions.map((p, i) => (
            <div key={i} style={{ flex: 1, background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 12, padding: "10px" }}>
              <div style={{ color: COLORS.white, fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{p.name}</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.status === "Boarding" ? COLORS.gold : COLORS.aqua }} />
                <div style={{ color: p.status === "Boarding" ? COLORS.gold : COLORS.aqua, fontSize: 10 }}>{p.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TripsScreen = () => (
  <div style={{ ...styles.screen, background: COLORS.dark }}>
    <div style={{ padding: "52px 20px 20px", background: `linear-gradient(180deg, ${COLORS.ocean}, ${COLORS.dark})` }}>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: COLORS.white, fontWeight: 700 }}>My Trips</div>
    </div>
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>
      {[
        { boat: "Maria Ligaya", route: "Mactan → Olango", date: "Today, 9:00 AM", status: "Upcoming", manifest: "BG-A3F2", price: 150 },
        { boat: "Dagat Kalma", route: "Mactan → Nalusuan", date: "Mar 1, 10:00 AM", status: "Completed", manifest: "BG-B7D1", price: 175 },
        { boat: "Balud ni Cebu", route: "Mactan → Caohagan", date: "Feb 22, 9:30 AM", status: "Completed", manifest: "BG-C9E4", price: 200 },
      ].map((t, i) => (
        <div key={i} style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 18, padding: "16px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 15 }}>{t.boat}</div>
            <div style={{ background: t.status === "Upcoming" ? `${COLORS.gold}22` : `${COLORS.aqua}22`, border: `1px solid ${t.status === "Upcoming" ? COLORS.gold : COLORS.aqua}`, borderRadius: 8, padding: "3px 10px", color: t.status === "Upcoming" ? COLORS.gold : COLORS.aqua, fontSize: 11, fontWeight: 700 }}>{t.status}</div>
          </div>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>{t.route}</div>
          <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>🕐 {t.date}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
            <div style={{ color: COLORS.muted, fontSize: 11, fontFamily: "monospace", background: `${COLORS.aqua}11`, borderRadius: 4, padding: "2px 8px", border: `1px solid ${COLORS.aqua}33` }}>{t.manifest}</div>
            <div style={{ color: COLORS.aqua, fontWeight: 700 }}>₱{t.price}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProfileScreen = () => (
  <div style={{ ...styles.screen, background: COLORS.dark }}>
    <div style={{ padding: "52px 20px 32px", background: `linear-gradient(180deg, ${COLORS.ocean}, ${COLORS.dark})`, textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.aqua}, ${COLORS.seafoam})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 12px" }}>👤</div>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: COLORS.white, fontWeight: 700 }}>Juan dela Cruz</div>
      <div style={{ color: COLORS.muted, fontSize: 13 }}>Passenger · Cebu, Philippines</div>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 20 }}>
        {[{ n: "12", l: "Trips" }, { n: "4.9", l: "Rating" }, { n: "₱2,100", l: "Spent" }].map(s => (
          <div key={s.l}>
            <div style={{ color: COLORS.aqua, fontWeight: 800, fontSize: 20 }}>{s.n}</div>
            <div style={{ color: COLORS.muted, fontSize: 11 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 80px" }}>
      {[
        { icon: "📋", label: "Digital Manifests", sub: "View all your trip records" },
        { icon: "💳", label: "Payment Methods", sub: "GCash, Maya, Cash" },
        { icon: "🔔", label: "Notifications", sub: "Trip alerts & updates" },
        { icon: "🛡️", label: "Safety Info", sub: "Emergency contacts & LGU" },
        { icon: "⚙️", label: "Settings", sub: "Language, privacy, account" },
        { icon: "❓", label: "Help & Support", sub: "FAQs and contact us" },
      ].map(item => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 14, background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer" }}>
          <div style={{ fontSize: 22 }}>{item.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600 }}>{item.label}</div>
            <div style={{ color: COLORS.muted, fontSize: 12 }}>{item.sub}</div>
          </div>
          <div style={{ color: COLORS.muted }}>›</div>
        </div>
      ))}
    </div>
  </div>
);

const NavBar = ({ active, onNavigate }) => {
  const items = [
    { id: "home", Icon: HomeIcon, label: "Home" },
    { id: "map", Icon: MapIcon, label: "Map" },
    { id: "trips", Icon: BookIcon, label: "Trips" },
    { id: "profile", Icon: UserIcon, label: "Profile" },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: `${COLORS.ocean}EE`, backdropFilter: "blur(20px)", borderTop: `1px solid ${COLORS.glassBorder}`, display: "flex", paddingBottom: 4 }}>
      {items.map(({ id, Icon, label }) => (
        <button key={id} onClick={() => onNavigate(id)} style={{ flex: 1, padding: "10px 0 8px", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Icon size={22} color={active === id ? COLORS.aqua : COLORS.muted} />
          <span style={{ fontSize: 10, color: active === id ? COLORS.aqua : COLORS.muted, fontWeight: active === id ? 700 : 400 }}>{label}</span>
          {active === id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: COLORS.aqua }} />}
        </button>
      ))}
    </div>
  );
};

// ─── APP ────────────────────────────────────────────────────────────────────

export default function BangkaGo() {
  const [screen, setScreen] = useState("splash");
  const [tab, setTab] = useState("home");
  const [selectedBoat, setSelectedBoat] = useState(null);
  const [role, setRole] = useState("passenger");

  const navigate = (t) => { setTab(t); setScreen("main"); };

  if (screen === "splash") return <Phone><SplashScreen onNext={() => setScreen("onboarding")} /></Phone>;
  if (screen === "onboarding") return <Phone><OnboardingScreen onNext={() => setScreen("login")} /></Phone>;
  if (screen === "login") return <Phone><LoginScreen onLogin={(r) => { setRole(r); setScreen("main"); }} onRegister={() => setScreen("register")} /></Phone>;
  if (screen === "register") return <Phone><RegisterScreen onBack={() => setScreen("login")} onDone={() => setScreen("main")} /></Phone>;
  if (screen === "boatDetail" && selectedBoat) return <Phone><BoatDetailScreen boat={selectedBoat} onBack={() => setScreen("main")} onBook={() => setScreen("booking")} /></Phone>;
  if (screen === "booking" && selectedBoat) return <Phone><BookingScreen boat={selectedBoat} onBack={() => setScreen("boatDetail")} onConfirm={() => setScreen("confirmed")} /></Phone>;
  if (screen === "confirmed" && selectedBoat) return <Phone><ConfirmScreen boat={selectedBoat} onHome={() => { setScreen("main"); setSelectedBoat(null); }} /></Phone>;

  return (
    <Phone>
      <div style={{ ...styles.screen, position: "relative" }}>
        {tab === "home" && <HomeScreen role={role} onBook={() => setScreen("main")} onViewBoat={(b) => { setSelectedBoat(b); setScreen("boatDetail"); }} onNavigate={navigate} />}
        {tab === "map" && <MapScreen onNavigate={navigate} />}
        {tab === "trips" && <TripsScreen />}
        {tab === "profile" && <ProfileScreen />}
        <NavBar active={tab} onNavigate={navigate} />
      </div>
    </Phone>
  );
}

function Phone({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ width: 375, height: 780, borderRadius: 44, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 8px #1a1a2e, 0 0 0 10px #0d0d1a", position: "relative", background: COLORS.dark }}>
        {/* Notch */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 28, background: "#0d0d1a", borderRadius: "0 0 20px 20px", zIndex: 100 }} />
        <div style={{ width: "100%", height: "100%", position: "relative" }}>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  screen: { width: "100%", height: "100%", display: "flex", flexDirection: "column", overflowX: "hidden" },
  btnPrimary: { background: `linear-gradient(135deg, ${COLORS.aqua}, ${COLORS.seafoam})`, color: COLORS.dark, fontWeight: 700, fontSize: 15, padding: "15px 24px", borderRadius: 14, border: "none", cursor: "pointer", boxShadow: `0 8px 24px ${COLORS.aqua}44` },
  btnGhost: { background: COLORS.glass, color: COLORS.white, fontWeight: 500, fontSize: 15, padding: "15px 24px", borderRadius: 14, border: `1px solid ${COLORS.glassBorder}`, cursor: "pointer" },
  iconBtn: { background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 12, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  input: { width: "100%", background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 12, padding: "13px 16px", color: COLORS.white, fontSize: 14, outline: "none", boxSizing: "border-box" },
  countBtn: { width: 36, height: 36, borderRadius: "50%", background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, color: COLORS.white, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
};
