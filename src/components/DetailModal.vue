/* eslint-disable no-unused-vars */
<template>
<v-dialog id="mainModal" v-model="dialog">
    <v-btn :fab="true" color="black" :x-small="true" @click="dialog = false" id="buttonclose">
        <v-icon color="white">mdi-close</v-icon>
    </v-btn>
    <v-card style="overflow-x: hidden">
        <v-card-title class=" headline info">
            {{ info.name }} {{ date }}

        </v-card-title>

        <div class="row">
            <div class="col-md-5" id="infoSector">
                <v-card>
                    <v-card-title>Thông tin chi tiết</v-card-title>
                    <v-text-field label="ID Thiết bị" :value="info.deviceID" outlined readonly dense style="width:45%; padding-left:5px; padding-top: 8px; display:inline-block"></v-text-field>
                    <v-text-field label="Khu vực" :value="info.area" outlined readonly dense style="width:45%; padding-left:10px; padding-top: 8px; display:inline-block"></v-text-field>
                    <v-text-field label="Giá trị tối đa" :value="info.max" outlined readonly dense style="width:45%; padding-left:5px; padding-top: 8px; display:inline-block"></v-text-field>
                    <v-text-field label="Trung bình" :value="info.average" outlined readonly dense style="width:45%; padding-left:10px; padding-top: 8px; display:inline-block"></v-text-field>
                </v-card>
            </div>

            <div class="col-md-6">
                <v-card >
                    <!-- <v-card-title>Bảng dữ liệu</v-card-title> -->
                    <v-data-table height="153px" :headers="headers" :items="dataTable" :items-per-page="5" class="elevation-1" disable-sort dense>
                        <template v-slot:item.diff="{ item }">
                            <div v-if="item.diff > 0" id="greenText">{{ item.diff }}</div>
                            <div v-if="item.diff < 0" id="redText">{{ item.diff }}</div>
                            <div v-if="item.diff == 0">{{ item.diff }}</div>
                        </template>
                    </v-data-table>
                </v-card>
            </div>

            <!-- <div class="col-md-10" style="background-color:yellow">graph here</div> -->
            <div id="legend"></div>
            <div id="graph1"></div>
        </div>

        <v-divider></v-divider>

        <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" dark @click="dialog = false">Đóng</v-btn>
      </v-card-actions> -->
    </v-card>
</v-dialog>
</template>

<script>
import Dygraph from "dygraphs";

export default {
    props: {
        dialogControl: Number,
        date: String,
        info: {
            deviceID: String,
            area: String,
            max: Number,
            average: Number,
            sum: String,
            name: String
        },
        dataTable: {
            time: String,
            value: Number,
            diff: Number
        }
    },
    watch: {
        dialogControl: function (newValue) {
            let that = this;
            that.$data.headers[1].text = that.info.name;
            if (newValue) {
                that.$data.dialog = true;
                setTimeout(function () {
                    that.plotGraph();
                }, 500);
            }
        }
    },
    data() {
        return {
            dialog: false,
            graphData: [],
            headers: [{
                    text: "Thời gian",
                    align: "left",
                    width: 100,
                    value: "time"
                },
                {
                    text: "Áp lực lưu lượng",
                    align: "center",
                    width: 150,
                    value: "value"
                },
                {
                    text: "Tăng Giảm",
                    align: "center",
                    width: 150,
                    value: "diff"
                }
            ]
        };
    },
    methods: {
        plotGraph: function () {
            let that = this;
            that.$data.graphData = [];
            var tempDate = new Date();
            var i = 0;
            for (i = 0; i < that.dataTable.length; i++) {
                tempDate.setFullYear(that.date.substring(0, 4));
                tempDate.setMonth(parseInt(that.date.substring(5, 7)) - 1); //JS parse month from 0 - 11
                tempDate.setDate(that.date.substring(8, 10));
                tempDate.setHours(that.dataTable[i].time.substring(0, 2));
                tempDate.setMinutes(that.dataTable[i].time.substring(3, 5));
                tempDate.setSeconds(that.dataTable[i].time.substring(6, 8));
                that.$data.graphData.push([
                    tempDate.getTime(),
                    that.dataTable[i].value
                ]);
            }
            var start = new Date(that.$data.graphData[0][0]);
            start.setHours(0, 0, 1, 0); // Dodge the english label in the xAxis
            start = start.getTime();
            var end = new Date(that.$data.graphData[0][0]);
            end.setHours(23, 59, 59, 999);
            end = end.getTime();
            const g = new Dygraph(
                document.getElementById("graph1"),
                that.$data.graphData, {
                    drawPoints: true,
                    labels: ["Thời gian", that.info.name],
                    axes: {
                        x: {
                            valueFormatter: function (x) {
                                let date = new Date();
                                date.setTime(x);
                                return (
                                    '<span style="font-weight: bold;">Thời gian :</span>' +
                                    " " +
                                    ("0" + date.getHours()).slice(-2) +
                                    ":" +
                                    ("0" + date.getMinutes()).slice(-2) +
                                    ":" +
                                    ("0" + date.getSeconds()).slice(-2) +
                                    " "
                                );
                            },
                            axisLabelFormatter: function (date, granularity, opts) {
                                return Dygraph.dateAxisLabelFormatter(
                                    new Date(date),
                                    granularity,
                                    opts
                                );
                            },
                            ticker: function (min, max, pixels, opts, dygraph, vals) {
                                return Dygraph.getDateAxis(
                                    min,
                                    max,
                                    Dygraph.TWO_HOURLY,
                                    opts,
                                    dygraph
                                );
                            }
                            // gridLineWidth: 1,
                            // drawGrid: true,
                            // independentTicks: true,
                            // gridLineColor: "#ff0000",
                            // gridLinePattern: [4, 1]
                        },
                        y: {
                            valueFormatter: function (y) {
                                return y + " đơn vị ";
                            }
                        }
                    },
                    // visibility: that.$data.checkbox,
                    // highlightSeriesOpts: { strokeWidth: 2 },
                    dateWindow: [start, end],
                    // valueRange: [0, 5500],
                    hideOverlayOnMouseOut: false,
                    colors: ["#396AB1"],
                    labelsDiv: "legend",
                    legend: "always"
                    // legendFormatter: legendFormatter       // only works with dygraphs ^2.1.0, but go beyond 1.1.1 will break axisLabelFormatter. Have fun! :)
                }
            );
        }
    }
};
</script>

<style scoped>
#infoSector {
    margin-left: 3%;
}

#greenText {
    color: green;
}

#redText {
    color: red;
}

#graph1 {
    /* margin-top: 2vh; */
    /* position: absolute; */
    width: 95%;
    height: 40vh;
    margin-left: 15px;
    color: black;
    margin-bottom: 10px;
}

#legend {
    color: black;
    height: 3vh;
    display: inline-block;
    display: table;
    margin: 0 auto;
    border: 1px solid grey;
    border-radius: 8px;
}
#buttonclose{
   float: right; 
   position: fixed;
   top:43px;
   right: 1px;
  
}
</style>
