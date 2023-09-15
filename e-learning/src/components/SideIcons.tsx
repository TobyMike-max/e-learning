import { useState } from 'react';

export default function SideIcons({
  id,
  name,
  isActive,
  onClick,
  Icon,
  data,
  setIndex,
}) {
  {data && setIndex(id.toString())}
  return (
    <div
      className={`my-5 text-sm cursor-pointer ${
        isActive && 'bg-[#333] py-2 px-1 rounded-md mr-3'
      }`}
      onClick={onClick}
    >
      <p className="inline-block mr-2 ml-1">
        <Icon />
      </p>
      <p className="inline-block">{name}</p>
    </div>
  );
}
