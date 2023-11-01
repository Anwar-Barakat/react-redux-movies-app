import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadingImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import "./style.scss";
import { PlayerBtn } from "../PlayerBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailBanner = ({ video, crew }) => {
  const { url } = useSelector((state) => state.home);

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const movieGenre = data?.genres.map((ele) => ele.id);
  const director = crew?.filter((item) => item.job === "Director");
  const writer = crew?.filter(
    (item) =>
      item.job === "Writer" || item.job === "Story" || item.job === "Screenplay"
  );
  console.log(director, writer);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        src={url.backdrop + data.backdrop_path}
                        className="posterImg"
                      />
                    ) : (
                      <Img src={PosterFallback} className="posterImg" />
                    )}
                  </div>
                  <div className="right">
                    {/* Movie, TV Show Main Info */}
                    <div className="title">
                      {`${data.name || data.title}`} (
                      {dayjs(data?.release_date).format("YYYY")})
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={movieGenre} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayerBtn />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Display Directors */}
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Director :{" "}
                          {director?.map((ele, index) => (
                            <span className="text" key={index}>
                              {ele.name}
                              {director.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* Display Writer */}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Writer :{" "}
                          {writer?.map((ele, index) => (
                            <span className="text" key={index}>
                              {ele.name}
                              {writer.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* Display Creators */}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Creator:{" "}
                          {data?.created_by?.map((ele, index) => (
                            <span className="text" key={index}>
                              {ele.name}
                              {data?.created_by.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ContentWrapper>

              <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
              />
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailBanner;
