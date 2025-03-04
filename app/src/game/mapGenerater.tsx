import React, { useRef, useEffect, useState } from 'react';

// 地图格子类型
export const TILE_TYPES = {
  ROAD: 'road',
  BUILDING: 'building',
  GREEN: 'green',
};

// 建筑类型
export const BUILDING_TYPES = [
  'restaurant', // 餐饮店
  'bookstore', // 书店
  'cinema', // 音像店
  'supermarket', // 超市
  'pharmacy', // 药店
];

// 地图编辑器组件
export const MapEditor = () => {
  const canvasRef = useRef(null);
  const [mapData, setMapData] = useState(
    Array.from({ length: 20 }, () =>
      Array.from({ length: 30 }, () => ({ type: TILE_TYPES.GREEN }))
    )
  );

  // 渲染地图
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
            tile.buildingType || 'building',
            x * tileSize + 2,
            y * tileSize + 12
          );
        }
      });
    });
  }, [mapData]);

  // 处理点击事件
  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 20); // 计算点击的格子坐标
    const y = Math.floor((e.clientY - rect.top) / 20);

    // 更新地图数据
    const newMapData = [...mapData];
    const tile = newMapData[y][x];

    // 切换地块类型
    if (tile.type === TILE_TYPES.GREEN) {
      tile.type = TILE_TYPES.ROAD;
    } else if (tile.type === TILE_TYPES.ROAD) {
      tile.type = TILE_TYPES.BUILDING;
      tile.buildingType = BUILDING_TYPES[Math.floor(Math.random() * BUILDING_TYPES.length)];
    } else {
      tile.type = TILE_TYPES.GREEN;
      delete tile.buildingType;
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