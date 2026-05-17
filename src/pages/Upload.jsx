import { useState } from "react";
import "../App.css";

export default function Upload() {
  const [files, setFiles] = useState([]);

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  const goHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <main className="uploadPage">
      <section className="uploadCard">
        <button className="back" onClick={goHome}>
          ← Retour
        </button>

        <div className="uploadHeader">
          <h1>Ajouter des styles</h1>
          <p>
            Charge un ou plusieurs fichiers Yamaha au format .sty.
          </p>
        </div>

        <label className="uploadDropZone">
          <input
            type="file"
            accept=".sty"
            multiple
            onChange={handleFiles}
          />

          <span className="uploadIcon">＋</span>
          <strong>Choisir des fichiers .sty</strong>
          <small>Tu peux charger un seul fichier ou plusieurs à la fois.</small>
        </label>

        {files.length > 0 && (
          <div className="filePreview">
            <h3>Fichiers sélectionnés</h3>

            {files.map((file) => (
              <div className="fileRow" key={file.name}>
                <span>{file.name}</span>
                <small>{(file.size / 1024).toFixed(1)} Ko</small>
              </div>
            ))}
          </div>
        )}

        <button className="validateUploadBtn">
          Valider l’importation
        </button>
      </section>
    </main>
  );
}
