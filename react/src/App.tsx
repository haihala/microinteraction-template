import { Route, Routes } from "react-router";
import "./App.css";
import { Footer } from "./components/Footer";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Table } from "./components/Table";

function App() {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Routes>
          <Route index element={<Table />} />
          <Route path="form" element={<Form />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
