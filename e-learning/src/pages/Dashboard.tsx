import { useState } from 'react';
import SideIcons from '../components/SideIcons';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import BarChartComponent from '../components/BarChart';
import Course from '../components/Courses';
import Event from '../components/Event';
import fake from '../assets/nav';
import courses from '../assets/courses';
import events from '../assets/events';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function Dashboard() {

	const [dashboardIndex, setIndex] = useState("1");

	function handleClick(index) {
		setIndex(index.toString())
	}

	const date = new Date().toDateString();
	return (
		<div className="container flex flex-row h-screen">
			<div className="relative basis-1/6 py-5 bg-[#1b1b1b] text-[#fff] pl-7">
				<Logo />
				{fake.map(item => (
					<SideIcons name={item.name} key={item.id} isActive={(item.id).toString() === dashboardIndex} onClick={() => handleClick(item.id)} Icon={item.icon} />
				))}
				<p className="absolute text-xs opacity-50 bottom-5">&copy; 2023 Academyis App</p>
			</div>
			<div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-row px-3">
				<div className="basis-3/4 px-3">
					<Navbar />
					<div className="flex my-3">
						<Card Icon={BarChartOutlinedIcon} bgColor="" txtColor=""/>
						<Card Icon={ShowChartOutlinedIcon} bgColor="" txtColor=""/>
						<Card Icon={EastOutlinedIcon} bgColor="black" txtColor='white'/>
					</div>
					<div className="flex my-4">
						<div className="basis-2/3 max-h-max mr-3 p-2 rounded-lg border">
							<div className="flex justify-between my-3 font-semibold"> <h1>This Week</h1>
								<p>...</p>
							</div>
							<BarChartComponent />
						</div>
						<div className="basis-1/3 border max-h-max mr-3 rounded-lg">Activities</div>
					</div>
					<div>
						<div className="flex items-center">
							<h1 className="font-medium">My Courses</h1>
							<p className="bg-[#ffc75b] rounded-full ml-2 w-4 h-4 text-center text-xs font-medium">{courses.length}</p>
						</div>
						{courses.map((course) => (
							<Course key={course.id} Icon={course.icon} name={course.name} lesson={course.lesson} />
							))}
					</div>
				</div>
				<div className="basis-1/4">
					<div className="flex justify-between">
						<h1 className="text-xl font-semibold">Calender</h1>
						<div className="rounded-full shadow-md p-1 flex items-center">
							<CalendarMonthOutlinedIcon />
						</div>
					</div>
					<p className="text-xs mt-2 font-light mb-2">{date}</p>
					<div className="flex flex-col">
						{events.map((event) => (
							<Event timestamp={event.timestamp} title={event.title} content={event.content} />
							))
						}
					</div>
					<button className="border rounded-xl py-1 w-full mb-5 mt-3 border-black">All events</button>
					<div className="bg-[#1b1b1b] rounded-xl h-2/5 flex flex-col items-center justify-center px-3">
						<h1 className="text-[white] text-xl mt-16">Buy Premium and get access to new courses</h1>
						<button className="bg-[#ffc75b] w-full rounded-lg h-8 mt-4">More detailed</button>
					</div>
			        </div>
			</div>
		</div>
	)
}
