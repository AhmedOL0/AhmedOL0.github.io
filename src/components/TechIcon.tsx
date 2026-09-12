import techIcons from '../lib/techIcons';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TechIcon({ name, className = '', size = 16 }: TechIconProps) {
  const d = techIcons[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
