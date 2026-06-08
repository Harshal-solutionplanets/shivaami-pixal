import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "tax print & shivaami | Google Pixel for Business — Empower Your Team",
  description:
    "Mumbai's authorized Google Partner for Pixel SMB plans. Get Pixel 10 series with 2-year protection, zero-touch deployment, AI workshops, and corporate pricing. Order online.",
  keywords: [
    "Google Pixel for Business",
    "Pixel 10 SMB",
    "Google Partner Mumbai",
    "tax print & shivaami",
    "Pixel enterprise plan",
    "business smartphones India",
  ],
  openGraph: {
    title: "tax print & shivaami | Google Pixel for Business",
    description:
      "Empower Your Team. Elevate Productivity. Mumbai's authorized Google Pixel SMB dealership.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '26995278800082803');
fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=26995278800082803&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

