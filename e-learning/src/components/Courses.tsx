export default function Course({ Icon, name, lesson }) {
	return (
		<div className="flex shadow-lg my-2 justify-between p-3 items-center rounded-lg">
		  <div className="flex items-center">
			  <div className="bg-[#d1cdcd] h-7 rounded-full mr-2">
				  <Icon />
			  </div>
			  <div className="flex flex-col">
				  <h1>{name}</h1>
				  <p>{lesson} {lesson > 1 ? 'lessons' : 'lesson'}</p>
			  </div>
	          </div>
		  <div className="flex items-center">
		    <p>Progress</p>
		    <button className="px-3 py-1 ml-4 border-1">Continue</button>
	          </div>
		</div>
	)
}
