export interface ColorVariant {
  name: string;
  hex: string;
  materialProps: {
    color: string;
    metalness: number;
    roughness: number;
  };
  price: number;
  stock: number;
}

export interface SizeOption {
  label: string;
  value: string;
  inStock: boolean;
}

export interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  verified: boolean;
}

export interface Feature {
  title: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  originalPrice: number;
  colors: ColorVariant[];
  sizes: SizeOption[];
  images: string[];
  features: Feature[];
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  modelUrl: string;
}

export const product: Product = {
  id: "aura-pro-x1",
  name: "AURA Pro X1",
  tagline: "Engineered for Silence. Designed for You.",
  description:
    "Premium wireless headphones with adaptive noise cancellation, 40-hour battery life, and studio-grade sound. Crafted with aerospace-grade aluminum and memory foam cushions for all-day comfort.",
  basePrice: 349.99,
  originalPrice: 449.99,
  modelUrl: "/models/headphones.glb",
  colors: [
    {
      name: "Midnight Black",
      hex: "#1a1a1a",
      materialProps: { color: "#1a1a1a", metalness: 0.8, roughness: 0.2 },
      price: 349.99,
      stock: 24,
    },
    {
      name: "Pearl White",
      hex: "#f5f0eb",
      materialProps: { color: "#f5f0eb", metalness: 0.6, roughness: 0.3 },
      price: 349.99,
      stock: 18,
    },
    {
      name: "Rose Gold",
      hex: "#c9a96e",
      materialProps: { color: "#c9a96e", metalness: 0.9, roughness: 0.15 },
      price: 379.99,
      stock: 12,
    },
    {
      name: "Navy Blue",
      hex: "#1e3a5f",
      materialProps: { color: "#1e3a5f", metalness: 0.7, roughness: 0.25 },
      price: 349.99,
      stock: 30,
    },
    {
      name: "Forest Green",
      hex: "#2d4a3e",
      materialProps: { color: "#2d4a3e", metalness: 0.7, roughness: 0.25 },
      price: 359.99,
      stock: 8,
    },
  ],
  sizes: [
    { label: "S", value: "small", inStock: true },
    { label: "M", value: "medium", inStock: true },
    { label: "L", value: "large", inStock: true },
    { label: "XL", value: "extra-large", inStock: false },
  ],
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
  ],
  features: [
    {
      title: "Adaptive Noise Cancellation",
      description:
        "AI-powered ANC that adapts to your environment in real-time. Whether you're in a busy cafe or a quiet library, AURA Pro X1 delivers the perfect silence.",
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    },
    {
      title: "40-Hour Battery Life",
      description:
        "Go a full work week without charging. Quick charge gives you 5 hours of playback in just 10 minutes. USB-C fast charging included.",
      image:
        "https://images.unsplash.com/photo-1578319439584-104c94d37305?w=800&q=80",
    },
    {
      title: "Studio-Grade Sound",
      description:
        "Custom 40mm titanium drivers deliver Hi-Res Audio with deep bass and crystal-clear highs. Tuned by Grammy-winning audio engineers.",
      image:
        "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80",
    },
    {
      title: "All-Day Comfort",
      description:
        "Memory foam ear cushions wrapped in premium protein leather. Aerospace-grade aluminum headband distributes weight evenly at just 250g.",
      image:
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80",
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Sarah Chen",
      date: "March 12, 2026",
      rating: 5,
      text: "These headphones are a game-changer. The noise cancellation is unreal — I can finally focus in my open office. Sound quality rivals my studio monitors.",
      verified: true,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      date: "March 8, 2026",
      rating: 5,
      text: "Worth every penny. The build quality is exceptional and the battery lasts forever. I've been using them daily for a month and I'm still impressed.",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      date: "February 28, 2026",
      rating: 4,
      text: "Incredible sound and comfort. Took half a star off because the app could use some improvements, but the headphones themselves are perfect.",
      verified: true,
    },
    {
      id: 4,
      name: "David Kim",
      date: "February 20, 2026",
      rating: 5,
      text: "Best headphones I've ever owned. The adaptive ANC is like magic — it adjusts perfectly whether I'm on a plane or walking through the city.",
      verified: true,
    },
    {
      id: 5,
      name: "Alexandra Petrov",
      date: "February 15, 2026",
      rating: 4,
      text: "Beautiful design and premium feel. The Rose Gold color is stunning in person. Audio quality is superb for both music and calls.",
      verified: false,
    },
    {
      id: 6,
      name: "James Wright",
      date: "February 10, 2026",
      rating: 5,
      text: "As an audiophile, I'm very particular about sound. These deliver. The titanium drivers produce a warmth and clarity I haven't heard in wireless cans before.",
      verified: true,
    },
  ],
  averageRating: 4.7,
  totalReviews: 203,
};
