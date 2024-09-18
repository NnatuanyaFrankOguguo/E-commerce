import React, { useState } from "react";
import "./Homepage.css";
import Header from "../../components/Header/Header";
import Exploremenu from "../../components/Exploremenu/Exploremenu";
import Fooddisplay from "../../components/Fooddisplay/Fooddisplay";
import Mobileapp from "../../components/Appdownload/Mobileapp";

function Homepage() {

    const [category, setcategory] = useState('All') /*we will pass it as props */

  return (
    <div>
      <Header/>
      <Exploremenu category={category} setcategory={setcategory}/>
      <Fooddisplay category={category}/>
      <Mobileapp/>
    </div>
  )
}

export default Homepage
