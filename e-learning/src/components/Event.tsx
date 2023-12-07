interface EventProps {
  timestamp: string;
  title: string;
  content: string;
}

const Event: React.FC<EventProps> = ({ timestamp, title, content }) => {
  return (
    <div className="flex text-xs py-3 border-t justify-between">
      <div className="basis-1/3 flex">
        <p className="font-semibold self-end">{timestamp}</p>
      </div>
      <div className="sm:basis-2/3 basis-1/3 flex-end flex">
        <div className="h-8 w-0.5 bg-[black] mr-1.5"></div>
        <div className="cursor-pointer">
          <p className="font-light">{title}</p>
          <p className="font-semibold">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Event;
