import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
    /**
     * Used to marshal Decimal when writing to the database.
     */
    to(decimal?: number): string | null {
        return decimal?.toString();
    }

    /**
     * Used to unmarshal Decimal when reading from the database.
     */
    from(decimal?: string): number | null {
        return decimal ? Number(decimal) : null;
    }
}

export const DecimalToString =
    (decimals: number = 2) =>
    (price?: number) =>
        price?.toFixed?.(decimals) || price;
