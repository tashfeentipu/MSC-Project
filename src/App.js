import { useMetaMask } from "metamask-react";
import Web3 from "web3";
import ElectoralContract from "./abis/ElectoralContract.json";
import './App.css';

function App() {
  let web3;
  let electoralContract;

  const { connect, account, ethereum } = useMetaMask();
  const connectMetamask = async () => {
    await connect()
  }
  if (window.ethereum) {
    web3 = new Web3(ethereum)
  }
  
  const loadData = async () => {
    const networkId = await web3.eth.net.getId()
    const networkData = ElectoralContract.networks[networkId]
    if (networkData) {
      const address = networkData.address;
      const electoralContract = new web3.eth.Contract(ElectoralContract.abi, address)
      console.log("Contract", await electoralContract.methods.name().call());
    }
  }
  loadData()



  return (
    <div>
      <button className='button' onClick={connectMetamask}>Connect</button>
      <div>
        Address: {account}
      </div>
    </div>
  );
}

export default App;
