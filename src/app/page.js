import React from 'react';
import Header from '../components/Header';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import CertificationsGallery from '../components/CertificationsGallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Experience />
      <Projects />
      <CertificationsGallery />
    </main>
  );
}