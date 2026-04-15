"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  AtSign,
  Code2,
} from "lucide-react";

/* ── TextHoverEffect ── */
export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

/* ── FooterBackgroundGradient ── */
export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  );
};

/* ── Full Mindivo HoverFooter ── */
const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Mobile Apps", href: "#" },
      { label: "Web Platforms", href: "#" },
      { label: "Digitization", href: "#" },
      { label: "API Development", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Work", href: "/portfolio" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#", pulse: true },
    ],
  },
];

const contactInfo = [
  {
    icon: <Mail size={18} className="text-[#3ca2fa]" />,
    text: "hello@mindivo.com",
    href: "mailto:hello@mindivo.com",
  },
  {
    icon: <Phone size={18} className="text-[#3ca2fa]" />,
    text: "+1 (800) 555-0190",
    href: "tel:+18005550190",
  },
  {
    icon: <MapPin size={18} className="text-[#3ca2fa]" />,
    text: "San Francisco, CA",
  },
];

const socialLinks = [
  { icon: <MessageCircle size={20} />, label: "Twitter/X", href: "#" },
  { icon: <AtSign size={20} />, label: "LinkedIn", href: "#" },
  { icon: <Code2 size={20} />, label: "GitHub", href: "#" },
];

export function HoverFooter() {
  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden mx-4 sm:mx-8 mb-8">
      <div className="max-w-7xl mx-auto p-8 sm:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                <Image
                  src="/logo-light.png"
                  alt="Mindivo"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full dark:hidden"
                />
                <Image
                  src="/logo-dark.png"
                  alt="Mindivo"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full hidden dark:block"
                />
              </div>
              <span className="text-foreground text-2xl font-bold">
                Mind<span className="text-[#3ca2fa]">ivo</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              US-based software company building mobile apps, web platforms, and
              digital transformations for forward-thinking businesses.
            </p>
          </div>

          {/* Link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-[#3ca2fa] transition-colors"
                    >
                      {link.label}
                    </a>
                    {"pulse" in link && link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-foreground text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-[#3ca2fa] transition-colors text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 mb-8">
          <div className="flex space-x-6 text-muted-foreground">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.1em]">
            &copy; {new Date().getFullYear()} Mindivo LLC. All rights reserved.
          </p>
        </div>

        <hr className="border-t border-border/40 mt-8 mb-0" />
      </div>

      {/* Text hover effect — moved to the very bottom with adjusted margins */}
      <div className="lg:flex hidden h-[22rem] items-center justify-center -mt-20 overflow-hidden pointer-events-none">
        <TextHoverEffect text="Mindivo" className="z-10" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
