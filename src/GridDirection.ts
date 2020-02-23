/**
 * 棋盤格方向
 * @enum {number}
 * 以十六進位表示法來看，共十六個位元，每四位元為一個單位，從左開始看分別代表：
 * 往前的單位，0 ~ 15單位，等同於Y座標軸相對減少
 * 往後的單位，0 ~ 15單位，等同於Y座標軸相對增加
 * 往左的單位，0 ~ 15單位，等同於X座標軸相對減少
 * 往右的單位，0 ~ 15單位，等同於X座標軸相對增加
 */
enum GridDirection {
    C = 0x0000,

    F = 0x1000,
    B = 0x0100,
    L = 0x0010,
    R = 0x0001,
    FL = 0x1010,
    FR = 0x1001,
    BL = 0x0110,
    BR = 0x0101,

    FF = 0x2000,
    BB = 0x0200,
    LL = 0x0020,
    RR = 0x0002,
    FFLL = 0x2020,
    FFRR = 0x2002,
    BBLL = 0x0220,
    BBRR = 0x0202,

    FFL = 0x2010,
    FFR = 0x2001,
    BBL = 0x0210,
    BBR = 0x0201,
    FLL = 0x1020,
    FRR = 0x1002,
    BLL = 0x0120,
    BRR = 0x0102,
}

export default GridDirection;
