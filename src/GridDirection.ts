/**
 * 棋盤格方向
 * @enum {number}
 * 以十六進位表示法來看，共十六個位元，每四位元為一個單位，從左開始看分別代表：
 * 往前的單位，0 ~ 15單位，等同於Y座標軸相對減少
 * 往後的單位，0 ~ 15單位，等同於Y座標軸相對增加
 * 往左的單位，0 ~ 15單位，等同於X座標軸相對減少
 * 往右的單位，0 ~ 15單位，等同於X座標軸相對增加
 */
class GridDirection {
    static readonly C = 0x0000;

    static readonly F = 0x1000;
    static readonly B = 0x0100;
    static readonly L = 0x0010;
    static readonly R = 0x0001;
    static readonly FL = 0x1010;
    static readonly FR = 0x1001;
    static readonly BL = 0x0110;
    static readonly BR = 0x0101;

    static readonly FF = 0x2000;
    static readonly BB = 0x0200;
    static readonly LL = 0x0020;
    static readonly RR = 0x0002;
    static readonly FFLL = 0x2020;
    static readonly FFRR = 0x2002;
    static readonly BBLL = 0x0220;
    static readonly BBRR = 0x0202;

    static readonly FFL = 0x2010;
    static readonly FFR = 0x2001;
    static readonly BBL = 0x0210;
    static readonly BBR = 0x0201;
    static readonly FLL = 0x1020;
    static readonly FRR = 0x1002;
    static readonly BLL = 0x0120;
    static readonly BRR = 0x0102;

    static parseDirectionToRelativeCoordinate(direction: number) {
        var c = (direction / 4) | 0;
        for (var i = 0, j = 1; i + j < c; i += 2, j += i);
    
        var x, y;
    
        if (c - j < i / 2) {
            x = (c / (i / 2 + 1) | 0);
            y = (c % (i / 2 + 1));
        }
        else {
            x = (c % (i / 2 + 1));
            y = (c / (i / 2 + 1) | 0);
        }
    
        x *= (direction % 4) & 0b01 ? +1 : -1;
        y *= (direction % 4) & 0b10 ? +1 : -1;
        
        return [x, y];
    }
}

export default GridDirection;
