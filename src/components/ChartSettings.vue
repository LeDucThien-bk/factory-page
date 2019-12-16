<template>
  <v-container>
    <v-alert
      v-model="alert"
      border="left"
      :type="status"
      transition="slide-x-transition"
      :dismissible="true"
    >{{message}}</v-alert>
    <v-data-table
      :headers="headers"
      :items="itemConfig"
      loading="true"
      class="elevation-3"
      disable-sort
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="title">Bảng Chi Tiết Biểu Đồ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="50vw" :no-click-animation="true">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                <v-icon>add_circle_outline</v-icon>Thêm Biểu Đồ
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="editedItem.name" label="Tên giá trị"></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" md="2">
                      <v-select :items="type" v-model="editedItem.type" label="Loại Giá Trị"></v-select>
                    </v-col> -->
                    <v-col cols="6" md="3">
                      <v-text-field v-model="editedItem.unit" label="Đơn vị"></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3">
                      <v-text-field v-model="editedItem.color" label="Mã màu"></v-text-field>
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
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
import { async } from "q";
export default {
  name: "ChartSetting",

  data: () => ({
    alert: false,
    status: "success",
    message: "",
    email: "",
    itemConfig: [],
    headers: [
      {
        text: "Tên giá trị",
        sortable: false,
        align: "center",
        value: "name"
      },
      {
        text: "Đơn vị",
        align: "center",
        value: "unit"
      },
      {
        text: "Mã màu",
        align: "center",
        value: "color"
      },
      {
        text: "Chỉnh Sửa",
        align: "center",
        value: "action",
        sortable: false
      }
    ],
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      unit: "",
      color: ""
    },
    defaultItem: {
      name: "",
      unit: "",
      color: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Thêm cấu hình" : "Chỉnh sửa";
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      let that = this;
      let data;
      axios({
        url: "/record/getconfiggraph",
        data: data,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(function(res) {
          that.$data.itemConfig = res.data;
        })
        .catch(function(err) {
          return err;
        });
    },
    sendData: function() {
      let that = this;

      let data = that.$data.itemConfig;
      axios({
        url: "/record/configgraph",
        data: data,
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(function(res) {
          if (res.data === "success") {
            that.$data.status = "success";
            that.$data.alert = true;
            that.$data.message = "Cấu hình thành công";
          } else {
            that.$data.status = "error";
            that.$data.alert = true;
            that.$data.message = "Cấu hình không thành công";
          }
        })
        .catch(function(err) {
          alert(err);
          return err;
        });
    },
    editItem(item) {
      this.editedIndex = this.itemConfig.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.itemConfig.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.itemConfig.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.itemConfig[this.editedIndex], this.editedItem);
        // this.itemConfig = [...this.itemConfig.slice(0,this.editedIndex),this.editedItem,...this.itemConfig.slice(this.editedIndex+1)]
      } else {
        this.itemConfig.push(this.editedItem);
      }
      this.close();
      this.sendData();
    }
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
  margin: auto;
}

.title {
  font-family: "Muli", sans-serif;
}
</style>
