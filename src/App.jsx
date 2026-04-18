import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Menu, X, Zap, BarChart2, ShieldCheck } from 'lucide-react'
import BackgroundVideo from './BackgroundVideo.jsx'

// ── Avatar data ──────────────────────────────────────────────────
const AVATARS = [
  'https://i.pravatar.cc/40?img=11',
  'https://i.pravatar.cc/40?img=22',
  'https://i.pravatar.cc/40?img=33',
]

// ── Motion variants ──────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay } },
})

const fadeIn = (delay = 0) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay } },
})

// ── Primary CTA Button ────────────────────────────────────────────
function PrimaryButton({ children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      className="relative group px-7 py-3.5 rounded-xl font-switzer font-semibold text-white text-[15px] tracking-tight overflow-hidden cursor-pointer"
      style={{ background: 'linear-gradient(135deg, #FF3300 0%, #EE7926 100%)' }}
      animate={{ scale: hovered ? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-orange-500 blur-xl"
        animate={{ opacity: hovered ? 0.55 : 0.18 }}
        transition={{ duration: 0.3 }}
      />
      {/* Inner stroke */}
      <div className="absolute inset-0 rounded-xl border border-white/20 pointer-events-none" />
      {/* Content */}
      <span className="relative flex items-center gap-2">
        <motion.span
          animate={{ x: hovered ? 0 : -18, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex items-center"
        >
          <ArrowRight size={15} />
        </motion.span>
        {children}
      </span>
    </motion.button>
  )
}

// ── Secondary Button ──────────────────────────────────────────────
function SecondaryButton({ children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      className="relative px-7 py-3.5 rounded-xl font-switzer font-medium text-[15px] tracking-tight text-black cursor-pointer"
      style={{ backdropFilter: 'blur(16px)', background: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.9)' }}
      animate={{ scale: hovered ? 1.05 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Inner stroke */}
      <div className="absolute inset-0 rounded-xl border border-black/5 pointer-events-none" />
      {children}
    </motion.button>
  )
}

// ── Navbar ────────────────────────────────────────────────────────
const NAV_LINKS = ['Features', 'Pricing', 'Reviews']

function Navbar() {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen(v => !v), [])

  return (
    <motion.nav
      variants={fadeIn(0.1)}
      initial="hidden"
      animate="visible"
      className="absolute top-[5px] left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF3300, #EE7926)' }}>
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-switzer font-semibold text-white text-[17px] tracking-tight">ClearInvoice</span>
        </div>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a
              key={link}
              href="#"
              className="font-geist text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Auth — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button className="font-geist text-sm text-white/75 hover:text-white transition-colors px-4 py-2">
            Sign In
          </button>
          <button
            className="font-geist text-sm font-medium text-black px-5 py-2 rounded-lg transition-all"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.06)' }}
          >
            Sign Up
          </button>
        </div>

        {/* Hamburger — mobile */}
        <button onClick={toggle} className="md:hidden text-white p-2 rounded-lg bg-white/10 backdrop-blur-sm">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-2 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(10,10,18,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map(link => (
                <a key={link} href="#" className="font-geist text-white/80 px-4 py-3 rounded-xl hover:bg-white/8 text-sm transition-colors">
                  {link}
                </a>
              ))}
              <div className="border-t border-white/10 mt-2 pt-3 flex flex-col gap-2">
                <button className="font-geist text-sm text-white/75 px-4 py-2.5 rounded-xl hover:bg-white/8 text-left transition-colors">
                  Sign In
                </button>
                <button className="font-geist text-sm font-medium text-black px-4 py-2.5 rounded-xl bg-white/90">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// ── Badge ─────────────────────────────────────────────────────────
function Badge() {
  return (
    <div
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-geist font-medium"
      style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      <span className="text-white/80">Trusted by 210k+ stores worldwide</span>
    </div>
  )
}

// ── Social Proof ──────────────────────────────────────────────────
function SocialProof() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {AVATARS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="w-9 h-9 rounded-full border-2 border-white/20 object-cover"
            style={{ zIndex: AVATARS.length - i }}
          />
        ))}
      </div>
      <div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3 h-3 text-[#EE7926]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-white/60 text-xs font-geist mt-0.5">Trusted by 210k+ stores worldwide</p>
      </div>
    </div>
  )
}

// ── Floating feature pills ────────────────────────────────────────
function FeaturePill({ icon: Icon, label, className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-geist font-medium text-white/80 ${className}`}
      style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.14)' }}
    >
      <Icon size={13} className="text-[#EE7926]" />
      {label}
    </div>
  )
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#050508]">

      {/* ── Top gradient bar ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[5px] z-50"
        style={{ background: 'linear-gradient(90deg, #ccf 0%, #e7d04c 50%, #31fb78 100%)' }}
      />

      {/* ── Background video ── */}
      <BackgroundVideo />

      {/* ── Vignette / atmospheric overlay ── */}
      <div
        className="absolute inset-0 -z-[5] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(5,5,8,0.2) 0%, transparent 60%),
            radial-gradient(ellipse 100% 50% at 50% 100%, rgba(5,5,8,0.85) 0%, transparent 80%),
            radial-gradient(ellipse 60% 100% at 0% 50%, rgba(5,5,8,0.4) 0%, transparent 60%),
            radial-gradient(ellipse 60% 100% at 100% 50%, rgba(5,5,8,0.4) 0%, transparent 60%)
          `
        }}
      />

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero Content ── */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24 pb-16">

        {/* Badge */}
        <motion.div variants={fadeUp(0.2)} initial="hidden" animate="visible" className="mb-6">
          <Badge />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp(0.35)}
          initial="hidden"
          animate="visible"
          className="font-switzer font-semibold text-white leading-[1.06] tracking-[-0.03em] max-w-3xl"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 4.5rem)' }}
        >
          Manage your online store<br />
          <span
            className="relative inline-block"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FF3300 0%, #EE7926 55%, #FFD166 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            while save 3x
          </span>{' '}
          operating cost
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={fadeUp(0.5)}
          initial="hidden"
          animate="visible"
          className="mt-6 font-geist text-white/75 max-w-lg leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}
        >
          ClearInvoice takes the hassle out of billing with easy-to-use tools built for modern commerce.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp(0.65)}
          initial="hidden"
          animate="visible"
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <PrimaryButton>Get Started Free</PrimaryButton>
          <SecondaryButton>Watch Demo</SecondaryButton>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          variants={fadeUp(0.8)}
          initial="hidden"
          animate="visible"
          className="mt-10"
        >
          <SocialProof />
        </motion.div>

        {/* Feature pills */}
        <motion.div
          variants={fadeUp(0.95)}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <FeaturePill icon={Zap} label="Instant invoicing" />
          <FeaturePill icon={BarChart2} label="Real-time analytics" />
          <FeaturePill icon={ShieldCheck} label="PCI-DSS compliant" />
        </motion.div>

      </main>
    </div>
  )
}
