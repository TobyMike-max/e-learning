import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo, useContext } from 'react';
import Navbar from '../components/Navbar';
import SideNav from './SideNav';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const localizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

const Events = () => {
  const { getCourses, courses } = useContext(AuthContext);
  const { components, defaultDate, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: moment().toDate(),
    }),
    [],
  );
  const navigate = useNavigate();

  let events = [
    courses.map((course) => ({
      title: course.course_name,
      start: course.start_date,
      end: course.end_date,
    })),
  ];

  const handleEventClick = (event) => {
    navigate('/courses');
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="flex flex-row min-h-screen max-w-full">
      <SideNav display="" />
      <div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-col px-3">
        <Navbar name="Events" />
        <div className="flex flex-col min-h-screen">
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

export default Events;
