"use client";
import React, { useRef, useEffect } from 'react';
import { Tile } from "@/game/types";

// 定义 Map 组件的 props 类型
interface MapProps {
  mapData: Tile[][]; // mapData 是一个二维数组，每个元素是 Tile 类型
}

const Map: React.FC<MapProps> = ({ mapData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // 如果 canvas 为 null，提前退出

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // 如果 ctx 为 null，提前退出

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 渲染地图
    const tileSize = 20; // 每个格子的大小
    mapData.forEach((row, y) => {
      row.forEach((tile, x) => {
        // 根据格子类型绘制
        if (tile.type === 'road') {
          ctx.fillStyle = '#cccccc'; // 道路颜色
        } else if (tile.type === 'building') {
          ctx.fillStyle = '#ffcc99'; // 建筑颜色
        } else {
          ctx.fillStyle = '#99cc99'; // 绿化颜色
        }
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

        // 绘制建筑名称
        if (tile.type === 'building') {
          ctx.fillStyle = '#000000';
          ctx.font = '10px Arial';
          ctx.fillText(
            tile.buildingType,
            x * tileSize + 2,
            y * tileSize + 12
          );
        }
      });
    });
  }, [mapData]);

  return <canvas ref={canvasRef} width={600} height={400} />;
};

export default Map;