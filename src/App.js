import { useMetaMask } from "metamask-react";
import Web3 from "web3";
import ElectoralContract from "./abis/ElectoralContract.json";
import { useEffect, useState } from "react";
import './App.css';
import CandidateCard from "./candidateCard";
import { displayError } from "./Errors";

function App() {
  let web3;
  let electoralContract;

  const { connect, account, ethereum } = useMetaMask();
  const [candidatesList, setCandidatesList] = useState([])
  const [contract, setContract] = useState(null)
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
    if (ethereum) {
      loadData()
    }
  }, [ethereum])

  const loadData = async () => {
    const networkId = await web3.eth.net.getId()
    const networkData = ElectoralContract.networks[networkId]
    if (networkData) {
      const address = networkData.address;
      electoralContract = new web3.eth.Contract(ElectoralContract.abi, address)
      setContract(electoralContract)
    }
    setCandidatesList(await electoralContract.methods.getCandidates().call());
  }

  const registerVoter = async () => {
    try {
      await contract.methods.registerAsVoter().send({ from: account });
    } catch (error) {
      displayError(error)
    }
  }

  const registerCandidate = async () => {
    try {
      await contract.methods.registerAsCandidate().send({ from: account });
      setCandidatesList(await electoralContract.methods.getCandidates().call());
    } catch (error) {
      displayError(error)
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
            return <CandidateCard data={element} key={index} account={account} contract={contract} />
          })
        }
      </div>

    </div>
  );
}

export default App;
