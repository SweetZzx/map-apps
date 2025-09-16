// src/pages/SmartNavigation.jsx
import React, { useEffect, useRef, useState } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

const SmartNavigation = () => {
  const mapRef = useRef(null);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  let driving;

  useEffect(() => {
    let map;

    AMapLoader.load({
      key: "beed5a6b0db09b8b4f0c01d3b1b5a7d6",
      version: "2.0",
    })
      .then((AMap) => {
        map = new AMap.Map(mapRef.current, {
          center: [108.95, 34.27],
          zoom: 8,
          viewMode: "3D",
        });

        driving = new AMap.Driving({
          map: map,
          panel: "routePanel",
        });
      })
      .catch((error) => {
        console.error("高德地图加载失败:", error);
      });

    return () => {
      if (map) {
        map.destroy();
      }
    };
  }, []);

  const planRoute = () => {
    driving.clear();
    driving.search(startPoint, endPoint, (status, result) => {
      if (status === "complete") {
        console.log("路径规划成功", result);
      } else {
        console.error("路径规划失败", result);
      }
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">智慧导航</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="请输入起点"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full md:w-1/2"
        />
        <input
          type="text"
          placeholder="请输入终点"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full md:w-1/2"
        />
        <button
          onClick={planRoute}
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
        >
          规划路线
        </button>
      </div>
      <div ref={mapRef} className="w-full h-96 border rounded"></div>
      <div id="routePanel" className="hidden" />
    </div>
  );
};

export default SmartNavigation;
