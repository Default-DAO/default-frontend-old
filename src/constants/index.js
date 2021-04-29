// User
export const USER_STATE = Object.freeze({
  ghost: 0,             // wallet not connected
  not_whitelisted: 1,   // connected, but not whitelisted
  pending: 2,           // connected, whitelisted, but not claimed
  claimed: 3,           // connected, whitelisted, and claimed
});

// Error Codes
export const ERROR_CODES = Object.freeze({
  not_whitelisted: 'notWhitelisted',
  invalid_signature: 'invalidSignature',
  already_claimed: 'alreadyClaimed'
});
