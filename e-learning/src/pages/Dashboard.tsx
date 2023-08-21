import {useState} from 'react'
import SideIcons from '../components/SideIcons'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import fake from '../assets/nav'

export default function Dashboard() {

	return (
		<div className="container flex flex-row h-screen">
			<div className="relative basis-1/6 py-5 bg-[#1b1b1b] text-[#fff] pl-7">
				<Logo />
				{fake.map(item => (
					<SideIcons name={item.name} key={item.id}/>
				))}
				<p className="absolute text-xs opacity-50 bottom-5">2023 Academyis App</p>
			</div>
			<div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-row px-3">
				<div className="basis-3/4 px-3">
					<Navbar />
					<div className="flex my-3">
						<Card />
						<Card />
						<Card />
					</div>
					<div className="flex my-4">
						<div className="basis-2/3 shadow-md max-h-max mr-3">This Week</div>
						<div className="basis-1/3 shadow-md max-h-max mr-3">Activities</div>
					</div>
				</div>
				<div className="basis-1/4">Calender</div>
			</div>
		</div>
	)
}
