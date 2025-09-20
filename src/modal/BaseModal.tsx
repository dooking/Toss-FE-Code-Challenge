import React from 'react';

export type BaseModalProps = {
  children: React.ReactNode;
  onRequestClose: () => void;
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
};

function BaseModal({
  children,
  onRequestClose,
  closeOnEsc = true,
  closeOnBackdrop = false,
}: BaseModalProps) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  // body scroll lock
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  React.useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onKeyDown = (e: KeyboardEvent) => {
      // esc
      if (e.key === 'Escape' && closeOnEsc) {
        e.stopPropagation();
        onRequestClose();
      }
      if (e.key !== 'Tab') return;

      // focus trap
      const focusable = getFocusable(panel);
      if (focusable.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const isShift = e.shiftKey;

      if (!isShift && active === last) {
        e.preventDefault();
        first.focus();
      } else if (isShift && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    panel.addEventListener('keydown', onKeyDown);
    return () => {
      panel.removeEventListener('keydown', onKeyDown);
    };
  }, [closeOnEsc, onRequestClose]);

  return (
    <div
      className={'fixed inset-0 flex items-center justify-center z-50'}
      aria-hidden="true"
      onMouseDown={(e) => {
        if (!closeOnBackdrop) return;
        if (e.target === e.currentTarget) onRequestClose();
      }}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-container"
        aria-describedby="modal-desc"
        className={
          'relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 outline-none z-60  max-h-[90vh] overflow-y-auto'
        }
        tabIndex={-1}
        ref={panelRef}
      >
        {children}
      </div>
    </div>
  );
}

function getFocusable(root: HTMLElement): HTMLElement[] {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    "[tabindex]:not([tabindex='-1'])",
  ].join(',');
  return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
  );
}

export default BaseModal;
