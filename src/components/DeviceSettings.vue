<template>
<div>
    <v-alert v-model="alert" border="left" :type="status" transition="slide-x-transition" :dismissible="true">
        {{message}}
    </v-alert>
    <v-data-table :headers="headers" :items="itemConfig" loading="true" class="elevation-3" disable-sort>
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title class="title">Bảng Chi Tiết Cấu Hình</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="80vw" :no-click-animation="true">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">
                            <v-icon>add_circle_outline</v-icon>
                            Thêm Cấu Hình
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="3">
                                        <v-select :items="index" v-model="editedItem.index" label="Chỉ Mục"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-text-field v-model="editedItem.name" label="Tên Giá Trị"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <v-select :items="type" v-model="editedItem.type" label="Loại Giá Trị"></v-select>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <v-text-field v-model="editedItem.input" label="Đầu Vào"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <v-text-field v-model="editedItem.unit" label="Đơn Vị"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="primary" color="blue darken-1" @click="close">Hủy</v-btn>
                            <v-btn class="primary" color="blue darken-1" @click="save">Đồng Ý</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                edit
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                delete
            </v-icon>
        </template>
    </v-data-table>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary" color="blue darken-1" @click="sendData()">
            Áp Dụng<v-icon>send</v-icon>
        </v-btn>
    </v-card-actions>

</div>
</template>

<script>
import axios from 'axios'
import {
    async
} from 'q'
export default {
    name: "DeviceSetting",

    data: () => ({
        alert: false,
        status: "",
        valid: false,
        message: "",
        firstname: "",
        lastname: "",
        nameRules: [v => !!v || "Không được để trống trường này"],
        email: "",
        index: ["Chi phí vận hành", "Lưu lượng áp lực"],
        type: ["R_DIS_HZ_P", "R_DIS_SS"],
        itemConfig: [],
        headers: [{
                text: 'Chỉ Mục',
                sortable: false,
                align: "center",
                value: 'index',
            },
            {
                text: 'Tên Giá Trị',
                align: "center",
                value: 'name'
            },
            {
                text: 'Loại Giá Trị',
                align: "center",
                value: 'type'
            },
            {
                text: 'Đầu Vào',
                align: "center",
                value: 'input'
            },
            {
                text: 'Kí Hiệu',
                align: "center",
                value: 'unit'
            },
            {
                text: 'Chỉnh Sửa',
                align: "center",
                value: 'action',
                sortable: false
            },
        ],
        dialog: false,
        editedIndex: -1,
        editedItem: {
            index: '',
            name: "",
            type: "",
            input: "",
            unit: "",
        },
        defaultItem: {
            index: '',
            name: "",
            type: "",
            input: "",
            unit: "",
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Thêm cấu hình' : 'Chỉnh sửa'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
    },
    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            let that = this
            let data
            axios({
                url: '/record/getlistconfig',
                data: data,
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST'
            }).then(function (res) {
                that.$data.itemConfig = res.data
            }).catch(function (err) {
                return (err)
            })
        },
        sendData: function () {
            let that = this

            let data = that.$data.itemConfig
            axios({
                url: '/record/configreport',
                data: data,
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST'
            }).then(function (res) {
                if (res.data === "success") {
                    that.$data.status = "success"
                    that.$data.alert = true
                    that.$data.message = "Cấu hình thành công"

                } else {
                    that.$data.status = "error"
                    that.$data.alert = true
                    that.$data.message = "Cấu hình không thành công"
                }
            }).catch(function (err) {
                alert(err)
                return (err)
            })
        },
        editItem(item) {
            this.editedIndex = this.itemConfig.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.itemConfig.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.itemConfig.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.itemConfig[this.editedIndex], this.editedItem)
                // this.itemConfig = [...this.itemConfig.slice(0,this.editedIndex),this.editedItem,...this.itemConfig.slice(this.editedIndex+1)]
            } else {
                this.itemConfig.push(this.editedItem)
            }
            this.close()
        },
    }
};
</script>

<style scoped>
.input1 {
    margin-left: 25px;
}

#button {
    margin-left: 35px;
}

.content {
    padding-top: 30px;
    margin: auto
}

.title {
    font-family: "Muli", sans-serif
}
</style>
