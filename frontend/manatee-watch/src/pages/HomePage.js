import { useOutletContext } from "react-router-dom";
import MainMap from "../components/mainMap";
import '../App.css'
import logo from "../assets/manatee-1.png"

function HomePage() {
  const { user } = useOutletContext();

  return (
    <>
    
      <MainMap />
    </>
  );
}

export default HomePage;