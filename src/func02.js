// CommonJS 的匯出方式 （講義p.3）
const f = a=>a*a;
const f3 = a=>a*a*a;

console.log(123);

module.exports = {f, f3}; // 匯出多個要包成 object