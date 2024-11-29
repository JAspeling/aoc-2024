import {LocalStorage} from 'node-localstorage';

// Initialize localStorage in a specific directory
global.localStorage = new LocalStorage('./scratch');
