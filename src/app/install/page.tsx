
'use client';

import { PageWrapper } from '@/components/page-wrapper';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical, Share, PlusSquare, Smartphone, Apple } from 'lucide-react';
import { motion } from 'framer-motion';

const androidSteps = [
    {
        icon: MoreVertical,
        text: 'Tap the three-dot menu icon at the top-right corner of your Chrome browser.'
    },
    {
        icon: PlusSquare,
        text: 'From the dropdown menu, select "Install app" or "Add to Home screen".'
    },
    {
        icon: Smartphone,
        text: 'Confirm the installation, and the app will be added to your home screen for easy access!'
    }
];

const iosSteps = [
    {
        icon: Share,
        text: 'Tap the "Share" icon at the bottom of your Safari browser.'
    },
    {
        icon: PlusSquare,
        text: 'Scroll down and select "Add to Home Screen".'
    },
    {
        icon: Apple,
        text: 'Confirm by tapping "Add", and the app will appear on your home screen.'
    }
];

export default function InstallPage() {
    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                <div className="max-w-2xl mx-auto">
                    <PageHeader backHref="/profile" />
                    <header className="text-center mb-12">
                        <motion.h1 
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.2, duration: 0.5 }}
                             className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl"
                        >
                           Install Guide
                        </motion.h1>
                        <motion.p 
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.3, duration: 0.5 }}
                             className="mt-2 text-lg text-muted-foreground"
                        >
                           Access the app offline, just like a native app.
                        </motion.p>
                    </header>
                    
                    <div className="space-y-8">
                        {/* Android Instructions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Smartphone className="w-6 h-6 text-primary" />
                                        For Android (Chrome)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {androidSteps.map((step, index) => (
                                            <li key={`android-${index}`} className="flex items-start gap-4">
                                                <div className="flex-shrink-0 mt-1 p-2 bg-primary/10 rounded-full">
                                                    <step.icon className="w-5 h-5 text-primary" />
                                                </div>
                                                <p className="text-foreground/80">{step.text}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* iOS Instructions */}
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Apple className="w-6 h-6 text-primary" />
                                        For iPhone/iPad (Safari)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {iosSteps.map((step, index) => (
                                             <li key={`ios-${index}`} className="flex items-start gap-4">
                                                <div className="flex-shrink-0 mt-1 p-2 bg-primary/10 rounded-full">
                                                    <step.icon className="w-5 h-5 text-primary" />
                                                </div>
                                                <p className="text-foreground/80">{step.text}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
}
