import './App.css';
import Web3 from 'web3';

function App() {
  async function clickHandler(e){
    e.preventDefault();

    let result = await fetch("http://localhost:8000/");
    let stock = {};
    let json = await result.json();
    console.log(`Price:${json.price}`);

    let abi = [
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "symbol",
            "type": "bytes4"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "volume",
            "type": "uint256"
          }
        ],
        "name": "setStock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "symbol",
            "type": "bytes4"
          }
        ],
        "name": "getStockPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "symbol",
            "type": "bytes4"
          }
        ],
        "name": "getStockVolume",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
    window.web3 = new Web3(Web3.currentProvider);
    const contract = window.web3.eth.contract(abi);
    const contractAddress = "0x93DdD08B1A7D043b2F7324baeECdf9aC211b0dfb"
    const contractInstance = contract.at(contractAddress);

    contractInstance.methods.setStock([0x41, 0x42, 0x43, 0x44], 15, 2000).send( { from: 0x2223Aeccd6b3bF0FDB3686cBa09C9F7A8f7566e6}).on ('receipt', ()=>{
      console.log("done")
    })
  }
  return (
    <div className="value">
      <button onClick={clickHandler}> Get Price Quote</button>
    </div>
  );
}

export default App;
