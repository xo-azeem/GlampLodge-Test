import { Accommodation } from './glampingAccommodations';

// Example of how to create new accommodation data for any page
export const getCustomAccommodations = (selectedLocation: string): Accommodation[] => {
  if (selectedLocation === 'Canada') {
    return [
      {
        id: 1,
        title: 'Custom Canadian Property',
        location: 'Vancouver, BC',
        type: 'Custom Type',
        price: 'CAD $200',
        period: 'per night',
        rating: 4.8,
        reviews: 50,
        description: 'A custom accommodation example for Canada.',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
        badges: ['Custom', 'Example']
      }
    ];
  } else {
    return [
      {
        id: 1,
        title: 'Custom Pakistani Property',
        location: 'Islamabad, Capital',
        type: 'Custom Type',
        price: 'PKR 10,000',
        period: 'per night',
        rating: 4.7,
        reviews: 30,
        description: 'A custom accommodation example for Pakistan.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
        badges: ['Custom', 'Example']
      }
    ];
  }
};
