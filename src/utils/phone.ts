export const formatPhoneNumber = (value: string): string => {
  value = value.replace(/\D/g, '');

  if (value.length === 11) {
    // Format: +15552223333
    return `(${value.substring(1, 4)}) ${value.substring(4, 7)}-${value.substring(7, value.length)}`;
  }

  if (value.length < 4 && value.length >= 1) {
    return `${value.substring(0, 3)}`;
  }

  if (value.length < 7 && value.length >= 4) {
    return `(${value.substring(0, 3)}) ${value.substring(3, 6)}`;
  }

  if (value.length >= 7) {
    return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, value.length)}`;
  }

  return '';
};

export const normalizePhoneNumber = (value: string): string => {
  return value.replace(/\D/g, '');
};
