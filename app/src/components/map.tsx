"use client";
import React, { useRef, useEffect } from 'react';
import { TILE_TYPES } from "@/game/mapGenerater"

const Map = ({ mapData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 渲染地图
    const tileSize = 20; // 每个格子的大小
    mapData.forEach((row, y) => {
      row.forEach((tile, x) => {
        // 根据格子类型绘制
        if (tile.type === TILE_TYPES.ROAD) {
          ctx.fillStyle = '#cccccc'; // 道路颜色
        } else if (tile.type === TILE_TYPES.BUILDING) {
          ctx.fillStyle = '#ffcc99'; // 建筑颜色
        } else {
          ctx.fillStyle = '#99cc99'; // 绿化颜色
        }
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

        // 绘制建筑名称
        if (tile.type === TILE_TYPES.BUILDING) {
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