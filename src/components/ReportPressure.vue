<template>
  <v-container>
    <v-card>
      <v-card-title>datepicker and stuffs here</v-card-title>
      <v-data-table
        :headers="headers"
        :items="data"
        :items-per-page="10"
        loading="true"
        disable-sort
      >
        <template v-slot:header.time="{ header }">
          <v-chip dark>{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.flow_pressure="{ header }">
          <v-chip dark @click="activeModal('Áp lực lưu lượng', 'flow_pressure')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.pump_water_in="{ header }">
          <v-chip dark @click="activeModal('Nước bơm vào', 'pump_water_in')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.pump_water_out="{ header }">
          <v-chip dark @click="activeModal('Nước bơm ra', 'pump_water_out')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.sum_of_water_in="{ header }">
          <v-chip dark @click="activeModal('Tổng nước vào', 'sum_of_water_in')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.sum_of_water_out="{ header }">
          <v-chip dark @click="activeModal('Tổng nước ra', 'sum_of_water_out')">{{ header.text }}</v-chip>
        </template>
      </v-data-table>
    </v-card>

    <DetailModal
      v-bind:dialogControl="dialog"
      v-bind:info="info"
      v-bind:dataTable="modalData"
    ></DetailModal>
  </v-container>
</template>

<script>
import axios from "axios";
import DetailModal from "./DetailModal"

export default {
  name: "ReportPressure",
  components: {
    DetailModal
  },
  created: function() {
    let that = this;
    let data = { time: "21/08/2019" };
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
  },

  data() {
    return {
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
    }
  }
};
</script>
