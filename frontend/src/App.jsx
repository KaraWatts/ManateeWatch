import { useState } from "react";
// import { Navbar } from "./components/navBar";
import { Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);

  return (
    <>
      {/* <Navbar /> */}
      <Outlet context={{ data, setData }} />
    </>
  );
}