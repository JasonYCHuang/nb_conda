const updArrElement = (arr, idx, newEl) => (
  [
    ...arr.slice(0, idx),
    newEl,
    ...arr.slice(idx + 1),
  ]
);

export default updArrElement;
