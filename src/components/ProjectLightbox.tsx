import { useEffect, useRef, type TouchEvent } from 'react';
import { createPortal } from 'react-dom';
import TopLayerCursor from './TopLayerCursor';
import { useLang, type ProjectGalleryImageT } from '../i18n-data';

type ProjectLightboxProps = {
  shot: ProjectGalleryImageT;
  position: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

export default function ProjectLightbox({ shot, position, total, onPrev, onNext, onClose }: ProjectLightboxProps) {
  const { t, lang } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start || total < 2) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) onNext(); else onPrev();
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    const returnFocus = document.activeElement as HTMLElement | null;
    if (dialog && !dialog.open) dialog.showModal();
    closeRef.current?.focus();
    return () => returnFocus?.focus();
  }, []);

  const close = () => dialogRef.current?.close();

  return createPortal(
    <dialog
      ref={dialogRef}
      className="project-lightbox"
      aria-labelledby="project-lightbox-caption"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          onPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          onNext();
        }
      }}
    >
      <div className="pl-panel">
        <div className="pl-bar">
          <p id="project-lightbox-caption" className="pl-caption" aria-live="polite">{shot.label[lang]}</p>
          <div className="pl-actions">
            <span className="pl-count" aria-hidden="true">
              {String(position + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button type="button" className="pd-nav" onClick={onPrev} aria-label={t.work.previousScreen}>
              <span aria-hidden="true">&larr;</span>
            </button>
            <button type="button" className="pd-nav" onClick={onNext} aria-label={t.work.nextScreen}>
              <span aria-hidden="true">&rarr;</span>
            </button>
            <button ref={closeRef} type="button" className="pd-close" onClick={close} aria-label={t.work.close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="pl-frame" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt[lang]} decoding="async" />
        </div>
      </div>
      <TopLayerCursor />
    </dialog>,
    document.body,
  );
}
