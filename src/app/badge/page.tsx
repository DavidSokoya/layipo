'use client';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { user } from "@/lib/data";
import { ScanLine } from 'lucide-react';
import { Logo } from "@/components/ui/logo";
import { PageWrapper } from "@/components/page-wrapper";

const Barcode = () => (
  <div className="flex justify-center items-end gap-px h-16 w-full px-4" aria-label="Barcode">
    {Array.from({ length: 70 }).map((_, i) => {
      const height = 20 + Math.random() * 80;
      return (
        <div
          key={i}
          className="bg-primary-foreground/90 w-full"
          style={{ height: `${height}%` }}
        />
      );
    })}
  </div>
);


export default function BadgePage() {
  return (
    <PageWrapper>
      <main className="flex-1 p-4 md:p-6 lg:p-8 mb-16 flex flex-col">
        <div className="max-w-md mx-auto w-full">
           <div className="mb-8 flex items-center justify-between">
              <Logo />
            </div>
          <h1 className="text-3xl font-bold font-headline tracking-tight text-foreground text-center mb-2">My Digital Badge</h1>
            <p className="text-muted-foreground text-center mb-8">
              Present this for session check-ins and networking.
            </p>
          <Card className="w-full shadow-2xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400">
            <CardHeader className="text-primary-foreground p-6 text-center">
              <h2 className="text-2xl font-bold">JCI National Convention</h2>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-8 gap-6">
              <Avatar className="w-28 h-28 border-4 border-background/20 shadow-lg">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${user.name}`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center text-primary-foreground">
                <h3 className="text-3xl font-bold">{user.name}</h3>
                <p className="text-lg opacity-80">{user.role}</p>
              </div>
            </CardContent>
            <CardFooter className="p-6 flex-col gap-4 bg-black/20 backdrop-blur-sm">
              <Barcode />
               <p className="text-xs text-primary-foreground/70 flex items-center gap-2 mt-2">
                  <ScanLine className="w-4 h-4"/>
                  <span>Scan to connect</span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </PageWrapper>
  );
}
