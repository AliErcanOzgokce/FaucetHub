import eip155_97 from "@/data/Updated/eip155-97.json";
import eip155_2442 from "@/data/Updated/eip155-2442.json";
import eip155_4024 from "@/data/Updated/eip155-4024.json";
import eip155_5001 from "@/data/Updated/eip155-5001.json";
import eip155_17000 from "@/data/Updated/eip155-17000.json";
import eip155_43113 from "@/data/Updated/eip155-43113.json";
import eip155_44787 from "@/data/Updated/eip155-44787.json";
import eip155_59141 from "@/data/Updated/eip155-59141.json";
import eip155_80002 from "@/data/Updated/eip155-80002.json";
import eip155_84532 from "@/data/Updated/eip155-84532.json";
import eip155_200810 from "@/data/Updated/eip155-200810.json";
import eip155_421614 from "@/data/Updated/eip155-421614.json";
import eip155_534351 from "@/data/Updated/eip155-534351.json";
import eip155_11155111 from "@/data/Updated/eip155-11155111.json";
import eip155_11155420 from "@/data/Updated/eip155-11155420.json";
import eip155_168587773 from "@/data/Updated/eip155-168587773.json";

// BTC Based
import btc_signet from "@/data/BTC Based/btc_signet.json";
import btc_testnet from "@/data/BTC Based/btc_testnet.json";

// SOL Based
import solana_devnet from "@/data/SOL Based/solana_devnet.json";
import solana_testnet from "@/data/SOL Based/solana_testnet.json";

// Other
import aptos_testnet from "@/data/Other/aptos_testnet.json";
import near_testnet from "@/data/Other/near_testnet.json";
import polkadot_westend from "@/data/Other/polkadot_westend.json";
import tron_nile from "@/data/Other/tron_nile.json";
import tron_shasta from "@/data/Other/tron_shasta.json";

// Categorize the networks
const evmBasedNetworks = [
  eip155_97,
  eip155_2442,
  eip155_4024,
  eip155_5001,
  eip155_17000,
  eip155_43113,
  eip155_44787,
  eip155_59141,
  eip155_80002,
  eip155_84532,
  eip155_200810,
  eip155_421614,
  eip155_534351,
  eip155_11155111,
  eip155_11155420,
  eip155_168587773,
];

const btcBasedNetworks = [btc_signet, btc_testnet];

const solBasedNetworks = [solana_devnet, solana_testnet];

const otherNetworks = [
  aptos_testnet,
  near_testnet,
  polkadot_westend,
  tron_nile,
  tron_shasta,
];

// Exporting all categorized networks
const networks = {
  evmBasedNetworks,
  btcBasedNetworks,
  solBasedNetworks,
  otherNetworks,
};

export default networks;

