// src/components/Navigation.jsx
import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false); // 管理菜单的打开和关闭状态
  const [activeWidget, setActiveWidget] = useState("home"); // 默认选中的菜单项
  const navigate = useNavigate(); // 使用 navigate 进行页面跳转

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // 切换菜单状态
  };

  // 点击菜单栏外关闭菜单
  const handleMenuOutsideClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  }, []);

  const handleSelectChange = (e) => {
    const selected = e.target.value;
    setActiveWidget(selected); // 更新当前激活的菜单项

    // 跳转到相应页面
    if (selected === "home") {
      navigate("/");
    } else if (selected === "smart-navigation") {
      navigate("/smart-navigation");
    }
  };

  return (
    <>
      {/* 悬浮触发球 */}
      {!isOpen && (
        <div className="fixed top-6 left-6 z-[1000] pointer-events-auto">
          <button
            onClick={toggleMenu}
            className="w-14 h-14 rounded-full bg-slate-800 border-2 border-cyan-400 transition-transform duration-300 transform hover:scale-110 shadow-lg"
            aria-label="打开导航菜单"
          >
            <svg
              className="w-6 h-6 text-cyan-300 relative left-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      )}

      {/* 侧边导航菜单 */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] pointer-events-auto" onClick={handleMenuOutsideClick}>
          <div className="absolute top-0 left-0 h-full w-60 pointer-events-auto transform transition-transform duration-300 ease-out translate-x-0">
            <div className="h-full bg-slate-900/95 backdrop-blur-xl shadow-2xl border-r border-cyan-500/20 relative flex flex-col">
              {/* 菜单头部 */}
              <div className="p-3 border-b border-slate-700/30 flex-shrink-0">
                <select
                  value={activeWidget}
                  onChange={handleSelectChange}
                  className="w-full h-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                  aria-label="导航选择"
                >
                  <option value="home">首页</option>
                  <option value="smart-navigation">智慧导航</option>
                </select>
              </div>

              {/* 菜单链接区域 */}
              <div className="flex-1 overflow-y-auto p-4 pb-6">
                <ul className="flex flex-col space-y-2">
                  <li>
                    <Link
                      to="/"
                      className={`block p-2 rounded-lg transition-colors ${activeWidget === "home" ? "bg-cyan-600 text-white" : "text-gray-300 hover:bg-cyan-500 hover:text-white"}`}
                      onClick={() => handleMenuClick("home")}
                    >
                      首页
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/smart-navigation"
                      className={`block p-2 rounded-lg transition-colors ${activeWidget === "smart-navigation" ? "bg-cyan-600 text-white" : "text-gray-300 hover:bg-cyan-500 hover:text-white"}`}
                      onClick={() => handleMenuClick("smart-navigation")}
                    >
                      智慧导航
                    </Link>
                  </li>
                  {/* 其他菜单项 */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
