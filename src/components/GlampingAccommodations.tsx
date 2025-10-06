import { AccommodationsGrid } from './AccommodationsGrid';
import { getGlampingAccommodations } from '../data/glampingAccommodations';

interface AccommodationsProps {
  selectedLocation: string;
}

export const GlampingAccommodations = ({
  selectedLocation
}: AccommodationsProps) => {
  const accommodations = getGlampingAccommodations(selectedLocation);
  
  const title = (
    <>
      Premium <span style={{ color: 'var(--primary)' }}>Accommodations</span>
    </>
  );
  
  const description = selectedLocation === 'Canada' 
    ? 'From urban apartments to mountain lodges, discover comfort across Canada' 
    : 'Experience Pakistan\'s rich culture and natural beauty with our curated stays';

  return (
    <AccommodationsGrid
      accommodations={accommodations}
      selectedLocation={selectedLocation}
      title={title}
      description={description}
    />
  );
};