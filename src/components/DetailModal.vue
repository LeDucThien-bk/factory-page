<template>
  <v-dialog id="mainModal" v-model="dialog">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>{{ info.name }}</v-card-title>
      <div class="row">
        <div class="col-md-5" id="infoSector">
          <v-card>
            <v-card-title>Thông tin chi tiết</v-card-title>
            <v-text-field
              label="ID Thiết bị"
              :value="info.deviceID"
              outlined
              readonly
              style="width:45%; padding-left:5px; padding-top: 8px; display:inline-block"
            ></v-text-field>
            <v-text-field
              label="Khu vực"
              :value="info.area"
              outlined
              readonly
              style="width:45%; padding-left:10px; padding-top: 8px; display:inline-block"
            ></v-text-field>
            <v-text-field
              label="Giá trị tối đa"
              value="Text here"
              outlined
              readonly
              style="width:45%; padding-left:5px; padding-top: 8px; display:inline-block"
            ></v-text-field>
            <v-text-field
              label="Trung bình"
              value="Text here"
              outlined
              readonly
              style="width:45%; padding-left:10px; padding-top: 8px; display:inline-block"
            ></v-text-field>
          </v-card>
        </div>

        <div class="col-md-6">
          <v-card>
            <v-card-title>Bảng dữ liệu</v-card-title>
            <v-data-table
              :headers="headers"
              :items="dataTable"
              :items-per-page="5"
              class="elevation-1"
              dense
            >
              <template v-slot:item.diff="{ item }">
                <div v-if="item.diff > 0" id="greenText">{{ item.diff }}</div>
                <div v-if="item.diff < 0" id="redText">{{ item.diff }}</div>                
                <div v-if="item.diff == 0">{{ item.diff }}</div>
              </template>
            </v-data-table>
          </v-card>
        </div>

        <div class="col-md-10" style="background-color:yellow">graph here</div>
      </div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="dialog = false">Đóng</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialogControl: Number,
    info: {
      deviceID: String,
      area: String,
      name: String
    },
    dataTable: {
      time: String,
      value: Number,
      diff: Number
    }
  },
  watch: {
    dialogControl: function(newValue) {
      let that = this;
      if (newValue) {
        that.$data.dialog = true;
      }
    }
  },
  data() {
    return {
      dialog: false,
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
          value: "value"
        },
        {
          text: "Trạng thái",
          align: "center",
          width: 150,
          value: "diff"
        }
      ]
    };
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

</style>