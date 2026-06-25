import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import Hero from '../components/Hero';
import Pengumuman from '../components/Pengumuman';
import AlurPendaftaran from '../components/AlurPendaftaran';
import Footer from '../components/Footer';

export default function LandingPage() {

  return (
    <>
      <TopNavBar />
      <main>
        <Hero />
        <Pengumuman />
        <AlurPendaftaran />
      </main>
      <Footer />
    </>
  );
}
