import React, {useEffect, useState} from "react";
import { ProjectModal } from "./ProjectModal";

export const ProjectBox = (props) => {

  const [modalOpen, setModalOpen] = useState(false);
  

  return (
    <>
    
    <div className={`box ${props.className}`}>
      <div
        style={{
          background: `url(${props.projectImage}) no-repeat center`,
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <div className="overlay">
          <button onClick={() => setModalOpen(true)} >
            <h2>{props.projectName}</h2>
          </button>
        </div>
      </div>
    </div>

    {modalOpen && <ProjectModal setModalOpen={setModalOpen} {...props} />}
    </>
  );
};
