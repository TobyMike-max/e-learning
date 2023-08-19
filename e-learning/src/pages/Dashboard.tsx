import {useState} from 'react'
import SideIcons from '../components/SideIcons'
import Logo from '../components/Logo'
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
			<div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff]">
				Right part
			</div>
		</div>
	)
}
