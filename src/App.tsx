import { Route, Routes } from "react-router-dom";
import Layout from "./layouts";
import HomePage from "./pages/HomePage";
import "./fonts/PPNeueMachina-PlainRegular.otf";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
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
    </AppContextProvider>
  );
}

export default App;
