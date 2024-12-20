import {PrimeReactProvider, PrimeReactContext} from "primereact/api";
import 'primereact/resources/themes/lara-dark-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'leaflet/dist/leaflet.css';
import '../styles/_app.css';

export default function App({ Component, pageProps }) {
    return (
        <PrimeReactProvider>
            <main className="page">
                {<Component {...pageProps} />}
            </main>
        </PrimeReactProvider>
    )
}