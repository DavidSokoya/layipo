import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center" data-testid="logo">
      <Image
        src="/logos/layipo25.png"
        alt="LAYIPO 25 Logo"
        width={140}
        height={35}
        priority
      />
    </div>
  );
}
