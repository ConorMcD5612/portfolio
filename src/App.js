import logo from "./logo.svg";
import "./App.scss";
import { ContactPage } from "./components/ContactPage/ContactPage";
import { ProjectPage } from "./components/ProjectPage/ProjectPage";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Background } from "./components/background/Background";

function App() {
  return (
    <>
   
      <Background />
      <LandingPage />
      <ProjectPage />
      <ContactPage />

    </>
  );
}

export default App;
