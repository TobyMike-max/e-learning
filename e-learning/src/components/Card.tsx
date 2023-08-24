export default function Card({ Icon }) {
	return (
		<div className="flex shadow-md mr-3 rounded-md p-4 items-center">
			<div className="p-1 rounded-full bg-[#d1cdcd] mr-2"><Icon /></div>
			<div className="flex flex-col">
				<p>Average Rating</p>
				<p>8/10</p>
			</div>
		</div>
	)
}

