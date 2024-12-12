import dynamic from 'next/dynamic';

// Dynamically import the Map component
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
    return (
        <div style={{ height: '100vh' }}>
            
            <Map />
        </div>
    );
};