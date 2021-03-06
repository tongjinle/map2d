"use strict";
var _ = require('underscore');
(function (Direction) {
    Direction[Direction["up"] = 0] = "up";
    Direction[Direction["right"] = 1] = "right";
    Direction[Direction["down"] = 2] = "down";
    Direction[Direction["left"] = 3] = "left";
})(exports.Direction || (exports.Direction = {}));
var Direction = exports.Direction;
;
(function (SlashDirection) {
    SlashDirection[SlashDirection["upRight"] = 0] = "upRight";
    SlashDirection[SlashDirection["downRight"] = 1] = "downRight";
    SlashDirection[SlashDirection["downLeft"] = 2] = "downLeft";
    SlashDirection[SlashDirection["upLeft"] = 3] = "upLeft";
})(exports.SlashDirection || (exports.SlashDirection = {}));
var SlashDirection = exports.SlashDirection;
var allDirection = [
    Direction.up,
    Direction.right,
    Direction.down,
    Direction.left
];
var allSlashDirection = [
    SlashDirection.upRight,
    SlashDirection.downRight,
    SlashDirection.downLeft,
    SlashDirection.upLeft
];
// *************************************************************************
// 基础range函数 START
// *************************************************************************
// 直线
// 0123 -> 上右下左
function lineRange(posiSource, dist, dire) {
    var posiList = [];
    var xStep;
    var yStep;
    if (dire == Direction.up) {
        xStep = 0;
        yStep = 1;
    }
    else if (dire == Direction.right) {
        xStep = 1;
        yStep = 0;
    }
    else if (dire == Direction.down) {
        xStep = 0;
        yStep = -1;
    }
    else if (dire == Direction.left) {
        xStep = -1;
        yStep = 0;
    }
    for (var i = 0; i < dist; i++) {
        posiList.push({ x: posiSource.x + xStep * (i + 1), y: posiSource.y + yStep * (i + 1) });
    }
    return posiList;
}
exports.lineRange = lineRange;
;
// 斜线
// 0123 -> 右上,右下,左下,左上
function slashRange(posiSource, dist, dire) {
    var posiList = [];
    var xStep;
    var yStep;
    if (dire == SlashDirection.upRight) {
        xStep = 1;
        yStep = 1;
    }
    else if (dire == SlashDirection.downRight) {
        xStep = 1;
        yStep = -1;
    }
    else if (dire == SlashDirection.downLeft) {
        xStep = -1;
        yStep = -1;
    }
    else if (dire == SlashDirection.upLeft) {
        xStep = -1;
        yStep = 1;
    }
    for (var i = 0; i < dist; i++) {
        posiList.push({ x: posiSource.x + xStep * (i + 1), y: posiSource.y + yStep * (i + 1) });
    }
    return posiList;
}
exports.slashRange = slashRange;
;
// 周围
// near = line * 4个方向
function nearRange(posiSource, dist) {
    var posiList = [];
    for (var i = 0; i < allDirection.length; i++) {
        var dire = allDirection[i];
        posiList = posiList.concat(lineRange(posiSource, dist, dire));
    }
    return posiList;
}
exports.nearRange = nearRange;
;
// 四角度斜线
// nearSlash = slash * 4;
function nearSlashRange(posiSource, dist) {
    var range = [];
    for (var i = 0; i < allSlashDirection.length; i++) {
        var dire = allSlashDirection[i];
        range = range.concat(slashRange(posiSource, dist, dire));
    }
    return range;
}
exports.nearSlashRange = nearSlashRange;
// 圆圈
function circleRange(posiSource, radius) {
    var posiList = [];
    for (var x = -radius; x <= radius; x++) {
        for (var y = -radius; y <= radius; y++) {
            if (!(x == 0 && y == 0)) {
                posiList.push({ x: x + posiSource.x, y: y + posiSource.y });
            }
        }
    }
    return posiList;
}
exports.circleRange = circleRange;
;
// 曼哈顿
function manhattanRange(posiSource, radius) {
    var posiList = [];
    for (var x = -radius; x <= radius; x++) {
        for (var y = -radius; y <= radius; y++) {
            var manhDist = Math.abs(x) + Math.abs(y);
            if (manhDist <= radius && manhDist != 0) {
                posiList.push({ x: x + posiSource.x, y: y + posiSource.y });
            }
        }
    }
    return posiList;
}
exports.manhattanRange = manhattanRange;
;
// 获取两点之间的坐标
function getBetween(pa, pb) {
    var range = [];
    var _a = [pa.x, pb.x].sort(function (a, b) { return a - b; }), minX = _a[0], maxX = _a[1];
    var _b = [pa.y, pb.y].sort(function (a, b) { return a - b; }), minY = _b[0], maxY = _b[1];
    for (var x = minX; x <= maxX; x++) {
        for (var y = minY; y <= maxY; y++) {
            range.push({ x: x, y: y });
        }
    }
    range = sub(range, [pa, pb]);
    return range;
}
exports.getBetween = getBetween;
// 获取position的唯一主键
function getPosiKey(posi) {
    return [posi.x, posi.y].join('-');
}
// 去重
function unique(posiList) {
    return _.uniq(posiList, getPosiKey);
}
exports.unique = unique;
// 差集
function sub(posiListSource, posiListTarget) {
    var posiList = [];
    var dict = _.indexBy(posiListSource, getPosiKey);
    var dictForSub = _.indexBy(posiListTarget, getPosiKey);
    _.each(dict, function (value, key) {
        if (!dictForSub[key]) {
            posiList.push(_.clone(value));
        }
    });
    return posiList;
}
exports.sub = sub;
// 获取方向
function getDirection(sourcePosi, targetPosi) {
    var dire;
    var sx = sourcePosi.x;
    var sy = sourcePosi.y;
    var tx = targetPosi.x;
    var ty = targetPosi.y;
    if (sx != tx && sy != ty) {
        return undefined;
    }
    if (sx == tx) {
        if (sy > ty) {
            dire = Direction.up;
        }
        else {
            dire = Direction.down;
        }
    }
    else {
        if (sx > tx) {
            dire = Direction.right;
        }
        else {
            dire = Direction.left;
        }
    }
    return dire;
}
exports.getDirection = getDirection;
// 获取斜线方向
function getSlashDirection(sourcePosi, targetPosi) {
    var dire;
    var sx = sourcePosi.x;
    var sy = sourcePosi.y;
    var tx = targetPosi.x;
    var ty = targetPosi.y;
    if (Math.abs((sy - ty) / (sx - tx)) != 1) {
        return undefined;
    }
    if (sy > ty) {
        if (sx > tx) {
            dire = SlashDirection.upRight;
        }
        else {
            dire = SlashDirection.upLeft;
        }
    }
    else {
        if (sx > tx) {
            dire = SlashDirection.downRight;
        }
        else {
            dire = SlashDirection.downLeft;
        }
    }
    return dire;
}
exports.getSlashDirection = getSlashDirection;
// *************************************************************************
// 基础range函数 END
// *************************************************************************
//# sourceMappingURL=rangeApi.js.map