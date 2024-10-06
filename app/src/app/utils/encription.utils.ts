import * as CryptoJS from 'crypto-js';
import {Product} from '../models/product.interface';

export class EncriptionUtils {
  private static readonly secretKey = 'dsf5twedt5ggd';

  static encryptedData(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, this.secretKey).toString();
    return encodeURIComponent(encryptedData);
  }

  static decodedData(urlParam: string): Set<Product> {
    const encryptedDataFromUrl = decodeURIComponent(urlParam);

    const bytes = CryptoJS.AES.decrypt(encryptedDataFromUrl, this.secretKey);
    console.log('========0========', bytes)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    console.log('========1========', decryptedData)

    const productsArray: Product[] = JSON.parse(decryptedData);

    console.log('========2========', productsArray)

    return (new Set<Product>(productsArray));
  }
}
