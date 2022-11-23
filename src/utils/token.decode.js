import jwt_decode from 'jwt-decode';

export const TokenDecode = token => {
  const decoded = jwt_decode(token);
  return decoded;
};
