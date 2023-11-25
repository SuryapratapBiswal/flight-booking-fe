import CryptoJS from "crypto-js";


export const encryptRequest = (data, key) => {

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key);
    return encrypted.toString();
  };