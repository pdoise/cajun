export const REGEX = {
  genericText: /^[a-zA-Z0-9&:;\-_.,!?*\[\]()\\\/'"$@#%^ ]+$/,
  numeric: /^[1-9][0-9]*$/,
  //at least 1 uppercase, at least 1 lowercase, at least 1 digit
  password: /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/
}