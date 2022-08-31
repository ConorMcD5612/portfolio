import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import gitImg from "../../images/github.png";

export const ProjectModal = ({
  gitLink,
  description,
  projectName,
  video,
  setModalOpen,
  link
}) => {
  return ReactDOM.createPortal(
  
      <div className="project-modal">
        <h2 className="project-name">{projectName}</h2>
        <div onClick={() => setModalOpen(false)} className="close-btn">
          X
        </div>
        <p className="description">{description}</p>
        <video  autoPlay loop>
          <source src={video}></source>
        </video>
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
