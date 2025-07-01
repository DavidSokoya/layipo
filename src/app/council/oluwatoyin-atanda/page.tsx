
'use client';

import { PageWrapper } from '@/components/page-wrapper';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const bio = `Oluwatoyin is a transformational leader, strategic thinker, and tireless advocate for youth development and nation-building. As National President of Junior Chamber International Nigeria (JCIN), she champions purpose-driven leadership and empowers young Nigerians to lead with integrity, innovation, and impact.

With a robust background in both public and private sectors, Oluwatoyin brings over a decade of multidisciplinary experience in human capital development, operations management, and service excellence. Her work as Senior Special Assistant to the Governor of Lagos State on Establishments and Training reflects her deep commitment to organizational development and civil service reform, impacting over 60,000 public servants through strategic training and policy innovation.

Her leadership journey includes overseeing business transformation at The Grid Restaurant & Winery, where she doubled sales through structural innovation and brand repositioning. As General Manager, she streamlined operations across subsidiaries in Nigeria and Rwanda, demonstrating her ability to scale businesses with agility and purpose.

A two-time Lagos State Government appointee, Oluwatoyin is known for delivering results through collaboration, vision, and unwavering dedication to service. She is a skilled communicator, problem-solver, and systems thinker who inspires trust and credibility in every role she assumes.

Academically grounded with an MBA from the University of South Wales and additional credentials in strategic management, Oluwatoyin embodies the values of lifelong learning and ethical leadership. She is a proud alumna of Lagos State University and an active member of the JCI movement since her undergraduate days.

Today, as JCIN National President, she is focused on expanding the organization’s impact nationwide, fostering civic engagement, and equipping young leaders with the tools to shape a better Nigeria, one community at a time.`;

export default function OluwatoyinAtandaPage() {
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
                                <AvatarImage src="https://placehold.co/200x200.png" data-ai-hint="professional woman" alt="Oluwatoyin Atanda" />
                                <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
                            </Avatar>
                        </motion.div>
                        <motion.h1 
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.2, duration: 0.5 }}
                             className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl"
                        >
                           Oluwatoyin Atanda
                        </motion.h1>
                        <motion.p 
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.3, duration: 0.5 }}
                             className="mt-2 text-lg text-primary font-semibold"
                        >
                           National President
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
