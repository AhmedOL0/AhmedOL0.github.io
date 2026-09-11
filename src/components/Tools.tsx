import Section from './Section';
import { useLang, type ToolLevel } from '../i18n';

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

export default function Tools() {
  const { t } = useLang();
  return (
    <Section id="tools" num="06" kicker={t.tools.kicker} title={t.tools.title} sub={t.tools.sub} variant="left">
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
    </Section>
  );
}
