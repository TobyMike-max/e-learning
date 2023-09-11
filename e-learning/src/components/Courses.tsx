import ProgressBar from './ProgressBar';

export default function Course({ Icon, name, lesson, progress }) {
	return (
		<div className="flex shadow-lg my-1 justify-between p-3 items-center rounded-lg">
		  <div className="flex items-center">
			  <div className="bg-[#d1cdcd] h-7 rounded-full mr-2">
				  <Icon />
			  </div>
			  <div className="flex flex-col text-sm">
				  <h1 className="font-medium">{name}</h1>
				  <p>{lesson} {lesson > 1 ? 'lessons' : 'lesson'}</p>
			  </div>
	          </div>
		  <div className="flex items-center text-sm">
		    <div className="flex items-center">
			    <ProgressBar progress={progress} />
			    <p>{progress}%</p>
		    </div>
		    <button className="px-3 py-1 ml-5 border-2 rounded-2xl outline-none border-black">Continue</button>
	          </div>
		</div>
	)
}
