function randomString(length: number = 8) {
  return Math.random()
    .toString(36)
    .slice(-length);
}

export default randomString;
