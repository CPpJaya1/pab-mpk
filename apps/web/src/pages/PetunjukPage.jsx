import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import Petunjuk from '../components/Petunjuk';
import Footer from '../components/Footer';
export default function PetunjukPage() {
  return (
    <>
      <TopNavBar />
      <main className="min-h-screen bg-surface-container-lowest">
        <Petunjuk />
      </main>
      <Footer />
    </>
  );
}
