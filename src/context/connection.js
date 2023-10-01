import { ethers } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import abi from "../constants/abi.json";
import tokenabi from "../constants/tokenABI.json";
const Connection = createContext();

const ConnectionProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [active, setActive] = useState(false);
  const [provider, setProvider] = useState();
  // const [signer, setSigner] = useState();

  const connectToMetamask = async () => {
    if (window.ethereum === undefined)
      return alert("not an ethereum-enabled browser");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setActive(true);
      handleProviderChanged(true);
    } catch (error) {
      console.log("error: ", error);
      setActive(false);
    }
  };

  const handleProviderChanged = async (isConnected) => {
    if (isConnected) {
      return setProvider(new ethers.BrowserProvider(window.ethereum));
    } else {
      return setProvider(
        new ethers.JsonRpcProvider(
          "https://eth-sepolia.g.alchemy.com/v2/ix0-fxmVivwaIWYHtIpwVZB7wC8TpxEm"
        )
      );
    }
  };

  const connectToContract = async (active = false) => {
    try {
      const contracts = new ethers.Contract(
        "0x016421AE35494F410A9F52746B43962C3Ec690ab",
        abi,
        active ? await provider.getSigner() : provider
      );
      return contracts;
    } catch (error) {}
  };

  const handleAccountChanged = useCallback(async (accounts) => {
    if (!accounts.length) {
      setAccount(undefined);
      setActive(false);
      handleProviderChanged(false);
    } else {
      setAccount(accounts[0]);
      setActive(true);
      handleProviderChanged(true);
    }
  }, []);

  const eagerlyConnect = useCallback(async () => {
    if (window.ethereum === undefined) return;
    const accounts = await window?.ethereum?.request({
      method: "eth_accounts",
    });

    if (!accounts.length) return;

    handleAccountChanged(accounts);
  }, [handleAccountChanged]);

  useEffect(() => {
    if (window.ethereum === undefined) return;
    eagerlyConnect();
    window.ethereum.on("accountsChanged", handleAccountChanged);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountChanged);
    };
  }, [eagerlyConnect, handleAccountChanged]);

  const connectToTokenContract = useCallback(async () => {
    try {
      const contracts = new ethers.Contract(
        "0x1283Fe4a1a5BE984471702a5780846656a3Ded2B",
        tokenabi,
        active ? await provider.getSigner() : provider
      );

      return contracts;
    } catch {}
  }, [provider, active]);

  const readOnlyContract = async () => {
    try {
      const writeContract = await connectToContract(true);
      return writeContract;
    } catch (error) {}
  };

  const signedContract = async () => {
    if (!active) return;
    try {
      const writeContract = await connectToContract(true);
      return writeContract;
    } catch (error) {}
  };

  return (
    <Connection.Provider
      value={{
        connectToMetamask,
        account,
        active,
        signedContract,
        readOnlyContract,
        connectToTokenContract,
      }}
    >
      {children}
    </Connection.Provider>
  );
};

export const useConnection = () => useContext(Connection);

export default ConnectionProvider;
