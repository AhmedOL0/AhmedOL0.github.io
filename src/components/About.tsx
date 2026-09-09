import Section from './Section';
import { stats } from '../data';
import { useCountUp, useInView } from '../hooks';

function Stat({ value, label, sub }: { value: number; label: string; sub: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = useCountUp(value, inView);
  return (
    <div ref={ref} className="stat">
      <b className="font-serif-d">{v}</b>
      <span>{label}<br />{sub}</span>
    </div>
  );
}

const best = [
  'REST API design: versioning, contracts, OpenAPI-first with generated clients',
  'Transactional integrity: state machines, idempotence, optimistic/pessimistic locking',
  'Test strategy: Testcontainers on real Postgres, E2E, contract and architecture tests',
  'Trilingual interfaces with real RTL, not translated labels',
];
const method = [
  'Kanban flow with review + green CI as the merge gate',
  'Schema changes only as replayable, re-runnable migrations',
  'Security in depth: short-lived JWTs, encrypted PII, per-route rate limits',
  'Honest scoping: conditions claimed only when verified, limits named',
];

export default function About() {
  return (
    <Section
      id="about" num="02" kicker="Background"
      title="Backend-leaning, product-minded — from sensor to storefront."
      sub="From ESP8266 firmware to Cloud Run deploys: I care about the places where a bug costs real money, and I prefer executable guarantees over conventions."
    >
      <div className="stats mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} sub={s.sub} />
        ))}
      </div>
      <div className="about-grid mt-[34px] grid grid-cols-1 gap-11 lg:grid-cols-2">
        <div>
          <h4>What I do best</h4>
          <ul>{best.map((li) => <li key={li}>{li}</li>)}</ul>
        </div>
        <div>
          <h4>How I work</h4>
          <ul>{method.map((li) => <li key={li}>{li}</li>)}</ul>
        </div>
      </div>
      <div className="langs mt-[26px] flex flex-wrap gap-2.5">
        {[['Arabic', 'native'], ['French', 'professional'], ['English', 'professional']].map(([l, lvl]) => (
          <span key={l}><b>{l}</b> — {lvl}</span>
        ))}
      </div>
    </Section>
  );
}
