export const cleanFilter = (value?: string): string | null => {
    return value.trim() !== '' ? value : null;
};
