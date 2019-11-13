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
          <v-chip dark @click="activeModal('Áp lực lưu lượng')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.pump_water_in="{ header }">
          <v-chip dark @click="activeModal('Nước bơm vào')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.pump_water_out="{ header }">
          <v-chip dark @click="activeModal('Nước bơm ra')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.sum_of_water_in="{ header }">
          <v-chip dark @click="activeModal('Tổng nước vào')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.sum_of_water_out="{ header }">
          <v-chip dark @click="activeModal('Tổng nước ra')">{{ header.text }}</v-chip>
        </template>
      </v-data-table>
    </v-card>

    <div>
        <v-dialog id="mainModal" v-model="dialog">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>{{ target }}</v-card-title>
                <div class="row">
                    <div class="col-md-3" id="infoSector">
                        <v-card>
                            <v-card-title>Thông tin chi tiết</v-card-title>
                            <v-text-field label="ID Thiết bị" value="Text here" outlined readonly style="width:45%; padding-left:5px; padding-top: 8px; display:inline-block"></v-text-field>
                            <v-text-field label="Khu vực" value="Text here" outlined readonly style="width:45%; padding-left:10px; padding-top: 8px; display:inline-block"></v-text-field>
                            <v-text-field label="Giá trị tối đa" value="Text here" outlined readonly style="width:45%; padding-left:5px; padding-top: 8px; display:inline-block"></v-text-field>
                            <v-text-field label="Trung bình" value="Text here" outlined readonly style="width:45%; padding-left:10px; padding-top: 8px; display:inline-block"></v-text-field>
                        </v-card>
                    </div>

            <div class="col-md-8">
              <v-card>
                <v-card-title>Bảng dữ liệu</v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="data"
                  :items-per-page="5"
                  class="elevation-1"
                  dense
                ></v-data-table>
              </v-card>
            </div>

                </div>
                <div class="container-fluid" id="chart">
                    <apexchart id="apex-chart" type=line height=280 :options="chartOptions" :series="series"></apexchart>
                </div>
                <v-divider></v-divider>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">Đóng</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ReportPressure",
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
      dialog: false,
      target: "",
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
      data: []
    };
  },
  methods: {
    activeModal(target) {
      this.$data.target = target;
      this.$data.dialog = true;
    }
};
</script>

<style scoped>
#infoSector {
    margin-left: 3%;
}

#chart {
    background-color: azure;
    height: 35vh;
}
</style>
