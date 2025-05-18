import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <NoteList />
            </ProtectedRoute>
          } />
          <Route path="add" element={
            <ProtectedRoute>
              <AddNote />
            </ProtectedRoute>
          } />
          <Route path="edit/:id" element={
            <ProtectedRoute>
              <EditNote />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;