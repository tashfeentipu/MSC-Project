import { useState } from "react";
import './App.css';
import CandidateCard from "./candidateCard";

function App() {

  const [candidatesList, setCandidatesList] = useState([1, 2, 3, 4])

  return (
    <div className="App">
      <header className="App-header">
        <button className="button" >
          Connect Wallet
        </button>
      </header>
      <button className="button" >
        Register as Candidate
      </button>
      <button className="button" >
        Register as Voter
      </button>
      <div className="CandidatesListContainer" >
        {
          candidatesList.map(element => {
            return <CandidateCard />
          })
        }
      </div>

    </div>
  );
}

export default App;
