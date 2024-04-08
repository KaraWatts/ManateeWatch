import { useOutletContext } from "react-router-dom";
import MainMap from "../components/mainMap";
import '../App.css'

function HomePage() {
  const { user } = useOutletContext();

  return (
    <>
      <MainMap />
    </>
  );
}

export default HomePage;