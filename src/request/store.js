// const STORAGE_KEY='searchHistory';
export default {
  fetchArray: (key) => {
    return JSON.parse(window.localStorage.getItem(key)||'[]');
  },
  fetchString: (key) => {
    return window.localStorage.getItem(key)||'';
  },
  saveArray: (key,items) => {
    window.localStorage.setItem(key,JSON.stringify(Array.from(new Set(items))))
  },
  saveString: (key, string) => {
    window.localStorage.setItem(key, string);
  },
  remove: (key) => {
    window.localStorage.removeItem(key);
  }
}
