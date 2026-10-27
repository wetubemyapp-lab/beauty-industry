import { Product, SupplierPartner, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'skincare',
    name: 'Skincare',
    subtext: 'Professional Formulations',
    iconName: 'Sparkles',
    itemCount: 420,
    featuredImg: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'haircare',
    name: 'Haircare',
    subtext: 'Bulk Shampoos & Backbar Masks',
    iconName: 'Scissors',
    itemCount: 310,
    featuredImg: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'haircolor',
    name: 'Hair Color',
    subtext: 'Ammonia-Free Salon Color Kits',
    iconName: 'Palette',
    itemCount: 185,
    featuredImg: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'makeup',
    name: 'Makeup',
    subtext: 'HD Foundations & Pigments',
    iconName: 'Brush',
    itemCount: 540,
    featuredImg: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nails',
    name: 'Nails',
    subtext: 'UV Gel Polish & Nail Tech Kits',
    iconName: 'Hand',
    itemCount: 260,
    featuredImg: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'spa',
    name: 'Spa',
    subtext: 'Aromatherapy & Herbal Body Oils',
    iconName: 'Flower2',
    itemCount: 195,
    featuredImg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'massage',
    name: 'Massage',
    subtext: 'Herbal Deep Tissue Gels & Creams',
    iconName: 'HeartHandshake',
    itemCount: 140,
    featuredImg: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tattoo',
    name: 'Tattoo Studio',
    subtext: 'Stencil Transfer & Aftercare',
    iconName: 'PenTool',
    itemCount: 95,
    featuredImg: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'furniture',
    name: 'Salon Furniture',
    subtext: 'Hydraulic Styling Chairs & Beds',
    iconName: 'Armchair',
    itemCount: 110,
    featuredImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tools',
    name: 'Salon Tools & Eq.',
    subtext: 'Blow Dryers & Titanium Irons',
    iconName: 'Wrench',
    itemCount: 340,
    featuredImg: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'backbar',
    name: 'Backbar Essentials',
    subtext: 'Disposables, Towels & Capes',
    iconName: 'Package',
    itemCount: 190,
    featuredImg: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'aesthetic',
    name: 'Aesthetic Clinic Tools',
    subtext: 'Hydra Dermabrasion & Laser Tech',
    iconName: 'Sparkles',
    itemCount: 125,
    featuredImg: 'https://images.unsplash.com/photo-1512290900672-8a25e2d6f28e?auto=format&fit=crop&q=80&w=800'
  }
];

export const SUPPLIERS: SupplierPartner[] = [
  {
    id: 'aura-beauty',
    initials: 'AB',
    name: 'Aura Beauty India',
    type: 'Manufacturer',
    businessTypeDetail: 'Manufacturer & Wholesaler',
    location: 'Mumbai',
    region: 'Mumbai',
    verified: true,
    isFree: false,
    tags: ['Haircare', 'Skincare', 'Organic Formulations'],
    rating: 4.9,
    reviewsCount: 124,
    productCount: 142,
    responseRate: '99% within 1h',
    minOrderValue: 25000,
    description: 'Premium manufacturer of salon-grade haircare and skincare products. Partnering with top luxury salons across the subcontinent. We specialize in organic formulations and sustainable packaging.',
    email: 'orders@aurabeautycorp.in',
    phone: '+91 22 6842 9900',
    whatsapp: '+919820012345',
    establishedYear: 2010,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK-1tyXdcZhq03-TknCZ3gj6usizy9FmYBWyXQZlEScGfVq8T_ErDPFErYxAkuiVtq1xmegqXRtquzvh_V0hgWSBFfHqkJEGEyePtXBmhFZ6NgHonkxGvxrYSpwS5NYPGs6yOR7iHtUhmsMalVUgxHJ4wqzY_LJBzIQYY0Dw-t7B46Jglat6owcHZ9QLSSfrM8ImMQbj_n3TvkV5O37biJ2dDtkDu9PgLKS34ZsO28OndThcLh2dUo',
    sampleImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNZWlxo1GE3RfXkL38ez9qU0PUaR7lM3gFLgHj5X30C7AnefXJPRYe2XMQqGRC7kE4z1Ktw4Jz9S_xpPzIMskSLPI-FbsfkH_mUOuZZidEIttsWlQ0Coo_R_tTmGPebKfznKeY_IPlVFQ16VrVlkTKasvjuTQY8Jd6Bq0yu2WpICmzZWm8IeXqxKd0DFZWWWVDR-trwOaAQD98vBxOIhHXcEUtC_R0Amcxb44DE-fqXreE85PhKhjK',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDnJB1h3l7QdG5inXNig2zQ_SNPj47UYUQuqySdluwxz_WqsOistnvQgDWWr3KGPj9W88GD4v4WsKhV2my9Jjy_HBdVevJqKf2wnkEYAriuiq3-SgtrzyleSHjA348ir1OZ8UydadWzsQs41aVeB2R8L4xXTjgtlv1pj7JY-dILg8my7KJaI8GQXw6frw3-h0vYuO9uFdSdR1y92b_ujj1iMWbHUtBgy_O8AKm7I1eHK42mxiWySf5T'
    ]
  },
  {
    id: 'luxe-color-dist',
    initials: 'BB',
    name: 'Bharat Backbar Wholesalers',
    type: 'Distributor',
    businessTypeDetail: 'Regional Distributor',
    location: 'Delhi',
    region: 'Delhi',
    verified: false,
    isFree: true,
    tags: ['Hair Color', 'Equipment', 'Salon Tools'],
    rating: 4.6,
    reviewsCount: 89,
    productCount: 78,
    responseRate: '94% within 4h',
    minOrderValue: 15000,
    description: 'Exclusive regional distributor for premium hair color brands and professional styling equipment. Next-day delivery available across North India.',
    email: 'contact@bharatbackbar.in',
    phone: '+91 11 4155 8820',
    whatsapp: '+919811098765',
    establishedYear: 2015,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnJB1h3l7QdG5inXNig2zQ_SNPj47UYUQuqySdluwxz_WqsOistnvQgDWWr3KGPj9W88GD4v4WsKhV2my9Jjy_HBdVevJqKf2wnkEYAriuiq3-SgtrzyleSHjA348ir1OZ8UydadWzsQs41aVeB2R8L4xXTjgtlv1pj7JY-dILg8my7KJaI8GQXw6frw3-h0vYuO9uFdSdR1y92b_ujj1iMWbHUtBgy_O8AKm7I1eHK42mxiWySf5T',
    sampleImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbJYm_SslFIku_82qLmRuk2k5zRvHZT8jce4mbMPDB-6-eB2ZZADEa8Z3fGAio0r-DI21vhJ1Mr_sndv1k6s18xexTuSiABEazFXa5yyXvh2nw9_0WqY-Z2BhWQ4LqO9JaZFxU8ERfPENI3Ajv5Cqh2UvAhHiDrKTp-qpqKryod_fnKK0f7bs2W8BMyOH87d0FN0e1IrvDAtynBYt3sUh2OSA8GMJ7ILRVo-517al6IOaan8oAJINt',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfreDlJ-MCj8fxVa3-PVT_YUiuBzlJRN5KNdyZlHZOXW3AmSHzgvWBqTbw3h-HssFukxf6rkndCzlkk0h5o6lmU6qr52z0r-W2Z_p3EdRT9dhis9nxhiCboXqJFw1krftGK-fWhAw5vidF0WEItAU16yUPhOArPd8ANmOcQhyw0LFCLaFzssHKPwIrBQyl6JbKPrqG3Gh2SQNNu5KT6VclKd4OG4KjqONnQ1hq1Bd3lk9pQxJlGdfa'
    ]
  },
  {
    id: 'kavya-botanicals',
    initials: 'K',
    name: 'Kavya Ayurvedic Botanicals',
    type: 'Manufacturer',
    businessTypeDetail: 'Company / Manufacturer',
    location: 'Bengaluru',
    region: 'Bengaluru',
    verified: true,
    isFree: false,
    tags: ['Spa', 'Massage', 'Skincare', 'Ayurvedic'],
    rating: 4.95,
    reviewsCount: 160,
    productCount: 95,
    responseRate: '100% within 30m',
    minOrderValue: 20000,
    description: 'AYUSH-certified organic formulation lab delivering therapeutic herbal oils, saffron facial polishes, and backbar spa concentrates across pan-India luxury hotels.',
    email: 'b2b@kavyabotanicals.com',
    phone: '+91 80 4920 1144',
    whatsapp: '+919845012345',
    establishedYear: 2014,
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    sampleImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACGmKxH3sKXQzfZ0ok5I09A_2UZ5Lk-zeaa_4Xt6mSPDZDL1IIZA2tVmblc0QziC47pQfp-5Wk6BBt42duT67QeBqYZkN6UH6HkVEU1iqTWHgMbCSUnsvb1PvD9o6hW_C1ySvLZ_q-7F2xmSh4Hn7gBVNzLuNTcqufs4ML63tl-Ng1UqB9kTB8g3uuBZvYf2yAOh8efzkvt74XQrLNEMOurN9E_4tW-0W_K5wpWHASxqrA6QQOfNH1',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    id: 'vertex-salon-tech',
    initials: 'V',
    name: 'Vertex Salon Technologies',
    type: 'Distributor',
    businessTypeDetail: 'Importer & Wholesaler',
    location: 'Kolkata',
    region: 'Kolkata',
    verified: true,
    isFree: false,
    tags: ['Salon Tools', 'Furniture', 'Equipment'],
    rating: 4.8,
    reviewsCount: 102,
    productCount: 110,
    responseRate: '97% within 2h',
    minOrderValue: 35000,
    description: 'Direct importer and pan-India distributor of high-end hydraulic styling chairs, micro-mist steamers, and diode laser backbar equipment with on-site warranty support.',
    email: 'sales@vertexsalontech.in',
    phone: '+91 40 2330 7711',
    whatsapp: '+919849012345',
    establishedYear: 2011,
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    sampleImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbJYm_SslFIku_82qLmRuk2k5zRvHZT8jce4mbMPDB-6-eB2ZZADEa8Z3fGAio0r-DI21vhJ1Mr_sndv1k6s18xexTuSiABEazFXa5yyXvh2nw9_0WqY-Z2BhWQ4LqO9JaZFxU8ERfPENI3Ajv5Cqh2UvAhHiDrKTp-qpqKryod_fnKK0f7bs2W8BMyOH87d0FN0e1IrvDAtynBYt3sUh2OSA8GMJ7ILRVo-517al6IOaan8oAJINt',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNZWlxo1GE3RfXkL38ez9qU0PUaR7lM3gFLgHj5X30C7AnefXJPRYe2XMQqGRC7kE4z1Ktw4Jz9S_xpPzIMskSLPI-FbsfkH_mUOuZZidEIttsWlQ0Coo_R_tTmGPebKfznKeY_IPlVFQ16VrVlkTKasvjuTQY8Jd6Bq0yu2WpICmzZWm8IeXqxKd0DFZWWWVDR-trwOaAQD98vBxOIhHXcEUtC_R0Amcxb44DE-fqXreE85PhKhjK'
    ]
  },
  {
    id: 'le-dist',
    initials: 'MB',
    name: 'Mumbai Beauty Imports',
    type: 'Wholesaler',
    businessTypeDetail: 'Wholesaler & Importer',
    location: 'Mumbai',
    region: 'Mumbai',
    verified: true,
    isFree: false,
    tags: ['Haircare', 'Skincare', 'Tools'],
    rating: 4.9,
    reviewsCount: 148,
    productCount: 86,
    responseRate: '98% within 2h',
    minOrderValue: 20000,
    description: 'Premier Indian importer of salon-grade professional treatments and patented ionic styling gear from international formulation houses.',
    email: 'wholesale@mumbaibeauty.in',
    phone: '+91 22 2490 5500',
    whatsapp: '+919822055000',
    establishedYear: 2012,
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
    sampleImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbJYm_SslFIku_82qLmRuk2k5zRvHZT8jce4mbMPDB-6-eB2ZZADEa8Z3fGAio0r-DI21vhJ1Mr_sndv1k6s18xexTuSiABEazFXa5yyXvh2nw9_0WqY-Z2BhWQ4LqO9JaZFxU8ERfPENI3Ajv5Cqh2UvAhHiDrKTp-qpqKryod_fnKK0f7bs2W8BMyOH87d0FN0e1IrvDAtynBYt3sUh2OSA8GMJ7ILRVo-517al6IOaan8oAJINt',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfreDlJ-MCj8fxVa3-PVT_YUiuBzlJRN5KNdyZlHZOXW3AmSHzgvWBqTbw3h-HssFukxf6rkndCzlkk0h5o6lmU6qr52z0r-W2Z_p3EdRT9dhis9nxhiCboXqJFw1krftGK-fWhAw5vidF0WEItAU16yUPhOArPd8ANmOcQhyw0LFCLaFzssHKPwIrBQyl6JbKPrqG3Gh2SQNNu5KT6VclKd4OG4KjqONnQ1hq1Bd3lk9pQxJlGdfa'
    ]
  },
  {
    id: 'gg-supply',
    initials: 'RG',
    name: 'Royal Glamour India Supplies',
    type: 'Manufacturer',
    businessTypeDetail: 'Company / Manufacturer',
    location: 'Pune',
    region: 'Pune',
    verified: true,
    isFree: false,
    tags: ['Makeup', 'Nails'],
    rating: 4.8,
    reviewsCount: 212,
    productCount: 145,
    responseRate: '99% within 1h',
    minOrderValue: 40000,
    description: 'ISO-certified beauty lab manufacturing high-potency active peptides, medical-grade lash kits, and rich pigments for high-volume salons.',
    email: 'orders@royalglamour.in',
    phone: '+91 522 555 0199',
    whatsapp: '+919912345678',
    establishedYear: 2008,
    coverImage: 'https://images.unsplash.com/photo-1512290900672-1f02e71edcf8?auto=format&fit=crop&w=1000&q=80',
    sampleImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfreDlJ-MCj8fxVa3-PVT_YUiuBzlJRN5KNdyZlHZOXW3AmSHzgvWBqTbw3h-HssFukxf6rkndCzlkk0h5o6lmU6qr52z0r-W2Z_p3EdRT9dhis9nxhiCboXqJFw1krftGK-fWhAw5vidF0WEItAU16yUPhOArPd8ANmOcQhyw0LFCLaFzssHKPwIrBQyl6JbKPrqG3Gh2SQNNu5KT6VclKd4OG4KjqONnQ1hq1Bd3lk9pQxJlGdfa',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNZWlxo1GE3RfXkL38ez9qU0PUaR7lM3gFLgHj5X30C7AnefXJPRYe2XMQqGRC7kE4z1Ktw4Jz9S_xpPzIMskSLPI-FbsfkH_mUOuZZidEIttsWlQ0Coo_R_tTmGPebKfznKeY_IPlVFQ16VrVlkTKasvjuTQY8Jd6Bq0yu2WpICmzZWm8IeXqxKd0DFZWWWVDR-trwOaAQD98vBxOIhHXcEUtC_R0Amcxb44DE-fqXreE85PhKhjK'
    ]
  },
  {
    id: 'pb-imports',
    initials: 'SI',
    name: 'South India Salon Depot',
    type: 'Distributor',
    businessTypeDetail: 'Importer & Distributor',
    location: 'Chennai',
    region: 'Chennai',
    verified: false,
    isFree: true,
    tags: ['Spa Equipment', 'Wellness'],
    rating: 4.6,
    reviewsCount: 79,
    productCount: 52,
    responseRate: '92% within 6h',
    minOrderValue: 15000,
    description: 'Direct importer of organic therapeutic clays, wellness spa stones, and hydrotherapy backbar equipment.',
    email: 'contact@southindiadepot.in',
    phone: '+91 44 2815 0912',
    whatsapp: '+919844098765',
    establishedYear: 2017,
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    sampleImages: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACGmKxH3sKXQzfZ0ok5I09A_2UZ5Lk-zeaa_4Xt6mSPDZDL1IIZA2tVmblc0QziC47pQfp-5Wk6BBt42duT67QeBqYZkN6UH6HkVEU1iqTWHgMbCSUnsvb1PvD9o6hW_C1ySvLZ_q-7F2xmSh4Hn7gBVNzLuNTcqufs4ML63tl-Ng1UqB9kTB8g3uuBZvYf2yAOh8efzkvt74XQrLNEMOurN9E_4tW-0W_K5wpWHASxqrA6QQOfNH1'
    ]
  },
  {
    id: 'mc-milano',
    initials: 'SR',
    name: 'Shree Ram Beauty Supplies',
    type: 'Manufacturer',
    businessTypeDetail: 'Company / Manufacturer',
    location: 'Jaipur',
    region: 'Jaipur',
    verified: true,
    isFree: false,
    tags: ['Hair Color', 'Skincare'],
    rating: 5.0,
    reviewsCount: 94,
    productCount: 68,
    responseRate: '100% within 1h',
    minOrderValue: 25000,
    description: 'Vast manufacturing house based in Gujarat, specializing in professional hair color systems, micro-pigments, and bio-fermented skincare solutions.',
    email: 'wholesale@shreerambeauty.in',
    phone: '+91 79 2658 4410',
    whatsapp: '+919925012345',
    establishedYear: 2015,
    coverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    sampleImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACGmKxH3sKXQzfZ0ok5I09A_2UZ5Lk-zeaa_4Xt6mSPDZDL1IIZA2tVmblc0QziC47pQfp-5Wk6BBt42duT67QeBqYZkN6UH6HkVEU1iqTWHgMbCSUnsvb1PvD9o6hW_C1ySvLZ_q-7F2xmSh4Hn7gBVNzLuNTcqufs4ML63tl-Ng1UqB9kTB8g3uuBZvYf2yAOh8efzkvt74XQrLNEMOurN9E_4tW-0W_K5wpWHASxqrA6QQOfNH1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNZWlxo1GE3RfXkL38ez9qU0PUaR7lM3gFLgHj5X30C7AnefXJPRYe2XMQqGRC7kE4z1Ktw4Jz9S_xpPzIMskSLPI-FbsfkH_mUOuZZidEIttsWlQ0Coo_R_tTmGPebKfznKeY_IPlVFQ16VrVlkTKasvjuTQY8Jd6Bq0yu2WpICmzZWm8IeXqxKd0DFZWWWVDR-trwOaAQD98vBxOIhHXcEUtC_R0Amcxb44DE-fqXreE85PhKhjK'
    ]
  },
  {
    id: 'td-dubai',
    initials: 'JH',
    name: 'Jaipur Luxury Beauty Hub',
    type: 'Wholesaler',
    businessTypeDetail: 'Wholesaler & Importer',
    location: 'Jaipur',
    region: 'Jaipur',
    verified: true,
    isFree: false,
    tags: ['Spa', 'Massage', 'Furniture'],
    rating: 4.9,
    reviewsCount: 116,
    productCount: 42,
    responseRate: '97% within 3h',
    minOrderValue: 30000,
    description: 'Bespoke wellness equipment, ayurvedic copper elements, and luxury massage beds designed specifically for premium Indian spas and aesthetic clinics.',
    email: 'info@jaipurbeautyhub.in',
    phone: '+91 141 382 9100',
    whatsapp: '+919829012345',
    establishedYear: 2016,
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    sampleImages: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbJYm_SslFIku_82qLmRuk2k5zRvHZT8jce4mbMPDB-6-eB2ZZADEa8Z3fGAio0r-DI21vhJ1Mr_sndv1k6s18xexTuSiABEazFXa5yyXvh2nw9_0WqY-Z2BhWQ4LqO9JaZFxU8ERfPENI3Ajv5Cqh2UvAhHiDrKTp-qpqKryod_fnKK0f7bs2W8BMyOH87d0FN0e1IrvDAtynBYt3sUh2OSA8GMJ7ILRVo-517al6IOaan8oAJINt'
    ]
  }
];

export const PRODUCTS: Product[] = [
  // 1. Skincare
  {
    id: 'prod-skincare-serum-ha',
    name: 'Hyaluronic Acid Hydrating Backbar Serum',
    brand: 'NEXORA LABS INDIA',
    category: 'skincare',
    categoryLabel: 'Skincare',
    tag: 'Skincare',
    isVerified: true,
    isWholesale: true,
    price: 1450,
    unit: 'bottle (100ml)',
    moq: 10,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608248597358-752ba75fa05c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'High-potency triple molecular weight hyaluronic acid serum formulated specifically for Indian salon and aesthetic clinic backbar facial protocols. Penetrates deep dermal layers for immediate barrier plumping and 48-hour moisture retention.',
    specifications: {
      'Active Ingredients': 'Triple HA Complex (2%), D-Panthenol (1%), Allantoin',
      'Volume': '100ml / 3.4 fl. oz. Backbar Pump',
      'Skin Type': 'All Skin Types, Post-Facial, Dehydrated',
      'Formulation': 'Ayurvedic Botanical Infusion, Fragrance-Free, Vegan'
    },
    leadTimeDays: 2,
    certifications: ['Ayush Approved', 'GMP Certified', 'Cruelty-Free', 'ISO 22716'],
    supplierId: 'aura-beauty',
    supplierName: 'Aura Beauty India',
    supplierLocation: 'Mumbai',
    rating: 4.9,
    reviewsCount: 112,
    wholesaleTiers: [
      { minUnits: 10, pricePerUnit: 1450 },
      { minUnits: 25, pricePerUnit: 1320 },
      { minUnits: 50, pricePerUnit: 1180 },
      { minUnits: 100, pricePerUnit: 990 }
    ]
  },
  {
    id: 'prod-peptide-cream',
    name: 'Peptide Rich Formula Cream',
    brand: 'DERMAGLOW INDIA',
    category: 'skincare',
    categoryLabel: 'Skincare',
    tag: 'Skincare',
    isVerified: true,
    isWholesale: true,
    price: 2450,
    unit: 'unit (50g)',
    moq: 15,
    stockStatus: 'In Stock',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfreDlJ-MCj8fxVa3-PVT_YUiuBzlJRN5KNdyZlHZOXW3AmSHzgvWBqTbw3h-HssFukxf6rkndCzlkk0h5o6lmU6qr52z0r-W2Z_p3EdRT9dhis9nxhiCboXqJFw1krftGK-fWhAw5vidF0WEItAU16yUPhOArPd8ANmOcQhyw0LFCLaFzssHKPwIrBQyl6JbKPrqG3Gh2SQNNu5KT6VclKd4OG4KjqONnQ1hq1Bd3lk9pQxJlGdfa',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfreDlJ-MCj8fxVa3-PVT_YUiuBzlJRN5KNdyZlHZOXW3AmSHzgvWBqTbw3h-HssFukxf6rkndCzlkk0h5o6lmU6qr52z0r-W2Z_p3EdRT9dhis9nxhiCboXqJFw1krftGK-fWhAw5vidF0WEItAU16yUPhOArPd8ANmOcQhyw0LFCLaFzssHKPwIrBQyl6JbKPrqG3Gh2SQNNu5KT6VclKd4OG4KjqONnQ1hq1Bd3lk9pQxJlGdfa',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Clinical grade anti-aging peptide concentrate with 6 bioactive oligopeptides, micro-encapsulated niacinamide, and marine collagen.',
    specifications: {
      'Volume': '50ml / 1.7 fl. oz.',
      'Active Ingredients': 'Hexapeptide-8, Matrixyl 3000, 5% Niacinamide',
      'Skin Type': 'Mature, Sensitive, Post-Laser'
    },
    leadTimeDays: 3,
    certifications: ['GMP Certified', 'FDA Approved Facility', 'Cruelty-Free'],
    supplierId: 'gg-supply',
    supplierName: 'Royal Glamour India Supplies',
    supplierLocation: 'Pune',
    rating: 4.9,
    reviewsCount: 128,
    wholesaleTiers: [
      { minUnits: 15, pricePerUnit: 2450 },
      { minUnits: 50, pricePerUnit: 2100 },
      { minUnits: 100, pricePerUnit: 1750 }
    ]
  },

  // 2. Haircare
  {
    id: 'prod-haircare-shampoo-5l',
    name: 'Keratin Infused Repair Shampoo 5L Bulk Container',
    brand: 'BOTANICA PROFESSIONAL',
    category: 'haircare',
    categoryLabel: 'Haircare',
    tag: 'Haircare',
    isVerified: true,
    isWholesale: true,
    price: 2200,
    unit: 'can (5 Litres)',
    moq: 5,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Salon backbar 5-litre bulk dispenser shampoo enriched with hydrolyzed wheat protein, keratin amino acids, and bhringraj extract. Specially balanced pH 5.5 prevents color stripping and restores chemically treated hair cuticle.',
    specifications: {
      'Volume': '5000ml (5 Litres) with Heavy-Duty Backbar Pump',
      'Key Actives': 'Hydrolyzed Keratin, Argan Oil, Bhringraj Root',
      'Sulfate Free': 'Low-Foam Eco Mild Surfactants',
      'Applications': 'Approx. 250+ Salon Washes per Can'
    },
    leadTimeDays: 3,
    certifications: ['GMP Certified', 'ISO 9001:2015', 'Paraben-Free'],
    supplierId: 'aura-beauty',
    supplierName: 'Aura Beauty India',
    supplierLocation: 'Mumbai',
    rating: 4.8,
    reviewsCount: 86,
    wholesaleTiers: [
      { minUnits: 5, pricePerUnit: 2200 },
      { minUnits: 15, pricePerUnit: 1980 },
      { minUnits: 30, pricePerUnit: 1750 }
    ]
  },

  // 3. Hair Color
  {
    id: 'prod-haircolor-cream-kit',
    name: 'Professional Ammonia-Free Salon Hair Color Cream Kit',
    brand: 'CHROMA VITA INDIA',
    category: 'haircolor',
    categoryLabel: 'Hair Color',
    tag: 'Hair Color',
    isVerified: true,
    isWholesale: true,
    price: 480,
    unit: 'kit (100ml tube + developer)',
    moq: 20,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '100% grey coverage zero-ammonia professional cream color infused with cold-pressed mustard & almond oil micro-lipids. High pigment retention for vibrant salon color lasting up to 35 washes without hair dryness.',
    specifications: {
      'Shades Available': '48 Intermixable Indian Skin Tone Nuances',
      'Formula': '0.0% Ammonia, Odorless Conditioning Cream',
      'Size': '100ml Aluminum Tube + 100ml Stabilized Developer',
      'Processing Time': '25-35 minutes'
    },
    leadTimeDays: 2,
    certifications: ['BIS Compliant', 'Dermatologically Tested', 'No PPD'],
    supplierId: 'mc-milano',
    supplierName: 'Shree Ram Beauty Supplies',
    supplierLocation: 'Jaipur',
    rating: 4.9,
    reviewsCount: 145,
    wholesaleTiers: [
      { minUnits: 20, pricePerUnit: 480 },
      { minUnits: 50, pricePerUnit: 420 },
      { minUnits: 100, pricePerUnit: 360 }
    ]
  },

  // 4. Makeup
  {
    id: 'prod-makeup-liquid-foundation',
    name: 'Matte Finish Waterproof Liquid Foundation Bulk Pack',
    brand: 'GLAMART PRO INDIA',
    category: 'makeup',
    categoryLabel: 'Makeup',
    tag: 'Makeup',
    isVerified: true,
    isWholesale: true,
    price: 650,
    unit: 'pack (6x30ml shades)',
    moq: 15,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Bridal and bridal-party grade HD liquid foundation with 18-hour sweatproof wear. Tailored for warm, olive, and golden undertones with oil-absorbing silica beads and SPF 25 PA++ protection.',
    specifications: {
      'Coverage': 'Medium to Full Buildable Velvet Matte',
      'Finish': 'Photo-Ready Non-Flashback HD',
      'Formulation': 'Non-Comedogenic, Transfer-Proof',
      'Pack Size': '6 Assorted Bottles (30ml each)'
    },
    leadTimeDays: 4,
    certifications: ['FDA Approved', 'Cruelty-Free', 'ISO 22716'],
    supplierId: 'gg-supply',
    supplierName: 'Royal Glamour India Supplies',
    supplierLocation: 'Pune',
    rating: 4.7,
    reviewsCount: 68,
    wholesaleTiers: [
      { minUnits: 15, pricePerUnit: 650 },
      { minUnits: 40, pricePerUnit: 580 },
      { minUnits: 100, pricePerUnit: 490 }
    ]
  },

  // 5. Nails
  {
    id: 'prod-nails-uv-gel-kit',
    name: 'UV Gel Nail Polish 36-Color Salon Master Kit',
    brand: 'VELVET NAIL LABS',
    category: 'nails',
    categoryLabel: 'Nails',
    tag: 'Nails',
    isVerified: true,
    isWholesale: true,
    price: 3800,
    unit: 'kit (36 bottles + Base & Top)',
    moq: 2,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Complete nail tech salon starter master collection including 36 high-pigment gel shades, 2 Rubber Base Coats, 2 No-Wipe Diamond Top Coats, and 1 Matte Top Coat. Chip-free 4-week durability under UV/LED lamps.',
    specifications: {
      'Bottle Volume': '15ml / bottle (36 colors + 5 finishing bottles)',
      'Cure Time': '60s LED / 120s UV',
      'Toxicity Standard': '9-Free Non-Toxic Formulation',
      'Durability': 'Up to 28 Days High Gloss'
    },
    leadTimeDays: 3,
    certifications: ['CE Certified', 'MSDS Verified', 'Vegan & Cruelty Free'],
    supplierId: 'gg-supply',
    supplierName: 'Royal Glamour India Supplies',
    supplierLocation: 'Pune',
    rating: 4.9,
    reviewsCount: 54,
    wholesaleTiers: [
      { minUnits: 2, pricePerUnit: 3800 },
      { minUnits: 5, pricePerUnit: 3400 },
      { minUnits: 10, pricePerUnit: 2990 }
    ]
  },

  // 6. Spa
  {
    id: 'prod-spa-body-oils-set',
    name: 'Botanical Aromatherapy Massage & Body Oils Set',
    brand: 'KAVYA AYURVEDIC BOTANICALS',
    category: 'spa',
    categoryLabel: 'Spa',
    tag: 'Spa',
    isVerified: true,
    isWholesale: true,
    price: 1250,
    unit: 'set (4x500ml blends)',
    moq: 8,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Cold-pressed authentic Ayurvedic spa body oil assortment: Sandalwood Calm, Lemongrass Detox, Rose Glow, and Eucalyptus Muscle Relief. Formulated with pure sesame and sweet almond carrier oil base for luxury wellness resorts.',
    specifications: {
      'Kit Contents': '4 x 500ml Amber Dispenser Bottles',
      'Key Extracts': 'Mysore Sandalwood, Kashmiri Rose, Nilgiri Eucalyptus',
      'Base Oil': '100% Pure Cold-Pressed Virgin Sesame & Almond',
      'Texture': 'Non-Sticky High Glide Professional Absorption'
    },
    leadTimeDays: 2,
    certifications: ['Ayush Ministry Certified', 'GMP Eco-Cert', '100% Natural'],
    supplierId: 'kavya-botanicals',
    supplierName: 'Kavya Ayurvedic Botanicals',
    supplierLocation: 'Bengaluru',
    rating: 5.0,
    reviewsCount: 97,
    wholesaleTiers: [
      { minUnits: 8, pricePerUnit: 1250 },
      { minUnits: 20, pricePerUnit: 1080 },
      { minUnits: 50, pricePerUnit: 920 }
    ]
  },

  // 7. Massage
  {
    id: 'prod-massage-herbal-gel-2kg',
    name: 'Professional Deep Tissue Herbal Massage Gel 2Kg',
    brand: 'VEDA MASSAGE LAB',
    category: 'massage',
    categoryLabel: 'Massage',
    tag: 'Massage',
    isVerified: true,
    isWholesale: true,
    price: 980,
    unit: 'tub (2 Kg Bulk Jar)',
    moq: 10,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Cooling-warming dual action deep tissue massage gel formulated with wintergreen oil, camphor, ashwagandha, and menthol crystals for sports massage clinics, luxury spas, and wellness centers.',
    specifications: {
      'Net Weight': '2000 grams (2 Kg) Backbar Tub',
      'Actives': 'Wintergreen (Gandhapura), Ashwagandha, Menthol Crystals',
      'Water-Soluble': 'Easily wiped with warm towel without grease marks',
      'Shelf Life': '24 Months'
    },
    leadTimeDays: 3,
    certifications: ['Ayush Approved', 'GMP Certified', 'Paraben Free'],
    supplierId: 'kavya-botanicals',
    supplierName: 'Kavya Ayurvedic Botanicals',
    supplierLocation: 'Bengaluru',
    rating: 4.8,
    reviewsCount: 42,
    wholesaleTiers: [
      { minUnits: 10, pricePerUnit: 980 },
      { minUnits: 25, pricePerUnit: 860 },
      { minUnits: 50, pricePerUnit: 740 }
    ]
  },

  // 8. Tattoo Studio
  {
    id: 'prod-tattoo-transfer-bundle',
    name: 'Stencil Transfer Solution & Aftercare Cream Bundle',
    brand: 'INKSHIELD PRO',
    category: 'tattoo',
    categoryLabel: 'Tattoo Studio',
    tag: 'Tattoo Studio',
    isVerified: true,
    isWholesale: true,
    price: 1150,
    unit: 'bundle (250ml Stencil Gel + 12 Aftercare Tins)',
    moq: 10,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Professional tattoo studio prep and aftercare combo. Lock-in stencil transfer gel yields crisp, smudge-proof lines for up to 8 hours of needlework. Includes 12 herbal calendula-panthenol healing balms.',
    specifications: {
      'Stencil Gel': '250ml Precision Pump Bottle',
      'Aftercare Balms': '12 x 30g Aluminum Pocket Tins',
      'Key Ingredients': 'Organic Calendula Extract, D-Panthenol, Shea Butter',
      'Safety': '100% Petroleum-Free, Hypoallergenic'
    },
    leadTimeDays: 2,
    certifications: ['Dermatologist Tested', 'Vegan Certified', 'ISO 9001'],
    supplierId: 'luxe-color-dist',
    supplierName: 'Bharat Backbar Wholesalers',
    supplierLocation: 'Delhi',
    rating: 4.9,
    reviewsCount: 39,
    wholesaleTiers: [
      { minUnits: 10, pricePerUnit: 1150 },
      { minUnits: 25, pricePerUnit: 990 },
      { minUnits: 50, pricePerUnit: 850 }
    ]
  },

  // 9. Salon Furniture
  {
    id: 'prod-furniture-hydraulic-chair',
    name: 'Hydraulic Reclining Salon & Styling Chair',
    brand: 'VERTEX SALON TECH',
    category: 'furniture',
    categoryLabel: 'Salon Furniture',
    tag: 'Salon Furniture',
    isVerified: true,
    isWholesale: true,
    price: 14500,
    unit: 'unit',
    moq: 1,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Commercial heavy-duty hydraulic styling chair with 360-degree rotation, lockable swivel mechanism, and 160-degree recline for hair styling, shaving, and threading.',
    specifications: {
      'Pump': 'Heavy-Duty Cast Iron Chrome Hydraulic Base',
      'Weight Capacity': '220 kg Tested Loading',
      'Upholstery': 'High-Density Molded Foam with Spill-Proof Matte PU Leather',
      'Warranty': '3 Years Onsite Mechanical Hydraulic Warranty'
    },
    leadTimeDays: 5,
    certifications: ['BIS Approved', 'ISO 9001:2015 Commercial Standard'],
    supplierId: 'vertex-salon',
    supplierName: 'Vertex Salon Technologies',
    supplierLocation: 'Kolkata',
    rating: 4.8,
    reviewsCount: 47,
    wholesaleTiers: [
      { minUnits: 1, pricePerUnit: 14500 },
      { minUnits: 3, pricePerUnit: 13200 },
      { minUnits: 6, pricePerUnit: 11900 }
    ]
  },

  // 10. Salon Tools & Eq.
  {
    id: 'prod-tools-hair-dryer-2400w',
    name: 'Professional High-Velocity Salon Hair Dryer 2400W',
    brand: 'AEROPRO INDIA',
    category: 'tools',
    categoryLabel: 'Salon Tools & Eq.',
    tag: 'Salon Tools',
    isVerified: true,
    isWholesale: true,
    price: 3200,
    unit: 'unit',
    moq: 4,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Salon-grade 2400W AC motor blow dryer delivering 110 km/h air velocity. Built-in blue tourmaline ionic generator cuts blowout drying time by 50% while sealing cuticle shine.',
    specifications: {
      'Motor': 'Long-Life 2400W Italian-Spec Commercial AC Motor',
      'Heat/Speed': '3 Heat Levels + 2 Speed Modes + Cold Shot Lock',
      'Cable Length': '3.2m Salon Swivel Cord with Indian 3-Pin Plug',
      'Accessories': '2 Magnetic Concentrator Nozzles + 1 Deep Diffuser'
    },
    leadTimeDays: 2,
    certifications: ['BIS Certified', 'CE Approved', 'RoHS Compliance'],
    supplierId: 'le-dist',
    supplierName: 'Mumbai Beauty Imports',
    supplierLocation: 'Mumbai',
    rating: 4.9,
    reviewsCount: 78,
    wholesaleTiers: [
      { minUnits: 4, pricePerUnit: 3200 },
      { minUnits: 10, pricePerUnit: 2850 },
      { minUnits: 25, pricePerUnit: 2450 }
    ]
  },

  // 11. Backbar Essentials
  {
    id: 'prod-backbar-aprons-towels',
    name: 'Disposable Salon Aprons & Towels Pack',
    brand: 'BHARAT BACKBAR ESSENTIALS',
    category: 'backbar',
    categoryLabel: 'Backbar Essentials',
    tag: 'Backbar',
    isVerified: true,
    isWholesale: true,
    price: 450,
    unit: 'pack (100 aprons + 50 non-woven towels)',
    moq: 25,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'High-density waterproof disposable salon client capes & ultra-absorbent embossed non-woven hair wash towels. 100% hygienic, anti-tear, and eco-degradable for premium salon standards.',
    specifications: {
      'Pack Contents': '100 Transparent PE Client Aprons + 50 Embossed Salon Towels',
      'Towels Size': '40cm x 80cm High Absorbency (70 GSM)',
      'Apron Size': '120cm x 150cm Full Body Protection',
      'Biodegradable': 'Eco-Friendly Plant Fiber Compostable'
    },
    leadTimeDays: 1,
    certifications: ['ISO 14001', 'Hygienic Grade Verified'],
    supplierId: 'luxe-color-dist',
    supplierName: 'Bharat Backbar Wholesalers',
    supplierLocation: 'Delhi',
    rating: 4.8,
    reviewsCount: 160,
    wholesaleTiers: [
      { minUnits: 25, pricePerUnit: 450 },
      { minUnits: 50, pricePerUnit: 390 },
      { minUnits: 100, pricePerUnit: 320 }
    ]
  },

  // 12. Aesthetic Clinic Tools
  {
    id: 'prod-aesthetic-hydra-machine',
    name: 'Multi-Head Hydra Dermabrasion & Facial Machine',
    brand: 'DERMALASE CLINICAL',
    category: 'aesthetic',
    categoryLabel: 'Aesthetic Clinic Tools',
    tag: 'Aesthetic Clinic',
    isVerified: true,
    isWholesale: true,
    price: 42000,
    unit: 'unit (Machine + 6 Probes Kit)',
    moq: 1,
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1512290900672-8a25e2d6f28e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512290900672-8a25e2d6f28e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: '7-in-1 multifunctional smart hydra dermabrasion, RF skin tightening, cold hammer cryo, and oxygen spray infusion workstation for dermatologists and cosmetology clinics.',
    specifications: {
      'Functions': 'Hydro-Peel Vacuum, Bipolar RF, Ultrasonic Scrubber, Oxygen Spray, Cold Hammer, LED Light',
      'Vacuum Pressure': '90 kPa High Suction with Vortex Tip Technology',
      'Touchscreen': '8-inch Color HD Smart Interface with Pre-set Protocols',
      'Warranty': '2 Years Full Clinic Equipment Warranty + On-Site Training'
    },
    leadTimeDays: 4,
    certifications: ['Medical CE', 'FDA Registered Device', 'ISO 13485'],
    supplierId: 'vertex-salon',
    supplierName: 'Vertex Salon Technologies',
    supplierLocation: 'Kolkata',
    rating: 5.0,
    reviewsCount: 29,
    wholesaleTiers: [
      { minUnits: 1, pricePerUnit: 42000 },
      { minUnits: 2, pricePerUnit: 38500 },
      { minUnits: 5, pricePerUnit: 34000 }
    ]
  }
];

export const CITIES = [
  'All Locations',
  'Jaipur',
  'Delhi',
  'Mumbai',
  'Kolkata',
  'Chennai',
  'Bengaluru',
  'Pune'
];

export const MOCK_PRODUCTS = PRODUCTS;
export const MOCK_PARTNERS = SUPPLIERS;

export const MOCK_VIDEO_TESTIMONIALS: import('../types').VideoTestimonial[] = [
  {
    id: 'vid-1',
    title: 'Ionic Salon Dryer X2 Backbar Stress Test & Cuticle Scan',
    distributorId: 'le-dist',
    distributorName: 'Mumbai Beauty Imports',
    distributorLocation: 'Mumbai',
    distributorInitials: 'MB',
    distributorVerified: true,
    speakerName: 'Jean-Luc Moreau',
    speakerRole: 'Artistic Director & Master Stylist',
    salonOrBusiness: 'Mumbai Beauty Imports Hub',
    thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '02:45',
    viewsCount: 1420,
    likesCount: 284,
    rating: 5.0,
    featuredProductId: 'prod-dryer-x2',
    featuredProductName: 'Ionic Salon Dryer X2',
    featuredProductImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbJYm_SslFIku_82qLmRuk2k5zRvHZT8jce4mbMPDB-6-eB2ZZADEa8Z3fGAio0r-DI21vhJ1Mr_sndv1k6s18xexTuSiABEazFXa5yyXvh2nw9_0WqY-Z2BhWQ4LqO9JaZFxU8ERfPENI3Ajv5Cqh2UvAhHiDrKTp-qpqKryod_fnKK0f7bs2W8BMyOH87d0FN0e1IrvDAtynBYt3sUh2OSA8GMJ7ILRVo-517al6IOaan8oAJINt',
    featuredProductPrice: 12500,
    featuredProductMoq: 10,
    category: 'Haircare & Tools',
    tags: ['Blowout Speed', 'Zero Heat Damage', 'Backbar Tested'],
    keyHighlight: 'Reduces blowout turnaround by 45% while keeping high gloss reflection.',
    quote: 'We run 16 chairs for 10 hours daily. The X2 has never overheated once, and client retention on keratin blowouts jumped 32%.',
    date: 'August 2026'
  },
  {
    id: 'vid-2',
    title: 'Hyaluronic Micro-Serum Molecular Penetration Lab Demo',
    distributorId: 'mc-milano',
    distributorName: 'Shree Ram Beauty Supplies',
    distributorLocation: 'Jaipur',
    distributorInitials: 'SR',
    distributorVerified: true,
    speakerName: 'Dr. Alessandra Conti',
    speakerRole: 'Lead Formulation Chemist & R&D Head',
    salonOrBusiness: 'Jaipur Dermocosmetic Laboratories',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '03:15',
    viewsCount: 2310,
    likesCount: 419,
    rating: 4.9,
    featuredProductId: 'prod-serum-ha',
    featuredProductName: 'Hyaluronic Multi-Molecular Serum',
    featuredProductImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACGmKxH3sKXQzfZ0ok5I09A_2UZ5Lk-zeaa_4Xt6mSPDZDL1IIZA2tVmblc0QziC47pQfp-5Wk6BBt42duT67QeBqYZkN6UH6HkVEU1iqTWHgMbCSUnsvb1PvD9o6hW_C1ySvLZ_q-7F2xmSh4Hn7gBVNzLuNTcqufs4ML63tl-Ng1UqB9kTB8g3uuBZvYf2yAOh8efzkvt74XQrLNEMOurN9E_4tW-0W_K5wpWHASxqrA6QQOfNH1',
    featuredProductPrice: 2950,
    featuredProductMoq: 30,
    category: 'Skincare',
    tags: ['Triple Molecular HA', 'Derm Grade', 'Instant Plumping'],
    keyHighlight: 'Clinical trans-epidermal hydration increase of +84% within 15 minutes of application.',
    quote: 'Our partner clinics rely on this formulation post-laser and for pre-event luxury hydra-facials without any tacky residue.',
    date: 'July 2026'
  },
  {
    id: 'vid-3',
    title: '24K Gold Ritual & Diamond Peptide Infusion in 5-Star Resort Spa',
    distributorId: 'td-dubai',
    distributorName: 'Jaipur Luxury Beauty Hub',
    distributorLocation: 'Jaipur',
    distributorInitials: 'JH',
    distributorVerified: true,
    speakerName: 'Rashid Al-Mansoor',
    speakerRole: 'Regional Distribution Director',
    salonOrBusiness: 'The Royal Mirage Aesthetic Suite',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '02:10',
    viewsCount: 1890,
    likesCount: 365,
    rating: 5.0,
    featuredProductId: 'prod-dryer-x2',
    featuredProductName: '24K Gold Cellular Rejuvenation Mask',
    featuredProductImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80',
    featuredProductPrice: 5500,
    featuredProductMoq: 15,
    category: 'Spa & Wellness',
    tags: ['24K Bio-Gold', 'Luxury Spa Ritual', 'High Margin'],
    keyHighlight: 'Ultra-exclusive treatment protocol generating 4.2x average spa service ticket boost.',
    quote: 'Distributing this luxury line to over 40 luxury resorts across India has transformed our partners VIP menu offerings.',
    date: 'June 2026'
  },
  {
    id: 'vid-4',
    title: 'Sonic Micro-Infusion Device: In-Cabin Clinical Efficiency',
    distributorId: 'gg-supply',
    distributorName: 'Royal Glamour India Supplies',
    distributorLocation: 'Pune',
    distributorInitials: 'RG',
    distributorVerified: true,
    speakerName: 'Elena Rostova',
    speakerRole: 'Chief Esthetician & Product Evangelist',
    salonOrBusiness: 'Pune Glow MediSpa',
    thumbnail: 'https://images.unsplash.com/photo-1512290900672-1f02e71edcf8?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '01:55',
    viewsCount: 980,
    likesCount: 215,
    rating: 4.8,
    featuredProductId: 'prod-dryer-x2',
    featuredProductName: 'Sonic Micro-Infusion Wand',
    featuredProductImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    featuredProductPrice: 16500,
    featuredProductMoq: 5,
    category: 'Salon Tools & Eq.',
    tags: ['Cryo-Firming', 'Sonic Vibration', 'Esthetician Favorite'],
    keyHighlight: 'Thermal 42°C heating opens micro-channels, followed by instant 6°C cryo-locking.',
    quote: 'Our salon clients feel an immediate tightening sensation. Estheticians love the wireless freedom and 2-year warranty.',
    date: 'August 2026'
  },
  {
    id: 'vid-5',
    title: 'Glacial Silt Scalp Treatment Line Unboxing & Application',
    distributorId: 'pb-imports',
    distributorName: 'South India Salon Depot',
    distributorLocation: 'Chennai',
    distributorInitials: 'SI',
    distributorVerified: false,
    speakerName: 'Marcus Thorne',
    speakerRole: 'Wholesale Account Director',
    salonOrBusiness: 'Soho Botanical Hair Lounge',
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '02:30',
    viewsCount: 750,
    likesCount: 142,
    rating: 4.7,
    featuredProductId: 'prod-serum-ha',
    featuredProductName: 'Glacial Mineral Scalp Detox Mask',
    featuredProductImage: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1000&q=80',
    featuredProductPrice: 2450,
    featuredProductMoq: 20,
    category: 'Haircare & Spa',
    tags: ['Glacial Silt', 'Scalp Health', 'Eco-Certified'],
    keyHighlight: '100% pure unrefined glacial silt rich in 60+ trace minerals for follicle rejuvenation.',
    quote: 'Eco-conscious salons across South India have made this their #1 scalp therapy upgrade for high-end clientele.',
    date: 'May 2026'
  }
];

export const DEFAULT_USER = {
  id: 'usr-101',
  name: 'Ananya Sharma',
  email: 'ananya@royalglamour.in',
  companyName: 'Jaipur Luxury Beauty Hub',
  role: 'buyer' as const,
  city: 'Jaipur',
  isVerified: true
};
