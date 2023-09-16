interface SideIconsProps {
	id: number;
	name: string;
	isActive: boolean;
	onClick: () => void;
	Icon: React.ElementType;
	data: boolean;
	setIndex: (id: string) => void;
}

	const SideIcons: React.FC<SideIconsProps> = ({
  id,
  name,
  isActive,
  onClick,
  Icon,
  data,
  setIndex,
}) => {
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

export default SideIcons;
