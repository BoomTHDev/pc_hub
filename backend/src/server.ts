// อ่านค่าจากไฟล์ .env
import 'dotenv/config'

// ดึง app (express) มาเปิด server
import app from './app'

// กำหนด PORT ที่ไฟล์ .env
const PORT = process.env.PORT || 3001

// เปิด Server (ใช้ app.listen() เพื่อฟัง port)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
