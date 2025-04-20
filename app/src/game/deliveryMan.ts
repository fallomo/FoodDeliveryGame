// 外卖员状态枚举
export enum DeliveryManStatus {
  Idle = 'idle', // 空闲
  Moving = 'moving', // 移动中
  Delivering = 'delivering', // 送餐中
}

// 外卖员装备等级
export interface EquipmentLevel {
  capacity: number; // 外卖车容量
  speed: number; // 移动速度
  membership: number; // 外卖平台会员等级
}

// 外卖员类型定义
export interface DeliveryMan {
  position: { x: number; y: number }; // 当前位置
  status: DeliveryManStatus; // 当前状态
  equipment: EquipmentLevel; // 装备等级
  coins: number; // 持有金币数
  currentCapacity: number; // 当前已使用容量
}

// 外卖员初始状态
export const initialDeliveryMan: DeliveryMan = {
  position: { x: 1, y: 1 }, // 设置初始位置在(1,1)，这是一个更可能是道路的位置
  status: DeliveryManStatus.Idle,
  equipment: {
    capacity: 2, // 初始容量为2
    speed: 1, // 初始速度为1
    membership: 1, // 初始会员等级为1
  },
  coins: 0,
  currentCapacity: 0,
};