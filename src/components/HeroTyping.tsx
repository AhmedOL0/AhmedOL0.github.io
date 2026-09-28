import { useLang } from '../i18n-data';
import { useTypingCycle } from '../hooks';

const WORDS = [
  'Java', 'Spring Boot', 'React', 'Next.js', 'TypeScript',
  'Node.js', 'PostgreSQL', 'Docker', 'Flutter',
];

export default function HeroTyping() {
  const { t } = useLang();
  const typed = useTypingCycle(WORDS, 70, 35, 2200);
  return (
    <span className="hero-typing" aria-hidden="true">
      <span className="hero-typing-prefix">{t.hero.typingPrefix}</span>
      <span className="hero-typing-word">{typed}</span>
      <span className="hero-typing-cursor" />
    </span>
  );
}
