import { useMetaMask } from "metamask-react";
import Web3 from "web3";
import ElectoralContract from "./abis/ElectoralContract.json";
import { useEffect, useState } from "react";
import './App.css';
import CandidateCard from "./candidateCard";

function App() {
  let web3;
  let electoralContract;

  const { connect, account, ethereum } = useMetaMask();
  const [candidatesList, setCandidatesList] = useState([])
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
  
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const networkId = await web3.eth.net.getId()
    const networkData = ElectoralContract.networks[networkId]
    if (networkData) {
      const address = networkData.address;
      electoralContract = new web3.eth.Contract(ElectoralContract.abi, address)
    }
    setCandidatesList(await electoralContract.methods.getCandidates().call());
  }

  const registerVoter = async () => {
    try {
      await electoralContract.methods.registerAsVoter().send({ from: account });
    } catch (error) {
      displayError(error)
    }
  }

  const registerCandidate = async () => {
    try {
      console.log(account);
      await electoralContract.methods.registerAsCandidate().send({ from: account });
    } catch (error) {
      displayError(error)
    }
  }

  const displayError = (error) => {
    var errorMessageInJson = JSON.parse(
      error.message.slice(58, error.message.length - 2)
    );

    var errorMessageToShow = errorMessageInJson.data.data[Object.keys(errorMessageInJson.data.data)[0]].reason;

    alert(errorMessageToShow);
    return; 
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
