import React from "react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919022223600?text=Hi%20tax%20print%20%26%20shivaami%2C%20I%27m%20interested%20in%20Google%20Pixel%20for%20Business"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        height: "50px",
        backgroundColor: "#25D366",
        borderRadius: "9999px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "0 20px",
        zIndex: 99999,
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        textDecoration: "none",
        color: "white",
        fontWeight: "600",
        fontSize: "14px"
      }}
      className="hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        style={{ width: "24px", height: "24px", fill: "white" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.49 1.978 14.02 1.9 12.012 1.9 6.575 1.9 2.152 6.27 2.148 11.7c-.001 1.638.455 3.242 1.326 4.678l-1.01 3.686 3.783-.99zM17.52 14.3c-.3-.15-1.782-.88-2.049-.978-.268-.1-.463-.15-.658.15-.195.3-.755.95-.926 1.15-.17.2-.34.225-.64.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.49-1.78-1.665-2.08-.175-.3-.018-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.658-1.585-.9-2.175-.237-.57-.478-.492-.66-.502-.17-.007-.364-.009-.558-.009-.195 0-.51.074-.777.363-.268.29-1.02 1.002-1.02 2.443 0 1.44 1.05 2.83 1.196 3.03.145.2 2.065 3.155 5.003 4.43.7.303 1.25.484 1.677.62.703.224 1.344.192 1.85.117.564-.083 1.783-.73 2.033-1.435.25-.705.25-1.31.175-1.435-.074-.124-.268-.198-.567-.348z" />
      </svg>
      <span>WhatsApp Us</span>
    </a>
  );
}
