import { useEffect } from "react";
import { fetchDataFromAPI } from "./utils/api";

function App() {
  const apiTest = () => {
    fetchDataFromAPI("/movie/popular").then((result) => console.log(result));
  };

  useEffect(() => {
    apiTest();
  }, []);

  return <div className="App">App</div>;
}

export default App;
