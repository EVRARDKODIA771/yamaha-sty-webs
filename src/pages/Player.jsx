import { useEffect, useState } from "react";
import "../App.css";

export default function Player() {

  // =====================================================
  // STATES
  // =====================================================

  const [styles, setStyles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedStyle, setSelectedStyle] =
    useState(null);

  const [error, setError] =
    useState("");

  // =====================================================
  // BACKEND URL
  // =====================================================

  const backendUrl =
    (
      import.meta.env
        .VITE_BACKEND_URL || ""
    ).replace(/\/+$/, "");

  // =====================================================
  // LOAD STYLES
  // =====================================================

  useEffect(() => {

    const loadStyles =
      async () => {

        try {

          setLoading(true);

          setError("");

          console.log("=================================");
          console.log("LOADING STYLES");
          console.log("=================================");

          const playerUrl =
            `${backendUrl}/player`;

          console.log(
            "PLAYER URL :",
            playerUrl
          );

          const response =
            await fetch(playerUrl);

          console.log(
            "HTTP STATUS :",
            response.status
          );

          const data =
            await response.json();

          console.log(
            "BACKEND RESPONSE :",
            data
          );

          if (!response.ok) {

            throw new Error(

              data.error ||

              "FAILED TO LOAD STYLES"

            );

          }

          if (
            data.success &&
            Array.isArray(data.styles)
          ) {

            setStyles(data.styles);

            if (
              data.styles.length > 0
            ) {

              setSelectedStyle(
                data.styles[0]
              );

            }

          }

        } catch (error) {

          console.error(
            "LOAD ERROR :",
            error
          );

          setError(
            error.message ||
            "Erreur chargement"
          );

        } finally {

          setLoading(false);

        }

      };

    loadStyles();

  }, []);

  // =====================================================
  // OPEN STYLE
  // =====================================================

  const openStyle = () => {

    if (!selectedStyle) return;

    console.log(
      "OPEN STYLE :",
      selectedStyle.publicUrl
    );

    // ===================================================
    // FUTURE:
    // OPEN ELECTRON / APK
    // ===================================================

    window.open(
      selectedStyle.publicUrl,
      "_blank"
    );

  };

  // =====================================================
  // JSX
  // =====================================================

  return (

    <main className="playerPage">

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside className="playerSidebar">

        {/* ============================================= */}
        {/* HEADER */}
        {/* ============================================= */}

        <div className="playerSidebarHeader">

          <h1>
            PSR MANAGER STYLES
          </h1>

          <p>
            Yamaha Style Cloud
          </p>

        </div>

        {/* ============================================= */}
        {/* ERROR */}
        {/* ============================================= */}

        {error && (

          <div className="authError">

            {error}

          </div>

        )}

        {/* ============================================= */}
        {/* LOADING */}
        {/* ============================================= */}

        {loading && (

          <div className="playerLoading">

            <div className="playerLoader"></div>

            <span>
              Chargement...
            </span>

          </div>

        )}

        {/* ============================================= */}
        {/* STYLES */}
        {/* ============================================= */}

        <div className="playerStylesList">

          {!loading && styles.map((style) => (

            <button

              key={style.name}

              className={`playerStyleItem ${
                selectedStyle?.name ===
                style.name
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                setSelectedStyle(style)
              }

            >

              {/* ===================================== */}
              {/* IMAGE */}
              {/* ===================================== */}

              <div className="playerStyleImage">

                <div className="playerStyleGlow"></div>

              </div>

              {/* ===================================== */}
              {/* INFOS */}
              {/* ===================================== */}

              <div className="playerStyleTexts">

                <h3>

                  {style.displayName}

                </h3>

                <span>

                  Yamaha PSR Style

                </span>

              </div>

            </button>

          ))}

        </div>

      </aside>

      {/* ================================================= */}
      {/* VIEWER */}
      {/* ================================================= */}

      <section className="playerViewer">

        {selectedStyle && (

          <>

            {/* ========================================= */}
            {/* HERO */}
            {/* ========================================= */}

            <div className="playerHero">

              {/* ===================================== */}
              {/* BIG IMAGE */}
              {/* ===================================== */}

              <div className="playerBigImage">

                <div className="playerBigGlow"></div>

                <span>
                  STYLE IMAGE
                </span>

              </div>

              {/* ===================================== */}
              {/* CONTENT */}
              {/* ===================================== */}

              <div className="playerHeroContent">

                <div className="playerBadge">

                  PSR MANAGER STYLES

                </div>

                <h1 className="playerTitle">

                  {selectedStyle.displayName}

                </h1>

                <p className="playerDescription">

                  Collection premium de styles
                  Yamaha disponibles
                  dans votre bibliothèque cloud.

                </p>

                {/* ================================= */}
                {/* INFOS */}
                {/* ================================= */}

                <div className="playerInfos">

                  <div className="playerInfoCard">

                    <span>
                      Taille
                    </span>

                    <strong>

                      {(
                        selectedStyle.size /
                        1024
                      ).toFixed(1)} Ko

                    </strong>

                  </div>

                  <div className="playerInfoCard">

                    <span>
                      Format
                    </span>

                    <strong>
                      STY
                    </strong>

                  </div>

                  <div className="playerInfoCard">

                    <span>
                      Cloud
                    </span>

                    <strong>
                      Supabase
                    </strong>

                  </div>

                </div>

                {/* ================================= */}
                {/* BUTTONS */}
                {/* ================================= */}

                <div className="playerActions">

                  <button
                    className="playerPlayBtn"
                    onClick={openStyle}
                  >

                    ▶ Ouvrir le style

                  </button>

                  <button
                    className="playerSecondaryBtn"
                  >

                    ⬇ Télécharger

                  </button>

                </div>

              </div>

            </div>

          </>

        )}

      </section>

    </main>

  );

}
