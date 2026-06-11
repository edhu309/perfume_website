// Example perfume data for development
import binSheikhImg from '../assets/bin_sheikh.jpeg';
import oudRoseImg from '../assets/oud_rose.jpeg';
export const perfumes = [
  {
    id: 1,
    name: "BIN SHEIKH",
    price: 180,
    image: binSheikhImg,
    description: "A sophisticated blend for the modern connoisseur.",
    mood: "Elegant",
    notes: {
      top: ["Citrus", "Spice"],
      middle: ["Oud", "Amber"],
      base: ["Musk", "Sandalwood"]
    }
  },
  {
    id: 2,
    name: "OUD & ROSE",
    price: 160,
    image: oudRoseImg,
    description: "Classic oud and rose in perfect harmony.",
    mood: "Romantic",
    notes: {
      top: ["Rose"],
      middle: ["Oud"],
      base: ["Patchouli", "Vanilla"]
    }
  },
  // ...existing perfumes
  {
    id: 3,
    name: "Noir Étoile",
    price: 220,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", // Dummy image
    description: "A mysterious blend of oud, blackcurrant, and amber.",
    mood: "Woody",
    notes: {
      top: ["Blackcurrant", "Bergamot"],
      middle: ["Oud", "Rose"],
      base: ["Amber", "Patchouli"]
    }
  },
  {
    id: 4,
    name: "Bleu Luxe",
    price: 195,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Fresh marine notes with a hint of citrus and musk.",
    mood: "Fresh",
    notes: {
      top: ["Lemon", "Sea Breeze"],
      middle: ["Jasmine", "Iris"],
      base: ["Musk", "Cedarwood"]
    }
  },
  {
    id: 5,
    name: "Or d’Orient",
    price: 250,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "Spicy saffron and vanilla with a golden warmth.",
    mood: "Oriental",
    notes: {
      top: ["Saffron", "Pink Pepper"],
      middle: ["Vanilla", "Sandalwood"],
      base: ["Tonka Bean", "Benzoin"]
    }
  }
];
