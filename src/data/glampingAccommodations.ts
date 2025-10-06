export interface Accommodation {
  id: number;
  title: string;
  location: string;
  type: string;
  price: string;
  period: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  features: string[];
  badges: string[];
}

export const getGlampingAccommodations = (selectedLocation: string): Accommodation[] => {
  if (selectedLocation === 'Canada') {
    return [
      {
        id: 1,
        title: 'Luxury Geodesic Dome',
        location: 'Banff, AB',
        type: 'Mountain View',
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
        id: 2,
        title: 'Coastal Glamping Dome',
        location: 'Tofino, BC',
        type: 'Ocean View',
        price: 'CAD $180',
        period: 'per night',
        rating: 4.7,
        reviews: 156,
        description: 'Unique geodesic dome experience with ocean views and modern comfort.',
        image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Ocean View', 'Private Deck', 'Telescope', 'Beach Access'],
        badges: ['Unique', 'Ocean View']
      },
      {
        id: 3,
        title: 'Forest Retreat Dome',
        location: 'Algonquin Park, ON',
        type: 'Forest View',
        price: 'CAD $195',
        period: 'per night',
        rating: 4.8,
        reviews: 112,
        description: 'Secluded forest dome with panoramic views of the Canadian wilderness.',
        image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
        features: ['Forest View', 'Wildlife Watching', 'Star Gazing', 'Nature Trails'],
        badges: ['Secluded', 'Forest']
      }
    ];
  } else {
    return [
      {
        id: 1,
        title: 'Mountain Glamping Pod',
        location: 'Murree Hills, Punjab',
        type: 'Mountain View',
        price: 'PKR 15,000',
        period: 'per night',
        rating: 4.9,
        reviews: 42,
        description: 'Modern glamping pods with all amenities while surrounded by nature.',
        image: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Modern Amenities', 'Forest View', 'Heated', 'Private Bathroom'],
        badges: ['New', 'Luxury Camping']
      },
      {
        id: 2,
        title: 'Riverside Luxury Tent',
        location: 'Hunza Valley',
        type: 'River View',
        price: 'PKR 18,000',
        period: 'per night',
        rating: 4.8,
        reviews: 35,
        description: 'Premium canvas tents with stunning views of the river and mountains.',
        image: 'https://images.unsplash.com/photo-1595274459742-4a41d35784be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['River View', 'Mountain View', 'Luxury Bedding', 'Outdoor Dining'],
        badges: ['Scenic', 'Premium']
      },
      {
        id: 3,
        title: 'Desert Glamping Experience',
        location: 'Thar Desert, Sindh',
        type: 'Desert View',
        price: 'PKR 12,000',
        period: 'per night',
        rating: 4.6,
        reviews: 28,
        description: 'Unique desert camping with traditional hospitality and modern comfort.',
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Desert View', 'Cultural Experience', 'Camel Rides', 'Traditional Meals'],
        badges: ['Cultural', 'Adventure']
      }
    ];
  }
};
