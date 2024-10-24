import React from "react";
import WorldMap from "./components/world";
import InstructionsCard from "./components/instructionsCard";
import { Container, Card } from "./elements";

const HomePage = () => {
  return (
    <Container>
      <Card>Card 1</Card>
      <WorldMap />
      <Card>Card 2</Card>
    </Container>
  );
};

export default HomePage;
