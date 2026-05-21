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

  // =====================================================
  // SUPABASE
  // =====================================================

  const SUPABASE_URL =
    "https://njfizvapmwhixvoyaxou.supabase.co";

  const BUCKET =
    "styles";

  // =====================================================
  // LOAD STYLES
  // =====================================================

  useEffect(() => {

    const loadStyles =
      async () => {

        try {

          setLoading(true);

          const response =
            await fetch(

              `${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`,

              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                  limit: 1000,
                  offset: 0
                })

              }

            );

          const data =
            await response.json();

          console.log(
            "SUPABASE FILES :",
            data
          );

          if (
            Array.isArray(data)
          ) {

            setStyles(data);

            if (data.length > 0) {

              setSelectedStyle(
                data[0]
              );

            }

          }

        } catch (error) {

          console.error(
            "LOAD ERROR :",
            error
          );

        } finally {

          setLoading(false);

        }

      };

    loadStyles();

  }, []);

  // =====================================================
  // GET FILE URL
  // =====================================================

  const getStyleUrl =
    (fileName) => {

      return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${fileName}`;

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
            PSR MANAGER STYLES
          </p>

        </div>

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

                  {
                    style.name.replace(
                      /\.sty$/i,
                      ""
                    )
                  }

                </h3>

                <span>

                  PSR MANAGER STYLE

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

                  {
                    selectedStyle.name.replace(
                      /\.sty$/i,
                      ""
                    )
                  }

                </h1>

                <p className="playerDescription">

                  Collection premium de styles
                  PSR MANAGER disponibles
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
                        selectedStyle
                          .metadata?.size /
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
                      Type
                    </span>

                    <strong>
                      PSR
                    </strong>

                  </div>

                </div>

                {/* ================================= */}
                {/* BUTTONS */}
                {/* ================================= */}

                <div className="playerActions">

                  <button
                    className="playerPlayBtn"
                    onClick={() => {

                      const url =
                        getStyleUrl(
                          selectedStyle.name
                        );

                      console.log(
                        "STYLE URL :",
                        url
                      );

                    }}
                  >

                    ▶ Lire le style

                  </button>

                  <button
                    className="playerSecondaryBtn"
                  >

                    ❤ Favori

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
