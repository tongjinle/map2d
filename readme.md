# 2d格子地图

## 安装
npm i map2d

## API
```
// 基本类型
// IPosition 2d坐标 {x:number,y:number}
// Direction 方向枚举,上右下左
// SlashDirection 斜向方向枚举,东北 东南 西南 西北

// 1 以posiSoure为原点,获取dire方向(直线)的dist个格子的坐标数组
lineRange(posiSource: IPosition, dist: number, dire: number): IPosition[];

// 2 以posiSoure为原点,获取dire方向(斜线)的dist个格子的坐标数组
slashRange(posiSource: IPosition, dist: number, dire: number): IPosition[];

// 3 周围直线4格(不包括自己)
nearRange(posiSource: IPosition, dist: Direction): IPosition[];

// 4 周围斜线4格(不包括自己)
nearSlashRange(posiSource: IPosition, dist: Direction): IPosition[];

// 5 周围一圈(不包括自己)
circleRange(posiSource: IPosition, radius: number): IPosition[];

// 6 曼哈顿距离(不包括自己)
manhattanRange(posiSource: IPosition, radius: number): IPosition[];

// 7 获取两点之间坐标
getBetween(pa: IPosition, pb: IPosition): IPosition[];

// 8 坐标去重
unique(posiList: IPosition[]): IPosition[];

// 9 差集运算
sub(posiListSource: IPosition[], posiListTarget: IPosition[]): IPosition[];

// 10 获取sourcePosi相对于targetPosi的直线方向
getDirection(sourcePosi: IPosition, targetPosi: IPosition): Direction;

// 11 获取sourcePosi相对于targetPosi的斜线方向
getSlashDirection(sourcePosi: IPosition, targetPosi: IPosition): SlashDirection;


```

## npm脚本
### npm run compile
编译ts代码

### npm run test
测试