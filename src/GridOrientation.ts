/**
 * 棋盤格轉向
 * @enum {number}
 * 以二進位表示法來看，共三個位元，從左開始看分別代表：
 * 座標軸是否交換，0=不交換，1=交換
 * X座標軸是否降冪，0=否，升冪，1=是，降冪
 * Y座標軸是否降冪，0=否，升冪，1=是，降冪
 */
enum GridOrientation {
    FBLR = 0b000,
    BFLR = 0b001,
    FBRL = 0b010,
    BFRL = 0b011,
    LRFB = 0b100,
    LRBF = 0b101,
    RLFB = 0b110,
    RLBF = 0b111,
}

export default GridOrientation;
