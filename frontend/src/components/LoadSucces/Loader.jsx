import React from "react";
import Lottie from "lottie-react";
import bikeAnimation from './bikeAnimation.json' // Import your downloaded animation

const Loader = ({height}) => {

    const styles = {
        loaderContainer: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",  // Full viewport height according to each pages
          width: "100%",   // Full viewport width
          position: "fixed",  // Stay centered even when page scrolls
          top: 0,
          right: 20,
          zIndex:5,
          backgroundColor: "rgba(0, 0, 0, 0.6)" 
        },
        animationStyle: {
          height: 300,
        },
    };

  return <div style={styles.loaderContainer} >
        <Lottie animationData={bikeAnimation} loop={true} style={styles.animationStyle} />
  </div>
  
};

export default Loader;