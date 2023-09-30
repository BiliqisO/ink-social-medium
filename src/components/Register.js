import { useConnection } from "../context/connection";

export const Register = () => {
  const { signedContract } = useConnection();
  const handleRegister = async () => {
    try {
      const contract = await signedContract();
      contract.register();
    } catch (error) {
      console.log({ msg: "Error registering contract", error });
      alert("user already registered");
    }
  };

  return (
    <div>
      <button
        className="button-24"
        onClick={handleRegister}
      >
        REGISTER
      </button>
    </div>
  );
};
