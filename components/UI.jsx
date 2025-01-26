// pages/index.js
import React, { useEffect, useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import "primereact/resources/themes/saga-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useSwipeable } from "react-swipeable";
import dynamic from "next/dynamic";
import dbJson from "../Database/db.json";

// Dynamically import the Map component
const Map = dynamic(() => import("../components/Map"), { ssr: false });

const UI = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [markers, setMarkers] = useState([]);

  const items = [
    { label: "Favorites", icon: "pi pi-heart", type: "favorite" },
    { label: "Restaurants", icon: "pi pi-utensils", type: "restaurant" },
    { label: "Animals", icon: "pi pi-paw", type: "animal" },
    { label: "Attractions", icon: "pi pi-map-marker", type: "attraction" },
    { label: "Fun", icon: "pi pi-smile", type: "fun" },
  ];

  useEffect(() => {
    setMarkers(dbJson.markers);
  }, []);

  const filteredMarkers = markers.filter(
    (marker) => marker.type === items[activeIndex]?.type
  );

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
          height: expanded ? "70vh" : "35vh",
          backgroundColor: "#f7f7f7",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          transition: "height 0.3s ease",
        }}
      >
        {/* Expand/Collapse Button */}
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1001,
          }}
        >
          <button
            onClick={() => setExpanded((prev) => !prev)}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
          >
            {expanded ? "▼" : "▲"}
          </button>
        </div>

        {/* Tab Menu */}
        <TabMenu
          model={items}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          style={{ padding: "1rem" }}
        />

        {/* Content Based on Active Tab */}
        <div style={{ padding: "1rem", overflowY: "auto", maxHeight: "calc(100% - 70px)" }}>
          {filteredMarkers.map((item, idx) => (
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
                 <img src={item.image} alt="Bild" width={"50px"}  style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "1rem",
                  borderRadius: "8px",
                }}/>
              <div>
                <h3 style={{ margin: 0 }}>{item.title}</h3>
                <p style={{ margin: 0, color: "#666" }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UI;
