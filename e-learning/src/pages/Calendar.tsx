import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import SideNav from './SideNav';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useAuth } from '../context/authContext';

const localizer = momentLocalizer(moment);

/**const ColoredDateCellWrapper: React.FC<{ children: ReactNode }> = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
    });**/

interface courseProps {
	course_id: number;
	course_name: string;
	course_desc: string;
	start_date: string;
	end_date:string;
	created:string;
	category:string;
	instructor_id: string;
	user_id:number;
	username:string;
	full_name:string;
}

const Calendary = () => {
  const { getCourses, courses, isMenuOpen } = useAuth();
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: moment().toDate(),
    }),
    [],
  );
  const navigate = useNavigate();

  let events = [
    courses.map((course: courseProps) => ({
      title: course.course_name,
      start: course.start_date,
      end: course.end_date,
    })),
  ];

  const handleEventClick = () => {
    navigate('/courses');
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="flex flex-row min-h-screen max-w-full">
      <SideNav display="" />
      <div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-col px-3">
        <Navbar name="Calender" />
        <div className={`${isMenuOpen ? 'hidden' : ''} flex flex-col min-h-screen`}>
          <Calendar
            localizer={localizer}
            events={events[0]}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={['month', 'week', 'day', 'agenda']}
            step={60}
            defaultDate={defaultDate}
            selectable
            onSelectEvent={handleEventClick}
            popup={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendary;
