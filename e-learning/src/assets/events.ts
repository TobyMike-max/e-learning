interface eventsProps {
	timestamp: string;
	title: string;
	content: string;
}

const events: eventsProps[] = [
  {
    timestamp: '10:00 AM',
    title: 'Meeting',
    content: 'New learning formats',
  },
  {
    timestamp: '11:00 AM',
    title: 'Lecture',
    content: 'Wed Design Trends',
  },
  {
    timestamp: '2:00 PM',
    title: 'Lesson',
    content: 'JavaScript Features',
  },
  {
    timestamp: '4:30 PM',
    title: 'Exam',
    content: 'JavaScript',
  },
];

export default events;
