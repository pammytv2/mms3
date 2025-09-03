import { SignJWT } from 'jose';
// import encode from 'jwt-encode';

// Secret key for JWT signing - using a constant since this is for development only
const JWT_SECRET = 'lsd@lkilogmL';
export interface JWTPayload {
  UserID: number | string;
  SECCD: number;
}

export const generateToken = async (payload: string): Promise<string> => {
  try {
    // Parse the payload string to object
    const parsedPayload = JSON.parse(payload) as any;
    // Generate and return the JWT token using HS256 algorithm (same as the original tokens)
    return await new SignJWT(parsedPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(JWT_SECRET));
  } catch (error) {
    console.error('Error generating JWT token:', error);
    throw new Error('Failed to generate JWT token');
  }
};
