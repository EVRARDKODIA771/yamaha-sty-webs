import { useState } from "react";
import "../App.css";

export default function Upload() {

  // =====================================================
  // STATES
  // =====================================================

  const [files, setFiles] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [logs, setLogs] =
    useState([]);

  const [result, setResult] =
    useState(null);

  // =====================================================
  // ADD LOG
  // =====================================================

  const addLog = (message) => {

    console.log(message);

    setLogs((prev) => [

      ...prev,

      `[${new Date().toLocaleTimeString()}] ${message}`

    ]);

  };

  // =====================================================
  // HANDLE FILES
  // =====================================================

  const handleFiles = (event) => {

    const selectedFiles =
      Array.from(event.target.files || []);

    setFiles(selectedFiles);

    addLog(
      `${selectedFiles.length} fichier(s) sélectionné(s)`
    );

    selectedFiles.forEach((file) => {

      addLog(
        `Fichier : ${file.name} (${(
          file.size / 1024
        ).toFixed(1)} Ko)`
      );

    });

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

        addLog(
          "Aucun fichier sélectionné"
        );

        return;

      }

      setLoading(true);

      setResult(null);

      addLog("=================================");
      addLog("DÉBUT IMPORTATION");
      addLog("=================================");

      const formData = new FormData();

      files.forEach((file) => {

        addLog(
          `Ajout du fichier : ${file.name}`
        );

        formData.append(
          "files",
          file
        );

      });

      addLog(
        "ENVOI DES FICHIERS AU BACKEND..."
      );

      // =====================================================
      // FETCH
      // =====================================================

      const response = await fetch(

        `${import.meta.env.VITE_BACKEND_URL}/upload`,

        {
          method: "POST",
          body: formData
        }

      );

      addLog(
        `STATUS HTTP : ${response.status}`
      );

      const data =
        await response.json();

      console.log(data);

      if (!response.ok) {

        throw new Error(
          data.error ||
          "Erreur serveur"
        );

      }

      // =====================================================
      // SUCCESS
      // =====================================================

      addLog("=================================");
      addLog("UPLOAD TERMINÉ");
      addLog("=================================");

      if (data.results) {

        data.results.forEach((item) => {

          addLog(
            `STYLE : ${item.originalName}`
          );

          addLog(
            `MIDIS : ${item.midiCount}`
          );

          addLog(
            `WAVS : ${item.wavCount}`
          );

        });

      }

      setResult(data);

    } catch (error) {

      console.error(error);

      addLog("=================================");
      addLog("ERREUR IMPORTATION");
      addLog(error.message);
      addLog("=================================");

    } finally {

      setLoading(false);

    }

  };

  // =====================================================
  // JSX
  // =====================================================

  return (

    <main className="uploadPage">

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
            Charge un ou plusieurs
            fichiers Yamaha au format .sty.
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
            Tu peux charger un seul
            fichier ou plusieurs à la fois.
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
        {/* UPLOAD BUTTON */}
        {/* ===================================== */}

        <button
          className="validateUploadBtn"
          onClick={uploadFiles}
          disabled={loading}
        >

          {loading
            ? "Importation en cours..."
            : "Valider l’importation"}

        </button>

        {/* ===================================== */}
        {/* RESULT */}
        {/* ===================================== */}

        {result && (

          <div className="uploadResult">

            <h3>
              Importation terminée
            </h3>

            <pre>
              {JSON.stringify(
                result,
                null,
                2
              )}
            </pre>

          </div>

        )}

        {/* ===================================== */}
        {/* LOGS */}
        {/* ===================================== */}

        <div className="uploadLogs">

          <h3>
            Logs
          </h3>

          <div className="logsContainer">

            {logs.map((log, index) => (

              <div
                key={index}
                className="logLine"
              >
                {log}
              </div>

            ))}

          </div>

        </div>

      </section>

    </main>

  );

}
