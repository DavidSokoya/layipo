
'use client';

import * as React from 'react';
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
  },
  {
    icon: UserCheck,
    title: 'Strictly Formal',
    description: 'Elevated business wear. No polos, sneakers, or denim.',
    events: ['Collegiate General Assembly'],
  },
  {
    icon: Palette,
    title: 'Local Fabric / Cultural Attire',
    description: 'Represent your roots in style. Campala, Ankara, or native vibes.',
    events: ['Opening Ceremony', 'OJUDE LAYIPO'],
  },
  {
    icon: Award,
    title: 'Black Tie',
    description: 'The night to dazzle. Suits, gowns, bowties.',
    events: ['Closing Ceremony Red Carpet', 'Banquet Night'],
  },
  {
    icon: Coffee,
    title: 'Casual',
    description: 'Relaxed and comfortable — keep it neat.',
    events: ['Arrival', 'Setup', 'Lunches', 'Mr & Miss Collegiate', 'Tungba Night'],
  },
  {
    icon: Shirt,
    title: 'Sportswear',
    description: 'Athletic wear and JCI Branded T-Shirts. You’re here to move.',
    events: ['Football Prelims & Finals', 'Aerobics'],
  },
  {
    icon: Flame,
    title: 'Rep Your Culture',
    description: 'Showcase your roots — it’s storytelling night.',
    events: ['Cultural Campfire Night'],
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
                  <CardHeader className="flex flex-row items-center gap-4 bg-muted/50 p-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <code.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{code.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{code.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {code.events.map(event => (
                        <li key={event} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
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
