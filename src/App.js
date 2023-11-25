import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import SearchFlight from "./components/pages/SearchFlight";
import FlightLists from "./components/pages/FlightList.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search-flight" element={<SearchFlight />} />
        <Route path="/flight/list" element={<FlightLists/>} />
      </Routes>
    </>
  );
}

export default App;
