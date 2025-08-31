export function formatAddress(addressObj) {
  if (!addressObj || typeof addressObj !== 'object') return '';

  const { line1, line2, city, state, pincode } = addressObj;

  return [line1, line2, city,state]
    .filter(Boolean)
    .join(', ');
}

