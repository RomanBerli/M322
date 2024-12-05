import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Import leaflet CSS dynamically to avoid issues during SSR
if (typeof window !== 'undefined') {
    import('leaflet/dist/leaflet.css');
}

const Map = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set client-side rendering flag
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Render a placeholder during SSR
        return <div>Loading map...</div>;
    }

    // Dynamically import react-leaflet components
    const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
    const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
    // const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
    // const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

    const bounds = [
        [47.38336, 8.58034], // Southwest corner
        [47.39036, 8.57047], // Northeast corner
    ];


    const position = [47.38686, 8.57592]; // Default coordinates

    return (
        <MapContainer center={position} zoom={40} style={{ height: '100vh', width: '100%' }} maxBounds={bounds} maxBoundsViscosity={1.0} minZoom={17} maxZoom={18}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <Marker position={position}>
                <Popup>
                    A sample popup for OpenStreetMap integration.
                </Popup>
            </Marker> */}
        </MapContainer>
    );
};

export default Map;
