import React, { useCallback, useEffect, useState } from "react";
import noResult from "../../assets/no-results.png";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";

import "./style.scss";
import { useParams } from "react-router-dom";
import { fetchDataFromAPI } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = useCallback(() => {
    setLoading(true);
    fetchDataFromAPI(`/search/multi?query=${query}&page${pageNum}`).then(
      (result) => {
        setData(result);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  }, [pageNum, query]);

  const fetchNextPageData = useCallback(() => {
    setLoading(true);
    fetchDataFromAPI(`/search/multi?query=${query}&page${pageNum}`).then(
      (res) => {
        if (data.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  }, [query, pageNum, data]);

  console.log(data);

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [fetchInitialData, pageNum]);

  return (
    <section className="searchResultsPage">
      {loading && <Spinner />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of (${query})`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((ele, index) => {
                  if (ele.media_type === "person") return;
                  return <MovieCard key={index} data={ele} fromSearch={true} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Not Found!</span>
          )}
        </ContentWrapper>
      )}
    </section>
  );
};

export default SearchResult;
