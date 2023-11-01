import React, { useRef } from "react";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import PosterFallback from "../../assets/no-poster.png";
import Img from "../lazyLoadingImage/Img";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endpoint }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <section className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="arrow carouselLeftNav"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="arrow carouselRightNav"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((element) => {
              const posterURL = element.poster_path
                ? url.poster + element.poster_path
                : PosterFallback;
              console.log(element);
              return (
                <div
                  key={element.id}
                  className="carouselItem"
                  onClick={() => {
                    navigate(
                      `/${element.media_type || endpoint}/${element.id}`
                    );
                  }}
                >
                  <div className="posterBlock">
                    <Img src={posterURL} alt={element.original_title} />
                    <CircleRating rating={element.vote_average.toFixed(1)} />
                    <Genres data={element.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {element.title || element.name}
                    </span>
                    <span className="date">
                      {dayjs(element.released_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </section>
  );
};

export default Carousel;
