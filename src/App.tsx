
import ThemeContextDefaultProvider from "./context/ThemeContextProvider";

import { Routes, Route } from "react-router-dom";
import MasterLayout from "./components/MasterLayout";

function App() {

  return (
    <>
      <ThemeContextDefaultProvider>
        <Routes>
          <Route path="/" element={<MasterLayout />} />
        </Routes>
      </ThemeContextDefaultProvider>

    </>
  )
}

export default App
