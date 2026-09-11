const items = [
  'Spring Boot', 'Next.js', 'Laravel', 'React Native', 'Flutter', 'PostgreSQL',
  'Redis', 'Docker', 'Terraform', 'Python', 'Stripe', 'Gemini AI',
];

export default function Marquee() {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i}>{t} <i>·</i></span>
        ))}
      </div>
    </div>
  );
}
