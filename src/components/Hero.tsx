import { useState } from 'react';
import { useReveal } from '../hooks';

const core = ['Java 21 / Spring Boot', 'TypeScript / Next.js', 'React Native / Flutter', 'PostgreSQL', 'Docker', 'Python'];

function ProfileCard() {
  const [imgOk, setImgOk] = useState(true);
  return (
    <aside className="pcard ml-auto w-full max-w-[330px]">
      <div className="pphoto">
        {imgOk ? (
          <img
            src="assets/photo.jpg"
            alt="Portrait of Ahmed Ouarrali, Full-Stack Software Engineer"
            fetchPriority="high"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="pmono"><span>AO</span></div>
        )}
      </div>
      <h3 className="font-serif-d">Ahmed Ouarrali</h3>
      <p className="prole">Full-Stack Software Engineer</p>
      <p className="ploc">Morocco · GMT+1</p>
      <div className="pdiv" />
      <p className="ptech-title">Core technologies</p>
      <div className="pchips">
        {['Spring Boot', 'TypeScript', 'Next.js', 'React Native', 'Python', 'PostgreSQL'].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </aside>
  );
}

export default function Hero() {
  const ref = useReveal<HTMLElement>();
  return (
    <header id="top" ref={ref} className="relative pt-[158px] pb-[60px]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 px-7 lg:grid-cols-[1.45fr_.95fr]">
        <div>
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-[7px] text-[.79rem] tracking-[.03em]"
            style={{ color: 'var(--muted)', borderColor: 'var(--line)', background: 'rgba(127,120,100,.08)' }}>
            <span className="dot" /> Open to a PFE internship — let&apos;s discuss timing
          </span>
          <h1 className="h-display text-[clamp(2.8rem,6.4vw,4.8rem)] max-w-[16ch]">
            Building <em className="grad-text">complete products</em> — API, web, mobile.
          </h1>
          <p className="lede mt-6 max-w-[60ch] text-[1.06rem]" style={{ color: 'var(--muted)' }}>
            Hi, I&apos;m <strong style={{ color: 'var(--ink)' }}>Ahmed Ouarrali</strong>, a 5th-year Software
            Engineering student at ENSIASD Taroudant. I recently completed my end-of-year internship (PFA)
            at Zorium, building <strong style={{ color: 'var(--ink)' }}>OdemLab</strong>, an AI-augmented
            skincare e-commerce platform: Spring Boot API, Next.js storefront and back-office, React Native
            app, PostgreSQL + Redis, shipped with Docker to Google Cloud.
          </p>
          <div className="cta mt-8 flex flex-wrap gap-3.5">
            <a className="btn btn-gold" href="#work">Explore selected work</a>
            <a className="btn btn-ghost" href="#contact">Get in touch</a>
          </div>
          <div className="core mt-11 flex flex-wrap gap-2.5">
            {core.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
        <div><ProfileCard /></div>
      </div>
    </header>
  );
}
