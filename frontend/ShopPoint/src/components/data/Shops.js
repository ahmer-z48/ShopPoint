const shops = [
  {
    id: "al-falah-grocery",
    name: "Al-Falah Grocery Mart",
    category: "Grocery",
    location: "Liaquat Bazaar, Quetta",
    rating: 4.6,
    reviews: 128,
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
    logo:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80",
    description:
      "Al-Falah Grocery Mart is a local grocery store offering everyday household essentials, fresh food items, beverages, and other products for customers in Quetta.",
    services: ["Delivery", "Pickup"],
    openingHours: "9:00 AM - 10:00 PM",
  },

  {
    id: "noor-bakers",
    name: "Noor Bakers & Sweets",
    category: "Bakery",
    location: "Jinnah Road, Quetta",
    rating: 4.8,
    reviews: 95,
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    logo:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80",
    description:
      "Noor Bakers & Sweets offers fresh bakery items, cakes, biscuits, sweets, and snacks prepared for customers in Quetta.",
    services: ["Pickup only"],
    openingHours: "8:00 AM - 11:00 PM",
  },

  {
    id: "rafiq-electronics",
    name: "Rafiq Electronics Hub",
    category: "Electronics",
    location: "Saddar, Quetta",
    rating: 4.3,
    reviews: 210,
    status: "Closed",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    logo:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=300&q=80",
    description:
      "Rafiq Electronics Hub provides mobile accessories, electronic devices, cables, chargers, and other everyday electronics.",
    services: ["Delivery", "Pickup"],
    openingHours: "10:00 AM - 9:00 PM",
  },

  {
    id: "city-care-pharmacy",
    name: "City Care Pharmacy",
    category: "Pharmacy",
    location: "Satellite Town, Quetta",
    rating: 4.9,
    reviews: 64,
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=80",
    logo:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80",
    description:
      "City Care Pharmacy provides healthcare products, personal care items, wellness products, and everyday pharmacy essentials.",
    services: ["Delivery"],
    openingHours: "9:00 AM - 11:00 PM",
  },

  {
    id: "style-junction",
    name: "Style Junction Fashion",
    category: "Fashion",
    location: "Prince Road, Quetta",
    rating: 4.4,
    reviews: 142,
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
    logo:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80",
    description:
      "Style Junction Fashion offers a variety of clothing, accessories, and fashion products for men and women.",
    services: ["Pickup only"],
    openingHours: "11:00 AM - 10:00 PM",
  },

  {
    id: "al-haq-hardware",
    name: "Al-Haq Hardware Store",
    category: "Hardware",
    location: "Cantt Road, Quetta",
    rating: 4.5,
    reviews: 77,
    status: "Closed",
    image:
      "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=1200&q=80",
    logo:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=300&q=80",
    description:
      "Al-Haq Hardware Store provides tools, construction supplies, electrical accessories, and other hardware products.",
    services: ["Delivery", "Pickup"],
    openingHours: "9:00 AM - 8:00 PM",
  },

  {
    id: "balochistan-mobile",
    name: "Balochistan Mobile Center",
    category: "Electronics",
    location: "Kandahari Bazaar, Quetta",
    rating: 4.5,
    reviews: 89,
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    logo:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80",
    description:
      "Balochistan Mobile Center offers smartphones, mobile accessories, chargers, headphones, and other mobile-related products.",
    services: ["Delivery", "Pickup"],
    openingHours: "10:00 AM - 10:00 PM",
  },

  {
    id: "fresh-choice",
    name: "Fresh Choice Super Store",
    category: "Grocery",
    location: "Airport Road, Quetta",
    rating: 4.7,
    reviews: 116,
    status: "Open",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    logo:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=300&q=80",
    description:
      "Fresh Choice Super Store offers groceries, household essentials, fresh food items, beverages, and daily-use products.",
    services: ["Delivery", "Pickup"],
    openingHours: "8:00 AM - 11:00 PM",
  },
];

export default shops;