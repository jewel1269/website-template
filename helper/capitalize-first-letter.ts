function capitalizeFirstLetter(string: string) {
  if (string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default capitalizeFirstLetter;
