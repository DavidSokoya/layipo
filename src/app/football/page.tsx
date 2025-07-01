
'use client';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Trophy } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const groups = {
    "Group A": ["JCIN The Polytechnic Ibadan", "JCIN UI", "JCIN FUNAAB", "JCIN OAU"],
    "Group B": ["JCIN TASUED", "JCIN MAPOLY", "JCIN FCE ABK", "JCIN Ede Poly"],
    "Group C": ["JCIN LAUTECH", "JCIN Eksu", "JCIN FUTA", "JCIN Fedpole"],
    "Group D": ["JCIN Unilag", "JCIN Lasu", "JCIN Yabatech", "JCIN Unilorin"],
};

const FootballIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="2"
        stroke="currentColor" 
        className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L6 6" />
    </svg>
);

export default function FootballPage() {
    return (
        <PageWrapper>
            <main className="flex-1 bg-gradient-to-b from-[#0a021d] via-[#0f043d] to-[#1d0a3d] text-white mb-16">
                <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
                    <PageHeader 
                        className="text-white"
                        backButtonClassName="text-white hover:bg-white/10 hover:text-white"
                    />

                    <header className="text-center my-12 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center items-center gap-4"
                        >
                            <Trophy className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_8px_theme(colors.yellow.400)]" />
                            <h1 className="text-3xl font-bold font-headline tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-300 sm:text-4xl lg:text-5xl">
                               LAYIPO 25 Football Showdown
                            </h1>
                        </motion.div>
                        <motion.p
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.5, delay: 0.2 }}
                             className="text-lg text-white/70 max-w-3xl mx-auto"
                        >
                           The road to the final is paved with tackles, triumphs, and team spirit. The group stage draw is here!
                        </motion.p>
                    </header>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="my-8 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20"
                    >
                        <Image
                            src="/images/spotlight/baller.jpg"
                            alt="Football stadium"
                            data-ai-hint="football stadium night"
                            width={1200}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-center text-white mb-8">Group Stage Draw</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(groups).map(([groupName, teams], index) => (
                             <motion.div
                                key={groupName}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            >
                                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 h-full text-white transition-all duration-300 hover:border-blue-400 hover:shadow-blue-400/20 hover:shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-blue-300 font-bold">{groupName}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {teams.map(team => (
                                            <div key={team} className="flex items-center gap-3">
                                                <FootballIcon className="w-5 h-5 text-white/50" />
                                                <p className="font-medium">{team}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                     <div className="text-center text-lg text-white/60 mt-12">
                        <p>Who’s making it out of the groups? The journey to the finals starts now!</p>
                     </div>
                </div>
            </main>
        </PageWrapper>
    );
}
