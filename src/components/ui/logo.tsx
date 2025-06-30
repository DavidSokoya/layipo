export function Logo() {
  return (
    <div className="flex items-center gap-2" data-testid="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8 text-primary"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5v-9l6 4.5-6 4.5z" />
      </svg>
      <span className="text-lg font-semibold text-foreground">LAYIPO 25</span>
    </div>
  );
}
