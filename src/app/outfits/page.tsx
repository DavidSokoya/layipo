
'use client';

import * as React from 'react';
import { PageWrapper } from '@/components/page-wrapper';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Briefcase, UserCheck, Palette, Award, Coffee, Shirt, Flame, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    theme: {
      header: 'bg-primary/5',
      iconContainer: 'bg-primary/10',
      icon: 'text-primary',
    },
  },
  {
    icon: UserCheck,
    title: 'Strictly Formal',
    description: 'Elevated business wear. No polos, sneakers, or denim.',
    events: ['Collegiate General Assembly'],
    theme: {
      header: 'bg-foreground/5',
      iconContainer: 'bg-foreground/10',
      icon: 'text-foreground',
    },
  },
  {
    icon: Palette,
    title: 'Local Fabric / Cultural Attire',
    description: 'Represent your roots in style. Campala, Ankara, or native vibes.',
    events: ['Opening Ceremony', 'OJUDE LAYIPO'],
    theme: {
      header: 'bg-accent/5',
      iconContainer: 'bg-accent/10',
      icon: 'text-accent',
    },
  },
  {
    icon: Award,
    title: 'Black Tie',
    description: 'The night to dazzle. Suits, gowns, bowties.',
    events: ['Closing Ceremony Red Carpet', 'Banquet Night'],
     theme: {
      header: 'bg-status-amber/5',
      iconContainer: 'bg-status-amber/10',
      icon: 'text-status-amber',
    },
  },
  {
    icon: Coffee,
    title: 'Casual',
    description: 'Relaxed and comfortable — keep it neat.',
    events: ['Arrival', 'Setup', 'Lunches', 'Mr & Miss Collegiate', 'Tungba Night'],
    theme: {
      header: 'bg-status-green/5',
      iconContainer: 'bg-status-green/10',
      icon: 'text-status-green',
    },
  },
  {
    icon: Shirt,
    title: 'Sportswear',
    description: 'Athletic wear and JCI Branded T-Shirts. You’re here to move.',
    events: ['Football Prelims & Finals', 'Aerobics'],
    theme: {
      header: 'bg-status-red/5',
      iconContainer: 'bg-status-red/10',
      icon: 'text-status-red',
    },
  },
  {
    icon: Flame,
    title: 'Rep Your Culture',
    description: 'Showcase your roots — it’s storytelling night.',
    events: ['Cultural Campfire Night'],
    theme: {
      header: 'bg-status-blue/5',
      iconContainer: 'bg-status-blue/10',
      icon: 'text-status-blue',
    },
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
                  <CardHeader className={cn("flex flex-row items-center gap-4 p-4", code.theme.header)}>
                    <div className={cn("p-3 rounded-full", code.theme.iconContainer)}>
                      <code.icon className={cn("w-6 h-6", code.theme.icon)} />
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
