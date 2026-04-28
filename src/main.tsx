import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { muiTheme } from './design/muiTheme';
import './styles/site/shared.css';
import './styles/site/signmons.css';
import './styles/site/demo.css';
import './styles/site/contact.css';
import './styles/site/business-rules.css';
import './styles/site/brand-voice.css';
import './styles/site/dispatch-scheduling.css';
import './styles/site/revenue-roi.css';
import './styles/site/pricing.css';
import './styles/site/done-for-you.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
