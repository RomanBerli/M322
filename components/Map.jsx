import dynamic from 'next/dynamic';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import dbJson from '../Database/db.json';

// Import leaflet CSS dynamically to avoid issues during SSR
if (typeof window !== 'undefined') {
    import('leaflet/dist/leaflet.css');
}

export default function Map() {
    const [isClient, setIsClient] = useState(false);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        // Set client-side rendering flag
        setIsClient(true);

        setMarkers(dbJson.markers);
    }, []);

    if (!isClient) {
        // Render a placeholder during SSR
        return <div>Loading map...</div>;
    }

    // Dynamically import react-leaflet components
    const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
    const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
    const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
    const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

    const bounds = [
        [47.38336, 8.58034], // Southwest corner
        [47.39036, 8.57047], // Northeast corner
    ];

    const position = [47.38686, 8.57592]; // Default coordinates
    const customIcon = new L.Icon({
        iconUrl: '/marker.png',
        iconSize: [40, 40]
    });

    return (
        <MapContainer center={position} zoom={40} style={{ height: '100vh', width: '100%' }} maxBounds={bounds} maxBoundsViscosity={1.0} minZoom={16} maxZoom={18}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (

                <Marker key={index} position={[marker.positionY, marker.positionX]} icon={customIcon}>
                    <Popup>
                    <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2>{marker.title}</h2>
                                    <p>{marker.species}</p>
                                </div>
                                <img src={marker.image} alt="Bild" width={100}/>
                            </div>
                           <p>{marker.description}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};