import { useState, useEffect } from 'react';
import { DeliveryMan } from './deliveryMan';

// 键盘控制钩子
import { Tile } from './types';

export const useKeyboardControl = (initialDeliveryMan: DeliveryMan, mapData: Tile[][]) => {
  const [deliveryMan, setDeliveryMan] = useState<DeliveryMan>(initialDeliveryMan);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      
      setDeliveryMan(prev => {
        const newPosition = { ...prev.position };
        let canMove = false;
        
        // WASD控制移动
        switch (key.toLowerCase()) {
          case 'w':
            if (prev.position.y > 0 && mapData[prev.position.y - 1][prev.position.x].type === 'road') {
              newPosition.y = prev.position.y - 1;
              canMove = true;
            }
            break;
          case 's':
            if (prev.position.y < mapData.length - 1 && mapData[prev.position.y + 1][prev.position.x].type === 'road') {
              newPosition.y = prev.position.y + 1;
              canMove = true;
            }
            break;
          case 'a':
            if (prev.position.x > 0 && mapData[prev.position.y][prev.position.x - 1].type === 'road') {
              newPosition.x = prev.position.x - 1;
              canMove = true;
            }
            break;
          case 'd':
            if (prev.position.x < mapData[0].length - 1 && mapData[prev.position.y][prev.position.x + 1].type === 'road') {
              newPosition.x = prev.position.x + 1;
              canMove = true;
            }
            break;
          default:
            return prev;
        }

        return {
          ...prev,
          position: newPosition,
        };
      });
    };

    // 添加键盘事件监听
    window.addEventListener('keydown', handleKeyPress);

    // 清理事件监听
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return [deliveryMan, setDeliveryMan] as const;
};