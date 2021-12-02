import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

export default (root) => {
  if (!root) throw new Error('No root element');

  let calendar = new Calendar(root, {
    plugins: [interactionPlugin, dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next title today',
      center: '',
      right: '',
    },
    buttonText: {
      today: 'Сегодня',
    },
    aspectRatio: 2,
    views: {
      dayGrid: {
        dayMaxEventRows: 3 // adjust to 6 only for timeGridWeek/timeGridDay
      }
    },
    displayEventTime:  false,
    locale: 'ru',
    selectable: true,
    dateClick: function(info) {
      // console.log(info)
    },
    select: function(info) {
      // console.log(info)
      // calendar.addEvent({
      //   id: Math.random(),
      //   title: 'Event1',
      //   start: info.start,
      //   //time: '12:00'
      // })
    }
  });
  

  calendar.render();
}