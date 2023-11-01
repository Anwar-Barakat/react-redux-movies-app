import React, { useState } from "react";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadingImage/Img";

import "./style.scss";
import { PlayerBtn } from "../PlayerBtn";

const Video = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data.results.map((video, index) => {
              return (
                <div
                  className="videoItem"
                  key={index}
                  onClick={() => {
                    setVideoId(video.key);
                    setShow(true);
                  }}
                >
                  <div className="videoThumbnail">
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayerBtn />
                  </div>
                  <div className="videoTitle">{video.name}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default Video;
