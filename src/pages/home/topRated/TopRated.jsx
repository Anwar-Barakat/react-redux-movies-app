import React, { useState } from "react";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import "../carouselStyle.scss";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movie" ? "movie" : "tv");
  };
  return (
    <section className="carouselSection">
      <ContentWrapper>
        <span className="title">Top Rated</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </section>
  );
};

export default TopRated;
