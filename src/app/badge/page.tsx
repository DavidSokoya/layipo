'use client';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { user } from "@/lib/data";
import { ScanLine } from 'lucide-react';

// A simple component to render a fake barcode
const Barcode = () => (
  <div className="flex justify-center items-end gap-px h-16 w-full px-4" aria-label="Barcode">
    {Array.from({ length: 60 }).map((_, i) => (
      <div
        key={i}
        className="bg-foreground w-full"
        style={{ height: `${20 + Math.random() * 80}%` }}
      />
    ))}
  </div>
);

export default function BadgePage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full">
         <h1 className="text-3xl font-bold font-headline tracking-tight text-primary text-center mb-2">My Digital Badge</h1>
          <p className="text-muted-foreground text-center mb-8">
            Present this for session check-ins and networking.
          </p>
        <Card className="w-full shadow-2xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
          <CardHeader className="bg-primary text-primary-foreground p-6 text-center">
            <h2 className="text-2xl font-bold">JCI National Convention</h2>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-8 gap-6">
            <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${user.name}`} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">{user.name}</h3>
              <p className="text-lg text-muted-foreground">{user.role}</p>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-6 flex-col gap-4 bg-muted/30">
            <Barcode />
             <p className="text-xs text-muted-foreground flex items-center gap-2">
                <ScanLine className="w-4 h-4"/>
                <span>Scan to connect</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
