import type { ReactNode } from 'react';
import { useReveal } from '../hooks';

export default function Section({
  id, num, kicker, title, sub, children,
}: {
  id: string; num: string; kicker: string; title: string; sub?: string; children: ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className="relative">
      <span className="ghost" aria-hidden="true">{num}</span>
      <div className="sec-head"><span className="sec-num">{num}</span></div>
      <div className="kicker">{kicker}</div>
      <h2 className="font-serif-d text-[clamp(1.9rem,3.6vw,2.7rem)] font-semibold leading-[1.14] max-w-[24ch]">{title}</h2>
      {sub && <p className="sub">{sub}</p>}
      {children}
    </section>
  );
}
