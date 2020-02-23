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
 * 判斷目標是否為物件且包含指定的欄位
 * @param {any} target 目標
 * @param {string} key 欄位名稱
 */
export function isObjectAndHasKey<Key extends string>(target: any, key: Key): target is { [key in Key]: any } {
    return typeof target === "object" && key in target;
}
