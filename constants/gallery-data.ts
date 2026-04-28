export type GalleryItem = {
  id: number;
  eventId: string;
  src: string;
  name: string;
  year: string;
  participants: string;
  category: string;
};

export const galleryData: GalleryItem[] = [
  // Event: Global Tech Summit (3 photos)
  { 
    id: 1, 
    eventId: "tech-summit", 
    src: "/services/regis/reg1.png", 
    name: "Global Tech Summit", 
    year: "2024", 
    participants: "15,000+",
    category: "LARGE-SCALE & INTERNATIONAL"
  },
  { 
    id: 17, 
    eventId: "tech-summit", 
    src: "/services/regis/reg2.png", 
    name: "Global Tech Summit", 
    year: "2024", 
    participants: "15,000+",
    category: "LARGE-SCALE & INTERNATIONAL"
  },
  { 
    id: 18, 
    eventId: "tech-summit", 
    src: "/services/regis/reg3.png", 
    name: "Global Tech Summit", 
    year: "2024", 
    participants: "15,000+",
    category: "LARGE-SCALE & INTERNATIONAL"
  },

  // Event: Asia Crypto Week (2 photos)
  { 
    id: 2, 
    eventId: "crypto-week", 
    src: "/services/regis/reg4.png", 
    name: "Asia Crypto Week", 
    year: "2023", 
    participants: "10,000+",
    category: "LARGE-SCALE & INTERNATIONAL"
  },
  { 
    id: 19, 
    eventId: "crypto-week", 
    src: "/services/web/web1.png", 
    name: "Asia Crypto Week", 
    year: "2023", 
    participants: "10,000+",
    category: "LARGE-SCALE & INTERNATIONAL"
  },

  // Event: HealthTech Expo (2 photos)
  { 
    id: 3, 
    eventId: "health-expo", 
    src: "/services/web/web2.png", 
    name: "HealthTech Expo", 
    year: "2025", 
    participants: "8,500+",
    category: "CORPORATE, BRAND & KNOWLEDGE"
  },
  { 
    id: 20, 
    eventId: "health-expo", 
    src: "/services/edm/edm1.png", 
    name: "HealthTech Expo", 
    year: "2025", 
    participants: "8,500+",
    category: "CORPORATE, BRAND & KNOWLEDGE"
  },

  // Remaining events (Single photos or similar)
  { 
    id: 4, 
    eventId: "innovate-ai", 
    src: "/services/edm/edm2.png", 
    name: "Innovate AI", 
    year: "2024", 
    participants: "12,000+",
    category: "CORPORATE, BRAND & KNOWLEDGE"
  },
  { 
    id: 5, 
    eventId: "fintech-connect", 
    src: "/services/ticket/ticket1.png", 
    name: "Fintech Connect", 
    year: "2023", 
    participants: "5,000+",
    category: "CORPORATE, BRAND & KNOWLEDGE"
  },
  { 
    id: 6, 
    eventId: "saas-forum", 
    src: "/services/fest/fes1.png", 
    name: "SaaS Leaders Forum", 
    year: "2024", 
    participants: "3,000+",
    category: "CORPORATE, BRAND & KNOWLEDGE"
  },
  { 
    id: 7, 
    eventId: "ecommerce-masters", 
    src: "/services/iot/iot1.png", 
    name: "E-commerce Masters", 
    year: "2023", 
    participants: "25,000+",
    category: "LARGE-SCALE & INTERNATIONAL"
  },
  { 
    id: 8, 
    eventId: "marketing-cloud", 
    src: "/services/org/org1.png", 
    name: "Marketing Cloud Con", 
    year: "2025", 
    participants: "18,000+",
    category: "CORPORATE, BRAND & KNOWLEDGE"
  },
  { 
    id: 9, 
    eventId: "music-fest", 
    src: "/services/graph/graph1.jpg", 
    name: "Music Fest Asia", 
    year: "2024", 
    participants: "50,000+",
    category: "LARGE-SCALE & INTERNATIONAL"
  },
  { 
    id: 10, 
    eventId: "neon-nights", 
    src: "/services/scm/scm1.png", 
    name: "Neon Nights Festival", 
    year: "2023", 
    participants: "80,000+",
    category: "LARGE-SCALE & INTERNATIONAL"
  },
  { 
    id: 11, 
    eventId: "smart-city", 
    src: "/services/stream/stream1.png", 
    name: "Smart City Expo", 
    year: "2025", 
    participants: "20,000+",
    category: "GOVERNMENT, ASSOCIATION & INSTITUTIONAL"
  },
  { 
    id: 12, 
    eventId: "corporate-gala", 
    src: "/services/org/org2.png", 
    name: "Annual Corporate Gala", 
    year: "2024", 
    participants: "1,500+",
    category: "CORPORATE, BRAND & KNOWLEDGE"
  },
];
