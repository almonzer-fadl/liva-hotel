"use client";

import { useState } from "react";
import Image from "next/image";

/* ---------------------------------- Veriler ---------------------------------- */

const business = {
  name: "Liva Hotel Sapanca",
  category: "Aile Oteli",
  location: "Sapanca · Sakarya",
  rating: 4.2,
  reviewCount: 142,
  phoneIntl: "+905531602590",
  phoneDisplay: "0553 160 25 90",
  address: "Kırkpınar Hasanpaşa, İstasyon Cad. No: 3/A, 54600 Sapanca/Sakarya",
  addressLine1: "Kırkpınar Hasanpaşa, İstasyon Cad. No: 3/A",
  addressLine2: "54600 Sapanca / Sakarya",
};

const waGeneric = `https://wa.me/${business.phoneIntl.replace("+", "")}?text=${encodeURIComponent(
  "Merhaba, rezervasyon yapmak istiyorum."
)}`;

const waReservation = `https://wa.me/${business.phoneIntl.replace("+", "")}?text=${encodeURIComponent(
  "Merhaba, Liva Hotel Sapanca için rezervasyon talebi oluşturmak istiyorum."
)}`;

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  business.address
)}`;

const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  business.address
)}&output=embed`;

const img = {
  hero: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1400&auto=format&fit=crop",
  location: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop",
  family: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
  breakfast: "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1200&auto=format&fit=crop",
  pet: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200&auto=format&fit=crop",
  story: "https://images.unsplash.com/photo-1551717743-49959800b1f6?q=80&w=1200&auto=format&fit=crop",
};

const amenities = [
  { icon: WifiIcon, label: "Ücretsiz Wi-Fi" },
  { icon: CoffeeIcon, label: "Ücretsiz Kahvaltı" },
  { icon: CarIcon, label: "Ücretsiz Otopark" },
  { icon: AccessibleIcon, label: "Engelli Erişimi" },
  { icon: SnowIcon, label: "Klima" },
  { icon: PawIcon, label: "Evcil Hayvan Dostu" },
];

const topics = [
  "Butik otel",
  "Şık odalar",
  "Aileler için uygun",
  "Merkezi konum",
  "Aile oteli",
  "Güler yüzlü personel",
  "Sessiz ortam",
];

const reviews = [
  {
    author: "Kübra Kadam",
    rating: 5,
    when: "3 ay önce",
    text: "We chose this hotel for our mini-vacation. Its location is excellent for many sightseeing destinations. The cleanliness and rooms were very good.",
  },
  {
    author: "Kadir Gökçe",
    rating: 4,
    when: "2 ay önce",
    text: "The hotel was very close to the cable car, so transportation was excellent. The hotel had been recently renovated, and the friendly attitude of the staff made us forget any minor deficiencies.",
  },
  {
    author: "Berat",
    rating: 5,
    when: "1 yıl önce",
    text: "We had a very quiet and pleasant time at this hotel where we stayed for two days. The rooms were very clean; there was no hair, dirt, or dampness. The bathroom was even stocked with shampoo.",
  },
  {
    author: "Recep Çetin",
    rating: 5,
    when: "1 yıl önce",
    text: "The rooms were very clean and nice. All the staff at the hotel were very helpful and friendly.",
  },
  {
    author: "Esma Demir",
    rating: 5,
    when: "1 yıl önce",
    text: "If you're looking for a hotel with a pool, this is ideal for families. It's close to the cable car and has a great location. It's about a half-hour walk to the lake.",
  },
  {
    author: "Rabia",
    rating: 5,
    when: "1 yıl önce",
    text: "A wonderful boutique family hotel in Sapanca, very close to the cable car. Thanks to Gökhan abi at the reception, he was very helpful to me and my friends.",
  },
  {
    author: "Arzu Torun",
    rating: 5,
    when: "1 yıl önce",
    text: "The rooms and the hotel were very clean and hygienic. The staff were very friendly and helpful. The location is also very central. It exceeded our expectations.",
  },
  {
    author: "Rukiye Alagöz",
    rating: 5,
    when: "2 yıl önce",
    text: "My wife and I stayed here for 4 days on our way back from our honeymoon, and everything was truly wonderful. The staff were all very attentive and friendly. The rooms were very clean and spacious.",
  },
  {
    author: "Muge Sen",
    rating: 5,
    when: "1 yıl önce",
    text: "The location is central and easy to find. The hotel was clean and quiet, and the furnishings and room were well-maintained and new.",
  },
  {
    author: "Şeyma Araz",
    rating: 5,
    when: "3 yıl önce",
    text: "It had recently been renovated, everything was very clean, new, and beautiful. The breakfast was quite filling and delicious. The location is perfect. It's a perfect family hotel.",
  },
  {
    author: "Fazal Ahmad",
    rating: 5,
    when: "4 yıl önce",
    text: "Highly recommended, the location was perfect and the staff was very friendly.",
  },
  {
    author: "Kekkero",
    rating: 5,
    when: "1 yıl önce",
    text: "The hotel is lovely, the staff are friendly and helpful, they assist with everything. Even though they have their own restaurant, they kindly offered to recommend other restaurants in the city center.",
  },
];

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: business.name,
  description:
    "Sapanca'da merkezi konumda, teleferiğe yürüme mesafesinde aile dostu butik otel. Ücretsiz kahvaltı, ücretsiz otopark ve evcil hayvan dostu konaklama.",
  url: "https://livahotelsapanca.com",
  telephone: "+905531602590",
  image: [img.hero, img.family, img.breakfast],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kırkpınar Hasanpaşa, İstasyon Cad. No: 3/A",
    addressLocality: "Sapanca",
    addressRegion: "Sakarya",
    postalCode: "54600",
    addressCountry: "TR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.2",
    reviewCount: "142",
    bestRating: "5",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
    {
      "@type": "LocationFeatureSpecification",
      name: "Free breakfast",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Free parking",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Accessible",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Air-conditioned",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Pet-friendly",
      value: true,
    },
  ],
};

/* ---------------------------------- İkonlar ---------------------------------- */

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function StarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Stars({
  rating,
  className = "h-4 w-4",
  emptyClass = "text-brand-200",
}: {
  rating: number;
  className?: string;
  emptyClass?: string;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className="relative inline-flex"
      role="img"
      aria-label={`${rating} / 5 yıldız`}
    >
      <span className={`flex ${emptyClass}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className={`${className} shrink-0`} />
        ))}
      </span>
      <span
        className="absolute inset-0 flex overflow-hidden"
        style={{ width: `${pct}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className={`${className} shrink-0`} />
        ))}
      </span>
    </span>
  );
}

function WifiIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 8.82a15 15 0 0120 0" />
      <path d="M5 12.86a10 10 0 0114 0" />
      <path d="M8.5 16.43a5 5 0 017 0" />
      <path d="M12 20h.01" />
    </svg>
  );
}

function CoffeeIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 011 1v8a4 4 0 01-4 4H7a4 4 0 01-4-4V9a1 1 0 011-1h14a4 4 0 110 8h-1" />
      <path d="M6 2v2" />
    </svg>
  );
}

function CarIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function AccessibleIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="16" cy="4" r="1" />
      <path d="M8 6l4 8 4-2 3 6" />
      <path d="M3 21h18" />
      <path d="M7.5 18l2-4" />
    </svg>
  );
}

function SnowIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="M6.3 6.3l11.4 11.4" />
      <path d="M17.7 6.3L6.3 17.7" />
    </svg>
  );
}

function PawIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <circle cx="4" cy="16" r="2" />
      <circle cx="8" cy="8" r="2" />
      <path d="M12 20a4.5 4.5 0 004.5-4.5c0-1.2-.9-2.5-2-2.5-1.4 0-1.8 1.4-2.5 1.4s-1.1-1.4-2.5-1.4c-1.1 0-2 1.3-2 2.5A4.5 4.5 0 0012 20z" />
    </svg>
  );
}

function TramIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 3h.01" />
      <path d="M14 2h.01" />
      <path d="M2 9l20-5" />
      <path d="M12 19V5" />
    </svg>
  );
}

function UsersIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function WavesIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}

function MapPinIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function NavigationIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function MenuIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function XIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

/* ---------------------------------- Bileşenler ---------------------------------- */

function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#olanaklar", label: "Olanaklar" },
    { href: "#hikayemiz", label: "Hikayemiz" },
    { href: "#yorumlar", label: "Yorumlar" },
    { href: "#iletisim", label: "İletişim" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-100 bg-white/85 shadow-sm shadow-brand-500/5 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 font-display text-lg font-bold text-white">
            L
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold text-brand-800">
              Liva Hotel
            </span>
            <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-500">
              Sapanca
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-brand-700/80 transition-colors hover:text-brand-500"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waGeneric}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-[#25D366]/25 transition-all duration-300 hover:scale-[1.02] hover:bg-[#1fb958] sm:flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Rezervasyon
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="text-brand-700 md:hidden"
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-brand-100 bg-white/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-brand-50 py-3.5 text-sm font-bold text-brand-700 transition-colors hover:text-brand-500"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waGeneric}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-extrabold text-white"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp&apos;tan Rezervasyon
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const bullets = [
    "Ücretsiz kahvaltı",
    "Sapanca Teleferiği'ne yürüme mesafesinde",
    "Evcil dostlarınız da bizimle",
  ];

  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-brand-50 via-[#f6fafc] to-[#f6fafc] pb-20 pt-36 lg:pt-40"
    >
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-sun-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <div className="fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">
            <UsersIcon className="h-4 w-4" />
            Sapanca · Aile Oteli
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.08] tracking-tight text-brand-800 sm:text-6xl">
            Liva Hotel
            <br />
            <span className="text-brand-500">Sapanca</span>
          </h1>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-sun-500">
              <Stars rating={4.2} className="h-5 w-5" />
            </span>
            <span className="text-sm font-extrabold text-brand-700">
              4.2 · 142 değerlendirme
            </span>
          </div>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-brand-700/80">
            Merkezi konumu, güler yüzlü ekibi ve ücretsiz kahvaltısıyla Liva
            Hotel, ailenizle geçireceğiniz huzurlu bir Sapanca tatili için
            ideal başlangıç noktası.
          </p>
          <ul className="mt-7 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm font-bold text-brand-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun-400 text-brand-800">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={waGeneric}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#1fb958]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp&apos;tan Rezervasyon
            </a>
            <a
              href="#olanaklar"
              className="rounded-full border-2 border-brand-500 px-8 py-4 text-sm font-extrabold text-brand-500 transition-all duration-300 hover:scale-[1.02] hover:bg-brand-500 hover:text-white"
            >
              Olanakları İnceleyin
            </a>
          </div>
        </div>

        <div className="fade-in relative" style={{ animationDelay: "0.2s" }}>
          <div className="overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand-500/20">
            <div className="relative aspect-[4/3]">
              <Image
                src={img.hero}
                alt="Liva Hotel Sapanca dış görünümü ve havuzu"
                fill
                priority
                className="hero-zoom object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-brand-500/15">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
              <TramIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-brand-800">
                Sapanca Teleferiği
              </p>
              <p className="text-xs font-bold text-brand-500">
                Yürüme mesafesinde
              </p>
            </div>
          </div>
          <div className="absolute -top-5 right-6 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-lg shadow-brand-500/15">
            <span className="text-sun-500">
              <Stars rating={4.2} className="h-4 w-4" />
            </span>
            <span className="text-sm font-extrabold text-brand-800">4.2</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationStrip() {
  const items = [
    {
      icon: TramIcon,
      title: "Teleferik Yürüme Mesafesinde",
      text: "Sapanca Teleferiği'ne yürüyerek ulaşın, manzaranın tadını çıkarın.",
    },
    {
      icon: MapPinIcon,
      title: "Merkezi Konum",
      text: "İstasyon Caddesi üzerinde, kolay bulunur ve her yere yakın.",
    },
    {
      icon: WavesIcon,
      title: "Göle ~30 Dk Yürüyüş",
      text: "Sapanca Gölü kıyısına keyifli bir yürüyüşle ulaşabilirsiniz.",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={img.location}
          alt="Sapanca doğası"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-800/85" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="fade-in flex items-start gap-4 rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sun-400 text-brand-800">
                <it.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  {it.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                  {it.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Amenities() {
  return (
    <section id="olanaklar" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="fade-in mb-14 text-center" style={{ animationDelay: "0.1s" }}>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand-500">
            Olanaklar
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
            Her Şey Düşünülmüş
          </h2>
          <p className="mx-auto mt-4 max-w-md font-bold text-brand-700/60">
            Konaklamanız boyunca ihtiyacınız olan her şey, sizi bekliyor.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {amenities.map((a, i) => (
            <div
              key={a.label}
              className="fade-in group flex flex-col items-center gap-4 rounded-3xl bg-brand-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-brand-100 hover:shadow-lg hover:shadow-brand-500/10"
              style={{ animationDelay: `${0.15 + i * 0.05}s` }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-500 shadow-sm transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <a.icon className="h-7 w-7" />
              </span>
              <span className="text-sm font-extrabold text-brand-700">
                {a.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const cards = [
    {
      img: img.family,
      title: "Aileler İçin",
      text: "Sessiz, temiz ve ferah odalarımız; çocuklu ailelerin rahatça konaklayabileceği şekilde tasarlandı. Misafirlerimiz bizi 'kusursuz bir aile oteli' olarak tanımlıyor.",
    },
    {
      img: img.breakfast,
      title: "Doyurucu Kahvaltı",
      text: "Güne ücretsiz, doyurucu ve lezzetli kahvaltımızla başlayın. Misafirlerimizin deyimiyle: 'Kahvaltı oldukça doyurucu ve lezzetli.'",
    },
    {
      img: img.pet,
      title: "Evcil Dostlarınızla",
      text: "Evcil hayvan dostu politikamız sayesinde tatilinizi tüylü dostlarınızla birlikte geçirebilirsiniz. Onlar da bizim misafirimiz.",
    },
  ];

  return (
    <section className="bg-[#f6fafc] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="fade-in mb-14 text-center" style={{ animationDelay: "0.1s" }}>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand-500">
            Neden Liva?
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
            Aileler İçin Rahat,
            <br />
            Çocuklar İçin Eğlenceli
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((c, i) => (
            <article
              key={c.title}
              className="fade-in group overflow-hidden rounded-[2rem] bg-white shadow-md shadow-brand-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/15"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-7">
                <h3 className="font-display text-xl font-bold text-brand-800">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-700/70">
                  {c.text}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="fade-in mt-14 text-center" style={{ animationDelay: "0.4s" }}>
          <a
            href={waReservation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-brand-500 px-10 py-4 text-sm font-extrabold text-white shadow-xl shadow-brand-500/25 transition-all duration-300 hover:scale-[1.02] hover:bg-brand-600"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Rezervasyon Talebi Oluştur
          </a>
          <p className="mt-4 text-sm font-bold text-brand-700/50">
            Tarih ve fiyat bilgisi için WhatsApp&apos;tan yazın, hemen dönüş
            yapalım.
          </p>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="hikayemiz" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <div className="fade-in relative order-2 lg:order-1" style={{ animationDelay: "0.1s" }}>
          <div className="group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-brand-500/15">
            <div className="relative aspect-[4/5]">
              <Image
                src={img.story}
                alt="Liva Hotel Sapanca kahvaltı keyfi"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 right-6 flex items-center gap-3 rounded-2xl bg-sun-400 px-5 py-4 shadow-xl shadow-sun-500/30">
            <span className="font-display text-2xl font-bold text-brand-800">
              4.2
            </span>
            <div className="leading-tight">
              <p className="text-xs font-extrabold text-brand-800">
                142 yorum
              </p>
              <p className="text-[11px] font-bold text-brand-700/70">
                Misafirlerimizden
              </p>
            </div>
          </div>
        </div>

        <div className="fade-in order-1 lg:order-2" style={{ animationDelay: "0.2s" }}>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand-500">
            Hikayemiz
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
            Aile İşletmesi,
            <br />
            <span className="text-brand-500">Sıcak Karşılama</span>
          </h2>
          <div className="mt-7 space-y-5 leading-relaxed text-brand-700/75">
            <p>
              Liva Hotel Sapanca, Kırkpınar Hasanpaşa&apos;da İstasyon Caddesi
              üzerinde hizmet veriyor. Yakın zamanda yenilenen odaları, yeni
              mobilyaları ve özenli temizliğiyle Sapanca&apos;nın en merkezi
              noktalarından birinde konuklarını ağırlıyor.
            </p>
            <p>
              Resepsiyondaki Gökhan Bey başta olmak üzere ekibimiz;
              misafirlerimize Sapanca&apos;yı en iyi şekilde keşfetmeleri için
              her konuda yardımcı oluyor. Şehir merkezindeki restoran
              önerilerinden göl kenarı yürüyüşlerine kadar her sorunuzda
              yanınızdayız.
            </p>
          </div>

          <figure className="mt-8 rounded-2xl bg-brand-50 p-6">
            <blockquote className="font-display text-lg font-bold leading-relaxed text-brand-700">
              &ldquo;A wonderful boutique family hotel in Sapanca, very close
              to the cable car. Thanks to Gökhan abi at the reception, he was
              very helpful to me and my friends.&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-xs font-extrabold uppercase tracking-[0.15em] text-brand-500">
              Rabia — Google Yorumu
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="yorumlar" className="scroll-mt-24 bg-[#f6fafc] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="fade-in mb-14 text-center" style={{ animationDelay: "0.1s" }}>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand-500">
            Misafir Yorumları
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
            Konuklarımız Ne Diyor?
          </h2>
        </div>

        <div className="fade-in mb-14 grid items-center gap-8 rounded-[2rem] bg-white p-8 shadow-md shadow-brand-500/10 sm:p-10 lg:grid-cols-2" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-5">
            <p className="font-display text-6xl font-bold text-brand-500">
              {business.rating.toLocaleString("tr-TR")}
            </p>
            <div>
              <span className="text-sun-500">
                <Stars rating={business.rating} className="h-5 w-5" />
              </span>
              <p className="mt-2 text-sm font-extrabold text-brand-700">
                {business.reviewCount} Google değerlendirmesi
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">
              Konuklar neyi seviyor
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-brand-50 px-4 py-1.5 text-xs font-extrabold text-brand-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={r.author + r.text.slice(0, 24)}
              className="fade-in flex h-full flex-col rounded-[1.75rem] bg-white p-7 shadow-sm shadow-brand-500/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-500/10"
              style={{ animationDelay: `${0.15 + (i % 3) * 0.1}s` }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sun-500">
                  <Stars rating={r.rating} className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold text-brand-700/40">
                  {r.when}
                </span>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-700/75">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-brand-50 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 font-display text-sm font-bold text-white">
                  {r.author.charAt(0).toUpperCase()}
                </span>
                <p className="text-sm font-extrabold text-brand-800">
                  {r.author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="iletisim" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="fade-in mb-14 text-center" style={{ animationDelay: "0.1s" }}>
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-brand-500">
            İletişim
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-brand-800 sm:text-5xl">
            Bize Ulaşın
          </h2>
          <p className="mx-auto mt-4 max-w-md font-bold text-brand-700/60">
            Rezervasyon için WhatsApp üzerinden bize yazabilirsiniz.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="fade-in flex flex-col gap-8 lg:col-span-2" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-start gap-5">
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-brand-50 p-3.5 text-brand-500">
                <MapPinIcon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-brand-800">
                  Adres
                </h3>
                <p className="mt-1.5 leading-relaxed text-brand-700/70">
                  {business.addressLine1}
                  <br />
                  {business.addressLine2}
                </p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-brand-500 transition-colors hover:text-brand-600"
                >
                  <NavigationIcon className="h-4 w-4" />
                  Yol Tarifi Alın
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-brand-50 p-3.5 text-brand-500">
                <PhoneIcon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-brand-800">
                  Telefon
                </h3>
                <a
                  href={`tel:${business.phoneIntl}`}
                  className="mt-1.5 block text-brand-700/70 transition-colors hover:text-brand-500"
                >
                  {business.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-brand-50 p-3.5 text-brand-500">
                <TramIcon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-brand-800">
                  Konum
                </h3>
                <p className="mt-1.5 leading-relaxed text-brand-700/70">
                  Sapanca Teleferiği&apos;ne yürüme mesafesinde, merkezi
                  konumda. Göle yürüyüş yaklaşık yarım saat.
                </p>
              </div>
            </div>

            <a
              href={waGeneric}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-[#1fb958]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp&apos;tan Yazın
            </a>
          </div>

          <div className="fade-in lg:col-span-3" style={{ animationDelay: "0.25s" }}>
            <div className="h-full overflow-hidden rounded-[2rem] shadow-lg shadow-brand-500/10">
              <iframe
                title="Liva Hotel Sapanca Konum"
                src={mapsEmbed}
                className="h-full min-h-[420px] w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = [
    { href: "#olanaklar", label: "Olanaklar" },
    { href: "#hikayemiz", label: "Hikayemiz" },
    { href: "#yorumlar", label: "Yorumlar" },
    { href: "#iletisim", label: "İletişim" },
  ];

  return (
    <footer className="bg-brand-800 px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <p className="font-display text-3xl font-bold text-white">
          Liva Hotel <span className="text-sun-400">Sapanca</span>
        </p>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-200">
          Aileler için huzurlu konaklama
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold text-brand-100/80 transition-colors hover:text-sun-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="max-w-md text-sm leading-relaxed text-brand-100/60">
          {business.addressLine1} · {business.addressLine2}
        </p>
        <p className="text-xs text-brand-100/50">
          &copy; {new Date().getFullYear()} {business.name}. Tüm hakları
          saklıdır.
        </p>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={waGeneric}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-transform hover:scale-110"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main className="flex-1">
        <Hero />
        <LocationStrip />
        <Amenities />
        <Highlights />
        <Story />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
