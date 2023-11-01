import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const Home = () => {
  return (
    <section className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </section>
  );
};

export default Home;
