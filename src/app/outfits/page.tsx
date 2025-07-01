
'use client';

import * as React from 'react';
import Image from 'next/image';
import { PageWrapper } from '@/components/page-wrapper';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Briefcase, UserCheck, Palette, Award, Coffee, Shirt, Flame, Check } from 'lucide-react';

const dressCodes = [
  {
    icon: Briefcase,
    title: 'Business / Business Formal',
    description: 'Polished. Professional. Power-ready. Think blazers, button-downs, and clean cuts.',
    events: [
      'Social Enterprise Academy',
      'All Training Sessions',
      'Morning Show (Days 2 & 3)',
      'Strategy Panel, Debate, Media Rounds, etc.',
    ],
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'business attire',
  },
  {
    icon: UserCheck,
    title: 'Strictly Formal',
    description: 'Elevated business wear. No polos, sneakers, or denim.',
    events: ['Collegiate General Assembly'],
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'formal suit',
  },
  {
    icon: Palette,
    title: 'Local Fabric / Cultural Attire',
    description: 'Represent your roots in style. Campala, Ankara, or native vibes.',
    events: ['Opening Ceremony', 'OJUDE LAYIPO'],
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'african fabric',
  },
  {
    icon: Award,
    title: 'Black Tie',
    description: 'The night to dazzle. Suits, gowns, bowties.',
    events: ['Closing Ceremony Red Carpet', 'Banquet Night'],
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'black tie event',
  },
  {
    icon: Coffee,
    title: 'Casual',
    description: 'Relaxed and comfortable — keep it neat.',
    events: ['Arrival', 'Setup', 'Lunches', 'Mr & Miss Collegiate', 'Tungba Night'],
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'casual fashion',
  },
  {
    icon: Shirt,
    title: 'Sportswear',
    description: 'Athletic wear and JCI Branded T-Shirts. You’re here to move.',
    events: ['Football Prelims & Finals', 'Aerobics'],
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'sportswear fashion',
  },
  {
    icon: Flame,
    title: 'Rep Your Culture',
    description: 'Showcase your roots — it’s storytelling night.',
    events: ['Cultural Campfire Night'],
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cultural pattern',
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
              Dress Code Guide
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Not sure what to wear at LÁYÍPO ’25? We’ve got you. Whether it’s training, culture night, or the big stage — here’s how to show up and show out.
            </p>
          </header>

          <div className="space-y-8">
            {dressCodes.map((code, index) => (
              <motion.div
                key={code.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden shadow-md">
                   <CardHeader className="relative p-0 h-32">
                        <Image
                            src={code.image}
                            alt={code.title}
                            fill
                            className="object-cover"
                            data-ai-hint={code.dataAiHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                        <div className="relative flex flex-row items-center gap-4 p-4 h-full text-primary-foreground">
                            <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <code.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg text-white">{code.title}</CardTitle>
                                <p className="text-sm text-white/80 mt-1">{code.description}</p>
                            </div>
                        </div>
                    </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {code.events.map(event => (
                        <li key={event} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-status-green mt-1 shrink-0" />
                          <span className="text-foreground/80">{event}</span>
                        </li>
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
