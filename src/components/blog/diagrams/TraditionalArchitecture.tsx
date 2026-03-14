"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TraditionalArchitecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="my-10">
      <div className="rounded-xl border border-white/5 bg-[#0D0D0D] p-4 md:p-8 overflow-x-auto">
        <p className="text-xs text-red-400/80 uppercase tracking-widest mb-6 font-mono text-center">
          Traditional Architecture — Public ALB + CloudFront
        </p>
        <svg
          viewBox="0 0 900 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full min-w-[700px]"
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid-old" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="dangerGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="cfGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="vpcGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <rect width="900" height="420" fill="url(#grid-old)" />

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
            <rect x="210" y="150" width="160" height="120" rx="12" fill="url(#cfGrad)" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.4" />
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
            <rect x="460" y="50" width="420" height="350" rx="16" fill="url(#vpcGrad)" stroke="#3B82F6" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="8 4" />
            <text x="480" y="78" fill="#3B82F6" fontSize="11" fontWeight="600" fontFamily="system-ui" fillOpacity="0.7">VPC</text>

            {/* Public Subnet */}
            <rect x="480" y="100" width="180" height="250" rx="10" fill="url(#dangerGrad)" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.3" />
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
            {/* Risk callout 1 */}
            <rect x="20" y="370" width="260" height="40" rx="8" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.2" />
            <text x="150" y="388" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">⚠ ALB has a public IP — anyone can bypass</text>
            <text x="150" y="402" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">CloudFront and hit the ALB directly</text>

            {/* Risk callout 2 */}
            <rect x="310" y="370" width="260" height="40" rx="8" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.2" />
            <text x="440" y="388" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">⚠ Requires custom headers / WAF rules</text>
            <text x="440" y="402" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">to restrict origin access (brittle)</text>

            {/* Risk callout 3 */}
            <rect x="600" y="370" width="270" height="40" rx="8" fill="#EF4444" fillOpacity="0.08" stroke="#EF4444" strokeWidth="1" strokeOpacity="0.2" />
            <text x="735" y="388" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">⚠ DDoS attack surface — public endpoint</text>
            <text x="735" y="402" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="500" fontFamily="system-ui">needs Shield Advanced / rate limiting</text>
          </motion.g>
        </svg>
      </div>
      <p className="text-xs text-muted text-center mt-3 font-[family-name:var(--font-inter)]">
        Fig 1: Traditional architecture — ALB sits in a public subnet with a public IP, exposing it to direct internet access
      </p>
    </div>
  );
}
