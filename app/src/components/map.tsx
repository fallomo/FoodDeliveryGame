"use client";
import React, { useRef, useEffect, useState, useMemo } from 'react'; // Import useState and useMemo
import { Tile } from "@/game/types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DeliveryMan, initialDeliveryMan } from '@/game/deliveryMan';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DeliveryManComponent } from '@/game/DeliveryManComponent';
import { useKeyboardControl } from '@/game/useKeyboardControl';

// 定义 Map 组件的 props 类型
interface MapProps {
  mapData: Tile[][]; // mapData 是一个二维数组，每个元素是 Tile 类型
}

// Helper function to find a random road position
const getRandomRoadPosition = (mapData: Tile[][]): { x: number; y: number } => {
  const roadTiles: { x: number; y: number }[] = [];
  mapData.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile.type === 'road') {
        roadTiles.push({ x, y });
      }
    });
  });

  if (roadTiles.length === 0) {
    console.warn("No road tiles found on the map. Defaulting to (1, 1).");
    return { x: 1, y: 1 }; // Default if no roads
  }

  const randomIndex = Math.floor(Math.random() * roadTiles.length);
  return roadTiles[randomIndex];
};

const Map: React.FC<MapProps> = ({ mapData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Calculate initial position only once
  const initialPosition = useMemo(() => getRandomRoadPosition(mapData), [mapData]);

  // Create the initial state for the delivery man with the random position
  const deliveryManInitialState: DeliveryMan = {
    ...initialDeliveryMan,
    position: initialPosition,
  };

  const [deliveryMan] = useKeyboardControl(deliveryManInitialState, mapData);

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

    // 渲染外卖员
    const { x, y } = deliveryMan.position;
    ctx.fillStyle = '#ff0000'; // 红色表示外卖员
    ctx.beginPath();
    ctx.arc(
      x * tileSize + tileSize / 2,
      y * tileSize + tileSize / 2,
      tileSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [mapData, deliveryMan]);

  return <canvas ref={canvasRef} width={600} height={400} />;
};

export default Map;