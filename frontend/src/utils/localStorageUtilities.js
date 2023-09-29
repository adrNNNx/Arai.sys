export const PersitLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify({ ...value }));
  };
  
  export const ClearLocalStorage = (key) => {
    localStorage.removeItem(key);
  };