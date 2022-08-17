import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';
import App from './App';
import { theme } from './config/themes';
import './styles/index.css'
import { themeMaster } from './utils/theme';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   // <React.StrictMode>
//     <App />
//   // </React.StrictMode>
// );

themeMaster(theme)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
