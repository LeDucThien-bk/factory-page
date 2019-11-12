<template>
<v-container>
    <v-data-table :headers="headers" :items="desserts" :items-per-page="10" class="elevation-1" disable-sort>
        <template v-slot:header.time="{ header }">
            <v-chip @click="activeModal('Thời gian')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.powerconsume="{ header }">
            <v-chip @click="activeModal('Điện năng tiêu thụ')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.chemistryconsume="{ header }">
            <v-chip @click="activeModal('Hóa chất tiêu thụ')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.loss="{ header }">
            <v-chip @click="activeModal('Thất thoát vận hành')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.quality="{ header }">
            <v-chip @click="activeModal('Chất lượng nước')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.chemistrysystem="{ header }">
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
                            <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1" dense>
                            </v-data-table>
                        </v-card>
                    </div>
                </div>
                <div class="container-fluid" id="chart">
                  <apexchart id="apex-chart" type=line height=280 :options="chartOptions" :series="series"></apexchart></div>
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
export default {
    name: 'ReportDetail',
components: {
        apexchart: VueApexCharts
    },
    data: () => ({
      series: [{
                data: [
                    [1327359600000, 30.95],
                    [1327446000000, 31.34],
                    [1327532400000, 31.18],
                    [1327618800000, 31.05],
                    [1327878000000, 31.00],
                    [1327964400000, 30.95],
                    [1328050800000, 31.24]
                ]
            }],
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
                value: "powerconsume"
            },
            {
                text: "Hóa chất tiêu thụ",
                align: "center",
                value: "chemistryconsume"
            },
            {
                text: "Thất thoát vận hành",
                align: "center",
                value: "loss"
            },
            {
                text: "Chất lượng nước",
                align: "center",
                value: "quality"
            },
            {
                text: "Hệ thống hóa chất",
                align: "center",
                value: "chemistrysystem"
            },
        ],
        desserts: [{
            time: "00:01:00",
            powerconsume: "1000",
            chemistryconsume: "1500",
            loss: "300",
            quality: "BT",
            chemistrysystem: "957",
        }],
    }),
    methods: {
        activeModal(target) {
            this.$data.target = target;
            this.$data.dialog = true;
        }
    }
};
</script>

<style scoped>
#chart {
    background-color: azure;
    height: 35vh;
}
</style>
