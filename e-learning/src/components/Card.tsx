export default function Card({ Icon, bgColor, txtColor }) {
	return (
		<div className={bgColor === "black" ? "flex shadow-md mr-3 rounded-md bg-[black] py-3 px-4 items-center text-[white]": "flex shadow-md mr-3 rounded-md py-3 px-4 items-center"}>
			<div className="p-1 rounded-full bg-[#d1cdcd] mr-2"><Icon /></div>
			<div className="flex flex-col">
				<p>Average Rating</p>
				<p>8/10</p>
			</div>
		</div>
	)
}

