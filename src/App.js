import { useCallback, useEffect } from "react";
import { fetchDataFromAPI } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/slices/homeSlice";
import "../src/pages/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Detail,
  Explore,
  Footer,
  Header,
  Home,
  NotFound,
  SearchResult,
} from "../src/pages/index";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  const apiTest = useCallback(() => {
    fetchDataFromAPI("/configuration").then((result) => {
      console.log(result.images);
      const url = {
        backdrop: `${result.images.secure_base_url}original`,
        poster: `${result.images.secure_base_url}original`,
        profile: `${result.images.secure_base_url}original`,
      };
      dispatch(getApiConfiguration(url));
    });
  }, [dispatch]);

  const genresCall = useCallback(async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((genre) => (allGenres[genre.id] = genre));
    });

    dispatch(getGenres(allGenres));
  }, [dispatch]);

  useEffect(() => {
    apiTest();
    genresCall();
  }, [apiTest, genresCall]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Detail />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
