export default function Card({ Icon, bgColor, txtColor, title, num }) {
	return (
		<div className={`flex mr-3 rounded-md py-3 px-4 items-center basis-1/3 ${bgColor === "black" ? "bg-[black] text-[white] cursor-pointer" : "shadow-md"}`}>
			<div className={`p-1 rounded-full mr-2 ${bgColor === "black" ? "bg-[black]" : "bg-[#d1cdcd]"}`}><Icon /></div>
			<div className="flex flex-col">
				<p className={bgColor === "black" ? "text-base" : "text-sm"}>{title}</p>
				<p className="text-base font-semibold">{num}</p>
			</div>
		</div>
	)
}
