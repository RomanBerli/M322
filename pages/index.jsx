import dynamic from 'next/dynamic';

// Dynamically import the Map component
const Map = dynamic(() => import('../components/Map'), { ssr: false });

const Home = () => {
    return (
        <div style={{ height: '100vh' }}>
            <h1>Zoo App Map</h1>
            <Map />
        </div>
    );
};

export default Home;
