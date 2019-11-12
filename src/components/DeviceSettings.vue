<template>
<v-container>
    <v-data-table :headers="headers" :items="desserts" :items-per-page="10" class="elevation-1" disable-sort>
        <template v-slot:header.time="{ header }">
            <v-chip color="red" dark @click="activeModal('Thời gian')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.parameter="{ header }">
            <v-chip color="red" dark @click="activeModal('Thông số')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.sign="{ header }">
            <v-chip color="yellow" dark @click="activeModal('Kí hiệu')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.number="{ header }">
            <v-chip color="green" dark @click="activeModal('Giá trị')">{{ header.text }}</v-chip>
        </template>
        <template v-slot:header.unit="{ header }">
            <v-chip color="purple" dark @click="activeModal('Đơn vị')">{{ header.text }}</v-chip>
        </template>
    </v-data-table>

    <div>
        <v-dialog id="mainModal" v-model="dialog">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>{{ target }}
                </v-card-title>
                <div class="col-md-12 row">
                    <div class="col-md-3" id="infoSector">
                        <v-card>
                            <v-card-title>Thông tin chi tiết</v-card-title>
                            <v-text-field label="ID Thiết bị" value="Text here" outlined readonly style="width:45%; padding-left:5px; padding-top: 8px; display:inline-block"></v-text-field>
                            <v-text-field label="Khu vực" value="Text here" outlined readonly style="width:45%; padding-left:10px; padding-top: 8px; display:inline-block"></v-text-field>
                            <v-text-field label="Giá trị tối đa" value="Text here" outlined readonly style="width:45%; padding-left:5px; padding-top: 8px; display:inline-block"></v-text-field>
                            <v-text-field label="Trung bình" value="Text here" outlined readonly style="width:45%; padding-left:10px; padding-top: 8px; display:inline-block"></v-text-field>
                        </v-card>
                    </div>

                    <div class="col-md-9 ">
                        <v-card>
                            <v-card-title>
                                Bảng dữ liệu
                            </v-card-title>
                            <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1" dense>
                            </v-data-table>
                        </v-card>
                    </div>

                </div>
                <div class="container-fluid" id="chart">Chart</div>
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
export default {
    name: 'DeviceSetting',

    data: () => ({
        dialog: false,
        target: "",
        headers: [{
                text: "Thời gian",
                align: "center",
                value: "time"
            },
            {
                text: "Thông Số",
                align: "center",
                value: "parameter"
            },
            {
                text: "Kí Hiệu",
                align: "center",
                value: "sign"
            },
            {
                text: "Giá trị",
                align: "center",
                value: "number"
            },
            {
                text: "Đơn Vị (g)",
                align: "center",
                value: "unit"
            },
        ],
        desserts: [{
          time:"00:05:00",
            parameter: "Bơm 1",
            sign: "r_dis_hz1",
            number: "1234",
            unit: "Hz"
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
/* #mainModal{

} */
#chart {
    background-color: aqua;
    height: 35vh;
}
</style>
