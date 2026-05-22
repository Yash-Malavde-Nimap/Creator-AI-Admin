import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './SidePanel.module.scss';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  width?: string;
  children: ReactNode;
}

export default function SidePanel({
  isOpen,
  onClose,
  title,
  subtitle,
  width = '540px',
  children,
}: SidePanelProps) {
  // ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return createPortal(
    <div
      className={[styles.overlay, isOpen ? styles.visible : ''].join(' ')}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        className={[styles.panel, isOpen ? styles.open : ''].join(' ')}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close panel">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
