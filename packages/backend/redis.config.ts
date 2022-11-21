import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
}));
