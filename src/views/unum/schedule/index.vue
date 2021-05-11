<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @click:time="createEvent"
          @click:day="createEvent"
          @change="updateRange"
        >
        </v-calendar>
      </v-sheet>
      <a-btn-floating-create
        :show="showButtomCreate"
        @click="
          createEvent({ date: new Date().date });
          showButtomCreate = false;
        "
      ></a-btn-floating-create>
      <event-form
        v-model="showEventForm"
        :defaultData="eventDefaultData"
        @reload="fetchData()"
      />
      <v-menu
        v-model="eventMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-x
        top
        close-on-click
      >
        <v-list>
          <v-list-item-group active-class="">
            <v-list-item
              @click="$router.push(`/patients/${eventDefaultData.patient_id}`)"
            >
              <v-list-item-title>
                Карточка пациента
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="showEventForm = true">
              <v-list-item-title>
                Редактировать запись
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="deleteEvent">
                Удалить запись
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import genModelBase from "@/share/components/libs/genModelBase";

export default {
  components: {
    EventForm: () => import("./EventForm")
  },
  mixins: [genModelBase],
  data() {
    return {
      loading: false,
      showEventForm: false,
      eventMenu: false,
      x: 0,
      y: 0,
      eventDefaultData: {},
      api: this.$root.api.schedule,
      showButtomCreate: true,
      dragEvent: null,
      dragStart: null,
      focus: "",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days"
      },
      events: [],
      eventsDate: {
        start: null,
        end: null
      }
    };
  },
  watch: {
    showEventForm(val) {
      if (!val) {
        this.showButtomCreate = true;
      }
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    createEvent(event) {
      if (!event.time) event.time = "10:00:00";
      let start = event.date + " " + event.time;
      let d = new Date(Date.parse(start.replace(/-/g, "/")));
      let minutes = d.getMinutes();
      let roundM = (Math.round(minutes / 15) * 15) % 60;
      d.setMinutes(roundM);
      let st = new Date(d);
      let end = d.addHours(1);
      this.eventDefaultData = {
        start: st.datetime,
        end: end.datetime,
        color: "#CC0000"
      };
      this.showEventForm = true;
    },
    async deleteEvent() {
      console.log("defEv: ", this.eventDefaultData);
      try {
        let response = await this.$axios.d(this.api, {
          data: { id: this.eventDefaultData.id },
          params: { id: this.eventDefaultData.id }
        });
        console.log("res: ", response);
        this.fetchData();
      } catch (e) {
        console.log("delError: ", e);
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      this.eventDefaultData = event;
      //this.showEventForm = true;
      this.showEventMenu(nativeEvent);
      console.log("ev: ", event);
      nativeEvent.stopPropagation();
    },
    showEventMenu(e) {
      e.preventDefault();
      this.eventMenu = false;
      this.x = e.clientX - 100;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.eventMenu = true;
      });
    },
    updateRange({ start, end }) {
      this.eventsDate = {
        start: start.date,
        end: end.date
      };
      this.fetchData();
    },
    async fetchData() {
      this.loading = true;
      let response = await this.$axios.g(this.api, {
        params: { start: this.eventsDate.start, end: this.eventsDate.end }
      });
      this.loading = false;
      this.events = response.data.data;
    }
  }
};
</script>
