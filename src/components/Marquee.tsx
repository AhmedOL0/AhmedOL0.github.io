const techs: { name: string; color: string; icon: string }[] = [
  { name: 'Spring Boot', color: '#4ade80', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6H7v-2h2V7c0-1.66 1.34-3 3-3h2v2h-2c-.55 0-1 .45-1 1v3h3l-1 6z' },
  { name: 'Next.js', color: '#a78bfa', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z' },
  { name: 'Laravel', color: '#f87171', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { name: 'React Native', color: '#60a5fa', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z' },
  { name: 'Flutter', color: '#38bdf8', icon: 'M14.314 2.056l-6.37 6.37 3.182 3.182 6.37-6.37-3.182-3.182zM4.5 13.5l3.182 3.182L14.054 10.31 10.872 7.128 4.5 13.5z' },
  { name: 'PostgreSQL', color: '#818cf8', icon: 'M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zM6 9c0 .5 2.13 2 6 2s6-1.5 6-2v2c0 .5-2.13 2-6 2s-6-1.5-6-2V9zm0 4c0 .5 2.13 2 6 2s6-1.5 6-2v2c0 .5-2.13 2-6 2s-6-1.5-6-2v-2z' },
  { name: 'Redis', color: '#f87171', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { name: 'Docker', color: '#60a5fa', icon: 'M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z' },
  { name: 'Python', color: '#fbbf24', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6H7v-2h2V7c0-1.66 1.34-3 3-3h2v2h-2c-.55 0-1 .45-1 1v3h3l-1 6z' },
  { name: 'Stripe', color: '#818cf8', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' },
  { name: 'Gemini AI', color: '#c084fc', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
];

const set = techs.map((t) => (
  <span key={t.name} className="marquee-item">
    <svg viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ width: 14, height: 14, flexShrink: 0, opacity: 0.7 }}>
      <path d={t.icon} />
    </svg>
    {t.name}
    <i>·</i>
  </span>
));

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span className="marquee-inner">{set}</span>
        <span className="marquee-inner">{set}</span>
      </div>
    </div>
  );
}
