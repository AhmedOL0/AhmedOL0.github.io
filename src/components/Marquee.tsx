const items = [
  'Spring Boot', 'Next.js', 'Laravel', 'React Native', 'Flutter', 'PostgreSQL',
  'Redis', 'Docker', 'Terraform', 'Python', 'Stripe', 'Gemini AI',
];

const set = items.map((t, i) => (
  <span key={i}>{t} <i>·</i></span>
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
