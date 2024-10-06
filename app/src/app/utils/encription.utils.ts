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
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    const productsArray: Product[] = JSON.parse(decryptedData);
    return (new Set<Product>(productsArray));
  }
}
