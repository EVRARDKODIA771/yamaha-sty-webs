import { useEffect, useState } from "react";
import "../App.css";

export default function Library() {

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

    <main className="libraryPage">

      {/* ============================================ */}
      {/* LEFT PANEL */}
      {/* ============================================ */}

      <aside className="librarySidebar">

        <div className="libraryTitle">

          Yamaha Styles

        </div>

        {loading && (

          <div className="libraryLoading">

            Chargement...

          </div>

        )}

        {!loading && styles.map((style) => (

          <button

            key={style.name}

            className={`styleItem ${
              selectedStyle?.name ===
              style.name
                ? "active"
                : ""
            }`}

            onClick={() =>
              setSelectedStyle(style)
            }

          >

            {/* ================================= */}
            {/* IMAGE PLACEHOLDER */}
            {/* ================================= */}

            <div className="styleImagePlaceholder">

            </div>

            {/* ================================= */}
            {/* STYLE NAME */}
            {/* ================================= */}

            <span>

              {
                style.name.replace(
                  /\.sty$/i,
                  ""
                )
              }

            </span>

          </button>

        ))}

      </aside>

      {/* ============================================ */}
      {/* RIGHT PANEL */}
      {/* ============================================ */}

      <section className="libraryViewer">

        {selectedStyle && (

          <>

            {/* ================================= */}
            {/* BIG IMAGE PLACEHOLDER */}
            {/* ================================= */}

            <div className="viewerImagePlaceholder">

              IMAGE DU STYLE

            </div>

            {/* ================================= */}
            {/* TITLE */}
            {/* ================================= */}

            <h1 className="viewerTitle">

              {
                selectedStyle.name.replace(
                  /\.sty$/i,
                  ""
                )
              }

            </h1>

            {/* ================================= */}
            {/* FILE INFOS */}
            {/* ================================= */}

            <div className="viewerInfos">

              <div>

                <strong>
                  Fichier :
                </strong>

                {" "}

                {selectedStyle.name}

              </div>

              <div>

                <strong>
                  Taille :
                </strong>

                {" "}

                {(
                  selectedStyle.metadata?.size /
                  1024
                ).toFixed(1)} Ko

              </div>

            </div>

            {/* ================================= */}
            {/* PLAY BUTTON */}
            {/* ================================= */}

            <button
              className="playStyleBtn"
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

              Lire le style

            </button>

          </>

        )}

      </section>

    </main>

  );

}
