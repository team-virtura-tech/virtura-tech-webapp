// Footer.tsx (simplified)
import { DottedBackground } from './DottedBackground';

export function Footer() {
  return (
    <footer
      id="Footer"
      className="relative min-h-[400px] w-full overflow-hidden bg-foreground text-white"
    >
      {/* Background animation */}
      <DottedBackground className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* Footer content on top */}
      <div className="relative z-10 flex min-h-[400px] items-center justify-center">
        <h1 className="font-mono text-4xl font-semibold">Dotted Surface</h1>
      </div>
    </footer>
  );
}
