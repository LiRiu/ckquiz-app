
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const Web3 = require("web3");
const keccak256 = require('keccak256')
const BN = Web3.utils.toBN;

export function register(knowledge) {
    const privKnowledgeKey = '0x' + keccak256(knowledge).toString('hex');
    const a = BN(privKnowledgeKey);
    const PK = ec.g.mul(a);
    const PKx = '0x' + PK.getX().toString(16);
    const PKy = '0x' + PK.getY().toString(16);
    return [PKx, PKy];
}