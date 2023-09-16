interface CardProps {
	Icon: React.ElementType;
	bgColor: string;
	title: string;
	num: string;
}

const Card: React.FC<CardProps> = ({ Icon, bgColor, title, num }) => {
  return (
    <div
      className={`flex mr-3 rounded-md py-3 items-center basis-1/3 ${
        bgColor === 'black'
          ? 'bg-[black] text-[white] cursor-pointer px-1'
          : 'shadow-md px-4'
      }`}
    >
      <div
        className={`rounded-full mr-2 ${
          bgColor === 'black' ? 'bg-[black] mr-8 ml-1' : 'p-1 bg-[#d1cdcd]'
        }`}
      >
        <Icon />
      </div>
      <div className="flex flex-col">
        <p className={bgColor === 'black' ? 'text-base' : 'text-sm'}>{title}</p>
        <p className="text-base font-semibold">{num}</p>
      </div>
    </div>
  );
}

export default Card;
