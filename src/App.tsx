import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Tasks from "./components/Tasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tasks />} />
        {/*
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        
        */}
      </Routes>
    </Router>
  );
}

export default App;
