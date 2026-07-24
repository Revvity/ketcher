import sharp from 'sharp'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const app = express()
const port = 6789

app.use(
  cors({
    origin: true,
    allowedHeaders: ['Content-Type', 'Content-Length'],
    exposedHeaders: ['Content-Length']
  })
)
app.use('/svgToPng', express.json({ limit: '100mb' }))

app.post('/svgToPng', async (req, res) => {
  try {
    const png = await sharp(Buffer.from(req.body.svg), { format: 'svg' })
      .png()
      .toBuffer()
    res.header('Content-Type', 'image/png').send(png)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

app.post('/saveToFile', async (req, res) => {
  try {
    const fileName = req.query.fileName
    if (!fileName) {
      res.sendStatus(400)

      return
    }

    const filePath = path.resolve('files', path.basename(fileName))
    console.log('Save to file:', filePath)
    const dirPath = path.dirname(filePath)
    if (fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    const stream = fs.createWriteStream(filePath)
    stream.on('close', () => res.sendStatus(200))
    req.pipe(stream)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})
