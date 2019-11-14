<template>
  <v-container>
    <v-card>
      <v-card flat id="menu">
        <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Chọn ngày"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu = false" locale="vi"></v-date-picker>
      </v-menu>
      </v-card>
      <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="10"
        loading="true"
        disable-sort
      >
        <!-- <template v-slot:header.time="{ header }">
          <v-chip dark>{{ header.text }}</v-chip>
        </template> -->
        <template v-slot:header.flow_pressure="{ header }">
          <v-chip class="elevation-3" color="info" dark @click="activeModal('Áp lực lưu lượng', 'flow_pressure')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
        </template>
        <template v-slot:header.pump_water_in="{ header }">
          <v-chip class="elevation-3" color="info" dark @click="activeModal('Nước bơm vào', 'pump_water_in')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
        </template>
        <template v-slot:header.pump_water_out="{ header }">
          <v-chip class="elevation-3" color="info" dark @click="activeModal('Nước bơm ra', 'pump_water_out')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
        </template>
        <template v-slot:header.sum_of_water_in="{ header }">
          <v-chip class="elevation-3" color="info" dark @click="activeModal('Tổng nước vào', 'sum_of_water_in')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
        </template>
        <template v-slot:header.sum_of_water_out="{ header }">
          <v-chip class="elevation-3" color="info" dark @click="activeModal('Tổng nước ra', 'sum_of_water_out')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
        </template>
      </v-data-table>
    </v-card>

    <DetailModal v-bind:dialogControl="dialog" v-bind:info="info" v-bind:dataTable="modalData" v-bind:date="date"></DetailModal>
  </v-container>
</template>

<script>
import axios from "axios";
import DetailModal from "./DetailModal";

export default {
  name: "ReportPressure",
  components: {
    DetailModal
  },
  mounted: function() {
    this.loadData();
  },

  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      dialog: 0,
      info: {
        deviceID: "51",
        area: "51",
        name: ""
      },
      headers: [
        {
          text: "Thời gian",
          align: "left",
          width: 100,
          value: "time"
        },
        {
          text: "Áp lực lưu lượng",
          align: "center",
          width: 150,
          value: "flow_pressure"
        },
        {
          text: "Nước bơm vào",
          align: "center",
          width: 150,
          value: "pump_water_in"
        },
        {
          text: "Nước bơm ra",
          align: "center",
          width: 150,
          value: "pump_water_out"
        },
        {
          text: "Tổng nước vào",
          align: "center",
          width: 150,
          value: "sum_of_water_in"
        },
        {
          text: "Tổng nước ra",
          align: "center",
          width: 150,
          value: "sum_of_water_out"
        }
      ],
      data: [],
      modalData: []
    };
  },
  watch: {
    date: function() {
      this.loadData();
    }
  },
  methods: {
    activeModal(name, target) {
      let tempData = this.$data.data;
      let that = this;
      var temp = {};
      var previous = tempData[0][target];
      that.$data.modalData = [];
      this.$data.info.name = name;
      tempData.forEach(element => {
        temp.time = element.time;
        temp.value = element[target];
        temp.diff = element[target] - previous;
        previous = element[target];
        that.$data.modalData.push(temp);
        temp = {};
      });
      this.$data.dialog += 1;
    },
    loadData() {
      let that = this;
      let data = { time: that.$data.date };
      axios({
        url: "record/fakeflowpressure",
        data: data,
        headers: { "Content-Type": "application/json" },
        method: "POST"
      })
        .then(function(res) {
          that.$data.data = res.data;
          return res;
        })
        .catch(function(err) {
          console.log(err);
          return err;
        });
    }
  }
};
</script>

<style scoped>
#menu {
  padding-top: 10px;
  margin-left: 10px;
  max-width: 150px;
}
</style>
