import React, { useRef, useEffect, useState } from 'react';
import { Tile, BuildingType } from '@/game/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DeliveryMan, initialDeliveryMan } from './deliveryMan';
import { DeliveryManComponent } from './DeliveryManComponent';
import { useKeyboardControl } from './useKeyboardControl';

// 地图编辑器组件
const MapEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mapData, setMapData] = useState<Tile[][]>(
    Array.from({ length: 20 }, () =>
      Array.from({ length: 30 }, () => ({ type: 'green' }))
    )
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deliveryMan, setDeliveryMan] = useKeyboardControl(initialDeliveryMan);

  // 渲染地图和外卖员
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
    const DeliveryManRenderer = () => (
      <DeliveryManComponent
        deliveryMan={deliveryMan}
        canvasContext={ctx}
        tileSize={tileSize}
      />
    );
    DeliveryManRenderer();
  }, [mapData, deliveryMan]);


  // 处理点击事件
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return; // 如果 canvas 为 null，提前退出

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 20); // 计算点击的格子坐标
    const y = Math.floor((e.clientY - rect.top) / 20);

    // 更新地图数据
    const newMapData = [...mapData];
    const tile = newMapData[y][x];

    // 切换地块类型
    if (tile.type === 'green') {
      newMapData[y][x] = { type: 'road' }; // 切换到道路
    } else if (tile.type === 'road') {
      newMapData[y][x] = {
        type: 'building',
        buildingType: Object.values(BuildingType)[
          Math.floor(Math.random() * Object.values(BuildingType).length)
        ], // 随机选择一个建筑类型
      }; // 切换到建筑
    } else {
      newMapData[y][x] = { type: 'green' }; // 切换到绿化
    }

    setMapData(newMapData);
  };

  // 输出地图数据到控制台
  const handleExport = () => {
    console.log(JSON.stringify(mapData, null, 2));
  };

  return (
    <div>
      <h1>地图编辑器</h1>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onClick={handleClick}
        style={{ border: '1px solid #000' }}
      />
      <button onClick={handleExport} style={{ marginTop: '10px' }}>
        导出地图数据
      </button>
    </div>
  );
};

export default MapEditor;