<template>
<v-container>
    <div class="col-md-4">
        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on }">
                <v-text-field v-model="date" label="Date"  hint="MM/DD/YYYY format" persistent-hint prepend-icon="event" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" @change="loadData()" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
    </div>
    <v-data-table :headers="headers" :items="tabledata" :items-per-page="10" class="elevation-1" disable-sort>
        <template v-slot:header.time="{ header }">
            <v-chip @click="activeModal('Thời gian')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.power_wasted="{ header }">
            <v-chip @click="activeModal('Điện năng tiêu thụ')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.chemiscals_wasted="{ header }">
            <v-chip @click="activeModal('Hóa chất tiêu thụ')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.running_wasted="{ header }">
            <v-chip @click="activeModal('Thất thoát vận hành')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.water_quality="{ header }">
            <v-chip @click="activeModal('Chất lượng nước')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.chemiscals_system="{ header }">
            <v-chip @click="activeModal('Hệ thống hóa chất')">{{ header.text }}</v-chip>
        </template>
    </v-data-table>

    <div>
        <v-dialog id="mainModal" v-model="dialog">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>{{ target }}</v-card-title>
                <div class="row col-md-12">
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
                            <v-card-title>
                                Bảng dữ liệu
                            </v-card-title>
                            <v-data-table :headers="headers" :items="tabledata" :items-per-page="5" class="elevation-1" dense>
                            </v-data-table>
                        </v-card>
                    </div>
                </div>
                <div class="container-fluid" id="chart">
                    <apexchart id="apex-chart" type=line height=280 :options="chartOptions" :series="series"></apexchart>
                </div>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts"
import axios from 'axios'

export default {
    name: 'ReportDetail',
    components: {
        apexchart: VueApexCharts
    },
    data: () => ({
        series: [{
            data: [
                // [1327359600000, 30.95],
                // [1327446000000, 31.34],
                // [1327532400000, 31.18],
                // [1327618800000, 31.05],
                // [1327878000000, 31.00],
                // [1327964400000, 30.95],
                // [1328050800000, 31.24]
            ]
        }],
        date: "",
        menu1: false,
        chartOptions: {
            annotations: {
                yaxis: [{
                    y: "0",
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Thời gian',
                        style: {
                            color: "#fff",
                            background: '#00E396'
                        }
                    }
                }],
                xaxis: [{
                    x: "00:00:00",
                    yAxisIndex: 0,
                    borderColor: '#999',
                    label: {
                        show: true,
                        text: 'Tần số',
                        style: {
                            color: "#fff",
                            background: '#775DD0',
                        },
                    }
                }]
            },
            yaxis: {
                tooltip: {
                    enabled: true,
                }
            },
            xaxis: {
                type: 'datetime',
            },
            chart: {
                toolbar: {
                    show: true,
                    tools: {
                        download: false,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                        reset: true | '<img src="/static/icons/reset.png" width="20">',
                        customIcons: []
                    },
                    autoSelected: 'zoom'
                },
            },
            markers: {
                size: 0,
                style: 'hollow',
            },

            stroke: {
                show: true,
                curve: 'straight',
                lineCap: 'butt',
                width: 2,
                dashArray: 0,
            },
            colors: ['#fc0303', "#f0fc03", '#52fc03', '#0c0d0c', '#03dbfc', '#0362fc', '#7303fc', '#e703fc', '#15154f', '#6f804d'],

            tooltip: {
                x: {
                    format: 'dd MMM yyyy HH:mm:ss'
                }
            },
        },
        dialog: false,
        target: "",
        headers: [{
                text: "Thời gian",
                align: "center",
                value: "time"
            },
            {
                text: "Điện năng tiêu thụ (W)",
                align: "center",
                value: "power_wasted"
            },
            {
                text: "Hóa chất tiêu thụ",
                align: "center",
                value: "chemiscals_wasted"
            },
            {
                text: "Thất thoát vận hành",
                align: "center",
                value: "running_wasted"
            },
            {
                text: "Chất lượng nước",
                align: "center",
                value: "water_quality"
            },
            {
                text: "Hệ thống hóa chất",
                align: "center",
                value: "chemiscals_system"
            },
        ],
        tabledata: [],
    }),
    mounted() {
        this.$data.date = new Date().toISOString().substr(0, 10)
        // this.$data.date.setTime(this.$data.date.getTime() - 3600 * 1000 * 24);
        this.loadData();
    },
    methods: {
        activeModal(target) {
            this.$data.target = target;
            this.$data.dialog = true;
        },
        loadData: function () {
            let that = this
            console.log(that.$data.date)
            let [year, month, day] = that.$data.date.split('-')
            // console.log(that.$data.date)
            // var data = '{' + '"' + "time" + '"' + ":" + '"' + that.$data.date.getDate() +
            //     "/" +
            //     (parseInt(that.$data.date.getMonth()) + 1) +
            //     "/" +
            //     that.$data.date.getFullYear() + '"' +
            //     '}'
            var data = '{' + '"' + "time" +'"'+ ":" + '"'+`${day}/${month}/${year}` + '"' + '}'
            console.log(data)
            that.$data.tabledata = []
            axios({
                url: "record/fakerunningservice",
                data: data,
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            }).then(function (res) {
                if (res.status == 204) {
                    alert("Không có dữ liệu hiển thị")
                } else {
                    // console.log(res.data)
                    that.$data.tabledata = res.data
                    var Power_wasted = []
                    var Chemiscals_wasted = []
                    var Running_wasted = []
                    var Water_quality = []
                    var Chemiscals_system = []
                    var summary = []
                    for (let i = 0; i < res.data.length; i++) {
                        summary.push(res.data[i].time)
                        summary.push(res.data[i].power_wasted)
                        Power_wasted.push(summary)
                        summary = []
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        summary.push(res.data[i].time)
                        summary.push(res.data[i].chemiscals_wasted)
                        Chemiscals_wasted.push(summary)
                        summary = []
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        summary.push(res.data[i].time)
                        summary.push(res.data[i].running_wasted)
                        Running_wasted.push(summary)
                        summary = []
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        summary.push(res.data[i].time)
                        summary.push(res.data[i].water_quality)
                        Water_quality.push(summary)
                        summary = []
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        summary.push(res.data[i].time)
                        summary.push(res.data[i].chemiscals_system)
                        Chemiscals_system.push(summary)
                        summary = []
                    }
                    console.log(Power_wasted)
                }
            }).catch(function (err) {
                console.log(err);
                return err;

            })
            that.Draw()
        },
        Draw() {
            var that = this
            if (that.$data.target === 'Điện năng tiêu thụ') {
                console.log(that.$data.Power_wasted)
                that.$data.series.data = that.$data.Power_wasted
                // console.log(that.$data.series.data)
            }
        }
    }
};
</script>

<style scoped>
#chart {
    background-color: azure;
    width: 90vw;
    margin-left: 30px
}
</style>
