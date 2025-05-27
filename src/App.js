// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/note" element={<NoteList />} />
          <Route path="/note/add" element={<AddNote />} />
          <Route path="/note/edit/:id" element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;