
'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
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
    <div className={cn("mb-4 flex items-center justify-between", className)}>
        <div className="flex items-center gap-4">
             <Button asChild variant="ghost" size="icon" className={cn(backButtonClassName)}>
                <Link href={backHref}>
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
                </Link>
            </Button>
            <Image src="/logos/layipo_lo.png" alt="LAYIPO 25 Logo" width={90} height={24} className="object-contain" />
        </div>
      
      <Image src="/logos/elevate_lo.png" alt="Elevate Logo" width={90} height={24} className="object-contain" />
    </div>
  );
}
