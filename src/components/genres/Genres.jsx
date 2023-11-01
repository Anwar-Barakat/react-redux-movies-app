import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data.map((ele) => {
        if (!genres[ele].name) return;

        return (
          <div key={ele} className="genre">
            {genres[ele].name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
