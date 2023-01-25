import { useMetaMask } from "metamask-react";
import Web3 from "web3";
import ElectoralContract from "./abis/ElectoralContract.json";
import { useState } from "react";
import './App.css';
import CandidateCard from "./candidateCard";

function App() {
  let web3;
  let electoralContract;

  const { connect, account, ethereum } = useMetaMask();
  const [candidatesList, setCandidatesList] = useState([1, 2, 3, 4])
  const [accNumber, setAccNumber] = useState("Connect Wallet")

  if (window.ethereum) {
    web3 = new Web3(ethereum)
  }
  const connectMetamask = async () => {
    await connect()
    if (account) {
      setAccNumber(account)
    }
  }


  const loadData = async () => {
    const networkId = await web3.eth.net.getId()
    const networkData = ElectoralContract.networks[networkId]
    if (networkData) {
      const address = networkData.address;
      electoralContract = new web3.eth.Contract(ElectoralContract.abi, address)
    }
  }
  loadData()


  return (
    <div className="App">
      <header className="App-header">
        <button className="button" onClick={connectMetamask}>
          {accNumber}
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
