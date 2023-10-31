import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";

const Home = () => {
  return (
    <section className="homePage">
      <HeroBanner />
      <Trending />
    </section>
  );
};

export default Home;
