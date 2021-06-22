export function falsy_to_0(value) {
  return value || 0;
}

export function falsy_to_null(value) {
  return value || null;
}

export function empty_to_null(value) {
  return value === "" ? null : value;
}
