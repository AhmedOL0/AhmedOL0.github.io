import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLang, type ProjectGalleryImageT, type ProjectT } from '../i18n-data';

type ProjectDialogProps = {
  project: ProjectT;
  gallery: ProjectGalleryImageT[];
  tags: string[];
  onClose: () => void;
};

export default function ProjectDialog({ project, gallery, tags, onClose }: ProjectDialogProps) {
  const { t, lang } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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
    >
      <div className="pd-panel">
        <div className="pd-head">
          <div>
            <p className="pd-kicker">{project.kind} &middot; {project.year}</p>
            <h2 id="project-dialog-title" className="pd-title font-serif-d">{project.title}</h2>
          </div>
          <button ref={closeRef} type="button" className="pd-close" onClick={close} aria-label={t.work.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="pd-scroll">
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
            {gallery.map((shot) => (
              <figure className="pd-shot" key={shot.src}>
                <img
                  src={shot.src}
                  width={shot.width}
                  height={shot.height}
                  alt={shot.alt[lang]}
                  loading="lazy"
                  decoding="async"
                />
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
    </dialog>,
    document.body,
  );
}
