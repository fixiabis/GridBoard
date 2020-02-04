enum GridOrientation {
    FBLR = 0b000,
    FBRL = 0b001,
    BFLR = 0b010,
    BFRL = 0b011,
    LRFB = 0b100,
    LRBF = 0b110,
    RLFB = 0b101,
    RLBF = 0b111,
}

// format: xy swap, x order, y order

export default GridOrientation;
