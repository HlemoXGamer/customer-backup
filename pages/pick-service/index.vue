<template>
  <v-row no-gutters class="py-5">
    <v-col class="py-0 px-0 mx-0 my-0">
      <p style="color: #65382c; font-size: 20px;" class="font-weight-bold mb-2">Choose Service</p>
      <v-row no-gutters class="justify-center align-center py-2">
        <v-btn-toggle dense v-model="toggle" active-class="isPicked" class="rounded-lg py-0">
          <v-btn plain class="py-0" value="deliver_now" @click="isToggle('pre_order')">
            Deliver Now
          </v-btn>
          <v-btn plain value="pre_order" @click="isToggle('deliver_now')">
            Pre Order
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row no-gutters class="align-center justify-center w-75">
        <scroll-picker-group class="flex font-weight-bold" style="color: #65382c;">
          <scroll-picker :options="days" v-model="currentDay" />
          <scroll-picker :options="hours" v-model="currentHour" />
          <scroll-picker :options="minutes" v-model="currentMinute" />
          <scroll-picker :options="['AM', 'PM']" v-model="current" />
        </scroll-picker-group>
      </v-row>
      <v-col cols="12" class="mt-1 px-0">
        <v-text-field v-model="searchTerm" @input="search()" hide-details clearable flat solo :placeholder="$t('common.areas.search_placeholder')" color="#65382c" style="border-radius: 12px;" background-color="#ededed" dense prepend-inner-icon="mdi-map-marker" height="50" />
      </v-col>
      <v-col class="mx-0 mt-2 px-0 py-0">
        <v-card v-for="(area, index) in filteredAreas" @click="pickArea(area)" :key="area.id" width="100%" height="40px" style="border-bottom: 1px solid gray" class="py-2 px-2 d-flex flex-row align-center justify-space-between rounded-0">
            <p style="color: #65382c;" class="mb-0">
              {{ area.name }}
            </p>
            <v-icon>
              mdi-chevron-down
            </v-icon>
        </v-card>
      </v-col>
    </v-col>
  </v-row>
</template>
<script>
import { get } from "@/apis/areas";
export default {
  data() {
    return {
      toggle: "deliver_now",
      currentDay: new Date().getDate(),
      currentHour:"",
      currentMinute:"",
      current: [],
      days: [],
      hours: [],
      minutes: [],
      searchTerm: "",
      areas: [],
      filteredAreas: []
    };
  },
  methods: {
    isToggle(value) {
      setTimeout(() => {
        if (this.toggle == undefined) {
          this.toggle = value;
        }
      }, 100);
    },
    addDaysToDate(startDate, days) {
      for (let i = 0; i < days; i++) {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);
        this.days.push(newDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' }));
      }
    },
    search() {
      this.filteredAreas = this.areas.filter(area => String(area.name).toLowerCase().includes(String(this.searchTerm).toLowerCase()));
    },
    getAreas() {
      get().then(({data}) => {
        this.areas = data;
        this.filteredAreas = data;
      })
    },
    isDateTodayWithoutYear(targetDate) {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentDayName = currentDate.toLocaleString('default', { weekday: 'short' });

      return targetDate.includes(currentDay) && targetDate.includes(currentDayName);
    },
    updateTime(){
      console.log(this.isDateTodayWithoutYear(this.currentDay))
    },
    getHoursToEndOfDay(notToday) {
      let currentHour, endHour = 20, currentMinute;
      if(!notToday){
        currentHour = new Date().getHours();
        currentMinute = new Date().getMinutes();
      }else{
        currentMinute = 0;
        currentHour = 8;
      }
      let isAM = currentHour < 12;
      let hoursArray = [];
      
      for (let i = currentHour; i <= endHour; i++) {
        const hour = i % 12 || 12;
        const period = isAM ? 'AM' : 'PM';
        hoursArray.push(`${String(hour).length === 1 ? '0'+hour : hour}`);
        isAM = !isAM;
      }

      for (let i = currentMinute; i < 60; i++){
        this.minutes.push(`${String(i).length === 1 ? '0'+i : i}`);
      }
    
      return hoursArray;
    },
    pickArea(area){
      console.log(area);
    }
  },
  watch: {
    currentDay(newValue, oldValue){
      if(newValue !== null){
        if(this.isDateTodayWithoutYear(newValue)){
          this.hours = this.getHoursToEndOfDay(false);
        }else{
          this.hours = this.getHoursToEndOfDay(true);
          this.currentHour = 8;
        }
      }
    },
  },
  mounted() {
    this.addDaysToDate(new Date(), 365);
    this.getAreas();
  }
}
</script>

<style lang="scss" scoped>
.isPicked {
  background-color: #ecbaa8;
  color: #65382c !important;
}

</style>