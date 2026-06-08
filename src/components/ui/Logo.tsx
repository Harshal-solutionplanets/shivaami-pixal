import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className, light = false }: LogoProps) {
  const textColor = light ? "text-white" : "text-[#111111]";
  const subTextColor = light ? "text-white/70" : "text-[#555555]";
  const dividerColor = light ? "border-white/25" : "border-border/80";
  const associatedTextColor = light ? "text-white/80" : "text-[#222222]";

  return (
    <div className={cn("flex flex-col select-none py-1.5", className)}>
      {/* Top Row */}
      <div className="flex items-center gap-4">
        {/* Google Pixel for Business */}
        <div className="flex flex-col leading-none">
          <span className={cn("font-bold text-[20px] leading-tight tracking-tight whitespace-nowrap", textColor)}>
            Google Pixel
          </span>
          <span className={cn("text-[13px] font-normal leading-tight tracking-wide whitespace-nowrap mt-0.5", subTextColor)}>
            for Business
          </span>
        </div>

        {/* Vertical Divider */}
        <div className={cn("h-11 border-l border-2", dividerColor)} />

        {/* tax print part */}
        <div className="flex items-center gap-2">
          {/* Quadrant Icon */}
          <svg viewBox="0 0 100 100" className="w-12 h-12 shrink-0">
            {/* Top-Left (Blue) */}
            <path d="M 50 50 L 10 50 A 40 40 0 0 1 50 10 Z" fill="#4285F4" />
            {/* Top-Right (Green) */}
            <path d="M 50 50 L 50 10 A 40 40 0 0 1 90 50 Z" fill="#34A853" />
            {/* Bottom-Right (Red) */}
            <path d="M 50 50 L 90 50 A 40 40 0 0 1 50 90 Z" fill="#EA4335" />
            {/* Bottom-Left (Orange) */}
            <path d="M 50 50 L 50 90 A 40 40 0 0 1 10 50 Z" fill="#FBBC05" />
            
            {/* Icons inside quadrants */}
            {/* Top-Left Icon: triangular connection nodes */}
            <g transform="translate(22, 22) scale(0.6)" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="6" r="2.5" fill="white" />
              <circle cx="5" cy="15" r="2.5" fill="white" />
              <circle cx="15" cy="15" r="2.5" fill="white" />
              <line x1="10" y1="8.5" x2="6.5" y2="12.5" />
              <line x1="10" y1="8.5" x2="13.5" y2="12.5" />
              <line x1="7.5" y1="15" x2="12.5" y2="15" />
            </g>
            
            {/* Top-Right Icon: Target Search */}
            <g transform="translate(54, 21) scale(0.65)" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10" cy="10" r="7" />
              <line x1="10" y1="1" x2="10" y2="3" />
              <line x1="10" y1="17" x2="10" y2="19" />
              <line x1="1" y1="10" x2="3" y2="10" />
              <line x1="17" y1="10" x2="19" y2="10" />
              <circle cx="9" cy="9" r="3.5" strokeWidth="2" />
              <line x1="11.5" y1="11.5" x2="15.5" y2="15.5" strokeWidth="2.5" />
            </g>
            
            {/* Bottom-Left Icon: Growth Chart */}
            <g transform="translate(23, 53) scale(0.65)" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </g>
            
            {/* Bottom-Right Icon: Document with Assurance label */}
            <g transform="translate(54, 53) scale(0.55)" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </g>
            {/* Assurance Ribbon overlay */}
            <g transform="translate(56, 56) rotate(-28)">
              <rect x="0" y="8" width="32" height="7.5" fill="white" rx="1" stroke="#EA4335" strokeWidth="0.5" />
              <text x="16" y="13.5" fill="#EA4335" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">ASSURANCE</text>
            </g>
          </svg>

          {/* Text: tax print since 1962 */}
          <div className="flex flex-col leading-none items-end">
            <span className="font-extrabold italic text-[24px] text-[#F35B04] tracking-tight whitespace-nowrap">
              tax print
            </span>
            <span className="text-[10px] font-bold text-[#EA4335] tracking-wide mt-0.5 whitespace-nowrap">
              Since 1962
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Divider Line */}
      <div className={cn("w-full border-t mt-2.5 mb-2", dividerColor)} />

      {/* Bottom Row: In associated with shivaami */}
      <div className={cn("flex items-center justify-center gap-2.5 text-[13.5px] font-medium tracking-wide", associatedTextColor)}>
        <span>In associated with</span>
        <div className="flex items-center gap-1.5">
          <img
            src="/assets/shivaami.png"
            alt="shivaami"
            className={cn("h-6 w-auto object-contain", light && "bg-white px-2 py-0.5 rounded")}
          />
        </div>
      </div>
    </div>
  );
}
