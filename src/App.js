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
      // console.log(await electoralContract.methods.getCandidates().send({from: account}));
    }
  }
  loadData()

  const registerVoter = async () => {
    try {
      // await electoralContract.methods.registerAsVoter().send({ from: account });
    } catch (error) {
      console.log(error);
    }
  }

  const registerCandidate = async () => {
    try {
      // await electoralContract.methods.registerAsCandidate().send({ from: account });
      console.log(await electoralContract.methods.registerAsCandidate().call({ from: account }))
      // console.log(await electoralContract.methods.getCandidates().call({from: account}))
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <button className="connectWalletButton" onClick={connectMetamask}>
          {accNumber}
        </button>
      </header>
      <div className="buttonsContainer" >
        <button className="button" onClick={registerCandidate} >
          Register as Candidate
        </button>
        <button className="button" onClick={registerVoter} >
          Register as Voter
        </button>
      </div>
      <div className="CandidatesListContainer" >
        {
          candidatesList.map((element, index) => {
            return <CandidateCard data={element} key={index} />
          })
        }
      </div>

    </div>
  );
}

export default App;
