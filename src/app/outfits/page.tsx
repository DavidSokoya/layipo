
'use client';

import * as React from 'react';
import Image from 'next/image';
import { PageWrapper } from '@/components/page-wrapper';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dressCodeDetails } from '@/lib/data/shared';
import { motion } from 'framer-motion';

const outfitImageMap: Record<string, string> = {
  'Casual': '/outfits/casual.jpg',
  'Formal': '/outfits/formal.jpg',
  'Business': '/outfits/business.jpg',
  'Sports Wear': '/outfits/sports_wear.jpg',
  'Local Fabric': '/outfits/local_fabric.jpg',
  'Torch of Black (Formal)': '/outfits/torch_of_black.jpg',
  'JCI T-shirt/Sports Wear': '/outfits/jci_tshirt_sports_wear.jpg',
};

export default function OutfitsPage() {
  const dressCodes = Object.values(dressCodeDetails).filter(
    (code) => code.title !== 'Not Stated'
  );

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
              Your visual guide to looking the part for every occasion at LÁYÍPO ‘25.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dressCodes.map((code, index) => (
              <motion.div
                key={code.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video">
                    <Image
                      src={outfitImageMap[code.title] || 'https://placehold.co/600x400.png'}
                      alt={`Example of ${code.title} attire`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{code.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                      {code.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}
