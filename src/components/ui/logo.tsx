import Image from 'next/image';

export function Logo({ width = 140, height = 35 }: { width?: number; height?: number }) {
  return (
    <div className="flex items-center" data-testid="logo">
      <Image
        src="/logos/layipo25.png"
        alt="LAYIPO 25 Logo"
        width={width}
        height={height}
        priority
      />
    </div>
  );
}
