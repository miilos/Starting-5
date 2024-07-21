import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [lineups, setLineups] = useState([]);
  const [activeLineup, setActiveLineup] = useState(null);
  const [newLineupName, setNewLineupName] = useState("");
  const [newLineupPayers, setNewLineupPlayers] = useState(Array(5).fill(""));

  const currLineupFull = lineups.find((curr) => curr.id === activeLineup);
  const newLineupObj = {
    name: newLineupName,
    lineup: newLineupPayers,
    createdBy: "milos",
  };

  function handleNewLineupNameChange(newName, key) {
    setNewLineupPlayers((p) =>
      p.map((curr, i) => (i === key ? newName : curr))
    );
  }

  function handleUploadButtonClick() {
    const upload = async () => {
      await fetch("http://127.0.0.1:4000/api/lineups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLineupObj),
      });
    };

    upload();

    setLineups((curr) => [...curr, newLineupObj]);
  }

  return (
    <>
      <Title />

      <Main>
        <Box side="left">
          <SearchBar>
            <Input placeholderText={"Search teams"} cssClass={"search-input"} />
          </SearchBar>

          <LineupsList
            lineups={lineups}
            setLineups={setLineups}
            activeLineup={activeLineup}
            setActiveLineup={setActiveLineup}
          />
        </Box>

        <Box side="right">
          <LineupViewer>
            {currLineupFull ? (
              <>
                <h1 className="title">{currLineupFull.name}</h1>
                <Team team={currLineupFull.lineup} />
              </>
            ) : (
              <>
                <Input
                  placeholderText={"Enter lineup name"}
                  cssClass={"lineup-name-input"}
                  onClickFn={setNewLineupName}
                />
                <LineupMaker onChange={handleNewLineupNameChange} />
                <Button
                  cssClass={"btn"}
                  text={"Create"}
                  onClickFn={handleUploadButtonClick}
                />
              </>
            )}
          </LineupViewer>
        </Box>
      </Main>
    </>
  );
}

function Title() {
  return <h1 className="title">🏀 Starting 5 picker</h1>;
}

function Main({ children }) {
  return <div className="main">{children}</div>;
}

function SearchBar({ children }) {
  return <div className="searchbar">{children}</div>;
}

function Input({ placeholderText, cssClass, onClickFn, playerKey }) {
  const [query, setQuery] = useState("");

  function handleInput(e) {
    setQuery(e.target.value);

    if (onClickFn) onClickFn(e.target.value);

    if (playerKey !== null && onClickFn) onClickFn(e.target.value, playerKey);
  }

  return (
    <input
      className={cssClass}
      placeholder={`${placeholderText}...`}
      value={query}
      onChange={(e) => handleInput(e)}
    />
  );
}

function Box({ side, children }) {
  return <div className={`box box-${side}`}>{children}</div>;
}

function LineupsList({ lineups, setLineups, activeLineup, setActiveLineup }) {
  function handleClick(id) {
    setActiveLineup(id === activeLineup ? null : id);
  }

  useEffect(function () {
    const getLineups = async () => {
      const res = await fetch("http://127.0.0.1:4000/api/lineups");
      const data = await res.json();

      setLineups(data.data.lineups);
    };

    getLineups();
  }, []);

  return (
    <div className="lineups-list">
      {lineups.map((curr) => (
        <Lineup
          lineup={curr}
          key={curr.id}
          handleClick={handleClick}
          activeLineup={activeLineup}
        />
      ))}
    </div>
  );
}

function Lineup({ lineup, handleClick, activeLineup }) {
  const elClass =
    activeLineup === lineup.id ? "lineup lineup-active" : "lineup";

  return (
    <div className={elClass} onClick={() => handleClick(lineup.id)}>
      <h2 className="lineup-name">{lineup.name}</h2>
      <p className="lineup-createdBy">
        Created by: <strong>{lineup.createdBy}</strong>
      </p>
    </div>
  );
}

function LineupViewer({ children }) {
  return <div className="lineup-container">{children}</div>;
}

function Team({ team }) {
  return (
    <div className="team">
      <div className="top">
        {team.slice(0, 3).map((curr) => (
          <Player player={curr} />
        ))}
      </div>
      <div className="bottom">
        {team.slice(3).map((curr) => (
          <Player player={curr} />
        ))}
      </div>
    </div>
  );
}

function Player({ player }) {
  return (
    <div className="player">
      <p className="player-name">{player}</p>
    </div>
  );
}

function LineupMaker({ onChange }) {
  let key = 0;
  return (
    <div className="team">
      <div className="top">
        {Array.from({ length: 3 }).map(() => (
          <AddPlayer key={key} pId={key++} onChange={onChange} />
        ))}
      </div>
      <div className="bottom">
        {Array.from({ length: 2 }).map(() => (
          <AddPlayer key={key} pId={key++} onChange={onChange} />
        ))}
      </div>
    </div>
  );
}

function AddPlayer({ pId, onChange }) {
  return (
    <div className="player">
      <Input
        placeholderText={"Enter player"}
        cssClass={"search-input add-player-input"}
        onClickFn={onChange}
        playerKey={pId}
      />
    </div>
  );
}

function Button({ cssClass, text, onClickFn }) {
  return (
    <button className={cssClass} onClick={onClickFn}>
      {text}
    </button>
  );
}

export default App;
