export default function Event({timestamp, title, content}) {
	return (
		<div className="flex text-xs py-3 border-t justify-between">
			<div className="basis-1/3">
				<p className="font-semibold">{timestamp}</p>
			</div>
			<div className="basis-2/3 flex-end flex">
				<div className="h-8 w-0.5 bg-[black] mr-1.5"></div>
				<div>
					<p className="font-light">{title}</p>
					<p className="font-semibold">{content}</p>
				</div>
			</div>
		</div>
	)
}
