import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

window.open = (function (open) {
  return function (url, _, features) {
    return open.call(window, url, "_blank", features);
  };
})(window.open);

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { signMessage } = useSignMessage();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
        {status === "success" && (
          <button
            onClick={() => signMessage({ message: "Hello" })}
            type="button"
          >
            Sign message
          </button>
        )}
      </div>
    </>
  );
}

export default App;
