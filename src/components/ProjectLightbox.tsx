import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLang, type ProjectGalleryImageT } from '../i18n-data';

type ProjectLightboxProps = {
  shot: ProjectGalleryImageT;
  onClose: () => void;
};

export default function ProjectLightbox({ shot, onClose }: ProjectLightboxProps) {
  const { t, lang } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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
    >
      <div className="pl-panel">
        <div className="pl-bar">
          <p id="project-lightbox-caption" className="pl-caption">{shot.label[lang]}</p>
          <button ref={closeRef} type="button" className="pd-close" onClick={close} aria-label={t.work.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="pl-frame">
          <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt[lang]} decoding="async" />
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
