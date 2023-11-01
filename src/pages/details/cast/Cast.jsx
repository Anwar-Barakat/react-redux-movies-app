import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../../assets/avatar.png";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

import "./style.scss";
import Img from "../../../components/lazyLoadingImage/Img";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <section className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Top Cast</div>
        {!loading ? (
          <div className="listItems">
            {data.map((ele) => {
              let imgURL = ele.profile_path
                ? url.profile + ele.profile_path
                : avatar;
              return (
                <div className="listItem" key={ele.id}>
                  <div className="profileImg">
                    <Img src={imgURL} alt="Crew Image" />
                  </div>
                  <div className="name">{ele.name}</div>
                  <div className="character">{ele.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </section>
  );
};

export default Cast;
