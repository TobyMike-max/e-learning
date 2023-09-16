interface ProgressBarProps {
	progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {	
  return (
    <div className="h-2 w-36 bg-gray-300 rounded-full mr-2">
      <div
        style={{ width: `${progress}%` }}
        className={`h-full w-full rounded-full ${
          progress < 70 ? 'bg-[#df6690]' : 'bg-green-600'
        }`}
      ></div>
    </div>
  );
};

export default ProgressBar;
