import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Star,
  ShieldCheck,
  Tag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  X,
  CreditCard,
  Wallet
} from 'lucide-react';
import { AstroProduct } from '../types';
import { useTranslation } from '../i18n/LanguageContext';

interface EcommerceModuleProps {
  walletBalance: number;
  onDeductBalance: (amount: number) => boolean;
}

const SAMPLE_PRODUCTS: AstroProduct[] = [
  {
    id: 'prod-1',
    name: 'Certified Natural Yellow Sapphire (Pukhraj - 4.25 Carats)',
    category: 'gemstone',
    price: 6499,
    originalPrice: 8999,
    rating: 4.96,
    reviewsCount: 340,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop&q=80',
    description: '100% Untreated Ceylon Yellow Sapphire with authentic lab certificate. Highly recommended for Jupiter blessings, wisdom, and marital bliss.',
    inStock: true,
    associatedPlanet: 'Jupiter',
    energized: true
  },
  {
    id: 'prod-2',
    name: 'Original 5 Mukhi Indonesian Rudraksha Mala (108+1 Beads)',
    category: 'rudraksha',
    price: 1299,
    originalPrice: 1999,
    rating: 4.91,
    reviewsCount: 820,
    imageUrl: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=300&auto=format&fit=crop&q=80',
    description: 'Energized with Lord Shiva Maha Mrityunjaya Vedic Beej Mantras. Brings inner tranquility, blood pressure balance, and spiritual focus.',
    inStock: true,
    associatedPlanet: 'Jupiter',
    energized: true
  },
  {
    id: 'prod-3',
    name: 'Authentic 24k Gold Plated Sampoorna Shree Yantra (6x6 inch)',
    category: 'yantra',
    price: 2499,
    originalPrice: 3499,
    rating: 4.95,
    reviewsCount: 512,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
    description: 'Precision sacred geometry framed on heavy copper with 24k gold leafing. Attracts Mahalakshmi wealth vibration and Vastu harmony.',
    inStock: true,
    energized: true
  },
  {
    id: 'prod-4',
    name: 'Certified Natural Emerald (Panna - 3.8 Carats)',
    category: 'gemstone',
    price: 4999,
    originalPrice: 6999,
    rating: 4.89,
    reviewsCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&auto=format&fit=crop&q=80',
    description: 'Lustrous Zambian Emerald for Mercury activation. Enhances intellectual quickness, commerce, communication, and educational success.',
    inStock: true,
    associatedPlanet: 'Mercury',
    energized: true
  },
  {
    id: 'prod-5',
    name: '7 Mukhi Nepali Rudraksha (Mahalakshmi Bead)',
    category: 'rudraksha',
    price: 1899,
    originalPrice: 2799,
    rating: 4.93,
    reviewsCount: 415,
    imageUrl: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=300&auto=format&fit=crop&q=80',
    description: 'Supreme bead for overcoming financial stagnation and pacifying Saturn. Certified lab tested with silver capping.',
    inStock: true,
    associatedPlanet: 'Venus & Saturn',
    energized: true
  },
  {
    id: 'prod-6',
    name: 'Organic Vedic Havan Samagri & Dhoop Cones (1 kg Set)',
    category: 'puja_samagri',
    price: 699,
    originalPrice: 999,
    rating: 4.88,
    reviewsCount: 190,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&auto=format&fit=crop&q=80',
    description: 'Handcrafted with 54 rare Ayurvedic herbs, Guggulu, Camphor, and Cow Ghee. Purifies home atmosphere and removes negative energies.',
    inStock: true,
    energized: false
  }
];

export const EcommerceModule: React.FC<EcommerceModuleProps> = ({
  walletBalance,
  onDeductBalance
}) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<Array<{ product: AstroProduct; quantity: number }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const addToCart = (product: AstroProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as Array<{ product: AstroProduct; quantity: number }>
    );
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'ASTRO50') {
      setAppliedDiscount(50);
    } else if (couponCode.toUpperCase() === 'VEDIC10') {
      setAppliedDiscount(10);
    } else {
      alert('Invalid coupon code. Try "ASTRO50" or "VEDIC10"!');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const total = subtotal - discountAmount;

  const handleCheckout = () => {
    if (walletBalance < total) {
      alert(`Insufficient wallet balance (₹${walletBalance}). Required: ₹${total}. Please add funds to wallet.`);
      return;
    }

    const success = onDeductBalance(total);
    if (success) {
      setOrderSuccess(true);
      setCart([]);
      setTimeout(() => {
        setOrderSuccess(false);
        setIsCartOpen(false);
      }, 3000);
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            Vedic Astro E-Store & Samagri
          </div>
          <h1 className="text-3xl font-extrabold font-cinzel text-amber-200">
            {t('astroShop')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            100% Certified, Lab Tested & Vedic-Energized Gemstones, Rudrakshas, Yantras & Rituals.
          </p>
        </div>

        {/* View Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-4 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 text-stone-950 rounded-2xl text-xs font-bold shadow-lg flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)})</span>
          {cart.length > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1" />
          )}
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'All Astro Products' },
          { id: 'gemstone', label: 'Certified Gemstones' },
          { id: 'rudraksha', label: 'Sacred Rudraksha' },
          { id: 'yantra', label: 'Energized Yantras' },
          { id: 'puja_samagri', label: 'Puja Samagri' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(prod => (
          <div
            key={prod.id}
            className="bg-stone-900/90 border border-amber-500/20 hover:border-amber-400/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between transition-all hover:scale-[1.01]"
          >
            <div>
              {/* Product Image & Badges */}
              <div className="relative aspect-video w-full bg-stone-950 overflow-hidden">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                {prod.energized && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] uppercase shadow-md">
                    ✨ Vedic Energized
                  </span>
                )}
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-stone-900/80 text-amber-300 font-bold text-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" /> {prod.rating}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-sm text-stone-100 font-cinzel line-clamp-2">
                  {prod.name}
                </h3>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {prod.associatedPlanet && (
                  <span className="inline-block text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Planet: {prod.associatedPlanet}
                  </span>
                )}
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="p-5 pt-0 border-t border-stone-800/80 flex items-center justify-between mt-2">
              <div>
                <span className="text-lg font-bold font-cinzel text-amber-300">
                  ₹{prod.price}
                </span>
                <span className="text-xs text-stone-500 line-through ml-2">
                  ₹{prod.originalPrice}
                </span>
              </div>

              <button
                onClick={() => addToCart(prod)}
                className="px-4 py-2 bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Cart Drawer / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95">
            
            {/* Cart Header */}
            <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex justify-between items-center text-stone-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base font-cinzel text-amber-200">Your Astro Cart</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-stone-400 hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {orderSuccess ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold font-cinzel text-emerald-300">Order Placed Successfully!</h4>
                  <p className="text-xs text-stone-300">Your sacred items will be energized and dispatched with tracker ID.</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  Your cart is currently empty. Explore our energized gemstones and rudraksha!
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex items-center justify-between p-3 bg-stone-800/60 rounded-2xl border border-stone-700/60 gap-3">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-stone-100 truncate">{item.product.name}</h4>
                      <span className="text-xs font-bold text-amber-300">₹{item.product.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-1 rounded-lg bg-stone-700 text-stone-200 hover:bg-stone-600"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-stone-100">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-1 rounded-lg bg-stone-700 text-stone-200 hover:bg-stone-600"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer Summary */}
            {cart.length > 0 && !orderSuccess && (
              <div className="p-6 bg-stone-950 border-t border-stone-800 space-y-4">
                {/* Coupon Code Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="Coupon Code (e.g. ASTRO50)"
                    className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs text-stone-100 uppercase focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold rounded-xl text-xs border border-stone-700"
                  >
                    Apply
                  </button>
                </form>

                <div className="space-y-1.5 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({appliedDiscount}%):</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-stone-100 pt-2 border-t border-stone-800">
                    <span>Total Payable:</span>
                    <span className="text-amber-300 font-cinzel">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 text-stone-950 font-bold rounded-2xl text-xs shadow-lg flex items-center justify-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Pay with Astro Wallet (₹{total})</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
