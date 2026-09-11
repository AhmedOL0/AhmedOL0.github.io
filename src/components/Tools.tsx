import Section from './Section';
import { useLang, type ToolLevel, type Pillar } from '../i18n';

function PyramidLevel({ level, index }: { level: ToolLevel; index: number }) {
  const width = [42, 62, 88][index] ?? 88;
  return (
    <div className="pyramid-level">
      <div className="pyramid-bar" style={{ width: `${width}%` }}>
        <span className="pyramid-label">{level.level}</span>
        <span className="pyramid-sub">{level.subtitle}</span>
      </div>
      <div className="pyramid-tools">
        {level.tools.map((tool) => (
          <div className="tool-card" key={tool.name}>
            <span className="tool-name">{tool.name}</span>
            <span className="tool-desc">{tool.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div className="pillar-card">
      <div className="pillar-header">
        <svg className="pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={pillar.icon} />
        </svg>
        <div>
          <h3 className="pillar-title">{pillar.title}</h3>
          <p className="pillar-subtitle">{pillar.subtitle}</p>
        </div>
      </div>
      <div className="pillar-items">
        {pillar.items.map((item) => (
          <div className="pillar-item" key={item.name}>
            <span className="pillar-item-name">{item.name}</span>
            <span className="pillar-item-desc">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Tools() {
  const { t } = useLang();
  return (
    <Section id="tools" num="05" kicker={t.tools.kicker} title={t.tools.title} sub={t.tools.sub} variant="left">
      <div className="pyramid-wrap mt-9">
        <div className="pyramid-header">
          <h3>{t.tools.pyramid.title}</h3>
          <p className="pyramid-header-sub">{t.tools.pyramid.subtitle}</p>
        </div>
        <div className="pyramid">
          {t.tools.levels.map((lvl, i) => (
            <PyramidLevel key={lvl.level} level={lvl} index={i} />
          ))}
        </div>
      </div>
      <div className="methods-grid mt-10">
        <h3>{t.tools.extra.title}</h3>
        <div className="methods-list">
          {t.tools.extra.items.map((item) => (
            <div className="method-chip" key={item}>{item}</div>
          ))}
        </div>
      </div>
      <div className="pillars-grid mt-10">
        {t.tools.pillars.map((pillar) => (
          <PillarCard key={pillar.title} pillar={pillar} />
        ))}
      </div>
    </Section>
  );
}
