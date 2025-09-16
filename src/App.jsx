// src/App.jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // 导入路由相关组件
import Navigation from "./components/Navigation"; // 导入导航组件
import Home from "./pages/Home"; // 导入首页组件
import SmartNavigation from "./pages/SmartNavigation"; // 导入智慧导航组件
import Map from "./components/Map"; // 导入地图组件

const App = () => {
  return (
    <Router>
      {/* 侧边导航 */}
      <Navigation />
      <div className="w-screen h-screen relative overflow-hidden bg-slate-900">
        <Map />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smart-navigation" element={<SmartNavigation />} />
      </Routes>
    </Router>
  );
};

export default App;
