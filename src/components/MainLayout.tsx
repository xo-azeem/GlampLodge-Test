import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
interface MainLayoutProps {
  children: React.ReactNode;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}
export const MainLayout = ({
  children,
  selectedLocation,
  setSelectedLocation
}: MainLayoutProps) => {
  return <>
      <Header selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      <main>{children}</main>
      <Footer />
    </>;
};