import { useState } from "react";
import "./App.css";

const demoStyles = [
  "Afro Gospel 01", "Makossa Live", "Slow Rock", "Zouk Love", "Congolese Rumba",
  "Worship Ballad", "Highlife", "Reggae Praise", "Bikutsi", "Ndombolo",
  "Pop Ballad", "Jazz Swing", "Country 8Beat", "Bossa Nova", "Salsa",
  "Dancehall", "Funk Groove", "Soul Worship", "March", "Disco Pop"
];

export default function App() {
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(demoStyles[0]);
  const [start, setStart] = useState(0);
  const visible = demoStyles.slice(start, start + 10);

  const next = () => {
    if (start + 10 < demoStyles.length) setStart(start + 10);
  };

  const prev = () => {
    if (start - 10 >= 0) setStart(start - 10);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Yamaha STY Web Player</h1>
          <p>Lecteur web de styles Yamaha</p>
        </div>
        <button className="loginBtn">Utilisateur connecté</button>
      </header>

      {page === "home" && (
        <main className="home">
          <button onClick={() => setPage("upload")}>Ajouter des styles</button>
          <button onClick={() => setPage("player")}>Lire des styles</button>
          <button onClick={() => setPage("manage")}>Modifier / Supprimer</button>
        </main>
      )}

      {page === "upload" && (
        <main className="panel">
          <button className="back" onClick={() => setPage("home")}>← Retour</button>
          <h2>Ajouter des styles</h2>
          <p>Importe ici tes fichiers Yamaha .sty</p>
          <input type="file" accept=".sty" multiple />
          <div className="hint">Les fichiers seront ensuite stockés dans Supabase Storage.</div>
        </main>
      )}

      {page === "manage" && (
        <main className="panel">
          <button className="back" onClick={() => setPage("home")}>← Retour</button>
          <h2>Modifier ou supprimer mes styles</h2>
          {demoStyles.slice(0, 5).map((style) => (
            <div className="manageRow" key={style}>
              <span>{style}</span>
              <button>Renommer</button>
              <button className="danger">Supprimer</button>
            </div>
          ))}
        </main>
      )}

      {page === "player" && (
        <main className="workstation">
          <button className="back" onClick={() => setPage("home")}>← Retour</button>

          <section className="screen">
            <div className="screenHeader">
              <span>STYLE SELECT</span>
              <strong>{selected}</strong>
            </div>

            <div className="styleGrid">
              {visible.map((style) => (
                <button
                  key={style}
                  className={selected === style ? "style active" : "style"}
                  onClick={() => setSelected(style)}
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="screenFooter">
              <button onClick={prev}>Précédent</button>
              <span>{start + 1} - {Math.min(start + 10, demoStyles.length)} / {demoStyles.length}</span>
              <button onClick={next}>Suivant</button>
            </div>
          </section>

          <section className="controls">
            <div className="controlGroup">
              <button className="play">PLAY</button>
              <button>PAUSE</button>
              <button>STOP</button>
              <button>BREAK</button>
            </div>

            <div className="controlGroup">
              <button>INTRO A</button>
              <button>INTRO B</button>
              <button>INTRO C</button>
            </div>

            <div className="controlGroup mainControls">
              <button>MAIN A</button>
              <button>MAIN B</button>
              <button>MAIN C</button>
              <button>MAIN D</button>
            </div>

            <div className="controlGroup">
              <button>FILL A</button>
              <button>FILL B</button>
              <button>FILL C</button>
              <button>FILL D</button>
            </div>

            <div className="controlGroup">
              <button>ENDING A</button>
              <button>ENDING B</button>
              <button>ENDING C</button>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
