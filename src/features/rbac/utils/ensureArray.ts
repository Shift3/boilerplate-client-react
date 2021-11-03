export const ensureArray = <T>(elem: T | T[]): T[] => (Array.isArray(elem) ? elem : [elem]);
