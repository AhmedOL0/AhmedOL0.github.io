export default function SealMark({ className = '' }: { className?: string }) {
  return (
    <div className={`seal-mark ${className}`} aria-hidden="true">
      <svg viewBox="0 0 72 72" focusable="false">
        <circle cx="36" cy="36" r="32" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="36" cy="36" r="27" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".45" />
        <circle className="seal-dot" cx="36" cy="4" r="2" />
        <text className="seal-letter" x="36" y="47" textAnchor="middle">A</text>
        <circle className="seal-badge" cx="58" cy="58" r="9" stroke="currentColor" strokeWidth="1.1" />
        <path className="seal-check" d="M54 58l3 3 6-7" />
      </svg>
    </div>
  );
}
