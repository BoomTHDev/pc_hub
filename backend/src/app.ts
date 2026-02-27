// เรียกใช้ library "express" เพื่อนำมาสร้าง Restful API
import express from 'express'

import CategoryRoutes from './routes/category.routes'
import AuthRoutes from './routes/auth.route'
import { errorHandler } from './middlewares/errorHandler'

// สร้างตัวแปร app เพื่อเรียกใช้งานฟังก์ชั่นของ express ได้ง่ายขึ้น
const app = express()

// Middleware
// ใช้ express.json() เพื่อให้ POST Method รับข้อมูลที่เป็น JSON
app.use(express.json())

app.use('/categories', CategoryRoutes)
app.use('/auth', AuthRoutes)

app.use(errorHandler)

// ส่งออก app (express) ออกไปเป็นแบบ module
export default app
