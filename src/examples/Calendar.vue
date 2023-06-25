<!-- <template>
  <div class="calendar">
    <div class="calendar-header">
      <h2>{{ currentMonth }}</h2>
      <button @click="prevMonth">&lt;</button>
      <button @click="nextMonth">&gt;</button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="week">
          <td v-for="day in week" :key="day">
            <div class="day" :class="{ today: isToday(day), selected: isSelected(day) }" @click="select(day)">
              <span class="date">{{ day.date() }}</span>
              <div class="events">
                <div v-for="event in eventsForDay(day)" :key="event.id" class="event">
                  {{ event.title }}
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Calendar',
  data() {
    return {
      today: moment(),
      currentMonth: moment(),
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      events: [
        {
          id: 1,
          title: 'Meeting with John',
          start: moment().set({ hour: 10, minute: 0 }),
          end: moment().set({ hour: 11, minute: 0 }),
        },
        {
          id: 2,
          title: 'Lunch with Jane',
          start: moment().set({ hour: 12, minute: 0 }),
          end: moment().set({ hour: 13, minute: 0 }),
        },
      ],
    };
  },
  computed: {
    weeks() {
      const weeks = [];
      let done = false;
      const date = this.currentMonth
        .clone()
        .startOf('month')
        .add('w' - 1)
        .day('Sunday');
      let count = 0;
      let monthIndex = date.month 

    }
  }
}
</script> -->