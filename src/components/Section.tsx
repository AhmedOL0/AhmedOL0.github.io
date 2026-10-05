import type { ReactNode } from 'react';
import { useReveal, useStaggerReveal } from '../hooks';

export default function Section({
  id, num, kicker, title, sub, children, variant = 'default',
}: {
  id: string; num: string; kicker: string; title: string; sub?: string; children: ReactNode;
  variant?: 'default' | 'left' | 'right' | 'scale';
}) {
  const ref = useReveal<HTMLElement>();
  const staggerRef = useStaggerReveal<HTMLDivElement>();
  const variantClass = variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : variant === 'scale' ? 'reveal-scale' : '';
  return (
    <section id={id} ref={ref} className={`section-block ${variantClass}`}>
      <div className="sec-head">
        <span className="sec-num">DOC. REF {num}</span>
      </div>
      <div className="kicker">{kicker}</div>
      <h2 className="font-serif-d text-[clamp(2.1rem,4vw,3rem)] font-medium leading-[1.1] max-w-[24ch]">{title}</h2>
      {sub && <p className="sub">{sub}</p>}
      <div ref={staggerRef}>{children}</div>
    </section>
  );
}
