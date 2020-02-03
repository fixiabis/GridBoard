enum GridOrientation {
    FBLR = 0x000,
    FBRL = 0x001,
    BFLR = 0x010,
    BFRL = 0x011,
    LRFB = 0x100,
    LRBF = 0x110,
    RLFB = 0x101,
    RLBF = 0x111,
}

// format: xy swap, x order, y order

export default GridOrientation;
