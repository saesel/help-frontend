export function validateUsername(username) {
  const regex = /^[a-zA-Z0-9]{4,12}$/;

  return regex.test(username);
}

export function validatePassword(password) {
  const regex = /^[a-zA-Z0-9]{4,12}$/;

  return regex.test(password);
}
