import type { TableStyles } from 'react-data-table-component';

const FONT = "'Switzer', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const tableCustomStyles: TableStyles = {
  table: {
    style: {
      backgroundColor: '#ffffff',
      border: 'none',
    },
  },
  head: {
    style: { fontFamily: FONT },
  },
  headRow: {
    style: {
      backgroundColor: '#ffffff',
      borderBottomColor: '#f0f0f0',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      minHeight: '48px',
      position:"sticky"
    },
  },
  headCells: {
    style: {
      fontFamily: FONT,
      fontSize: '11px',
      fontWeight: 700,
      color: '#2A0500',
      textTransform: 'uppercase',
      letterSpacing: '0.07em',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '14px',
      paddingBottom: '14px',
    },
  },
  rows: {
    style: {
      fontFamily: FONT,
      minHeight: '58px',
      borderBottomColor: '#f0f0f0',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      backgroundColor: '#ffffff',
    },
    highlightOnHoverStyle: {
      backgroundColor: '#fafafa',
      transitionDuration: '0.15s',
      transitionProperty: 'background-color',
      outlineStyle: 'none',
    },
  },
  cells: {
    style: {
      fontFamily: FONT,
      fontSize: '13.5px',
      fontWeight: 400,
      color: '#2A0500',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  noData: {
    style: {
      fontFamily: FONT,
      padding: '48px 20px',
      color: '#878787',
      fontSize: '14px',
      backgroundColor: '#ffffff',
    },
  },
  progress: {
    style: {
      backgroundColor: '#ffffff',
      padding: '48px 0',
    },
  },
};
