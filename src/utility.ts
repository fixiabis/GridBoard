/**
 * 判斷目標是否為物件且不為空值
 * @param {unknown} target 目標
 * @return {boolean}
 */
export function isObjectAndNotNull(target: unknown): target is object {
    return typeof target === "object" && target !== null;
}

/**
 * 判斷目標是否為物件且包含指定的欄位
 * @param {unknown} target 目標
 * @param {string} key 欄位名稱
 * @return {boolean}
 */
export function isObjectAndHasKey<Key extends string>(target: unknown, key: Key): target is { [key in Key]: unknown } {
    return typeof target === "object" && target !== null && key in target;
}
