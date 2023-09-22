import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import BarChartComponent from '../components/BarChart';
import Course from '../components/Courses';
import Event from '../components/Event';
import RoundProgressBar from '../components/RoundProgressBar';
import courses from '../assets/courses.ts';
import events from '../assets/events.ts';
import Chats from './Chats';
import Courses from './Courses';
import Grades from './Grades';
import Settings from './Settings';
import SideNav from './SideNav';
import Events from './Events';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

export default function Dashboard() {
  const date = new Date().toDateString();
  const percentage: number = 76;

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === '/') navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="container flex flex-row h-screen max-w-full">
      <SideNav display='' />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-col px-3 sm:flex-row">
              <div className="basis-3/4 px-3">
                <Navbar name="Dashboard" />
                <div className="flex my-3 flex-row">
                  <Card
                    Icon={BarChartOutlinedIcon}
                    bgColor=""
                    title="Average Rating"
                    num="8/10"
                  />
                  <Card
                    Icon={ShowChartOutlinedIcon}
                    bgColor=""
                    title="Average tasks"
                    num="12 tasks"
                  />
                  <Link to="/chats">
                    <Card
                      Icon={EastOutlinedIcon}
                      bgColor="black"
                      title="You have new messages!"
                      num=""
                    />
                  </Link>
                </div>
                <div className="flex my-4 flex-col sm:flex-row">
                  <div className="basis-2/3 max-h-max mr-3 p-1 rounded-lg border">
                    <div className="flex justify-between my-3">
                      {' '}
                      <h1 className="font-semibold">This Week</h1>
                      <p>...</p>
                    </div>
                    <BarChartComponent />
                  </div>
                  <div className="basis-1/3 border max-h-max mr-3 rounded-lg p-1">
                    <div className="flex justify-between my-3">
                      <h1 className="font-semibold">Activities</h1>
                      <div className="flex items-center">
                        <p className="text-sm pr-1">Week</p>
                        <ExpandMoreOutlinedIcon style={{ fontSize: '15px' }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <RoundProgressBar percentage={percentage} />
                    </div>
                    <div className="flex flex-col mt-3 text-sm">
                      <div className="flex justify-between border-b pb-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[#df6690] rounded-sm mr-1"></div>
                          <p>Study</p>
                        </div>
                        <p>57%</p>
                      </div>
                      <div className="flex justify-between pt-1">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-[#ffc75b] rounded-sm mr-1"></div>
                          <p>Exams</p>
                        </div>
                        <p>19%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <h1 className="font-medium">My Courses</h1>
                    <p className="bg-[#ffc75b] rounded-full ml-2 w-4 h-4 text-center text-xs font-medium">
                      {courses.length}
                    </p>
                  </div>
                  {courses.map((course) => (
                    <Course
                      key={course.id}
                      Icon={course.icon}
                      name={course.name}
                      lesson={course.lesson}
                      progress={course.progress}
                    />
                  ))}
                </div>
              </div>
              <div className="basis-1/4 px-3 py-5 sm:py-0">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold">Calender</h1>
                  <div className="rounded-full shadow-md p-1 flex items-center cursor-pointer">
                    <CalendarMonthOutlinedIcon />
                  </div>
                </div>
                <p className="text-xs mt-2 font-light mb-2">{date}</p>
                <div className="flex flex-col">
                  {events.map((event) => (
                    <Event
                      key={event.title}
                      timestamp={event.timestamp}
                      title={event.title}
                      content={event.content}
                    />
                  ))}
                </div>
                <Link to="/events">
                  <button className="border rounded-xl py-1 w-full mb-5 mt-3 border-black outline-none">
                    All events
                  </button>
                </Link>
                <Link to="/settings">
                  <div className="bg-gradient-to-r from-[#df6690] from-0% via-[#1b1b1b] via-100% to-[#ffc75b] to-1% rounded-xl h-2/5 flex flex-col items-center justify-center px-3">
                    <h1 className="text-[white] text-xl mt-12">
                      Buy Premium and get access to new courses
                    </h1>
                    <button className="bg-[#ffc75b] rounded-lg h-8 mt-4 outline-none w-full px-5">
                      More details
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/events" element={<Events />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
