import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

export default function Navbar() {
	return (
		<div className="flex flex-row justify-between">
			<h1>Dashboard</h1>
			<div className="flex justify-evenly basis-1/5">
				<NotificationsNoneOutlinedIcon />
				<div className="rounded-full bg-[orange]">Pic</div>
				<ExpandMoreOutlinedIcon />
			</div>
		</div>
	)
}
