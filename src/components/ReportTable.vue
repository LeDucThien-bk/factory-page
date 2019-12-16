<template>
<v-container>
    <v-card>
        <div class="flex-row">
            <v-card flat id="menu">
                <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40">
                    <template v-slot:activator="{ on }">
                        <v-text-field v-model="date" label="Chọn ngày" prepend-icon="event" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false" :no-title="true"></v-date-picker>
                </v-menu>
            </v-card>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="primary btExcel">
                    <v-icon>cloud_download</v-icon>Xuất Excel
                </v-btn>
            </v-card-actions>
        </div>

        <v-data-table height="30vh" :headers="headers1" :items="data" :items-per-page="10" loading="true" disable-sort>
        </v-data-table>
    </v-card>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary">
            <v-icon>cloud_download</v-icon>
            Xuất Excel
        </v-btn>
    </v-card-actions>

    <v-card>
        <v-data-table height="30vh" :headers="headers2" :items="data" :items-per-page="10" loading="true" disable-sort>
        </v-data-table>
    </v-card>
</v-container>
</template>

<script>
import axios from "axios";
export default {
    name: "ReportPressure",
    components: {},
    // mounted: function () {
    //     this.loadData();
    // },

    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            dialog: 0,
            target: "",
            info: {
                deviceID: "51",
                area: "51",
                sum: "",
                average: "",
                max: "",
                name: ""
            },
            headers1: [],
            headers2: [],
            data: [],
            modalData: []
        };
    },
    // watch: {
    //     date: function () {
    //         this.loadData();
    //     }
    // },
    methods: {
               loadData() {
            let that = this;
            let [year, month, day] = that.$data.date.split('-')
            let data = {
                time: `${day}/${month}/${year}`
            };
            axios({
                    url: "record/getdataconfig",
                    data: data,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                })
                .then(function (res) {
                    that.$data.data = res.data;
                    return res;
                })
                .catch(function (err) {
                    console.log(err);
                    return err;
                });
        },
        
    }
};
</script>

<style scoped>
#menu {
    padding-top: 10px;
    margin-left: 10px;
    max-width: 150px;
}

.btExcel {
    position: absolute;
    right: 8px
}
</style>
