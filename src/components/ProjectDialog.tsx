import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ProjectLightbox from './ProjectLightbox';
import TopLayerCursor from './TopLayerCursor';
import { useLang, type ProjectGalleryImageT, type ProjectT } from '../i18n-data';

type ProjectDialogProps = {
  project: ProjectT;
  gallery: ProjectGalleryImageT[];
  tags: string[];
  position: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

export default function ProjectDialog({ project, gallery, tags, position, total, onPrev, onNext, onClose }: ProjectDialogProps) {
  const { t, lang } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeShotIndex, setActiveShotIndex] = useState<number | null>(null);
  const activeShot = activeShotIndex === null ? null : gallery[activeShotIndex] ?? null;

  useEffect(() => {
    const dialog = dialogRef.current;
    const root = document.documentElement;
    const returnFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    root.classList.add('has-project-dialog');
    if (dialog && !dialog.open) dialog.showModal();
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      root.classList.remove('has-project-dialog');
      returnFocus?.focus();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.title]);

  const close = () => dialogRef.current?.close();

  return createPortal(
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onCancel={(event) => {
        if (activeShotIndex !== null) {
          event.preventDefault();
          setActiveShotIndex(null);
        }
      }}
      onKeyDown={(event) => {
        if (activeShotIndex !== null) return;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          onPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          onNext();
        }
      }}
    >
      <div className="pd-panel">
        <div className="pd-head">
          <div className="pd-head-main">
            <p className="pd-kicker">{project.kind} &middot; {project.year}</p>
            <h2 id="project-dialog-title" className="pd-title font-serif-d">{project.title}</h2>
          </div>
          <div className="pd-head-actions">
            <span className="pd-count" aria-hidden="true">
              {String(position + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button type="button" className="pd-nav" onClick={onPrev} aria-label={t.work.previousProject}>
              <span aria-hidden="true">&larr;</span>
            </button>
            <button type="button" className="pd-nav" onClick={onNext} aria-label={t.work.nextProject}>
              <span aria-hidden="true">&rarr;</span>
            </button>
            <button ref={closeRef} type="button" className="pd-close" onClick={close} aria-label={t.work.close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="pd-scroll">
          <p className="pd-desc">{project.description}</p>

          <div className="pd-notes">
            <div>
              <p className="pd-label">{t.work.approachLabel}</p>
              <p>{project.highlight}</p>
            </div>
            {project.result && (
              <div>
                <p className="pd-label">{t.work.outcomeLabel}</p>
                <p>{project.result}</p>
              </div>
            )}
          </div>

          <div className="pd-tags">
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>

          <div className="pd-gallery-head">
            <p className="pd-label">{t.work.screensLabel}</p>
            <span aria-hidden="true">{gallery.length}</span>
          </div>
          <div className="pd-gallery">
            {gallery.map((shot, shotIndex) => (
              <figure className="pd-shot" key={shot.src}>
                <button
                  type="button"
                  className="pd-shot-open"
                  onClick={() => setActiveShotIndex(shotIndex)}
                  aria-label={`${t.work.enlarge}: ${shot.label[lang]}`}
                >
                  <img
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt={shot.alt[lang]}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="pd-shot-zoom" aria-hidden="true">&#8599;</span>
                </button>
                <figcaption>{shot.label[lang]}</figcaption>
              </figure>
            ))}
          </div>

          <div className="pd-actions">
            {project.linkHref && (
              <a className="btn btn-ghost btn-sm" href={project.linkHref} target="_blank" rel="noopener noreferrer">
                {project.linkLabel}<span className="arr">&rarr;</span>
              </a>
            )}
            <a className="btn btn-gold btn-sm" href="#contact" onClick={close}>
              {t.work.discuss}<span className="arr">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
      {activeShotIndex === null && <TopLayerCursor />}
      {activeShot && activeShotIndex !== null && (
        <ProjectLightbox
          shot={activeShot}
          position={activeShotIndex}
          total={gallery.length}
          onPrev={() => setActiveShotIndex((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length)}
          onNext={() => setActiveShotIndex((current) => current === null ? null : (current + 1) % gallery.length)}
          onClose={() => setActiveShotIndex(null)}
        />
      )}
    </dialog>,
    document.body,
  );
}
