import { Address } from '@multiversx/sdk-core/out';
import { BinaryUtils } from '@multiversx/sdk-nestjs-common';

export class ConvertersUtils {
    static base64Encode(str: string) {
        return BinaryUtils.base64Encode(str);
    }

    static base64Decode(str: string): string {
        return BinaryUtils.base64Decode(str);
    }

    static tryBase64ToBigInt(str: string): BigInt | undefined {
        return BinaryUtils.tryBase64ToBigInt(str);
    }

    static base64ToBigInt(str: string): BigInt {
        return BinaryUtils.base64ToBigInt(str);
    }

    static tryBase64ToHex(str: string): string | undefined {
        return BinaryUtils.tryBase64ToHex(str);
    }

    static base64ToHex(str: string): string {
        return BinaryUtils.base64ToHex(str);
    }

    static stringToHex(str: string): string {
        return BinaryUtils.stringToHex(str);
    }

    static tryBase64ToAddress(str: string): string | undefined {
        return BinaryUtils.tryBase64ToAddress(str);
    }

    static base64ToAddress(str: string): string {
        return BinaryUtils.base64ToAddress(str);
    }

    static hexToString(hex: string): string {
        return BinaryUtils.hexToString(hex);
    }

    static hexToNumber(hex: string): number {
        return BinaryUtils.hexToNumber(hex);
    }

    static hexToBase64(hex: string): string {
        return BinaryUtils.hexToBase64(hex);
    }

    static hexToBigInt(hex: string): BigInt {
        return BinaryUtils.hexToBigInt(hex);
    }

    static padHex(value: string): string {
        return BinaryUtils.padHex(value);
    }

    static isHash(value: string): boolean {
        return BinaryUtils.isHash(value);
    }

    static numberToHex(value: number): string {
        return BinaryUtils.numberToHex(value);
    }

    static addressToHex(value: string): string | undefined {
        try {
            return Address.fromString(value).hex();
        } catch (e) {
            console.log(`Could not create address from ${value}`);
            return undefined;
        }
    }
}
