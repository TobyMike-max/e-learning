import { useState } from 'react';

export default function SideIcons({name}) {

	const [isActive, setIsActive] = useState(false);

	function handleClick() {
		setIsActive(curr => !curr);
	}
	return (
		<>
		    <div className={isActive ? "my-5 text-sm bg-[#333] p-2 rounded-md cursor-pointer" : "my-5 text-sm cursor-pointer"} onClick={handleClick}>
		      <p className="inline-block mr-2">Icon</p>
		      <p className="inline-block">{name}</p>
		    </div>
    		</>
	)
}
