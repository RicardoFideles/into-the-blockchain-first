// Source code to interact with smart contract

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
// contractAddress and abi are setted after contract deploy
var contractAddress = '0xd0617cDe8418879fE1F0b2191aC4af0E5C66C1C2';
var abi =  
[
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_age",
                "type": "uint256"
            }
        ],
        "name": "setUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getUser",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

async function getAccounts() {
    console.log('in method');

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    console.log('accounts: ' + accounts);
    console.log('account: ' + account);

    web3.eth.defaultAccount = account;
}

(async () => {
    console.log('calling get accounts');
    await getAccounts();
  })();



//Smart contract functions
function setUser() {
  console.log('contract ->', contract)
  console.log('account ->', account)
  name = $("#userName").val();
  age = $("#userAge").val();
  contract.methods.setUser (name, age).send( {from: account}).then( function(tx) { 
    console.log("Usuário registrado na transação: ", tx); 
  });
  $("#userName").val('');
  $("#userAge").val('')
}

function getUser() {
  contract.methods.getUser().call().then( function( result ) {
    console.log(result[0], result[1])
    document.getElementById('user').innerHTML = ("Nome: " + result[0] + " " + "Idade:  " + result[1]);
  });    
}