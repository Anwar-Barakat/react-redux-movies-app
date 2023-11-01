import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";

const Home = () => {
  return (
    <section className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
    </section>
  );
};

export default Home;
