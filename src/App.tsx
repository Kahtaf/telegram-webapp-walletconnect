import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  useSwitchChain,
} from "wagmi";

window.open = (function (open) {
  return function (url, _, features) {
    return open.call(window, url, "_blank", features);
  };
})(window.open);

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { signMessage, data: signature } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();

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
            onClick={async () => {
              connect({ connector });
              await switchChainAsync({ chainId: 14801 });
            }}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
        {(status === "success" || status === "idle") && (
          <button
            onClick={async () => {
              signMessage({ message: "Hello" });
            }}
            type="button"
          >
            Sign message
          </button>
        )}
        {signature && <div>{signature}</div>}
      </div>
    </>
  );
}

export default App;
