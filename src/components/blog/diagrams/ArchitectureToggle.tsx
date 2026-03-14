"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ArchitectureToggleProps {
  defaultView?: "before" | "after";
}

export function ArchitectureToggle({ defaultView = "before" }: ArchitectureToggleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [view, setView] = useState<"before" | "after">(defaultView);

  const isBefore = view === "before";

  return (
    <div ref={ref} className="my-10">
      <div className="rounded-xl border border-white/5 bg-[#0D0D0D] p-4 md:p-8 overflow-x-auto">
        {/* Toggle Button */}
        <div className="flex items-center justify-center mb-6 gap-3">
          <button
            onClick={() => setView("before")}
            className={`relative px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
              isBefore
                ? "bg-red-500/15 text-red-400 border border-red-500/30"
                : "bg-white/5 text-white/40 border border-white/10 hover:text-white/60 hover:border-white/20"
            }`}
          >
            Traditional
            {isBefore && (
              <motion.div
                layoutId="toggle-indicator"
                className="absolute inset-0 rounded-lg border border-red-500/40"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
          <div className="w-8 h-[1px] bg-white/10" />
          <button
            onClick={() => setView("after")}
            className={`relative px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
              !isBefore
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-white/5 text-white/40 border border-white/10 hover:text-white/60 hover:border-white/20"
            }`}
          >
            VPC Origins
            {!isBefore && (
              <motion.div
                layoutId="toggle-indicator"
                className="absolute inset-0 rounded-lg border border-emerald-500/40"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        </div>

        {/* Label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={view}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className={`text-xs uppercase tracking-widest mb-6 font-mono text-center ${
              isBefore ? "text-red-400/80" : "text-emerald-400/80"
            }`}
          >
            {isBefore
              ? "Traditional Architecture — Public ALB + CloudFront"
              : "New Architecture — Private ALB + CloudFront VPC Origins"}
          </motion.p>
        </AnimatePresence>

        {/* SVG Diagram */}
        <AnimatePresence mode="wait">
          {isBefore ? (
            <motion.div
              key="before"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <BeforeDiagram isInView={isInView} />
            </motion.div>
          ) : (
            <motion.div
              key="after"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <AfterDiagram isInView={isInView} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.p
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-muted text-center mt-3 font-[family-name:var(--font-inter)]"
        >
          {isBefore
            ? "Traditional architecture — ALB sits in a public subnet with a public IP, exposing it to direct internet access"
            : "New architecture — ALB is fully private with CloudFront connecting via VPC Origins (AWS-managed secure tunnel)"}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Before Diagram (Traditional Public ALB)                                  */
/* ────────────────────────────────────────────────────────────────────────── */

function BeforeDiagram({ isInView }: { isInView: boolean }) {
  return (
    <svg
      viewBox="0 0 900 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full min-w-[700px]"
    >
      <defs>
        <pattern id="at-grid-old" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="at-dangerGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="at-cfGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="at-vpcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width="900" height="420" fill="url(#at-grid-old)" />

      {/* Internet / Users */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <rect x="20" y="160" width="120" height="100" rx="12" fill="#1A1A1A" stroke="#333" strokeWidth="1" />
        <text x="80" y="198" textAnchor="middle" fill="#F5F5F5" fontSize="12" fontWeight="600" fontFamily="system-ui">Users /</text>
        <text x="80" y="215" textAnchor="middle" fill="#F5F5F5" fontSize="12" fontWeight="600" fontFamily="system-ui">Internet</text>
        <circle cx="80" cy="240" r="8" fill="none" stroke="#737373" strokeWidth="1" />
        <path d="M76 240L84 240M80 236L80 244" stroke="#737373" strokeWidth="1" />
      </motion.g>

      {/* Arrow: Users -> CloudFront */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <line x1="140" y1="210" x2="200" y2="210" stroke="#737373" strokeWidth="1.5" strokeDasharray="6 3" />
        <polygon points="200,206 210,210 200,214" fill="#737373" />
        <text x="175" y="200" textAnchor="middle" fill="#737373" fontSize="9" fontFamily="system-ui">HTTPS</text>
      </motion.g>

      {/* CloudFront */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <rect x="210" y="150" width="160" height="120" rx="12" fill="url(#at-cfGrad)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.4" />
        <text x="290" y="178" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="500" fontFamily="system-ui">AWS EDGE</text>
        <rect x="230" y="190" width="120" height="50" rx="8" fill="#1A1A1A" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" />
        <text x="290" y="212" textAnchor="middle" fill="#C4B5FD" fontSize="12" fontWeight="600" fontFamily="system-ui">CloudFront</text>
        <text x="290" y="228" textAnchor="middle" fill="#737373" fontSize="9" fontFamily="system-ui">CDN Distribution</text>
      </motion.g>

      {/* Arrow: CloudFront -> ALB (PUBLIC INTERNET) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <line x1="370" y1="210" x2="450" y2="210" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 3" />
        <polygon points="450,206 460,210 450,214" fill="#EF4444" />
        <rect x="382" y="185" width="58" height="18" rx="4" fill="#EF4444" fillOpacity="0.15" />
        <text x="411" y="197" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="600" fontFamily="system-ui">PUBLIC</text>
      </motion.g>

      {/* VPC Boundary */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <rect x="460" y="50" width="420" height="350" rx="16" fill="url(#at-vpcGrad)" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="8 4" />
        <text x="480" y="78" fill="#3B82F6" fontSize="11" fontWeight="600" fontFamily="system-ui" fillOpacity="0.7">VPC</text>

        {/* Public Subnet */}
        <rect x="480" y="100" width="180" height="250" rx="10" fill="url(#at-dangerGrad)" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.3" />
        <text x="570" y="124" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="600" fontFamily="system-ui" fillOpacity="0.8">PUBLIC SUBNET</text>

        {/* ALB in Public Subnet */}
        <rect x="510" y="145" width="120" height="55" rx="8" fill="#1A1A1A" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.4" />
        <text x="570" y="170" textAnchor="middle" fill="#FCA5A5" fontSize="12" fontWeight="600" fontFamily="system-ui">ALB</text>
        <text x="570" y="186" textAnchor="middle" fill="#737373" fontSize="9" fontFamily="system-ui">Public-facing</text>

        {/* IGW */}
        <rect x="510" y="220" width="120" height="40" rx="8" fill="#1A1A1A" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.3" />
        <text x="570" y="244" textAnchor="middle" fill="#FCD34D" fontSize="11" fontWeight="500" fontFamily="system-ui">Internet Gateway</text>

        {/* Elastic IP */}
        <rect x="510" y="280" width="120" height="40" rx="8" fill="#1A1A1A" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.3" />
        <text x="570" y="300" textAnchor="middle" fill="#FCA5A5" fontSize="10" fontWeight="500" fontFamily="system-ui">Public IP / EIP</text>
        <text x="570" y="314" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="system-ui">⚠ Exposed</text>

        {/* Private Subnet */}
        <rect x="690" y="100" width="170" height="250" rx="10" fill="#1A1A1A" fillOpacity="0.3" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.2" />
        <text x="775" y="124" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="600" fontFamily="system-ui" fillOpacity="0.8">PRIVATE SUBNET</text>

        {/* EC2 Targets */}
        <rect x="715" y="155" width="120" height="45" rx="8" fill="#1A1A1A" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.3" />
        <text x="775" y="180" textAnchor="middle" fill="#86EFAC" fontSize="11" fontWeight="500" fontFamily="system-ui">EC2 / ECS Tasks</text>

        <rect x="715" y="215" width="120" height="45" rx="8" fill="#1A1A1A" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.3" />
        <text x="775" y="240" textAnchor="middle" fill="#86EFAC" fontSize="11" fontWeight="500" fontFamily="system-ui">Application</text>

        {/* Arrow ALB -> Targets */}
        <line x1="630" y1="172" x2="715" y2="172" stroke="#737373" strokeWidth="1" />
        <polygon points="715,169 722,172 715,175" fill="#737373" />
      </motion.g>

      {/* Danger annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <rect x="20" y="370" width="260" height="40" rx="8" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.2" />
        <text x="150" y="388" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">⚠ ALB has a public IP — anyone can bypass</text>
        <text x="150" y="402" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">CloudFront and hit the ALB directly</text>

        <rect x="310" y="370" width="260" height="40" rx="8" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.2" />
        <text x="440" y="388" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">⚠ Requires custom headers / WAF rules</text>
        <text x="440" y="402" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">to restrict origin access (brittle)</text>

        <rect x="600" y="370" width="270" height="40" rx="8" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.2" />
        <text x="735" y="388" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">⚠ DDoS attack surface — public endpoint</text>
        <text x="735" y="402" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">needs Shield Advanced / rate limiting</text>
      </motion.g>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  After Diagram (VPC Origins Private ALB)                                  */
/* ────────────────────────────────────────────────────────────────────────── */

function AfterDiagram({ isInView }: { isInView: boolean }) {
  return (
    <svg
      viewBox="0 0 900 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full min-w-[700px]"
    >
      <defs>
        <pattern id="at-grid-new" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
        </pattern>
        <linearGradient id="at-safeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="at-cfGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="at-vpcGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="at-tunnelGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="900" height="400" fill="url(#at-grid-new)" />

      {/* Internet / Users */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <rect x="20" y="140" width="120" height="100" rx="12" fill="#1A1A1A" stroke="#333" strokeWidth="1" />
        <text x="80" y="178" textAnchor="middle" fill="#F5F5F5" fontSize="12" fontWeight="600" fontFamily="system-ui">Users /</text>
        <text x="80" y="195" textAnchor="middle" fill="#F5F5F5" fontSize="12" fontWeight="600" fontFamily="system-ui">Internet</text>
        <circle cx="80" cy="220" r="8" fill="none" stroke="#737373" strokeWidth="1" />
        <path d="M76 220L84 220M80 216L80 224" stroke="#737373" strokeWidth="1" />
      </motion.g>

      {/* Arrow: Users -> CloudFront */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <line x1="140" y1="190" x2="200" y2="190" stroke="#737373" strokeWidth="1.5" strokeDasharray="6 3" />
        <polygon points="200,186 210,190 200,194" fill="#737373" />
        <text x="175" y="180" textAnchor="middle" fill="#737373" fontSize="9" fontFamily="system-ui">HTTPS</text>
      </motion.g>

      {/* CloudFront */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <rect x="210" y="125" width="160" height="130" rx="12" fill="url(#at-cfGrad2)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.4" />
        <text x="290" y="153" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="500" fontFamily="system-ui">AWS EDGE</text>
        <rect x="230" y="165" width="120" height="50" rx="8" fill="#1A1A1A" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" />
        <text x="290" y="187" textAnchor="middle" fill="#C4B5FD" fontSize="12" fontWeight="600" fontFamily="system-ui">CloudFront</text>
        <text x="290" y="203" textAnchor="middle" fill="#737373" fontSize="9" fontFamily="system-ui">CDN Distribution</text>

        {/* Shield icon */}
        <rect x="240" y="225" width="100" height="22" rx="6" fill="#22C55E" fillOpacity="0.1" />
        <text x="290" y="240" textAnchor="middle" fill="#22C55E" fontSize="8" fontWeight="600" fontFamily="system-ui">Shield + WAF</text>
      </motion.g>

      {/* VPC Origin Secure Tunnel */}
      <motion.g
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{ transformOrigin: "370px 190px" }}
      >
        <rect x="375" y="175" width="110" height="30" rx="8" fill="#22C55E" fillOpacity="0.08" stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.4" />
        <text x="430" y="194" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="700" fontFamily="system-ui">VPC ORIGIN</text>

        {/* Secure tunnel lines */}
        <line x1="370" y1="185" x2="375" y2="185" stroke="#22C55E" strokeWidth="2" />
        <line x1="370" y1="195" x2="375" y2="195" stroke="#22C55E" strokeWidth="2" />
        <line x1="485" y1="185" x2="510" y2="185" stroke="#22C55E" strokeWidth="2" />
        <line x1="485" y1="195" x2="510" y2="195" stroke="#22C55E" strokeWidth="2" />

        {/* Lock icon */}
        <rect x="418" y="157" width="24" height="18" rx="4" fill="#1A1A1A" stroke="#22C55E" strokeWidth="1" />
        <path d="M426 157V153C426 150.239 428.239 148 431 148C433.761 148 436 150.239 436 153V157" stroke="#22C55E" strokeWidth="1" fill="none" />
        <circle cx="430" cy="166" r="2" fill="#22C55E" />
      </motion.g>

      {/* VPC Boundary */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <rect x="510" y="40" width="370" height="310" rx="16" fill="url(#at-vpcGrad2)" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.3" />
        <text x="530" y="68" fill="#3B82F6" fontSize="11" fontWeight="600" fontFamily="system-ui" fillOpacity="0.7">VPC</text>

        {/* Private Subnet */}
        <rect x="530" y="85" width="330" height="245" rx="10" fill="url(#at-safeGrad)" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.3" />
        <text x="695" y="108" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="600" fontFamily="system-ui" fillOpacity="0.8">PRIVATE SUBNET (No Public IPs!)</text>

        {/* ALB in Private Subnet */}
        <rect x="555" y="125" width="130" height="60" rx="8" fill="#1A1A1A" stroke="#22C55E" strokeWidth="1.5" strokeOpacity="0.5" />
        <text x="620" y="151" textAnchor="middle" fill="#86EFAC" fontSize="13" fontWeight="700" fontFamily="system-ui">Private ALB</text>
        <text x="620" y="170" textAnchor="middle" fill="#22C55E" fontSize="9" fontFamily="system-ui">Internal only</text>

        {/* No IGW badge */}
        <rect x="555" y="200" width="130" height="35" rx="8" fill="#1A1A1A" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.2" />
        <text x="620" y="218" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="500" fontFamily="system-ui">No IGW needed</text>
        <text x="620" y="230" textAnchor="middle" fill="#22C55E" fontSize="8" fontFamily="system-ui">No Public IP</text>

        {/* EC2 Targets */}
        <rect x="725" y="125" width="120" height="50" rx="8" fill="#1A1A1A" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.3" />
        <text x="785" y="153" textAnchor="middle" fill="#86EFAC" fontSize="11" fontWeight="500" fontFamily="system-ui">EC2 / ECS Tasks</text>

        <rect x="725" y="190" width="120" height="50" rx="8" fill="#1A1A1A" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.3" />
        <text x="785" y="218" textAnchor="middle" fill="#86EFAC" fontSize="11" fontWeight="500" fontFamily="system-ui">Application</text>

        {/* RDS in private */}
        <rect x="725" y="255" width="120" height="50" rx="8" fill="#1A1A1A" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.3" />
        <text x="785" y="283" textAnchor="middle" fill="#93C5FD" fontSize="11" fontWeight="500" fontFamily="system-ui">RDS / ElastiCache</text>

        {/* Arrow ALB -> Targets */}
        <line x1="685" y1="152" x2="725" y2="152" stroke="#737373" strokeWidth="1" />
        <polygon points="725,149 732,152 725,155" fill="#737373" />
      </motion.g>

      {/* Success annotations */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <rect x="20" y="355" width="270" height="36" rx="8" fill="#22C55E" fillOpacity="0.06" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.2" />
        <text x="155" y="377" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="500" fontFamily="system-ui">ALB is completely private — zero public exposure</text>

        <rect x="310" y="355" width="280" height="36" rx="8" fill="#22C55E" fillOpacity="0.06" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.2" />
        <text x="450" y="377" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="500" fontFamily="system-ui">AWS-managed secure tunnel, no custom headers needed</text>

        <rect x="610" y="355" width="270" height="36" rx="8" fill="#22C55E" fillOpacity="0.06" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.2" />
        <text x="745" y="377" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="500" fontFamily="system-ui">Reduced attack surface — DDoS only hits edge</text>
      </motion.g>
    </svg>
  );
}
