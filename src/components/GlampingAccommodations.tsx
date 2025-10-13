import { VirtualizedAccommodationsGrid } from './VirtualizedAccommodationsGrid';
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
  
  const description = selectedLocation === 'International' 
    ? 'From urban apartments to mountain lodges, discover comfort across the globe' 
    : 'Experience Pakistan\'s rich culture and natural beauty with our curated stays';

  return (
    <VirtualizedAccommodationsGrid
      key={`glamping-${selectedLocation}`}
      accommodations={accommodations}
      selectedLocation={selectedLocation}
      title={title}
      description={description}
    />
  );
};