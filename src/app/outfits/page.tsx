
'use client';

import * as React from 'react';
import Image from 'next/image';
import { PageWrapper } from '@/components/page-wrapper';
import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const outfits = [
  {
    title: 'Camp Fire Night',
    outfit: 'Casual',
    image: 'https://images.unsplash.com/photo-1500352528994-5257543475cf?q=80&w=600&h=800&fit=crop',
    dataAiHint: 'bonfire casual',
    overlayClass: 'bg-black/60',
    textClass: 'text-white',
  },
  {
    title: 'Closing Ceremony',
    outfit: 'Black Tie',
    image: 'https://images.unsplash.com/photo-1527628217451-b2414a1ee132?q=80&w=600&h=800&fit=crop',
    dataAiHint: 'black tie event',
    overlayClass: 'bg-gradient-to-t from-yellow-900/40 via-black/50 to-black/70',
    textClass: 'text-white',
    imageFilter: 'grayscale',
  },
  {
    title: 'Morning Show',
    outfit: 'Formal',
    image: 'https://images.unsplash.com/photo-1543269664-7e94994d95b0?q=80&w=600&h=800&fit=crop',
    dataAiHint: 'panel discussion',
    overlayClass: 'bg-black/30',
    textClass: 'text-white',
  },
  {
    title: 'Opening Ceremony',
    outfit: 'Kampala',
    image: 'https://images.unsplash.com/photo-1619890179927-f0375e247092?q=80&w=600&h=800&fit=crop',
    dataAiHint: 'ankara fashion',
    overlayClass: 'bg-black/40',
    textClass: 'text-white',
  },
  {
    title: 'Storytelling Night',
    outfit: 'Rep Your Culture',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&h=800&fit=crop',
    dataAiHint: 'cultural attire',
    overlayClass: 'bg-yellow-950/60',
    textClass: 'text-white',
  },
  {
    title: 'Training Sessions',
    outfit: 'Business Casual',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&h=800&fit=crop',
    dataAiHint: 'business workshop',
    overlayClass: 'bg-blue-950/30',
    textClass: 'text-white',
  },
];

export default function OutfitsPage() {
  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <PageHeader />
          <header className="text-center mb-12">
            <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Event Dress Codes
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Your visual guide to looking the part for every occasion at LAYIPO 25.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {outfits.map((code, index) => (
              <motion.div
                key={code.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-[450px] flex flex-col group relative rounded-xl shadow-lg">
                  <Image
                    src={code.image}
                    alt={code.title}
                    data-ai-hint={code.dataAiHint}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${code.imageFilter || ''}`}
                  />
                  <div className={`absolute inset-0 transition-colors ${code.overlayClass}`} />
                  <div className={`relative flex flex-col justify-end h-full p-6 ${code.textClass}`}>
                    <h2 className="text-2xl font-bold font-headline">{code.title}</h2>
                    <p className="text-base opacity-90">Outfit: {code.outfit}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
