"use client";

export default function WhatsAppButton({
  phone = "905XXXXXXXXX",
  text = "WhatsApp üzerinden iletişime geç",
  message = "",
  className = "",
}) {
  const url = message
    ? `https://wa.me/${phone}?text=${message}`
    : `https://wa.me/${phone}`;

  return (
    <div className={`text-center ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg"
      >
        {text}
      </a>
    </div>
  );
}