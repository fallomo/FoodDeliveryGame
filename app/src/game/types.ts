// 建筑类型枚举
export enum BuildingType {
  Restaurant = 'restaurant', // 餐饮店
  Bookstore = 'bookstore', // 书店
  Cinema = 'cinema', // 音像店
  Supermarket = 'supermarket', // 超市
  Pharmacy = 'pharmacy', // 药店
}

// 定义地图格子类型
export type TileType = 'road' | 'green' | 'building';

export type Tile =
  | { type: 'road' } // 道路
  | { type: 'green' } // 绿化
  | { type: 'building'; buildingType: BuildingType }; // 建筑