function ResultCards({
  sighting_date,
  image,
  setPositionData,
  coord
}: any) {
  // const {data, setData} = useOutletContext();


    const handleClick = () => {
      setPositionData({location: coord})
      console.log(coord);
    };
  

  return (
    <>
    <div onClick={handleClick} style={{ margin: "1em", boxShadow: "-.1em 0 .4em rgb(73, 102, 102)", width: '90%', minHeight: "200px", height: "40%", textAlign:"center", position:"relative", color:"white", fontWeight:"bold"}}>
      <img style={{ height: "100%", width: "100%", objectFit: "cover"}} variant="top" src={image} alt="manatee" />
      <div style={{ position:"absolute", top:"8px", right:"16px"}}>{sighting_date}</div>
    </div>
    </>
  );
}

export default ResultCards;
