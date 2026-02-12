export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'knitwear' | 'jewelry' | 'apparel';
  description: string;
}

export const products: Product[] = [
  { id: 'knit-1', name: 'Granny Square Bucket Hat', price: 10000, image: '/images/hat-granny.jpg.jpg', category: 'knitwear', description: 'Hand-crocheted vintage style bucket hat.' },
  { id: 'knit-2', name: 'Artisan Durag Scarf', price: 10000, image: '/images/durag-scarf.jpg.jpg', category: 'knitwear', description: 'Stylish crochet durag with adjustable ties.' },
  { id: 'knit-3', name: 'Butterfly Halter Top', price: 7000, image: '/images/butterfly-top.jpg.jpg', category: 'knitwear', description: 'Delicate butterfly-wing inspired crochet top.' },
  { id: 'knit-4', name: 'Prism Stripe Shirt', price: 40000, image: '/images/color-shirt.jpg.jpg', category: 'knitwear', description: 'Vibrant multi-colored button-down knit shirt.' },
  { id: 'knit-5', name: 'Heritage Custom Sweater', price: 40000, image: '/images/sweater-custom.jpg.jpg', category: 'knitwear', description: 'Premium thick-knit custom sweater.' },
  { id: 'knit-6', name: 'Ocean Breeze Bikini Set', price: 25000, image: '/images/bikini-blue.jpg.jpg', category: 'knitwear', description: 'Blue gradient bikini with matching ruffle skirt.' },
  { id: 'knit-7', name: 'Pink Hibiscus Bloom Set', price: 25000, image: '/images/flower-set-pink.jpg.jpg', category: 'knitwear', description: 'Floral pattern two-piece summer set.' },
  { id: 'knit-8', name: 'Boho Tassel Ensemble', price: 25000, image: '/images/fringe-set.jpg.jpg', category: 'knitwear', description: 'Earth-toned set with signature fringe detailing.' },
  { id: 'knit-9', name: 'Ethereal Beach Gown', price: 20000, image: '/images/beach-gown.jpg.jpg', category: 'knitwear', description: 'Sheer handmade gown for beachside elegance.' },
  { id: 'knit-10', name: 'Midnight Maxi Gown', price: 30000, image: '/images/long-gown.jpg.jpg', category: 'knitwear', description: 'Full-length hand-knitted evening gown.' },
  { id: 'knit-11', name: 'Urban Shrug & Hat Set', price: 25000, image: '/images/shrug-set.jpg.jpg', category: 'knitwear', description: 'Matching street-style shrug and bucket hat.' },
  { id: 'knit-12', name: 'Beachside Party Set', price: 25000, image: '/images/Beach Set - Copy.jpg', category: 'knitwear', description: 'Special edition vibrant beach festival set.' },

  // --- BAGS & HANDBAGS ---
  { id: 'bag-1', name: 'Botanical Tapestry Tote', price: 10000, image: '/images/bag-tapestry.jpg.jpg', category: 'apparel', description: 'Intricate floral tapestry crochet bag.' },
  { id: 'bag-2', name: 'Rosy Petal Shoulder Bag', price: 10000, image: '/images/bag-flower.jpg.jpg', category: 'apparel', description: 'Soft pink bag with 3D flower accent.' },
  { id: 'bag-3', name: 'Textured Popcorn Bag', price: 10000, image: '/images/bag-popcorn.jpg.jpg', category: 'apparel', description: 'Tactile popcorn-stitch artisan handbag.' },
  { id: 'bag-4', name: 'Cascading Ruffle Bag', price: 10000, image: '/images/bag-ruffle.jpg.jpg', category: 'apparel', description: 'High-fashion ruffled crochet statement bag.' },
  { id: 'bag-5', name: 'Enchanted Fairy Bag', price: 20000, image: '/images/bag-fairy.jpg.jpg', category: 'apparel', description: 'Whimsical mini-bag with unique petal shapes.' },
  { id: 'bag-6', name: 'Modern Bucket Bag', price: 20000, image: '/images/bag-bucket.jpg.jpg', category: 'apparel', description: 'Structured and durable handmade bucket bag.' },
  { id: 'bag-8', name: 'Crystal Luxe Handbag', price: 60000, image: '/images/bag-crystal.jpg.jpg', category: 'apparel', description: 'High-end beaded bag with premium shimmer.' },
  { id: 'bag-9', name: 'Classic Rose Tote', price: 15000, image: '/images/bag-pink-pearl.jpg.jpg', category: 'apparel', description: 'Elegant large tote for daily essentials.' },
  { id: 'bag-10', name: 'Petite Blossom Purse (Pink)', price: 10000, image: '/images/mini-purse-pink.jpg.jpg', category: 'apparel', description: 'Small handheld coin and phone purse.' },
  { id: 'bag-11', name: 'Petite Blossom Purse (White)', price: 10000, image: '/images/mini-purse-white.jpg.jpg', category: 'apparel', description: 'Clean white mini-purse for formal outings.' },

  // --- JEWELRY & ACCESSORIES ---
  { id: 'jewelry-1', name: 'Signature Atanda Bracelet', price: 7000, image: '/images/bracelet-atanda.jpg.jpg', category: 'jewelry', description: 'Custom lettered matte-bead bracelet set.' },
  { id: 'jewelry-2', name: 'Amethyst Waistbead Trio', price: 7000, image: '/images/waistbeads-1.jpg.jpg', category: 'jewelry', description: 'Purple and gold customized waist beads.' },
  { id: 'jewelry-3', name: 'Pink Quartz Waistbeads', price: 10000, image: '/images/waistbeads-2.jpg.jpg', category: 'jewelry', description: 'Premium pink crystal beaded waist set.' },
  { id: 'jewelry-4', name: 'Golden Hour Waistbeads', price: 10000, image: '/images/waistbeads-3.jpg.jpg', category: 'jewelry', description: 'Lustrous gold-tone beads for a royal look.' },
  { id: 'jewelry-5', name: 'Midnight Onyx Jewelry Set', price: 50000, image: '/images/jewelry-onyx.jpg.jpg', category: 'jewelry', description: 'Complete black bead necklace and ring set.' },
  { id: 'jewelry-6', name: 'Sun-Kissed Petal Earrings', price: 2000, image: '/images/earrings-flower.jpg (2).jpg', category: 'jewelry', description: 'Vibrant orange floral crochet earrings.' },
  { id: 'jewelry-7', name: 'Pastel Daisy Studs', price: 2000, image: '/images/earrings-daisy.jpg.jpg', category: 'jewelry', description: 'Small, elegant daisy-pattern earrings.' },
  { id: 'jewelry-8', name: 'Artisan Earring Collection', price: 2000, image: '/images/earrings-multi.jpg.jpg', category: 'jewelry', description: 'Handpicked geometric crochet earring sets.' },
  { id: 'acc-1', name: 'Cloud-Soft Headset Covers', price: 5000, image: '/images/headset-cover.jpg.jpg', category: 'jewelry', description: 'Fluffy crochet covers for your headphones.' },
  { id: 'acc-2', name: 'Ruffle Bottle Protector', price: 10000, image: '/images/bottle-cover.jpg.jpg', category: 'apparel', description: 'Elegant bottle sleeve with pearl accents.' },
  { id: 'acc-3', name: 'Tropical Fruit Keychains', price: 1500, image: '/images/keychain-fruit.jpg.jpg', category: 'jewelry', description: 'Cute fruit-shaped crochet key charms.' },
  { id: 'acc-4', name: 'Sweetheart Keychains', price: 1500, image: '/images/keychain-heart.jpg.jpg', category: 'jewelry', description: 'Pastel heart charms for bags or keys.' },
  { id: 'acc-5', name: 'Floral Satin Scrunchies', price: 2000, image: '/images/hair-ties.jpg.jpg', category: 'apparel', description: 'Hand-sewn scrunchies with floral accents.' },

  // --- HOME & NURSERY ---
  { id: 'home-1', name: 'Teddy Bear Motif Blanket', price: 25000, image: '/images/blanket-teddy.jpg.jpg', category: 'apparel', description: 'Cozy baby blanket with adorable bear faces.' },
  { id: 'home-3', name: 'Rosewood Striped Blanket', price: 25000, image: '/images/blanket-pink.jpg.jpg', category: 'apparel', description: 'Soft striped blanket in classic pink tones.' }
];

export const featuredKnits = products.filter(p => p.category === 'knitwear').slice(0, 4);
export const featuredJewelry = products.filter(p => p.category === 'jewelry').slice(0, 3);
