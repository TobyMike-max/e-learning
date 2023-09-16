interface RoundProgressBarProps {
	percentage: number;
}

const RoundProgressBar: React.FC<RoundProgressBarProps> = ({ percentage }) => {
  const circumference: number = 2 * Math.PI * 40;
  const dashOffset: number = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-36 h-36">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 100 100"
      >
        <circle
          className="text-[#df6690] stroke-current"
          strokeWidth="10"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        <circle
          className="text-[#ffc75b] stroke-current"
          strokeWidth="10"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: dashOffset,
            strokeLinecap: 'round',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {`${percentage}%`}
      </div>
    </div>
  );
}

export default RoundProgressBar;
