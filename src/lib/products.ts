export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface AIFeature {
  name: string;
  description: string;
  icon: string;
  tag: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  accentBg: string;
  priceFrom: string;
  colors: ProductColor[];
  highlights: string[];
  specs: ProductSpec[];
  aiFeatures: AIFeature[];
  businessValue: string;
  ecosystemBenefits: string[];
  video: string;
}

export const products: Product[] = [
  {
    slug: "pixel-10a",
    name: "Pixel 10a",
    tagline: "Smart choice for every team member",
    badge: "Affordable",
    badgeColor: "bg-[#CEEAD6] text-[#1E8E3E]",
    accentBg: "#CEEAD6",
    priceFrom: "\u20B9 46,999",
    colors: [
      { name: "Obsidian", hex: "#1F1F1F" },
      { name: "Aloe", hex: "#8FB8A8" },
    ],
    highlights: [
      "Google Tensor G4 chip",
      "Gemini built-in AI assistant",
      "30+ hour battery life",
      "7 years OS & security updates",
    ],
    specs: [
      { label: "Processor", value: "Google Tensor G4 + Titan M2™ security chip" },
      { label: "RAM", value: "8 GB" },
      { label: "Storage", value: "128 GB" },
      { label: "Display", value: '6.3" Actua Smooth display (FHD+)' },
      { label: "Rear Camera", value: "48 MP Quad PD Dual Pixel (Wide) + 13 MP Ultrawide | Super Res Zoom up to 8x" },
      { label: "Front Camera", value: "13 MP selfie camera" },
      { label: "Battery", value: "30+ hours | Up to 120 hrs with Extreme Battery Saver" },
      { label: "Fast Charging", value: "Up to 50% in ~30 minutes (USB-C)" },
      { label: "Durability", value: "IP68 | Corning® Gorilla® Glass™ 7i cover glass | Satin aluminium frame" },
      { label: "Security", value: "Titan M2™ + Tensor G4 security core | Android Theft Protection | Passkeys" },
      { label: "AI Features", value: "Gemini Nano | Gemini | Gemini Live | Circle to Search | Live Translate | Call Assist" },
      { label: "OS Updates", value: "7 years of OS and security updates + Pixel Drops" },
    ],
    aiFeatures: [
      {
        name: "Gemini, built in",
        description: "Understands instructions across your apps, generates creative ideas, makes plans, and finds the precise info you need — tailored using your calendar, email, and location.",
        icon: "✦",
        tag: "AI",
      },
      {
        name: "Gemini Live with Camera",
        description: "Show Gemini a document, product, or whiteboard and get relevant support on the spot. Develop interview technique, collaborate on ideas — all in a conversational style.",
        icon: "🎥",
        tag: "AI",
      },
      {
        name: "Call Assist",
        description: "Clear Calling, Call Screen that catches spam by what is said, Wait Times, Direct My Call, and Hold for Me — protect your team's time on every business call.",
        icon: "📞",
        tag: "Productivity",
      },
      {
        name: "Circle to Search",
        description: "Search what you see on your phone without switching apps. Full-screen translation in two taps — instantly translate images, videos, or text in another language.",
        icon: "🔍",
        tag: "Smart",
      },
      {
        name: "Pixel Recorder App",
        description: "Automatically records and transcribes speech in real time, without audio ever leaving your phone. Give meetings and presentations your full attention — no note-taking needed.",
        icon: "🎙",
        tag: "Productivity",
      },
      {
        name: "7 Years of Updates",
        description: "With Pixel 10a you get 7 years of OS, security patches, and exclusive Pixel Drops that deliver new AI-powered capabilities — keeping your fleet secure and capable for longer.",
        icon: "🔒",
        tag: "Security",
      },
    ],
    businessValue: "Purpose-built for business with multiple layers of security at the core. Pixel 10a combines advanced Google tools, a native Android OS experience, and the flexibility your IT team needs to deploy and manage at scale.",
    ecosystemBenefits: [
      "6 months of Fitbit Premium",
      "3 months of YouTube Premium",
      "Gemini Nano on-device AI",
    ],
    video: "/assets/pixel10a.mov",
  },
  {
    slug: "pixel-10",
    name: "Pixel 10",
    tagline: "The perfect business everyday driver",
    badge: "Best Seller",
    badgeColor: "bg-[#D2E3FC] text-[#1A73E8]",
    accentBg: "#D2E3FC",
    priceFrom: "\u20B9 67,999",
    colors: [
      { name: "Obsidian", hex: "#1F1F1F" },
      { name: "Viridian Blue", hex: "#1A6FE3" },
      { name: "Porcelain", hex: "#F8F9FA" },
      { name: "Citronella", hex: "#B5CC28" },
    ],
    highlights: [
      "Google Tensor G5 — most powerful chip yet",
      "Triple rear camera with 20x Super Res Zoom",
      "Pixelsnap Qi2 wireless charging",
      "6 months Google One (2 TB) included",
    ],
    specs: [
      { label: "Processor", value: "Google Tensor G5 + Titan M2™ security chip" },
      { label: "RAM", value: "12 GB" },
      { label: "Storage", value: "256 GB" },
      { label: "Display", value: '6.3" Actua display | 60–120 Hz adaptive refresh rate' },
      { label: "Rear Camera", value: "48 MP Wide + 13 MP Ultrawide + 10.8 MP 5x Telephoto | 20x Super Res Zoom" },
      { label: "Front Camera", value: "10.5 MP front camera" },
      { label: "Battery", value: "Over 24 hours | 4970 mAh" },
      { label: "Fast Charging", value: "Fast Pixelsnap Qi2 wireless charging" },
      { label: "Durability", value: "IP68 dust & water resistance | 2x more durable than Pixel 8" },
      { label: "Security", value: "Titan M2™ + Tensor G5 | Android Theft Protection | Passkeys | Google Play Protect" },
      { label: "AI Features", value: "Gemini | Gemini Nano | Gemini Live with camera | Magic Cue | Camera Coach | Circle to Search | Add Me | Auto Best Take" },
      { label: "OS Updates", value: "7 years of OS and security updates + Pixel Drops" },
      { label: "Included Benefits", value: "6 months Google One (2 TB)" },
    ],
    aiFeatures: [
      {
        name: "Gemini Live with Camera",
        description: "Show Gemini a document, product, or whiteboard and get real-time support. Video and screen sharing — develop ideas, collaborate, and get feedback conversationally.",
        icon: "✦",
        tag: "AI",
      },
      {
        name: "Magic Cue",
        description: "Context-aware AI suggestions that appear at exactly the right moment — flight details, confirmation numbers, next steps — surfaced proactively so you never miss a beat.",
        icon: "⚡",
        tag: "Smart",
      },
      {
        name: "Camera Coach",
        description: "Real-time photography guidance powered by AI. Get professional-quality shots for your business presentations, product photos, and team communications.",
        icon: "📷",
        tag: "Camera",
      },
      {
        name: "Call Assist",
        description: "Live call transcripts, summaries, spam detection by content, Wait Times, and Hold for Me. Your team spends less time on hold and more time on work that matters.",
        icon: "📞",
        tag: "Productivity",
      },
      {
        name: "Video Generation in Gemini",
        description: "Generate video content powered by Veo 3 — create compelling business content, product demos, and training materials directly from your phone.",
        icon: "🎬",
        tag: "AI",
      },
      {
        name: "Android Work Profiles",
        description: "OS-level separation between personal and company data. Personal apps stay private, work apps and data are managed by IT — on one device.",
        icon: "🏢",
        tag: "Enterprise",
      },
    ],
    businessValue: "Ask more of your phone with an incredible triple camera, premium design, and advanced AI. Tensor G5 is the most powerful Pixel chip yet — delivering Google AI productivity tools first, before any other device.",
    ecosystemBenefits: [
      "6 months Google One (2 TB storage)",
      "6 months Fitbit Premium",
      "3 months YouTube Premium",
    ],
    video: "/assets/pixel10.mov",
  },
  {
    slug: "pixel-10-pro-xl",
    name: "Pixel 10 Pro XL",
    tagline: "Pro performance for power users",
    badge: "Popular",
    badgeColor: "bg-[#E8D5FF] text-[#7C3AED]",
    accentBg: "#E8D5FF",
    priceFrom: "\u20B9 1,14,999",
    colors: [
      { name: "Obsidian", hex: "#1F1F1F" },
      { name: "Misty", hex: "#8E9BAE" },
    ],
    highlights: [
      "100x Pro Res Zoom camera system",
      "50 MP wide + 48 MP ultrawide + 48 MP telephoto",
      "16 GB RAM + Super Actua display",
      "1 year Google AI Pro included (₹23,400 value)",
    ],
    specs: [
      { label: "Processor", value: "Google Tensor G5 + Titan M2™ security chip" },
      { label: "RAM", value: "16 GB" },
      { label: "Storage", value: "256 GB" },
      { label: "Display", value: 'Super Actua display | 1–120 Hz adaptive refresh rate' },
      { label: "Rear Camera", value: "50 MP Wide + 48 MP Ultrawide + 48 MP 5x Telephoto | Up to 100x Pro Res Zoom | High Res Portraits" },
      { label: "Front Camera", value: "42 MP front camera" },
      { label: "Battery", value: "Over 24 hours | 4870 mAh / 5200 mAh" },
      { label: "Fast Charging", value: "Fast Pixelsnap Qi2 wireless charging" },
      { label: "Durability", value: "IP68 dust & water resistance" },
      { label: "Security", value: "Titan M2™ + Tensor G5 | OMDIA #1 security score 97% | Android Enterprise Device Trust | VPN by Google" },
      { label: "AI Features", value: "Gemini Advanced | Gemini Live with camera | Video Boost | Magic Cue | Camera Coach | 100x Pro Res Zoom | Add Me | Auto Best Take | Night Sight Video" },
      { label: "OS Updates", value: "7 years of OS and security updates + Pixel Drops" },
      { label: "Included Benefits", value: "1 year Google AI Pro (value ₹23,400)" },
    ],
    aiFeatures: [
      {
        name: "100x Pro Res Zoom",
        description: "Industry-leading zoom for capturing every detail in business contexts — site inspections, document capture, presentations. Professional-grade results on a smartphone.",
        icon: "🔭",
        tag: "Camera",
      },
      {
        name: "Video Boost",
        description: "Professional-quality video enhanced with Google AI. Capture boardroom presentations, product showcases, and training videos at a level previously requiring dedicated equipment.",
        icon: "🎥",
        tag: "Camera",
      },
      {
        name: "Google AI Pro (1 Year)",
        description: "₹23,400 in value included. Access Gemini Advanced, Video Generation powered by Veo 3, and the full suite of Google AI productivity tools for your entire first year.",
        icon: "✦",
        tag: "AI",
      },
      {
        name: "Magic Cue",
        description: "Context-aware suggestions surfaced at exactly the right moment — confirmation numbers, flight details, meeting prep — proactively, without asking.",
        icon: "⚡",
        tag: "Smart",
      },
      {
        name: "Android Enterprise Device Trust",
        description: "Enterprise-grade device trust certification. Seamless integration with EMM solutions, managed Google Play, and Android Work Profiles — trusted by IT teams.",
        icon: "🔐",
        tag: "Enterprise",
      },
      {
        name: "VPN by Google",
        description: "Built-in VPN protection for your team's mobile data. Secure business communications, protect sensitive data on public networks — at no extra cost.",
        icon: "🛡",
        tag: "Security",
      },
    ],
    businessValue: "Do spectacular on the regular. The Pixel 10 Pro brings an incredible camera system, 16 GB RAM, and Google AI Pro — giving your power users the most advanced productivity tools available on any smartphone.",
    ecosystemBenefits: [
      "1 year Google AI Pro (₹23,400 value)",
      "6 months Fitbit Premium",
      "3 months YouTube Premium",
    ],
    video: "/assets/10_pro_xl.mov",
  },
  {
    slug: "pixel-10-pro-fold",
    name: "Pixel 10 Pro Fold",
    tagline: "The ultimate flagship experience",
    badge: "Flagship",
    badgeColor: "bg-[#FCE8E6] text-[#D93025]",
    accentBg: "#FEF0CD",
    priceFrom: "\u20B9 1,62,999",
    colors: [
      { name: "Obsidian", hex: "#1F1F1F" },
      { name: "Porcelain", hex: "#F0EDE8" },
    ],
    highlights: [
      "Foldable large-format display",
      "Pro triple camera system with Video Boost",
      "Google Tensor G5 + 16 GB RAM",
      "All AI features — Gemini, Magic Cue, Camera Coach",
    ],
    specs: [
      { label: "Processor", value: "Google Tensor G5 + Titan M2™ security chip" },
      { label: "RAM", value: "16 GB" },
      { label: "Storage", value: "256 GB" },
      { label: "Display", value: "Large-format foldable Super Actua display | 1–120 Hz" },
      { label: "Rear Camera", value: "Pro triple rear camera | 48 MP 5x Telephoto | Video Boost | High Res Portraits" },
      { label: "Front Camera", value: "42 MP front camera" },
      { label: "Battery", value: "All-day Adaptive Battery | Extreme Battery Saver mode" },
      { label: "Fast Charging", value: "Fast Pixelsnap Qi2 wireless charging up to 25W" },
      { label: "Durability", value: "IP68 dust & water resistance | Durable foldable design" },
      { label: "Security", value: "Titan M2™ + Tensor G5 | OMDIA #1 security | Android Enterprise | Private Space" },
      { label: "AI Features", value: "Full Gemini suite | Video Boost | Magic Cue | Camera Coach | 100x Pro Res Zoom | Night Sight Video | Satellite SOS | Car Crash Detection" },
      { label: "OS Updates", value: "7 years of OS and security updates + Pixel Drops" },
      { label: "Included Benefits", value: "1 year Google AI Pro + premium ecosystem benefits" },
    ],
    aiFeatures: [
      {
        name: "Foldable Large Display",
        description: "Expand your workspace wherever you are. Review contracts, join video calls, and manage spreadsheets on the go — with a display that unfolds to tablet size.",
        icon: "📱",
        tag: "Hardware",
      },
      {
        name: "Video Boost + Satellite SOS",
        description: "Professional video with Video Boost AI processing. Satellite SOS ensures your team can reach emergency services even beyond cellular coverage.",
        icon: "🛰",
        tag: "Safety",
      },
      {
        name: "Full Gemini Suite",
        description: "Every AI feature — Gemini Advanced, Gemini Live with camera, Video Generation, Magic Cue, Camera Coach, Deep Research — the complete AI productivity stack.",
        icon: "✦",
        tag: "AI",
      },
      {
        name: "Car Crash Detection",
        description: "Automatic crash detection with emergency assistance. Your team is protected on every commute — the phone calls for help even if they can't.",
        icon: "🚗",
        tag: "Safety",
      },
      {
        name: "Private Space",
        description: "A dedicated encrypted space for sensitive business apps and data — separate from the main profile, invisible to others, unlocked only by you.",
        icon: "🔒",
        tag: "Security",
      },
      {
        name: "Android Enterprise Device Trust",
        description: "Full enterprise certification. Deploy at scale with zero-touch enrollment, manage via EMM, and trust your device fleet meets enterprise security standards.",
        icon: "🏢",
        tag: "Enterprise",
      },
    ],
    businessValue: "The ultimate business flagship. The Pixel 10 Pro Max foldable gives your executives and field teams a desktop-class experience in their pocket — every AI feature, the largest display, and enterprise-grade security in one device.",
    ecosystemBenefits: [
      "1 year Google AI Pro (₹23,400 value)",
      "6 months Fitbit Premium",
      "3 months YouTube Premium",
    ],
    video: "/assets/10_pro_fold.mov",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
