import express from 'express'
import rootRouter from '../routes'

export const app = express()

app.disable('x-powered-by')
// app.use(corsConfig)
// app.use(requestLimiter)
// app.use(httpTimeOut)
app.use(express.urlencoded({ extended: true, limit: '50mb' })) // ❓❓❓
app.use(express.json())
// app.use(limitPayloadSize)

// Se utiliza el index de todas las rutas
app.use('/api/v1', rootRouter)

// Ruta de prueba
app.get('/', (_req, res) => {
  return res.send('Hello World!')
})

export default app
