<template>
<v-container>
    <v-card>
        <div class="row">
            <v-card flat id="menu">
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40">
                    <template v-slot:activator="{ on }">
                        <v-text-field v-model="date" label="Chọn ngày" prepend-icon="event" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false" :no-title="true"></v-date-picker>
                </v-menu>

            </v-card>
            <v-card flat id="menu">
                <v-menu v-model="menu" :nudge-right="40">
                    <template v-slot:activator="{ on }">
                        <v-btn color="success" @click="ExportData()">Xuất Excel</v-btn>
                    </template>
                </v-menu>

            </v-card>

        </div>

        <v-data-table height="70vh" :headers="headers" :items="data" :items-per-page="10" loading="true" disable-sort>
            <!-- <template v-slot:header.time="{ header }">
          <v-chip dark>{{ header.text }}</v-chip>
        </template> -->
            <template v-slot:header.power_wasted="{ header }">
                <v-chip class="elevation-3" color="info" dark @click="activeModal('Điện năng tiêu thụ', 'power_wasted')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
            </template>
            <template v-slot:header.chemiscals_wasted="{ header }">
                <v-chip class="elevation-3" color="info" dark @click="activeModal('Hóa chất tiêu thụ', 'chemiscals_wasted')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
            </template>
            <template v-slot:header.running_wasted="{ header }">
                <v-chip class="elevation-3" color="info" dark @click="activeModal('Thất thoát vận hành', 'running_wasted')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
            </template>
            <template v-slot:header.water_quality="{ header }">
                <v-chip class="elevation-3" color="info" dark @click="activeModal('Chất lượng nước', 'water_quality')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
            </template>
            <template v-slot:header.chemiscals_system="{ header }">
                <v-chip class="elevation-3" color="info" dark @click="activeModal('Hệ thống hóa chất', 'chemiscals_system')">{{ header.text }}<i class="material-icons">launch</i></v-chip>
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
    name: "ReportDetail",
    components: {
        DetailModal
    },
    mounted: async function () {
        this.$data.date = new Date().toISOString().substr(0, 10)
        await this.loadData();
        this.loadDataModal();
    },

    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            dialog: 0,
            info: {
                deviceID: "51",
                area: "51",
                sum: "",
                max: "",
                average: "",
                name: ""
            },
            target: '',
            headers: [{
                    text: "Thời gian",
                    align: "left",
                    width: 100,
                    value: "time"
                },
                {
                    text: "Điện năng tiêu thụ",
                    align: "center",
                    width: 150,
                    value: "power_wasted"
                },
                {
                    text: "Hóa chất tiêu thụ",
                    align: "center",
                    width: 150,
                    value: "chemiscals_wasted"
                },
                {
                    text: "Thất thoát vận hành",
                    align: "center",
                    width: 150,
                    value: "running_wasted"
                },
                {
                    text: "Chất lượng nước",
                    align: "center",
                    width: 150,
                    value: "water_quality"
                },
                {
                    text: "Hệ thống hóa chất",
                    align: "center",
                    width: 150,
                    value: "chemiscals_system"
                }
            ],
            data: [],
            modalData: []
        };
    },
    watch: {
        date: function () {
            this.loadData();
        }
    },
    methods: {
        activeModal(name, target) {
            let tempData = this.$data.data;
            let that = this;
            that.$data.target = target
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
            // console.log(target)
            this.$data.dialog += 1;
            this.loadDataModal()
        },
        loadData() {
            let that = this;
            that.$data.data = []
            let [year, month, day] = that.$data.date.split('-')
            let data = {
                time: `${day}/${month}/${year}`
            };
            // console.log(data)
            axios({
                    url: "record/fakerunningservice",
                    data: data,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                })
                .then(function (res) {
                    that.$data.data = res.data;
                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                });
        },
        loadDataModal() {
            let that = this
            that.$data.info.max = ""
            that.$data.info.average = ""
            let [year, month, day] = that.$data.date.split('-')
            let data = {
                time: `${day}/${month}/${year}`,
                fieldname: that.$data.target
            }
            // console.log(data)
            axios({
                    url: "record/getfakefield",
                    data: data,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                })
                .then(function (res) {
                    // console.log(res.data)
                    that.$data.info.max = res.data.max
                    that.$data.info.average = Math.round(res.data.average * 100) / 100 //rounded to 2 decimal places

                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                });

        },
        ExportData: function () {
            let that = this;
            let data = {
                data: that.$data.data
            }
            console.log(data)
            axios({
                    url: "api/record/exportExcelFlowPressure",
                    data: data,
                    method: "POST"
                })
                .then(function (res) {
                    const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
                        const byteCharacters = atob(b64Data);
                        const byteArrays = [];

                        for (
                            let offset = 0; offset < byteCharacters.length; offset += sliceSize
                        ) {
                            const slice = byteCharacters.slice(offset, offset + sliceSize);

                            const byteNumbers = new Array(slice.length);
                            for (let i = 0; i < slice.length; i++) {
                                byteNumbers[i] = slice.charCodeAt(i);
                            }

                            const byteArray = new Uint8Array(byteNumbers);
                            byteArrays.push(byteArray);
                        }

                        const blob = new Blob(byteArrays, {
                            type: contentType
                        });
                        return blob;
                    };
                    var saveByteArray = (function () {
                        var a = document.createElement("a");
                        document.body.appendChild(a);
                        a.style = "display: none";
                        return function (data, name) {
                            var blob = b64toBlob(data, "application/xlsx"),
                                url = window.URL.createObjectURL(blob);
                            a.href = url;
                            a.download = name;
                            a.click();
                            window.URL.revokeObjectURL(url);
                        };
                    })();
                    saveByteArray([res.data], "Test.xlsx");
                    return res;
                })
                .catch(function (err) {
                    alert("Lấy hóa đơn thất bại");
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
