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
  const [activeButton, setActiveButton] = useState("MAIN A");
  const [isPlaying, setIsPlaying] = useState(false);

  const goHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const pressButton = (buttonName) => {
    setActiveButton(buttonName);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setActiveButton(isPlaying ? "PAUSE" : "PLAY");
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

            <div className="screenBody screenBodyTwoCols">
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

        <section className="styleControlPanel fullStyleControl">
          <div className="controlCluster">
            <span className="clusterLabel">INTRO</span>
            {["I", "II", "III", "IV"].map((intro) => (
              <button
                key={intro}
                className={
                  activeButton === `INTRO ${intro}`
                    ? "sectionBtn activeBlueLed"
                    : "sectionBtn"
                }
                onClick={() => pressButton(`INTRO ${intro}`)}
              >
                {intro}
              </button>
            ))}
          </div>

          <div className="controlCluster mainCluster">
            <span className="clusterLabel">MAIN VARIATION</span>
            {["A", "B", "C", "D"].map((main) => (
              <button
                key={main}
                className={
                  activeButton === `MAIN ${main}`
                    ? "sectionBtn wide activeBlueLed"
                    : "sectionBtn wide"
                }
                onClick={() => pressButton(`MAIN ${main}`)}
              >
                {main}
              </button>
            ))}
          </div>

          <div className="controlCluster">
            <span className="clusterLabel">FILL IN</span>
            {["I", "II", "III", "IV"].map((fill) => (
              <button
                key={fill}
                className={
                  activeButton === `FILL ${fill}`
                    ? "sectionBtn activeBlueLed"
                    : "sectionBtn"
                }
                onClick={() => pressButton(`FILL ${fill}`)}
              >
                {fill}
              </button>
            ))}
          </div>

          <div className="controlCluster">
            <span className="clusterLabel">BREAK</span>
            <button
              className={
                activeButton === "BREAK"
                  ? "sectionBtn activeBlueLed"
                  : "sectionBtn"
              }
              onClick={() => pressButton("BREAK")}
            >
              ↯
            </button>
          </div>

          <div className="controlCluster">
            <span className="clusterLabel">ENDING</span>
            {["I", "II", "III", "IV"].map((ending) => (
              <button
                key={ending}
                className={
                  activeButton === `ENDING ${ending}`
                    ? "sectionBtn activeBlueLed"
                    : "sectionBtn"
                }
                onClick={() => pressButton(`ENDING ${ending}`)}
              >
                {ending}
              </button>
            ))}
          </div>

          <div className="controlCluster playPauseCluster">
            <span className="clusterLabel">PLAY / PAUSE</span>
            <button
              className={
                isPlaying
                  ? "sectionBtn playPauseBtn activeBlueLed"
                  : "sectionBtn playPauseBtn"
              }
              onClick={togglePlayPause}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
