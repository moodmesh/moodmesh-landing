import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import WavyParticles from './components/ui/wavyparticles.tsx'

createRoot(document.getElementById('root')!).render(
    <WavyParticles>
        <App />
    </WavyParticles>
)