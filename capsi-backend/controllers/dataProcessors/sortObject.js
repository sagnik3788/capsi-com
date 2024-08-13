function recursiveSort(value) {
  if (Array.isArray(value)) {
    return value.map((item) => recursiveSort(item));
  } else if (typeof value === "object" && value !== null) {
    if (value instanceof Date) {
      return value; // Skip sorting Dates
    }

    const sortedObject = {};
    Object.keys(value)
      .sort()
      .forEach((key) => {
        sortedObject[key] = recursiveSort(value[key]);
      });
    return sortedObject;
  } else {
    return value;
  }
}

module.exports = function (object) {
  return recursiveSort(object);
};
