import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import gitImg from "../../images/github.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"

import ticImg1 from "../../images/ticImages/ticImg1.JPG"
import ticImg2 from "../../images/ticImages/ticImg2.jpg"
import ticImg3 from "../../images/ticImages/ticImg3.JPG"
import ticImg4 from "../../images/ticImages/ticImg4.JPG"

import yesterImg1 from "../../images/yesterImages/yesterImage1.jpg" 
import yesterImg2 from "../../images/yesterImages/yesterImage2.jpg"
import yesterImg3 from "../../images/yesterImages/yesterImage3.jpg"
import yesterImg4 from "../../images/yesterImages/yesterImage4.jpg"

const yesterArr = [yesterImg1, yesterImg2, yesterImg3, yesterImg4]
const ticArr = [ticImg1, ticImg2, ticImg3, ticImg4]



export const ProjectModal = ({
  gitLink,
  description,
  projectName,
  setModalOpen,
  link
}) => {

  const imagePicker = (i) => {
    if(projectName == "Yestermorrow"){
      return yesterArr[i]
    }

    return ticArr[i]
  }
  return ReactDOM.createPortal(

    <div className="project-modal">
      <h2 className="project-name">{projectName}</h2>
      <div onClick={() => setModalOpen(false)} className="close-btn">
        X
      </div>
      <p className="description">{description}</p>


      <Carousel interval={2000} className="carousel-container" showArrows={false} showIndicators={false}  autoPlay={true} infiniteLoop={true} >

        <div>
          <img src={imagePicker(0)} />
        </div>
        <div>
          <img src={imagePicker(1)} />
        </div>
        <div>
          <img src={imagePicker(2)} />
        </div>

        <div>
          <img src={imagePicker(3)} />
        </div>

      </Carousel>

      <div className="links">
        <a className="git-link" target="_blank" href={gitLink}>
          <img src={gitImg} />
        </a>
        <a target="_blank" href={link} className="project-link">Project Link</a>
      </div>
    </div>
    ,

    document.getElementById("modal")
  );
};
