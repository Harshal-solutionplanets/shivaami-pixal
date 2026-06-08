import React from "react";

export function TaxPrintText() {
  return <span className="font-tax-print">tax print</span>;
}

export function ShivaamiText() {
  return <span className="font-shivaami">shivaami</span>;
}

export default function BrandText() {
  return (
    <>
      <TaxPrintText /> &amp; <ShivaamiText />
    </>
  );
}

export function formatBrandText(text: string): React.ReactNode {
  if (!text) return text;

  // Match "TaxPrint & Shivaami", "TaxPrint", "taxprint", "Tax Print", "Shivaami" case-insensitively
  const regex = /(TaxPrint\s*&\s*Shivaami|TaxPrint|Tax\s+Print|taxprint|Shivaami)/gi;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    const lower = part.toLowerCase();
    if (lower.includes("tax") && lower.includes("shivaami")) {
      return (
        <React.Fragment key={idx}>
          <TaxPrintText /> &amp; <ShivaamiText />
        </React.Fragment>
      );
    } else if (lower.includes("tax") && (lower.includes("print") || lower === "taxprint")) {
      return <TaxPrintText key={idx} />;
    } else if (lower === "shivaami") {
      return <ShivaamiText key={idx} />;
    }
    return part;
  });
}
