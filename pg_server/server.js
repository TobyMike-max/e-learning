import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import settingRoutes from './routes/settings.js'
import progressRoutes from './routes/progress.js'
import lessonRoutes from './routes/lessons.js'
import gradeRoutes from './routes/grades.js'
import eventRoutes from './routes/events.js'
import courseRoutes from './routes/courses.js'
import averageweeklyratingRoutes from './routes/averageweeklyratings.js'
import cookieParser from 'cookie-parser'



const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
	next()
})
app.use(express.json());
app.use(cors({
	origin: "https://academyis.netlify.app/",
}));
app.use(cookieParser());


app.use('/api/users/', userRoutes)
app.use('/api/auth/', authRoutes)
app.use('/api/settings/', settingRoutes)
app.use('/api/progress/', progressRoutes)
app.use('/api/lessons/', lessonRoutes)
app.use('/api/grades/', gradeRoutes)
app.use('/api/events/', eventRoutes)
app.use('/api/courses/', courseRoutes)
app.use('/api/averageweeklyratings/', averageweeklyratingRoutes)


app.listen(5000, () => {
	console.log('Connected to backend on port 5000')
});
