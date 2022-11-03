import { createRoot } from 'react-dom/client';
import { PopupPage } from './components/PopupPage';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<PopupPage />);
