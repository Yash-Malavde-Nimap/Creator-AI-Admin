import { useEffect } from 'react';
import { useHeaderContext, type PageActions } from '../../contexts/HeaderContext';

/**
 * Drop this anywhere inside a page to wire up header buttons.
 * Renders nothing — all buttons are rendered by Header.tsx.
 *
 * Example:
 *   <HeaderActions onSort={handleSort} onExport={handleExport} />
 */
export default function HeaderActions(props: PageActions) {
  const { setActions } = useHeaderContext();

  useEffect(() => {
    setActions(props);
    return () => setActions({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onSort, props.onExport, props.onAdd, props.onFilter]);

  return null;
}
