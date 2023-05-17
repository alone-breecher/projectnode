// frontend/contract.js

import Web3 from 'web3';
import contractABI from './src/contract/NodeFinal.json';

const contractAddress = '0xeEfCc381AC7E7af6721077cd8Ae0cfEF2D4550ED'; // Replace with your contract address

const web3 = new Web3(window.ethereum);
const contractInstance = new web3.eth.Contract(contractABI.abi, contractAddress);

export default contractInstance;
