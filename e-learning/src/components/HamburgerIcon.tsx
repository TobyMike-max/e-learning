interface HamburgerIconProps {
	onClick: () => void;
	isOpen: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ onClick, isOpen }) => {

	return (
		<div className="cursor-pointer flex sm:hidden">
			<div className={'w-6 h-6 relative'}
			onClick={onClick}
		>
				<span className="absolute left-1/2 top-1/2 transform block bg-black rounded-full w-6 h-0.5" />
				<span className="absolute left-1/2 top-1/2 transform block bg-black rounded-full w-6 h-0.5 mt-2" />
				<span className="absolute left-1/2 top-1/2 block bg-black rounded-full w-6 h-0.5 mt-4" />
			</div>
		</div>
	);
};

export default HamburgerIcon;
