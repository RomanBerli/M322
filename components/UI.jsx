// pages/index.js
import React, { useEffect,useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import "primereact/resources/themes/saga-purple/theme.css"; // Choose your PrimeReact theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useSwipeable } from "react-swipeable";
import dynamic from "next/dynamic";
import dbJson from '../Database/db.json';


// Dynamically import the Map component
const Map = dynamic(() => import('../components/Map'), { ssr: false });

const UI = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        { label: "Favorites", icon: "pi pi-heart" },
        { label: "Restaurants", icon: "pi pi-utensils" },
        { label: "Animals", icon: "pi pi-paw" },
        { label: "Attractions", icon: "pi pi-map-marker" },
        { label: "Fun", icon: "pi pi-smile" },
    ];

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        setMarkers(dbJson.markers);
    }, []);

    

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setActiveIndex((prev) => Math.min(prev + 1, items.length - 1)),
        onSwipedRight: () => setActiveIndex((prev) => Math.max(prev - 1, 0)),
    });

    return (
        <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
            {/* Map Placeholder */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#d4e6f1",
                }}
            >
                {/*<h1 style={{ textAlign: "center", marginTop: "50vh", color: "#555" }}>*/}
                {/*    Map Placeholder*/}
                {/*</h1>*/}
                <Map></Map>
            </div>

            {/* Swipe Menu */}
            <div
                {...swipeHandlers}
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#f7f7f7",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                }}
            >
                {/* Tab Menu */}
                <TabMenu
                    model={items}
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                    style={{ padding: "1rem" }}
                />

                {/* Content Based on Active Tab */}
                <div style={{ padding: "1rem" }}>
                    {dbJson.markers.filter((item) => item.type == "animal"
                    ).map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "1rem",
                                padding: "1rem",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                            }}
                        >
                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    backgroundColor: "#eee",
                                    marginRight: "1rem",
                                    borderRadius: "8px",
                                }}
                            ></div>
                            <div>
                                <h3 style={{ margin: 0 }}>{item.title}</h3>
                                <p style={{ margin: 0, color: "#666" }}>{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UI;
