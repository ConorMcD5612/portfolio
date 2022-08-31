import React, { useState } from "react";
import { ProjectBox } from "./ProjectBox";
import ticImg from "../../images/tic.JPG";
import yesterImg from "../../images/yestermorrow.JPG";
import { ProjectModal } from "./ProjectModal";
import ticVideo from "../../images/ticTacToe.mp4";
import yesterVideo from "../../images/yestermorrow.mov";

export const ProjectPage = () => {
  const descriptions = {
    yestermorrow:
      "This website was originally created with me and a team of four other developers. It's a alumni-networking site made for a non-profit architecture and design school in Waitsfield, Vermont. It was developed using React and Firebase",
    ticTacToe: "A spin on tic-tac-toe, played on 9 boards.",
  };

  const ticGitLink = "https://github.com/ConorMcD5612/Ultimate-Tic-Tac-Toe";
  const yesterGitLink = "https://github.com/ConorMcD5612/bca-yestermorrow";

  const yesterLink = "https://fast-ravine-88166.herokuapp.com/"
  const ticLink = "https://conormcd5612.github.io/"

  return (
    <>
      <div className=" section">
        <div className="projects">
          <h1>My Work</h1>
          {/* <div className="projectBox-container"> */}
            <ProjectBox
              className="projectBox-1"
              projectName="Yestermorrow"
              projectImage={yesterImg}
              gitLink={yesterGitLink}
              description={descriptions.yestermorrow}
              video={yesterVideo}
              link={yesterLink}
            />
            <ProjectBox
              className="projectBox-2"
              projectName="9x Tic-Tac-Toe"
              projectImage={ticImg}
              gitLink={ticGitLink}
              description={descriptions.ticTacToe}
              video={ticVideo}
              link={ticLink}
            />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
