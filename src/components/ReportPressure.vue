<template>
<v-container>
    <v-data-table :headers="headers" :items="desserts" :items-per-page="10" class="elevation-1" disable-sort>
        <template v-slot:header.name="{ header }">
            <v-chip color="red" dark @click="activeModal('Tổng lưu lượng nước thô')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.calories="{ header }">
            <v-chip color="orange" dark @click="activeModal('Tổng lưu lượng nước sạch')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.fat="{ header }">
            <v-chip color="yellow" dark @click="activeModal('Bơm nước sạch')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.carbs="{ header }">
            <v-chip color="green" dark @click="activeModal('Bơm nước thô')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.protein="{ header }">
            <v-chip color="purple" dark @click="activeModal('Áp lực lưc lượng')">{{ header.text }}</v-chip>
        </template>
        <!-- <template v-slot:header.iron="{ header }">
            <v-chip color="blue" dark @click="activeModal('iron')">{{ header.text }}</v-chip>
        </template> -->
    </v-data-table>

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
                            <v-card-title>
                                Bảng dữ liệu
                            </v-card-title>
                            <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1" dense>
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
export default {
    components: {
        apexchart: VueApexCharts
    },
    name: "ReportPressure",
    data() {
        return {
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
            dialog: false,
            target: "",
            headers: [{
                    text: "Tổng lưu lượng nước thô",
                    align: "center",
                    sortable: false,
                    value: "name"
                },
                {
                    text: "Tổng lưu lượng nước sạch",
                    align: "center",
                    value: "calories"
                },
                {
                    text: "Bơm nước sạch",
                    align: "center",
                    value: "fat"
                },
                {
                    text: "Bơm nươc thô",
                    align: "center",
                    value: "carbs"
                },
                {
                    text: "Áp lực lưu lượng",
                    align: "center",
                    value: "protein"
                },
                // { text: "Iron (%)", value: "iron" }
            ],
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
            desserts: [{
                    name: "Frozen Yogurt",
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: "1%"
                },
                {
                    name: "Ice cream sandwich",
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: "1%"
                },
                {
                    name: "Eclair",
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: "7%"
                },
                {
                    name: "Cupcake",
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: "8%"
                },
                {
                    name: "Gingerbread",
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: "16%"
                },
                {
                    name: "Jelly bean",
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: "0%"
                },
                {
                    name: "Lollipop",
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: "2%"
                },
                {
                    name: "Honeycomb",
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: "45%"
                },
                {
                    name: "Donut",
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: "22%"
                },
                {
                    name: "KitKat",
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: "6%"
                }
            ]
        };
    },
    methods: {
        activeModal(target) {
            this.$data.target = target;
            this.$data.dialog = true;
        }
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
