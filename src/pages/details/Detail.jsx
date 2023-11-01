import React from "react";
import "./style.scss";
import DetailBanner from "./detailBanner/DetailBanner";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const Detail = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  console.log(data);

  return (
    <section>
      <DetailBanner video={data?.results?.[0]} crew={credits?.crew} />
    </section>
  );
};

export default Detail;
