
// Current dummy data from ExploreProduct.tsx mapped to clean assets
const initialProducts = [
  { id: 1, title: "Raiden Shogun Cosplay", category: "Costume", creator: "Zenyth Prime", username: "@zenyth", price: 1200000, image: "../src/assets/images/Sub Hero 1.jpg", verified: true, date: "2023-12-01", rating: 5 },
  { id: 2, title: "Hololive Sticker Pack", category: "Merchandise", creator: "Fareye Closhartt", username: "@fareye", price: 45000, image: "../src/assets/images/Sub Hero 2.jpg", verified: true, date: "2023-11-20", rating: 4 },
  { id: 3, title: "Custom Wig Styling", category: "Service", creator: "Avianna Skylark", username: "@avianna", price: 350000, image: "../src/assets/images/Sub Hero 3a.jpg", verified: true, date: "2024-01-05", rating: 5 },
  { id: 4, title: "Digital Art Commission", category: "Digital", creator: "Braum Shield", username: "@braum", price: 500000, image: "../src/assets/images/Sign Up 1.jpg", verified: false, date: "2023-10-15", rating: 3 },
  { id: 5, title: "Fate/Grand Order Sword", category: "Prop", creator: "Garen Might", username: "@garen", price: 850000, image: "../src/assets/images/Sub Hero 4.jpg", verified: true, date: "2023-09-10", rating: 5 },
  { id: 6, title: "Voice Pack Vol.1", category: "Digital", creator: "Celeste Moon", username: "@celeste", price: 9000, image: "../src/assets/images/Sign Up 5.jpg", verified: true, date: "2023-12-25", rating: 4 },
  { id: 7, title: "Spy x Family Uniform", category: "Costume", creator: "Lux Light", username: "@lux", price: 450000, image: "../src/assets/images/Sub Hero 5a.jpg", verified: true, date: "2023-11-01", rating: 4 },
  { id: 8, title: "Chibi Avatar Set", category: "Digital", creator: "Ahri Fox", username: "@ahri", price: 20000, image: "../src/assets/images/Sign Up 2.jpg", verified: true, date: "2023-10-05", rating: 5 },
  { id: 9, title: "Resin Vision Mondstadt", category: "Merchandise", creator: "Ezreal Explorer", username: "@ezreal", price: 120000, image: "../src/assets/images/Sub Hero 6a.jpg", verified: true, date: "2023-12-10", rating: 3 },
  { id: 10, title: "Photo Pack: Cyberpunk", category: "Digital", creator: "Jinx Chaos", username: "@jinx", price: 75000, image: "../src/assets/images/Sign Up 6.jpg", verified: false, date: "2024-01-02", rating: 2 },
  { id: 11, title: "Armor Foam Pattern", category: "Digital", creator: "Draven Axe", username: "@draven", price: 50000, image: "../src/assets/images/Sign Up 3.jpg", verified: false, date: "2023-08-15", rating: 4 },
  { id: 12, title: "Bunny Girl Costume", category: "Costume", creator: "Caitlyn Sniper", username: "@caitlyn", price: 300000, image: "../src/assets/images/hero-2.jpg", verified: true, date: "2024-01-10", rating: 5 },
];

// Current dummy data from DiscoverCreator.tsx
const initialCreators = [
  { id: 1, name: "Fareye Closhartt", username: "fareye", role: "Illustrator", rating: 5, date: "2023-12-01", verified: true, avatar: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3", banner: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3" },
  { id: 2, name: "Avianna Skylark", username: "avianna", role: "Vtuber", rating: 4, date: "2023-11-15", verified: true, avatar: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3", banner: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3" },
  { id: 3, name: "Zenyth Prime", username: "zenyth", role: "Cosplayer", rating: 5, date: "2023-10-20", verified: true, avatar: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3", banner: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3" },
  { id: 4, name: "Braum Shield", username: "braum", role: "Illustrator", rating: 3, date: "2023-09-05", verified: false, avatar: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3", banner: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3" },
  { id: 5, name: "Celeste Moon", username: "celeste", role: "Vtuber", rating: 5, date: "2024-01-01", verified: true, avatar: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3", banner: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3" },
  { id: 6, name: "Draven Axe", username: "draven", role: "Cosplayer", rating: 2, date: "2023-08-22", verified: false, avatar: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3", banner: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3" },
  { id: 7, name: "Ezreal Explorer", username: "ezreal", role: "Illustrator", rating: 4, date: "2023-11-10", verified: true, avatar: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3", banner: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3" },
  { id: 8, name: "Garen Might", username: "garen", role: "Cosplayer", rating: 5, date: "2023-05-30", verified: true, avatar: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3", banner: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3" },
  { id: 9, name: "Lux Light", username: "lux", role: "Vtuber", rating: 4, date: "2023-09-01", verified: true, avatar: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3", banner: "https://lh3.googleusercontent.com/d/1h3GWacwUbXO7_PUSNWaWXFqygtqZs4V3" },
];

export const seedDatabase = async () => {
  // No-op without Firebase
  console.log('Mock seeding...');
};

export const getProducts = async () => {
  return initialProducts;
};

export const getCreators = async () => {
  return initialCreators;
};
