import React, { useEffect } from 'react';
import { DeliveryMan } from './deliveryMan';

interface DeliveryManComponentProps {
  deliveryMan: DeliveryMan;
  canvasContext: CanvasRenderingContext2D;
  tileSize: number;
}

// 外卖员渲染组件
export const DeliveryManComponent: React.FC<DeliveryManComponentProps> = ({
  deliveryMan,
  canvasContext: ctx,
  tileSize,
}) => {
  // 渲染外卖员
  useEffect(() => {
    const { x, y } = deliveryMan.position;
    
    // 清除原位置
    ctx.clearRect(x * tileSize, y * tileSize, tileSize, tileSize);
    
    // 绘制外卖员
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
  }, [deliveryMan.position, ctx, tileSize]);

  return null; // 这是一个渲染组件，不需要返回JSX
};