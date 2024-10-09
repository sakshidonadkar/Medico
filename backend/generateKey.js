import { randomBytes } from 'crypto';

const secretKey = randomBytes(256).toString('base64');
console.log(secretKey);
