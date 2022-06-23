// CommonJS 的匯出方式 （講義p.3）
export default [1, 2, 3];

export const f = (a) => a * a;
export const f3 = (a) => a * a * a;

const b = { name: "peter" };
export { b };