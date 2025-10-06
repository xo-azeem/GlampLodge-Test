import { Accommodation } from './glampingAccommodations';

export const getLodgeCityAccommodations = (selectedLocation: string): Accommodation[] => {
  if (selectedLocation === 'Canada') {
    return [
      {
        id: 1,
        title: 'Modern Downtown Apartment',
        location: 'Mississauga, ON',
        type: 'City Rental',
        price: 'CAD $120',
        period: 'per night',
        rating: 4.8,
        reviews: 127,
        description: 'Stylish apartment in the heart of Mississauga with city views and modern amenities.',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Free WiFi', 'Kitchen', 'Parking', 'City View'],
        badges: ['Popular', 'Instant Book']
      },
      {
        id: 2,
        title: 'Luxury Mountain Lodge',
        location: 'Banff, AB',
        type: 'Resort Camping',
        price: 'CAD $250',
        period: 'per night',
        rating: 4.9,
        reviews: 89,
        description: 'Experience luxury camping with stunning mountain views and premium amenities.',
        image: 'https://images.unsplash.com/photo-1533601017-dc61895e03c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Mountain View', 'Fireplace', 'Hot Tub', 'Hiking Trails'],
        badges: ['Luxury', 'Mountain View']
      },
      {
        id: 3,
        title: 'Coastal Glamping Dome',
        location: 'Tofino, BC',
        type: 'Glamping',
        price: 'CAD $180',
        period: 'per night',
        rating: 4.7,
        reviews: 156,
        description: 'Unique geodesic dome experience with ocean views and modern comfort.',
        image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Ocean View', 'Private Deck', 'Telescope', 'Beach Access'],
        badges: ['Unique', 'Ocean View']
      }
    ];
  } else {
    return [
      {
        id: 1,
        title: 'Heritage Haveli Suite',
        location: 'Lahore, Punjab',
        type: 'City Rental',
        price: 'PKR 8,500',
        period: 'per night',
        rating: 4.6,
        reviews: 98,
        description: 'Traditional Pakistani architecture meets modern comfort in the cultural heart of Lahore.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Traditional Décor', 'Rooftop Terrace', 'AC', 'WiFi'],
        badges: ['Heritage', 'Cultural']
      },
      {
        id: 2,
        title: 'Mountain Resort Cottage',
        location: 'Murree, Punjab',
        type: 'Resort Camping',
        price: 'PKR 12,000',
        period: 'per night',
        rating: 4.8,
        reviews: 74,
        description: 'Cozy mountain retreat with panoramic valley views and crisp mountain air.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Valley View', 'Fireplace', 'Garden', 'Pine Forest'],
        badges: ['Mountain Escape', 'Family Friendly']
      },
      {
        id: 3,
        title: 'Luxury Camping Pod',
        location: 'Murree Hills, Punjab',
        type: 'Glamping',
        price: 'PKR 15,000',
        period: 'per night',
        rating: 4.9,
        reviews: 42,
        description: 'Modern glamping pods with all amenities while surrounded by nature.',
        image: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Modern Amenities', 'Forest View', 'Heated', 'Private Bathroom'],
        badges: ['New', 'Luxury Camping']
      }
    ];
  }
};
