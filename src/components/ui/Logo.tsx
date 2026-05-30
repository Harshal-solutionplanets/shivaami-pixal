import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className, light = false }: LogoProps) {
  const textColor = light ? "text-white" : "text-foreground";
  const subTextColor = light ? "text-white/60" : "text-muted-foreground";
  const dividerColor = light ? "border-white/20" : "border-border/80";

  return (
    <div className={cn("flex flex-col select-none py-1.5", className)}>
      {/* Top Row */}
      <div className="flex items-center gap-3.5">
        {/* Google Pixel for Business */}
        <div className="flex flex-col leading-none">
          <span className={cn("font-bold text-[18px] leading-tight tracking-tight whitespace-nowrap", textColor)}>
            Google Pixel
          </span>
          <span className={cn("text-[12px] font-normal leading-tight tracking-wide whitespace-nowrap mt-0.5", subTextColor)}>
            for Business
          </span>
        </div>

        {/* Vertical Divider */}
        <div className={cn("h-10 border-l", dividerColor)} />

        {/* tax print part */}
        <div className="flex items-center gap-2">
          {/* Quadrant Icon */}
          <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0">
            {/* Top-Left (Blue, Team) */}
            <path d="M 50 50 L 10 50 A 40 40 0 0 1 50 10 Z" fill="#4285F4" />
            {/* Top-Right (Green, Idea) */}
            <path d="M 50 50 L 50 10 A 40 40 0 0 1 90 50 Z" fill="#34A853" />
            {/* Bottom-Right (Red, Document) */}
            <path d="M 50 50 L 90 50 A 40 40 0 0 1 50 90 Z" fill="#EA4335" />
            {/* Bottom-Left (Orange, Growth) */}
            <path d="M 50 50 L 50 90 A 40 40 0 0 1 10 50 Z" fill="#FBBC05" />
            
            {/* Icons inside quadrants */}
            {/* Top-Left Icon: People / Team (White) */}
            <g transform="translate(23, 23) scale(0.65)" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </g>
            
            {/* Top-Right Icon: Sparkles (White) */}
            <g transform="translate(53, 21) scale(0.65)" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              <circle cx="12" cy="12" r="3" />
            </g>
            
            {/* Bottom-Left Icon: Growth Chart (White) */}
            <g transform="translate(23, 53) scale(0.65)" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </g>
            
            {/* Bottom-Right Icon: Document (White) */}
            <g transform="translate(54, 53) scale(0.55)" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </g>
          </svg>

          {/* Text: tax print since 1962 */}
          <div className="flex flex-col leading-none">
            <span className="font-extrabold italic text-[18px] text-[#F35B04] tracking-tight whitespace-nowrap">
              tax print
            </span>
            <span className="text-[9.5px] font-bold text-[#EA4335] tracking-widest mt-0.5 uppercase whitespace-nowrap">
              Since 1962
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Divider Line */}
      <div className={cn("w-full border-t mt-2 mb-1.5", dividerColor)} />

      {/* Bottom Row: In associated with shivaami */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] tracking-wide font-medium">
        <span className={cn("whitespace-nowrap", subTextColor)}>In association with</span>
        <div className="flex items-center gap-0.5">
          {/* Shivaami Red Circle Logo */}
          <svg viewBox="0 0 100 100" className="w-[15px] h-[15px] shrink-0">
            <circle cx="50" cy="50" r="45" fill="#EA4335" />
            <path d="M50,20 C35,20 32,35 42,45 C52,55 65,52 58,68 C52,80 38,78 35,70 C34,74 38,80 48,80 C62,80 68,65 58,55 C48,45 35,48 42,32 C48,20 62,22 65,30 C66,26 62,20 50,20 Z" fill="white" />
          </svg>
          <span className="font-bold text-[#0080FF] tracking-tight leading-none whitespace-nowrap">shivaami</span>
        </div>
      </div>
    </div>
  );
}
