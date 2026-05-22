import { createTheme } from 'react-data-table-component';

createTheme(
  'creatorAI',
  {
    text: { primary: '#2A0500', secondary: '#6b7280' },
    background: { default: '#ffffff' },
    context: { background: '#e8f4fd', text: '#2A0500' },
    divider: { default: '#f0f0f0' },
    action: { button: '#6b7280', hover: 'rgba(0,0,0,0.04)', disabled: 'rgba(0,0,0,0.12)' },
    highlightOnHover: { default: '#fafafa', text: '#2A0500' },
    selected: { default: '#ede9fe', text: '#2A0500' },
    striped: { default: '#f9fafb', text: '#2A0500' },
    sortFocus: { default: '#f3f4f6' },
  },
  'default'
);
