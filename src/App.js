import {BrowserRouter, Routes, Route} from "react-router-dom";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NoteList/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="add" element={<AddNote/>}/>
        <Route path="edit/:id" element={<EditNote/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
