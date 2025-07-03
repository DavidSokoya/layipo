
'use client';

import { PageWrapper } from '@/components/page-wrapper';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreVertical, Share, PlusSquare, Smartphone, Apple } from 'lucide-react';
import { motion } from 'framer-motion';

const androidSteps = [
    {
        icon: MoreVertical,
        text: 'Tap the three-dot menu icon in the top-right corner of Chrome.'
    },
    {
        icon: PlusSquare,
        text: 'From the dropdown menu, select "Add to Home screen" or "Install app".'
    },
    {
        icon: Smartphone,
        text: 'Confirm the installation, and the app will be added to your home screen for easy access.'
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
        text: 'Confirm by tapping "Add," and the app will appear on your home screen.'
    }
];

export default function InstallPage() {
    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                <div className="max-w-2xl mx-auto">
                    <PageHeader backHref="/profile" />
                    <header className="text-center mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                <Smartphone className="w-8 h-8 text-primary" />
                            </div>
                        </motion.div>
                        <motion.h1 
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.1, duration: 0.5 }}
                             className="text-2xl font-bold font-headline tracking-tight text-foreground sm:text-3xl"
                        >
                           Install The App
                        </motion.h1>
                        <motion.p 
                             initial={{ y: 20, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ delay: 0.2, duration: 0.5 }}
                             className="mt-2 text-base text-muted-foreground"
                        >
                           Get a native-app experience, with offline access and easy launching from your home screen.
                        </motion.p>
                    </header>
                    
                    <div className="space-y-8">
                        {/* Android Instructions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-lg">
                                        <Smartphone className="w-5 h-5" />
                                        For Android (Chrome)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ol className="space-y-4">
                                        {androidSteps.map((step, index) => (
                                            <li key={`android-${index}`} className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted border">
                                                    <step.icon className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <p className="text-sm sm:text-base text-muted-foreground pt-2">{step.text}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* iOS Instructions */}
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-lg">
                                        <Apple className="w-5 h-5" />
                                        For iPhone/iPad (Safari)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ol className="space-y-4">
                                        {iosSteps.map((step, index) => (
                                             <li key={`ios-${index}`} className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted border">
                                                    <step.icon className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <p className="text-sm sm:text-base text-muted-foreground pt-2">{step.text}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
}
