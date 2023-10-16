import jwt from 'jsonwebtoken'
import { secret } from '../config/app_config'

class JwtService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateToken(sub: any): string {
    const token = jwt.sign({}, secret, {
      expiresIn: '2h',
      algorithm: 'HS256',
      subject: sub.toString()
    })

    return token
  }
}
export default Object.freeze(new JwtService())
