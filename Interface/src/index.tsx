import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'css/fonts.css';
import App from 'App';


const container = document.getElementById('root');
const root = createRoot(container as Element);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);