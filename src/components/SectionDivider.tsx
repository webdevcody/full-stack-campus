export function SectionDivider() {
  return (
    <div className="relative w-full py-8 overflow-hidden">
      {/* Main gradient line with shadow */}
      <div className="relative h-px">
        {/* Shadow layer for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/60 to-transparent shadow-lg" />
        {/* Main gradient line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
        {/* Primary color accent in center */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1/2 h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
        {/* Subtle glow effect */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1/4 h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-md opacity-60" />
      </div>
      {/* Decorative dots */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-primary/30 blur-[0.5px]" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 blur-[0.5px]" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/30 blur-[0.5px]" />
      </div>
    </div>
  );
}

