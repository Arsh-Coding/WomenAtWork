// storeAccessor.js
let _store;

export const setStore = (store) => {
  _store = store;
};

export const getStore = () => _store;
