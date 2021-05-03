function factory(method, count) {
  return Array.from(Array(count), method);
}

module.exports = { factory };
