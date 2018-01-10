export default (functions) => (value) => functions.reduce((f1, f2) => f2(f1), value);
