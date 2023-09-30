import { ethers } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";

import abi from "../constants/abi.json";
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
    } catch (error) {
      console.log("error: ", error);
      setActive(false);
    }
  };

  const connectToContract = async () => {
    try {
      const providers = !!active
        ? new ethers.BrowserProvider(window.ethereum)
        : new ethers.JsonRpcProvider(
            "https://eth-sepolia.g.alchemy.com/v2/ix0-fxmVivwaIWYHtIpwVZB7wC8TpxEm"
          );
      const contracts = new ethers.Contract(
        "0x016421AE35494F410A9F52746B43962C3Ec690ab",
        abi,
        !!active ? await providers.getSigner() : provider
      );
      setProvider(providers);
      return contracts;
    } catch (error) {}
  };

  const readOnlyContract = async () => {
    try {
      const writeContract = await connectToContract();
      return writeContract;
    } catch (error) {}
  };

  const signedContract = async () => {
    if (!active) return;
    try {
      const writeContract = await connectToContract();
      return writeContract;
    } catch (error) {}
  };
  // const eagerlyConnect = async () => {
  //   if (window.ethereum === undefined) return;
  //   const accounts = await window?.ethereum?.request({
  //     method: "eth_accounts",
  //   });
  //   if (!accounts.length) return;
  //   connectToContract(accounts);
  // };
  // useEffect(() => {
  //   if (window.ethereum === undefined) return;
  //   eagerlyConnect();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Connection.Provider
      value={{
        connectToMetamask,
        connectToContract,
        account,
        active,
        signedContract,
        readOnlyContract,
      }}
    >
      {children}
    </Connection.Provider>
  );
};

export const useConnection = () => useContext(Connection);

export default ConnectionProvider;
