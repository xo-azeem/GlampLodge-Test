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
  images: string[];
  airbnbLink: string;
  features: string[];
  badges: string[];
}

export const getGlampingAccommodations = (selectedLocation: string): Accommodation[] => {
  if (selectedLocation === 'Canada') {
    return [];
  } else {
    return [
      {
        id: 1,
        title: 'Luxury Mountain Lodge',
        location: 'Murree, Punjab',
        type: 'Mountain View',
        price: 'PKR 18,000',
        period: 'per night',
        rating: 4.9,
        reviews: 67,
        description: 'Premium mountain lodge with breathtaking views of the Murree hills. Experience luxury in the heart of nature with modern amenities and traditional Pakistani hospitality.',
        image: '/src/assets/Listings/Murree/LivingRoom.png',
        images: [
          '/src/assets/Listings/Murree/LivingRoom.png',
          '/src/assets/Listings/Murree/LivingRoom2.png',
          '/src/assets/Listings/Murree/Kitchen.png',
          '/src/assets/Listings/Murree/Kitchen2.png',
          '/src/assets/Listings/Murree/Bedroom1.png'
        ],
        airbnbLink: 'https://airbnb.com/h/newmurree',
        features: ['Mountain View', 'Modern Kitchen', 'Luxury Bedrooms', 'Fireplace', 'Private Balcony'],
        badges: ['Luxury', 'Mountain View', 'Premium']
      },
      {
        id: 2,
        title: 'Scenic Hillside Retreat',
        location: 'Bhurban, Punjab',
        type: 'Hill Station',
        price: 'PKR 15,000',
        period: 'per night',
        rating: 4.8,
        reviews: 54,
        description: 'Beautiful hillside retreat in Bhurban with panoramic views. Perfect blend of comfort and nature, featuring spacious rooms and modern facilities.',
        image: '/src/assets/Listings/Bhurban/LivingRoom.png',
        images: [
          '/src/assets/Listings/Bhurban/LivingRoom.png',
          '/src/assets/Listings/Bhurban/Bedroom1.png',
          '/src/assets/Listings/Bhurban/Bedroom2.png',
          '/src/assets/Listings/Bhurban/Kitchen.png',
          '/src/assets/Listings/Bhurban/washroom.png',
          '/src/assets/Listings/Bhurban/extra.png'
        ],
        airbnbLink: 'https://airbnb.com/h/bhurbanlodge',
        features: ['Hill Station View', 'Spacious Rooms', 'Modern Kitchen', 'Private Bathroom', 'Garden Access'],
        badges: ['Scenic', 'Hill Station', 'Comfortable']
      }
    ];
  }
};
