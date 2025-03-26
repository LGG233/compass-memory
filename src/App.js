// Compass - src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Memory from "./pages/Memory";
import Flow from "./pages/Flow";
import Weekend from "./pages/Weekend";
import Friction from "./pages/Friction";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/weekend" element={<Weekend />} />
          <Route path="/friction" element={<Friction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;