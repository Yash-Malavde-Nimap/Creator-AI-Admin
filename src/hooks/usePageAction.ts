import { useEffect } from 'react';
import { useHeaderContext } from '../contexts/HeaderContext';

/**
 * Registers a click handler for the current page's header action button.
 * The button shape is defined in config/headerActions.tsx — this hook
 * only wires in the functionality, keeping UI and logic separate.
 *
 * Usage:
 *   const handleSort = useCallback(() => { ... }, [deps]);
 *   usePageAction(handleSort);
 */
export function usePageAction(handler: () => void) {
  const { setHandler } = useHeaderContext();

  useEffect(() => {
    setHandler(handler);
    return () => setHandler(null);
  }, [handler, setHandler]);
}
