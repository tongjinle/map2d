/// <reference path="../node_modules/@types/underscore/index.d.ts" />
/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
"use strict";
var _ = require('underscore');
var rangeApi = require('../rangeApi');
describe('range api', function () {
    var sort = function (posi) { return [posi.x, posi.y].join('-'); };
    it('lineRange', function () {
        var exp = [
            { x: 1, y: 0 },
            { x: 1, y: -1 }
        ];
        expect(rangeApi.lineRange({ x: 1, y: 1 }, 2, 2)).toEqual(exp);
    });
    it('slashRange', function () {
        var exp = [
            { x: 0, y: 0 },
            { x: -1, y: -1 }
        ];
        expect(rangeApi.slashRange({ x: 1, y: 1 }, 2, 2)).toEqual(exp);
    });
    it('nearRange', function () {
        var exp = [
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 1, y: 2 },
            { x: 1, y: 3 },
            { x: 0, y: 1 },
            { x: -1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
        ];
        var rst = rangeApi.nearRange({ x: 1, y: 1 }, 2);
        expect(_.sortBy(rst, sort)).toEqual(_.sortBy(exp, sort));
    });
    it('circleRange', function () {
        var exp = [
            { x: -1, y: 3 },
            { x: -1, y: 2 },
            { x: -1, y: 1 },
            { x: -1, y: 0 },
            { x: -1, y: -1 },
            { x: 0, y: 3 },
            { x: 0, y: 2 },
            { x: 0, y: 1 },
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: 3 },
            { x: 1, y: 2 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 2, y: 3 },
            { x: 2, y: 2 },
            { x: 2, y: 1 },
            { x: 2, y: 0 },
            { x: 2, y: -1 },
            { x: 3, y: 3 },
            { x: 3, y: 2 },
            { x: 3, y: 1 },
            { x: 3, y: 0 },
            { x: 3, y: -1 }
        ];
        expect(_.sortBy(rangeApi.circleRange({ x: 1, y: 1 }, 2), sort)).toEqual(_.sortBy(exp, sort));
        // console.log(_.sortBy(rangeApi.circleRange({ x: 1, y: 1 }, 2)));
        // console.log('----');
        // console.log(_.sortBy(exp, sort));
    });
    it('manhattan', function () {
        var exp = [
            { x: -1, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 1 },
            { x: 0, y: 0 },
            { x: 1, y: 3 },
            { x: 1, y: 2 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 2, y: 2 },
            { x: 2, y: 1 },
            { x: 2, y: 0 },
            { x: 3, y: 1 }
        ];
        expect(_.sortBy(rangeApi.manhattanRange({ x: 1, y: 1 }, 2), sort)).toEqual(_.sortBy(exp, sort));
    });
    it('unique', function () {
        var source = [
            { x: 1, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 2 }
        ];
        var target = [
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ];
        var exp = rangeApi.unique(source);
        expect(exp).toEqual(target);
    });
    it('sub', function () {
        var source = [
            { x: 1, y: 1 },
            { x: 1, y: 3 },
            { x: 1, y: 2 }
        ];
        var target = [
            { x: 1, y: 1 },
            { x: 1, y: 2 }
        ];
        var exp = rangeApi.sub(source, target);
        expect(exp).toEqual([{ x: 1, y: 3 }]);
    });
    it('getBetween', function () {
        var pa = { x: 1, y: 4 };
        var pb = { x: 1, y: 2 };
        var target = [
            { x: 1, y: 3 }
        ];
        expect(rangeApi.getBetween(pa, pb)).toEqual(target);
    });
});
