export const cleanFilter = (value?: string): string | null => {
    return value.trim() !== '' ? value : null;
};

export const cleanFilterNumber = (value?: number): number => {
    return value ? (value !== 0 ? value : 0) : 0;
};
