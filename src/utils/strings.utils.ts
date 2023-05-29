export const cleanFilter = (value?: string): string | null => {
    return value.trim() !== '' ? value : null;
};

export const cleanFilterNumber = (value?: number): number | null => {
    return value !== 0 ? value : null;
};
