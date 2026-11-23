export type Category = 'Bags & Purses' | 'Gowns & Dresses' | 'Sets & Swimwear' | 'Hats & Scarves' | 'Waistbeads & Jewelry' | 'Accessories' | 'Home & Nursery';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: Category;
  description: string;
}

export const products: Product[] = [
  // --- HATS & SCARVES ---
  { id: 'knit-1', name: 'Granny Square Bucket Hat', price: 10000, image: '/images/hat-granny.jpg', category: 'Hats & Scarves', description: 'Hand-crocheted vintage style bucket hat.' },
  { id: 'knit-2', name: 'Artisan Durag Scarf', price: 10000, image: '/images/durag-scarf.jpg', category: 'Hats & Scarves', description: 'Stylish crochet durag with adjustable ties.' },
  
  // --- GOWNS & DRESSES ---
  { id: 'knit-9', name: 'Ethereal Beach Gown', price: 20000, image: '/images/beach-gown.jpg', category: 'Gowns & Dresses', description: 'Sheer handmade gown for beachside elegance.' },
  { id: 'knit-10', name: 'Midnight Maxi Gown', price: 30000, image: '/images/long-gown.jpg', category: 'Gowns & Dresses', description: 'Full-length hand-knitted evening gown.' },

  // --- SETS & SWIMWEAR ---
  { id: 'knit-3', name: 'Butterfly Halter Top', price: 7000, image: '/images/butterfly-top.jpg', category: 'Sets & Swimwear', description: 'Delicate butterfly-wing inspired crochet top.' },
  { id: 'knit-4', name: 'Prism Stripe Shirt', price: 40000, image: '/images/color-shirt.jpg', category: 'Sets & Swimwear', description: 'Vibrant multi-colored button-down knit shirt.' },
  { id: 'knit-5', name: 'Heritage Custom Sweater', price: 40000, image: '/images/sweater-custom.jpg', category: 'Sets & Swimwear', description: 'Premium thick-knit custom sweater.' },
  { id: 'knit-6', name: 'Ocean Breeze Bikini Set', price: 25000, image: '/images/bikini-blue.jpg', category: 'Sets & Swimwear', description: 'Blue gradient bikini with matching ruffle skirt.' },
  { id: 'knit-7', name: 'Pink Hibiscus Bloom Set', price: 25000, image: '/images/flower-set-pink.jpg', category: 'Sets & Swimwear', description: 'Floral pattern two-piece summer set.' },
  { id: 'knit-8', name: 'Boho Tassel Ensemble', price: 25000, image: '/images/fringe-set.jpg', category: 'Sets & Swimwear', description: 'Earth-toned set with signature fringe detailing.' },
  { id: 'knit-11', name: 'Urban Shrug & Hat Set', price: 25000, image: '/images/shrug-set.jpg', category: 'Sets & Swimwear', description: 'Matching street-style shrug and bucket hat.' },
  { id: 'knit-12', name: 'Beachside Party Set', price: 25000, image: '/images/beach-set.jpg', category: 'Sets & Swimwear', description: 'Special edition vibrant beach festival set.' },

  // --- BAGS & PURSES ---
  { id: 'bag-1', name: 'Botanical Tapestry Tote', price: 10000, image: '/images/bag-tapestry.jpg', category: 'Bags & Purses', description: 'Intricate floral tapestry crochet bag.' },
  { id: 'bag-2', name: 'Rosy Petal Shoulder Bag', price: 10000, image: '/images/bag-flower.jpg', category: 'Bags & Purses', description: 'Soft pink bag with 3D flower accent.' },
  { id: 'bag-3', name: 'Textured Popcorn Bag', price: 10000, image: '/images/bag-popcorn.jpg', category: 'Bags & Purses', description: 'Tactile popcorn-stitch artisan handbag.' },
  { id: 'bag-4', name: 'Cascading Ruffle Bag', price: 10000, image: '/images/bag-ruffle.jpg', category: 'Bags & Purses', description: 'High-fashion ruffled crochet statement bag.' },
  { id: 'bag-5', name: 'Enchanted Fairy Bag', price: 20000, image: '/images/bag-fairy.jpg', category: 'Bags & Purses', description:'Whimsical mini-bag with unique petal shapes.' },
  { id: 'bag-6', name: 'Modern Bucket Bag', price: 20000, image: '/images/bag-bucket.jpg', category: 'Bags & Purses', description: 'Structured and durable handmade bucket bag.' },
  { id: 'bag-8', name: 'Crystal Luxe Handbag', price: 60000, image: '/images/bag-crystal.jpg', category: 'Bags & Purses', description: 'High-end beaded bag with premium shimmer.' },
  { id: 'bag-9', name: 'Classic Rose Tote', price: 15000, image: '/images/bag-pink-pearl.jpg', category: 'Bags & Purses', description: 'Elegant large tote for daily essentials.' },
  { id: 'bag-10', name: 'Petite Blossom Purse (Pink)', price: 10000, image: '/images/mini-purse-pink.jpg', category: 'Bags & Purses', description: 'Small handheld coin and phone purse.' },
  { id: 'bag-11', name: 'Petite Blossom Purse (White)', price:10000, image: '/images/mini-purse-white.jpg', category: 'Bags & Purses', description: 'Clean white mini-purse for formal outings.' },

  // --- WAISTBEADS & JEWELRY ---
  { id: 'jewelry-1', name: 'Signature Atanda Bracelet', price:7000, image: '/images/bracelet-atanda.jpg', category: 'Waistbeads & Jewelry', description: 'Custom lettered matte-bead bracelet set.' },
  { id: 'jewelry-2', name: 'Amethyst Waistbead Trio', price: 7000, image: '/images/waistbeads-1.jpg', category: 'Waistbeads & Jewelry', description: 'Purple and gold customized waist beads.' },
  { id: 'jewelry-3', name: 'Pink Quartz Waistbeads', price: 10000, image: '/images/waistbeads-2.jpg', category: 'Waistbeads & Jewelry', description: 'Premium pink crystal beaded waist set.' },
  { id: 'jewelry-4', name: 'Golden Hour Waistbeads', price: 10000, image: '/images/waistbeads-3.jpg', category: 'Waistbeads & Jewelry', description: 'Lustrous gold-tone beads for a royal look.' },
  { id: 'jewelry-5', name: 'Midnight Onyx Jewelry Set', price:50000, image: '/images/jewelry-onyx.jpg', category: 'Waistbeads & Jewelry',description: 'Complete black bead necklace and ring set.' },
  { id: 'jewelry-6', name: 'Sun-Kissed Petal Earrings', price:2000, image: '/images/earrings4.jpg', category: 'Waistbeads & Jewelry', description: 'Vibrant orange floral crochet earrings.' },
  { id: 'jewelry-7', name: 'Pastel Daisy Studs', price: 2000, image: '/images/earrings-daisy.jpg', category: 'Waistbeads & Jewelry', description: 'Small, elegant daisy-pattern earrings.' },
  { id: 'jewelry-8', name: 'Artisan Earring Collection', price: 2000, image: '/images/earrings-multi.jpg', category: 'Waistbeads & Jewelry', description: 'Handpicked geometric crochet earring sets.' },

  // --- ACCESSORIES ---
  { id: 'acc-1', name: 'Cloud-Soft Headset Covers', price: 5000, image: '/images/headset-cover.jpg', category: 'Accessories', description: 'Fluffy crochet covers for your headphones.' },
  { id: 'acc-2', name: 'Ruffle Bottle Protector', price: 10000, image: '/images/bottle-cover.jpg', category: 'Accessories', description: 'Elegant bottle sleeve with pearl accents.' },
  { id: 'acc-3', name: 'Tropical Fruit Keychains', price: 1500, image: '/images/keychain-fruit.jpg', category: 'Accessories', description: 'Cute fruit-shaped crochet key charms.' },
  { id: 'acc-4', name: 'Sweetheart Keychains', price: 1500, image: '/images/keychain-heart.jpg', category: 'Accessories', description: 'Pastel heart charms for bags or keys.' },
  { id: 'acc-5', name: 'Floral Satin Scrunchies', price: 2000,image: '/images/hair-ties.jpg', category: 'Accessories', description: 'Hand-sewn scrunchies with floral accents.' },

  // --- HOME & NURSERY ---
  { id: 'home-1', name: 'Teddy Bear Motif Blanket', price: 25000, image: '/images/blanket-teddy.jpg', category: 'Home & Nursery', description: 'Cozy baby blanket with adorable bear faces.' },
  { id: 'home-3', name: 'Rosewood Striped Blanket', price: 25000, image: '/images/blanket-pink.jpg', category: 'Home & Nursery', description: 'Soft striped blanket in classic pink tones.' }
];

export const featuredKnits = products.filter(p => p.category === 'Sets & Swimwear' || p.category === 'Gowns & Dresses').slice(0, 4);
export const featuredJewelry = products.filter(p => p.category === 'Waistbeads & Jewelry').slice(0, 3);