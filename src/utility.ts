import { GridLike } from "./type";

/**
 * 判斷目標是否為物件且不為空值
 * @param {any} target 目標
 * @return {boolean}
 */
export function isObjectAndNotNull(target: any): target is object {
    return typeof target === "object" && target !== null;
}

/**
 * 判斷類棋盤格物件是否有狀態
 * @param gridLike 類棋盤物件
 * @return {boolean}
 */
export function isGridLikeHasState(gridLike: Pick<GridLike, "piece">): gridLike is GridLike {
    return "state" in gridLike;
}
