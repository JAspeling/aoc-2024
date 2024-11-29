declare namespace NodeJS {
  interface Global {
    localStorage: import('node-localstorage').LocalStorage;
  }
}
