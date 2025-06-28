'use client';

import { PageWrapper } from '@/components/page-wrapper';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CouncilPage() {
    return (
        <PageWrapper>
            <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="relative mb-8 flex items-center justify-center">
                        <Button asChild variant="ghost" size="icon" className="absolute left-0">
                            <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                                <span className="sr-only">Back to Home</span>
                            </Link>
                        </Button>
                        <Logo />
                    </div>
                    <header className="text-center mb-12">
                        <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                           Meet the 2025 JCI Nigeria Collegiate Council Members
                        </h1>
                    </header>
                    <Card>
                        <CardHeader>
                            <CardTitle>A Dynamic Group of Leaders</CardTitle>
                            <CardDescription className="text-lg text-muted-foreground space-y-4 pt-4">
                                <p>
                                    We are proud to unveil the 2025 JCI Nigeria Collegiate Council, a dynamic group of leaders driven by the Ascend vision.
                                </p>
                                <p>
                                   Together, we’re set to empower, inspire, and create lasting impact across JCI Nigeria.
                                </p>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </main>
        </PageWrapper>
    );
}
