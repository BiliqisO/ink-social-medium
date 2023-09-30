import React from "react";
import { useConnection } from "../context/connection";
import { Register } from "./Register";

export const Header = () => {
  const { connectToMetamask, account, active } = useConnection();
  return (
    <div className="header">
      {active && (
        <p>
          Hello account {account.substring(0, 6)}...{account.substring(38)}
        </p>
      )}
      <Register />
      {active ? (
        <button className="button-24">Connected</button>
      ) : (
        <button
          onClick={connectToMetamask}
          className="button-24"
        >
          Connect to metamask
        </button>
      )}
    </div>
  );
};
