import Section from './Section';
import { useLang } from '../i18n-data';

export default function BehindTheWork() {
  const { t } = useLang();
  return (
    <Section id="behind" num="06" kicker={t.behind.kicker} title={t.behind.title} sub={t.behind.sub} variant="left">
      <div className="tech-grid mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
        {t.behind.categories.map((cat) => (
          <div className="tech-cat" key={cat.name}>
            <h3 className="tech-cat-name">{cat.name}</h3>
            <div className="tech-items">
              {cat.items.map((item) => (
                <span key={item} className="tech-item">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
