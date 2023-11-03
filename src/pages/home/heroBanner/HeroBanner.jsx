import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadingImage/Img";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

const HeroBanner = () => {
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch(`/movie/upcoming`);

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <section className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="content">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input
                type="search"
                placeholder="Search here... "
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
                id="Search input"
              />
              <button type="button">Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default HeroBanner;
