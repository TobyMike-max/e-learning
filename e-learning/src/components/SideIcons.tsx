import { useState } from 'react';

export default function SideIcons({name, isActive, onClick, Icon}) {
	return (
		<div className={isActive ? "my-5 text-sm bg-[#333] py-2 px-1 rounded-md cursor-pointer mr-3" : "my-5 text-sm cursor-pointer"} onClick={onClick}>
			<p className="inline-block mr-2 ml-1"><Icon /></p>
		      <p className="inline-block">{name}</p>
            	</div>
	)
}
