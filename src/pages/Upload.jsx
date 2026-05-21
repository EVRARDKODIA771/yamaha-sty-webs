import { useState } from "react";
import "../App.css";

export default function Upload() {

  // =====================================================
  // STATES
  // =====================================================

  const [files, setFiles] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  // =====================================================
  // BACK URL
  // =====================================================

  const backendUrl =
    (
      import.meta.env.VITE_BACKEND_URL || ""
    ).replace(/\/+$/, "");

  // =====================================================
  // HANDLE FILES
  // =====================================================

  const handleFiles = (event) => {

    const selectedFiles =
      Array.from(event.target.files || []);

    setFiles(selectedFiles);

    console.log(
      "FILES SELECTED :",
      selectedFiles
    );

  };

  // =====================================================
  // GO HOME
  // =====================================================

  const goHome = () => {

    window.history.pushState({}, "", "/");

    window.dispatchEvent(
      new PopStateEvent("popstate")
    );

  };

  // =====================================================
  // UPLOAD FILES
  // =====================================================

  const uploadFiles = async () => {

    try {

      if (files.length === 0) {

        console.error(
          "NO FILE SELECTED"
        );

        return;

      }

      setLoading(true);

      setSuccess(false);

      console.log("=================================");
      console.log("STARTING UPLOAD");
      console.log("=================================");

      console.log(
        "BACKEND URL :",
        backendUrl
      );

      console.log(
        "UPLOAD URL :",
        `${backendUrl}/upload`
      );

      // =====================================================
      // FORM DATA
      // =====================================================

      const formData =
        new FormData();

      files.forEach((file) => {

        console.log(
          "ADDING FILE :",
          file.name
        );

        formData.append(
          "files",
          file
        );

      });

      // =====================================================
      // FETCH
      // =====================================================

      const response = await fetch(

        `${backendUrl}/upload`,

        {
          method: "POST",
          body: formData
        }

      );

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

      // =====================================================
      // ERROR
      // =====================================================

      if (!response.ok) {

        throw new Error(
          data.error ||
          "UPLOAD FAILED"
        );

      }

      // =====================================================
      // SUCCESS
      // =====================================================

      console.log(
        "UPLOAD SUCCESS"
      );

      setSuccess(true);

    } catch (error) {

      console.error(
        "UPLOAD ERROR :",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  // =====================================================
  // JSX
  // =====================================================

  return (

    <main className="uploadPage">

      {/* ================================================= */}
      {/* LOADING OVERLAY */}
      {/* ================================================= */}

      {loading && (

        <div className="uploadLoadingOverlay">

          <div className="uploadSpinner"></div>

          <h2>
            Chargement...
          </h2>

        </div>

      )}

      <section className="uploadCard">

        {/* ===================================== */}
        {/* BACK */}
        {/* ===================================== */}

        <button
          className="back"
          onClick={goHome}
        >
          ← Retour
        </button>

        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}

        <div className="uploadHeader">

          <h1>
            Ajouter des styles
          </h1>

          <p>
            Upload des fichiers .sty
            vers Supabase.
          </p>

        </div>

        {/* ===================================== */}
        {/* DROPZONE */}
        {/* ===================================== */}

        <label className="uploadDropZone">

          <input
            type="file"
            accept=".sty"
            multiple
            onChange={handleFiles}
          />

          <span className="uploadIcon">
            ＋
          </span>

          <strong>
            Choisir des fichiers .sty
          </strong>

          <small>
            Upload direct vers
            le bucket Supabase.
          </small>

        </label>

        {/* ===================================== */}
        {/* FILE PREVIEW */}
        {/* ===================================== */}

        {files.length > 0 && (

          <div className="filePreview">

            <h3>
              Fichiers sélectionnés
            </h3>

            {files.map((file) => (

              <div
                className="fileRow"
                key={file.name}
              >

                <span>
                  {file.name}
                </span>

                <small>
                  {(
                    file.size / 1024
                  ).toFixed(1)} Ko
                </small>

              </div>

            ))}

          </div>

        )}

        {/* ===================================== */}
        {/* SUCCESS */}
        {/* ===================================== */}

        {success && (

          <div className="uploadSuccess">

            Upload terminé avec succès.

          </div>

        )}

        {/* ===================================== */}
        {/* BUTTON */}
        {/* ===================================== */}

        <button
          className="validateUploadBtn"
          onClick={uploadFiles}
          disabled={loading}
        >

          {loading
            ? "Chargement..."
            : "Valider l’importation"}

        </button>

      </section>

    </main>

  );

}
