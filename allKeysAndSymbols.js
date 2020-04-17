function allKeysAndSymbols(object) {
  const keysAndSymbol = [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];

  let proto = Object.getPrototypeOf(object);
  let result = [...keysAndSymbol];

  while (proto) {
    result = [...result,
    ...Object.getOwnPropertyNames(proto),
    ...Object.getOwnPropertySymbols(proto)
    ];
    proto = Object.getPrototypeOf(proto);
  }
  return result;
}

allKeysAndSymbols({});