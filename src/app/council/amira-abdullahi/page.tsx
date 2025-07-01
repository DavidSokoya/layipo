
'use client';

import { PageWrapper } from '@/components/page-wrapper';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const bio = `Amira Abdulahi is a dynamic youth leader, financial strategist, and passionate advocate for inclusive leadership and human development. Currently serving as the Collegiate Chairperson of JCI Nigeria, Amira leads with vision, empathy, and action, representing over 30 tertiary institutions across Nigeria and serving as a key voice on the National Board of Directors.

In this role, she is at the forefront of driving transformational change within JCI's collegiate network, developing strategic programs that foster leadership, entrepreneurship, and civic engagement among thousands of young Nigerians. Under her leadership, JCI collegiate chapters are becoming stronger, more united, and better equipped to contribute meaningfully to their campuses and communities.

Amira’s leadership journey is underpinned by real-world experience in finance, customer operations, and business development. From managing high-impact sales teams to overseeing customer support systems and crafting business growth strategies, she combines financial discipline with people-focused execution. Her roles at Techeccentric Consulting, SaverTech Limited, and Evetincts Global Limited reflect her agility and drive in both corporate and social innovation spaces.

Academically, Amira holds a B.Sc. in Accounting from Bayero University, Kano, an Associate Certification in Islamic Banking, and is currently pursuing her ACA (Associate Chartered Accountant) designation. Her diverse financial background enhances her unique leadership lens, grounded in integrity, ethics, and sustainable impact.

Whether she’s leading a national boardroom discussion or mentoring young leaders, Amira remains committed to a singular mission: empowering the next generation to lead with purpose, professionalism, and passion.`;

export default function AmiraAbdullahiPage() {
    const bioParagraphs = bio.split('\n\n');

    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <PageHeader backHref="/" />
                    <header className="text-center mb-12">
                         <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                         >
                            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20 shadow-lg">
                                <AvatarImage src="https://placehold.co/200x200.png" data-ai-hint="youth leader" alt="Amira Abdullahi" />
                                <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
                            </Avatar>
                        </motion.div>
                        <motion.h1 
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.2, duration: 0.5 }}
                             className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl"
                        >
                           Amira Abdullahi
                        </motion.h1>
                        <motion.p 
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.3, duration: 0.5 }}
                             className="mt-2 text-lg text-primary font-semibold"
                        >
                           Collegiate Chairperson
                        </motion.p>
                    </header>

                    <Card>
                        <CardContent className="p-6 md:p-8 space-y-4 text-foreground/80 leading-relaxed">
                             {bioParagraphs.map((paragraph, index) => (
                                <motion.p 
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                                >
                                    {paragraph}
                                </motion.p>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </PageWrapper>
    );
}
