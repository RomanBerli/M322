import dynamic from 'next/dynamic';
import UI from "../components/UI";

// Dynamically import the Map component
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
    return (
        <div style={{ height: '100vh' }}>
            <UI></UI>
        </div>
    );
};