# 外卖小游戏

简述：使用 js+react+canvas 实现一个小游戏 2D俯视角城市地图中，玩家扮演的外卖员在道路上奔走送外卖。

主要流程：道路上会不断根据道路周围的商店刷新取餐点，同时标记出对应的送货点。玩家需要合理规划路径，在时间限制内尽可能多的完成外卖订单。通过完成订单获取金币来还清不断上升的贷款。同时通过富余的金币升级自己的装备，提升送货效率。

主要系统：

1. 地图交互系统——角色移动，订单刷新
    
    角色移动：使用wasd使角色在地图上平滑的进行移动
    
    订单刷新：根据道路相邻的建筑物类型，刷新对应订单
    
2. 金币系统——提供游戏目标，提供升级项
    
    贷款：必须按时上交的金额，随完成次数逐步上涨。到期无法支付则游戏结束。
    
    可升级项：
    
    1. 外卖车容量：外卖车有容量限制，默认只能装下2份外卖。
    2. 移动速度：外卖车的移动速度
    3. 外卖平台会员：增加订单的刷新量，增加订单的可接取时间

3. 记分系统
    1. 记录完成订单数
    2. 记录成功还款次数
    3. 记录玩家总获取的金币数
    4. 根据以上记录按权重计算总分

数据类型：

地图：需要记录地图信息，包括：道路，建筑，角色当前位置

道路：目前就一种，之后可扩展出更多道路类型

建筑：音像店，书店，各式各样餐饮店等

不同建筑刷新的订单，等待时长，报酬水平，消耗的容量不同

订单：

1.  不断减少的可接单时间
2. 订单提供的报酬
3. 接取订单需要的剩余外卖车容量
4. 刷新订单时会同时标出订单要求配送到的位置

角色：

1. 角色当前的可升级项目等级
2. 角色当前持有的金币数

贷款：

1. 当前需要还款的数额
2. 完成本次还款后的奖励金额
3. 距离结算还款的时间

技术选型：

1. 游戏逻辑较为简单，直接放在浏览器端，无需后端
2. 使用js完成逻辑，react+canvas展示界面

可选扩展：
1.玩家信誉系统。接取后超时的订单将扣除玩家信誉，信誉归零则游戏结束
2.更复杂的道路系统。不同道路类型有不同特性
3.随机事件系统。例：
  下雨：订单时间变得宽裕，但道路变得难以通过 
  高峰期：订单大量出现 
  加急订单：时间减少报酬丰厚的订单


试图借助AI完成一个简单的小游戏，先写十小时的试试水吧

