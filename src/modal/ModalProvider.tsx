import React from 'react';
import { createPortal } from 'react-dom';

import BaseModal from './BaseModal';

type Ctx<T> = {
  open: (node: React.ReactNode) => Promise<T | undefined>;
  close: (value?: T) => void;
  isOpen: boolean;
};

const ModalContext = React.createContext<Ctx<unknown> | null>(null);

export function useModal<T = unknown>() {
  const ctx = React.useContext(ModalContext) as Ctx<T> | null;
  if (!ctx) {
    throw new Error('useModal throw error');
  }
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState<React.ReactNode>(null);
  const resolverRef = React.useRef<((v?: unknown) => void) | null>(null);

  const openModal = React.useCallback(
    (node: React.ReactNode) =>
      new Promise<unknown | undefined>((resolve) => {
        resolverRef.current = resolve;
        setContent(node);
        setOpen(true);
      }),
    [],
  );

  const closeModal = React.useCallback((value?: unknown) => {
    resolverRef.current?.(value);
    resolverRef.current = null;
    setOpen(false);

    setTimeout(() => {
      setContent(null);
    }, 0);
  }, []);

  const ctxValue = React.useMemo<Ctx<unknown>>(
    () => ({ open: openModal, close: closeModal, isOpen: open }),
    [openModal, closeModal, open],
  );

  return (
    <ModalContext.Provider value={ctxValue}>
      {children}
      {open && typeof document !== 'undefined'
        ? createPortal(
            <BaseModal onRequestClose={() => closeModal(undefined)}>{content}</BaseModal>,
            document.body,
          )
        : null}
    </ModalContext.Provider>
  );
}
