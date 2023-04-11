import { MetaMaskWallet } from "@thirdweb-dev/wallets";

const Godwoken = {
    // === Required information for connecting to the network === \\
    chainId: 71401, // Chain ID of the network
    // Array of RPC URLs to use
    rpc: ["https://godwoken-testnet-v1.ckbapp.dev"],

    // === Information for adding the network to your wallet (how it will appear for first time users) === \\
    // Information about the chains native currency (i.e. the currency that is used to pay for gas)
    nativeCurrency: {
        decimals: 18,
        name: "Godwoken CKB",
        symbol: "CKB",
    },
    shortName: "Godwoken", // Display value shown in the wallet UI
    slug: "Godwoken", // Display value shown in the wallet UI
    testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
    chain: "Godwoken", // Name of the network
    name: "Godwoken", // Name of the network
}

export const wallet = new MetaMaskWallet({
    chains: [ Godwoken ],
    dappMetadata: {
        name: "CKQuiz",
        url: "https://ckquiz-home.vercel.app/",
        description: "Challenge for CKB",
        logoUrl: "https://ckquiz-home.vercel.app/favicon.ico",
    },
});

export function addGodwokenToMetaMask() {
    window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
        chainId: "0x116e9",
        rpcUrls: ["https://godwoken-testnet-v1.ckbapp.dev"],
        chainName: "Godwoken",
        nativeCurrency: {
            name: "CKB",
            symbol: "CKB",
            decimals: 18
        },
        blockExplorerUrls: ["https://v1.testnet.gwscan.com/"]
        }]
    });
}