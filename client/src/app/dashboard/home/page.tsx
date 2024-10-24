"use client";

import React, { useState } from "react";
import WorldMap from "./components/world";
import InstructionsCard from "./components/instructionsCard";
import CountryCard from "./components/countryCard";
import { Container } from "./elements";

interface Country {
  id: string;
  name: string;
}

const defaultCountry: Country = {
  id: "MX",
  name: "Mexico",
};

const HomePage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(defaultCountry);

  return (
    <Container>
      <CountryCard selectedCountry={selectedCountry} />
      <WorldMap setSelectedCountry={setSelectedCountry} />
      <InstructionsCard />
    </Container>
  );
};

export default HomePage;
