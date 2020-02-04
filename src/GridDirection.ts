enum GridDirection {
    C = 0x0000,

    F = 0x1000,
    B = 0x0100,
    R = 0x0001,
    L = 0x0010,
    FR = 0x1001,
    FL = 0x1010,
    BR = 0x0101,
    BL = 0x0110,

    FF = 0x2000,
    BB = 0x0200,
    RR = 0x0002,
    LL = 0x0020,
    FFRR = 0x2002,
    FFLL = 0x2020,
    BBRR = 0x0202,
    BBLL = 0x0220,

    FFR = 0x2001,
    FFL = 0x2010,
    BBR = 0x0201,
    BBL = 0x0210,
    FRR = 0x1002,
    FLL = 0x1020,
    BRR = 0x0102,
    BLL = 0x0120,
}

// format: forward unit, backward unit, left unit, right unit

export default GridDirection;
