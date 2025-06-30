'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/lib/utils';

export function PageHeader({ 
    backHref = "/", 
    className, 
    backButtonClassName 
}: { 
    backHref?: string, 
    className?: string, 
    backButtonClassName?: string 
}) {
  return (
    <div className={cn("relative mb-8 flex items-center justify-center", className)}>
      <Button asChild variant="ghost" size="icon" className={cn("absolute left-0", backButtonClassName)}>
        <Link href={backHref}>
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Link>
      </Button>
      <Logo />
    </div>
  );
}
