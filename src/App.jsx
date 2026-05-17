import { useEffect, useState } from "react";
import "./App.css";

import Upload from "./pages/Upload";

export default function App() {
  const [route, setRoute] = useState(
    window.location.pathname
  );

  const [showIntroVideo, setShowIntroVideo] =
    useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener(
      "popstate",
      handleRouteChange
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handleRouteChange
      );
    };
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  const openPlayerWithIntro = () => {
    setShowIntroVideo(true);
  };

  const closeIntroAndOpenPlayer = () => {
    setShowIntroVideo(false);
    navigateTo("/player");
  };

  /* ROUTES */

  if (route === "/upload") {
    return <Upload />;
  }

  if (route === "/player") {
    return (
      <div className="app">
        <main className="playerPlaceholder">
          <h1>Lecteur Yamaha STY</h1>

          <p>
            Interface PSR-SX700 en préparation...
          </p>

          <button
            className="menuBtn"
            onClick={() => navigateTo("/")}
          >
            Retour accueil
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      {showIntroVideo && (
        <div className="videoIntro">
          <video
            src="/logo.mp4"
            autoPlay
            playsInline
            onEnded={closeIntroAndOpenPlayer}
          />

          <button
            className="skipVideo"
            onClick={closeIntroAndOpenPlayer}
          >
            Passer
          </button>
        </div>
      )}

      <main className="homePage">
        <div className="homeCenter">
          <div className="logoArea">
            <h1>Yamaha STY Web</h1>

            <p>
              Lecteur professionnel de styles
              Yamaha en ligne
            </p>
          </div>

          <div className="menuButtons">
            <button
              className="menuBtn"
              onClick={() => navigateTo("/upload")}
            >
              Ajouter des styles
            </button>

            <button
              className="menuBtn primary"
              onClick={openPlayerWithIntro}
            >
              Lire des styles
            </button>

            <button className="menuBtn">
              Modifier / Supprimer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
