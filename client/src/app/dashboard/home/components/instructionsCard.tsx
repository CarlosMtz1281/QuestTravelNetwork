import React from "react";
import { Card } from "../elements";

const InstructionsCard = () => {
  return (
    <Card>
      <div style={{ height: "50%", width: "100%" }}>
        <img
          src={"/InstImage.png"}
          alt="Instructions"
          style={{ width: "90%", height: "auto" }}
        />
      </div>
      <div style={{ height: "50%" }}>
        <h1 style={{ fontSize: "2em", fontWeight: "bold" }}>
          Explore the world
        </h1>
        <p
          style={{
            fontSize: "1.2em",
            fontWeight: "lighter",
            marginTop: "40px",
            marginBottom: "40px",
            color: "gray",
          }}
        >
          Explore the world by dragging the map to uncover incredible
          adventures, or share your own unforgettable experiences with fellow
          travelers!
        </p>
      </div>
    </Card>
  );
};

export default InstructionsCard;
