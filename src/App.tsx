import { useAccount, useConnect, useDisconnect } from 'wagmi'
import Balance from './components/Balance'
import { BrowserRouter, HashRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import Layout from './layouts'
import HomePage from './pages/HomePage'

function App() {
  // const account = useAccount()
  // const { connectors, connect, status, error } = useConnect()
  // const { disconnect } = useDisconnect()

  return (
    // <>
    //   <Header />
    //   <div>
    //     <h2>Account</h2>

    //     <div>
    //       blance: <Balance address={(account.addresses || [])[0] || ''} />
    //       <br/>
    //       status: {account.status}
    //       <br />
    //       addresses: {JSON.stringify(account.addresses)}
    //       <br />
    //       chainId: {account.chainId}
    //     </div>

    //     {account.status === 'connected' && (
    //       <button type="button" onClick={() => disconnect()}>
    //         Disconnect
    //       </button>
    //     )}
    //   </div>

    //   <div>
    //     <h2>Connect</h2>
    //     {connectors.map((connector) => (
    //       <button
    //         key={connector.uid}
    //         onClick={() => connect({ connector })}
    //         type="button"
    //       >
    //         {connector.name}
    //       </button>
    //     ))}
    //     <div>{status}</div>
    //     <div>{error?.message}</div>
    //   </div>
    // </>
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<p>About</p>} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}

          {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App


