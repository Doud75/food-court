export const multiSetSessionStorage = async function (items) {
  return new Promise((resolve) => {
    items.forEach(([key, value], index, array) => {
      sessionStorage.setItem(key, value);
      if (index === array.length - 1) {
        resolve();
      }
    });
  });
};
