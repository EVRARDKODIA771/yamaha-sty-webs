import { useState } from "react";
import "../App.css";

const leftStyles = [
  "Afro Gospel",
  "Bikutsi Beat",
  "Congolese Rumba",
  "Highlife Pop",
  "Makossa Live"
];

const rightStyles = [
  "Ndombolo",
  "Reggae Praise",
  "Slow Rock",
  "Worship Ballad",
  "Zouk Love"
];

export default function Player() {
  const [selectedStyle, setSelectedStyle] = useState("Makossa Live");
  const [activeMain, setActiveMain] = useState("A");
  const [transport, setTransport] = useState("play");

  const goHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <main className="playerPage">
      <section className="yamahaPanel">
        <button className="playerBack" onClick={goHome}>
          ← Retour
        </button>

        <div className="panelTop">
          <div className="brand">YAMAHA STY WEB</div>
          <div className="panelHint">STYLE PLAYER CONTROL SECTION</div>
        </div>

        <section className="hardwareScreenFrame">
          <div className="glassReflection" />

          <div className="styleScreen">
            <div className="screenTitle">
              <span>♪ STYLE PLAYER</span>
              <strong>{selectedStyle}</strong>
            </div>

            <div className="screenBody">
              <div className="styleColumn">
                {leftStyles.map((style) => (
                  <button
                    key={style}
                    className={
                      selectedStyle === style
                        ? "screenStyle active"
                        : "screenStyle"
                    }
                    onClick={() => setSelectedStyle(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>

              <div className="centerTransport">
                <div className="tempoBox">
                  <strong>{selectedStyle}</strong>
                  <span>001</span>
                  <small>4/4 • ♩ = 92</small>
                </div>

                <div className="transportGrid">
                  <button
                    className="hwBtn small"
                    onClick={() => setTransport("previous")}
                  >
                    ◀◀
                  </button>

                  <button
                    className={
                      transport === "play"
                        ? "hwBtn playHw activeLed"
                        : "hwBtn playHw"
                    }
                    onClick={() => setTransport("play")}
                  >
                    ▶
                  </button>

                  <button
                    className="hwBtn small"
                    onClick={() => setTransport("next")}
                  >
                    ▶▶
                  </button>

                  <button
                    className={
                      transport === "pause"
                        ? "hwBtn activeLed"
                        : "hwBtn"
                    }
                    onClick={() => setTransport("pause")}
                  >
                    ❚❚
                  </button>

                  <button
                    className={
                      transport === "stop"
                        ? "hwBtn activeLed"
                        : "hwBtn"
                    }
                    onClick={() => setTransport("stop")}
                  >
                    ■
                  </button>
                </div>
              </div>

              <div className="styleColumn">
                {rightStyles.map((style) => (
                  <button
                    key={style}
                    className={
                      selectedStyle === style
                        ? "screenStyle active"
                        : "screenStyle"
                    }
                    onClick={() => setSelectedStyle(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="styleControlPanel">
          <div className="controlCluster">
            <span className="clusterLabel">INTRO</span>
            <button className="sectionBtn">I</button>
            <button className="sectionBtn">II</button>
            <button className="sectionBtn">III</button>
          </div>

          <div className="controlCluster mainCluster">
            <span className="clusterLabel">MAIN VARIATION</span>
            {["A", "B", "C", "D"].map((main) => (
              <button
                key={main}
                className={
                  activeMain === main
                    ? "sectionBtn wide activeLed"
                    : "sectionBtn wide"
                }
                onClick={() => setActiveMain(main)}
              >
                {main}
              </button>
            ))}
          </div>

          <div className="controlCluster">
            <span className="clusterLabel">FILL IN</span>
            <button className="sectionBtn">I</button>
            <button className="sectionBtn">II</button>
          </div>

          <div className="controlCluster">
            <span className="clusterLabel">BREAK</span>
            <button className="sectionBtn">↯</button>
          </div>

          <div className="controlCluster">
            <span className="clusterLabel">ENDING</span>
            <button className="sectionBtn">I</button>
            <button className="sectionBtn">II</button>
            <button className="sectionBtn">III</button>
          </div>
        </section>
      </section>
    </main>
  );
}
