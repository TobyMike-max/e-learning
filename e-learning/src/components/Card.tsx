export default function Card() {
	return (
		<div className="flex shadow-md mr-3 rounded-md p-4 items-center">
			<div className="p-1 rounded-full bg-[teal] mr-2">Icon</div>
			<div className="flex flex-col">
				<p>Average Rating</p>
				<p>8/10</p>
			</div>
		</div>
	)
}

