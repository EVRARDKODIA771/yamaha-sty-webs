import { useState } from "react";
import "../App.css";

export default function Upload() {

  // =====================================================
  // STATES
  // =====================================================

  const [files, setFiles] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

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
  // HANDLE FILES
  // =====================================================

  const handleFiles = (event) => {

    const selectedFiles =
      Array.from(
        event.target.files || []
      );

    setFiles(selectedFiles);

    setSuccess(false);

    setError("");

    console.log(
      "FILES SELECTED :",
      selectedFiles
    );

  };

  // =====================================================
  // GO HOME
  // =====================================================

  const goHome = () => {

    window.history.pushState(
      {},
      "",
      "/"
    );

    window.dispatchEvent(
      new PopStateEvent(
        "popstate"
      )
    );

  };

  // =====================================================
  // UPLOAD FILES
  // =====================================================

  const uploadFiles = async () => {

    try {

      // ===============================================
      // VALIDATION
      // ===============================================

      if (files.length === 0) {

        console.error(
          "NO FILE SELECTED"
        );

        setError(
          "Aucun fichier sélectionné"
        );

        return;

      }

      setLoading(true);

      setSuccess(false);

      setError("");

      console.log("=================================");
      console.log("STARTING UPLOAD");
      console.log("=================================");

      // ===============================================
      // URL
      // ===============================================

      const uploadUrl =
        `${backendUrl}/upload`;

      console.log(
        "UPLOAD URL :",
        uploadUrl
      );

      // ===============================================
      // FORM DATA
      // ===============================================

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

      // ===============================================
      // FETCH
      // ===============================================

      const response =
        await fetch(
          uploadUrl,
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

      // ===============================================
      // ERROR
      // ===============================================

      if (!response.ok) {

        throw new Error(

          data.error ||

          "UPLOAD FAILED"

        );

      }

      // ===============================================
      // SUCCESS
      // ===============================================

      console.log(
        "UPLOAD SUCCESS"
      );

      setSuccess(true);

      setFiles([]);

    } catch (error) {

      console.error(
        "UPLOAD ERROR :",
        error
      );

      setError(
        error.message ||
        "Erreur upload"
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
            Upload direct
            vers Supabase.
          </p>

        </div>

        {/* ===================================== */}
        {/* ERROR */}
        {/* ===================================== */}

        {error && (

          <div className="authError">

            {error}

          </div>

        )}

        {/* ===================================== */}
        {/* SUCCESS */}
        {/* ===================================== */}

        {success && (

          <div className="uploadSuccess">

            Upload terminé
            avec succès.

          </div>

        )}

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
            Choisir des fichiers
            .sty
          </strong>

          <small>
            Upload dans
            le bucket styles.
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
