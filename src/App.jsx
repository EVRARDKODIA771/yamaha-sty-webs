import { useEffect, useState } from "react";

import "./App.css";

import Upload from "./pages/Upload";
import Player from "./pages/Player";
import Auth from "./pages/Auth";

export default function App() {

  // ======================================================
  // ROUTING
  // ======================================================

  const [route, setRoute] = useState(
    window.location.pathname
  );

  // ======================================================
  // AUTH
  // ======================================================

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [user, setUser] = useState(null);

  // ======================================================
  // INTRO VIDEO
  // ======================================================

  const [showIntroVideo, setShowIntroVideo] =
    useState(false);


  // ======================================================
  // CHECK AUTH
  // ======================================================

  useEffect(() => {

    const token = localStorage.getItem("token");

    const savedUser = localStorage.getItem("user");

    if (token) {

      setIsAuthenticated(true);

      if (savedUser) {

        setUser(JSON.parse(savedUser));

      }

    }

  }, []);


  // ======================================================
  // ROUTE LISTENER
  // ======================================================

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


  // ======================================================
  // NAVIGATE
  // ======================================================

  const navigateTo = (path) => {

    window.history.pushState({}, "", path);

    setRoute(path);

  };


  // ======================================================
  // PLAYER INTRO
  // ======================================================

  const openPlayerWithIntro = () => {

    setShowIntroVideo(true);

  };

  const closeIntroAndOpenPlayer = () => {

    setShowIntroVideo(false);

    navigateTo("/player");

  };


  // ======================================================
  // LOGOUT
  // ======================================================

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.reload();

  };


  // ======================================================
  // FORCE AUTH
  // ======================================================

  if (!isAuthenticated) {

    return <Auth />;

  }


  // ======================================================
  // ROUTES
  // ======================================================

  if (route === "/upload") {

    return <Upload />;

  }

  if (route === "/player") {

    return <Player />;

  }


  // ======================================================
  // HOME
  // ======================================================

  return (

    <div className="app">

      {/* ============================================== */}
      {/* INTRO VIDEO */}
      {/* ============================================== */}

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


      {/* ============================================== */}
      {/* TOP BAR */}
      {/* ============================================== */}

      <div className="topBar">

        <div className="topBarLeft">

          <div className="userAvatar">

            {user?.username
              ?.charAt(0)
              ?.toUpperCase() || "Y"}

          </div>

          <div className="userInfos">

            <div className="username">
              {user?.username || "User"}
            </div>

            <div className="userEmail">
              {user?.email}
            </div>

          </div>

        </div>


        <button
          className="logoutBtn"
          onClick={logout}
        >
          Logout
        </button>

      </div>


      {/* ============================================== */}
      {/* HOME */}
      {/* ============================================== */}

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
              onClick={() =>
                navigateTo("/upload")
              }
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
