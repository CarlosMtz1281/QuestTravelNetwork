"use client";

import React, { useState } from "react";
import WorldMap from "./components/world";
import InstructionsCard from "./components/instructionsCard";
import CountryCard from "./components/countryCard";
import PostCard from "./components/postCard";
import { Container } from "./elements";

interface Country {
  id: string;
  name: string;
}

interface Post {
  location: string;
  img: string;
  likes: number;
  description: string;
  author: string;
}

const defaultCountry: Country = {
  id: "MX",
  name: "Mexico",
};

const HomePage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    defaultCountry
  );
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostSelect = (post: Post | null) => {
    setSelectedPost(post);
  };

  return (
    <Container>
      <CountryCard
        selectedCountry={{ country: selectedCountry }}
        onPostSelect={handlePostSelect}
      />
      <WorldMap setSelectedCountry={setSelectedCountry} />
      {selectedPost ? (
        <PostCard post={selectedPost} onPostSelect={handlePostSelect} />
      ) : (
        <InstructionsCard />
      )}
    </Container>
  );
};

export default HomePage;
