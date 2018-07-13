import get from './get.js';
import getAttribute from "./getAttribute";

const getJSON = async function (url, options) {
    options.headers = options.headers || {};
    options.headers.Accept = 'application/json';
    return get(url, options);
};

export default getJSON;
