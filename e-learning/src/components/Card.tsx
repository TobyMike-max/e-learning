export default function Card({ Icon, bgColor, txtColor, title, num }) {
	return (
		<div className={bgColor === "black" ? "flex mr-3 rounded-md bg-[black] py-3 px-4 items-center text-[white] basis-1/3" : "flex shadow-md mr-3 rounded-md py-3 px-4 items-center basis-1/3"}>
			<div className={bgColor === "black" ? "p-1 rounded-full mr-2 bg-[black]" : "p-1 rounded-full mr-2 bg-[#d1cdcd]"}><Icon /></div>
			<div className="flex flex-col">
				<p className={bgColor === "black" ? "text-base" : "text-sm"}>{title}</p>
				<p className="text-base font-semibold">{num}</p>
			</div>
		</div>
	)
}
