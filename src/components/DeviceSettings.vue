<template>
  <v-container class="content" >
    <v-row dense class="input1" v-for="item in items" :key="item">
      <v-col cols="12" md="3">
        <v-text-field dense class="name-input" v-model="item.name" label="Tên giá trị" readonly></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          class="sql-input"
          v-model="item.sqlEntry"
          :rules="nameRules"
          label="Tên trường dữ liệu SQL"
          dense
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="2">
        <v-text-field
          class="unit-input"
          v-model="item.unit"
          :rules="nameRules"
          label="Đơn vị"
          dense
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn id="button" color="primary" @click="sendData()" style="margin-left: 30%">
      Áp Dụng
      <i class="material-icons">send</i>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "DeviceSetting",

  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [v => !!v || "Không được để trống trường này"],
    email: "",
    items: [
      {
        name: "Áp lực lưu lượng",
        sqlEntry: "",
        unit: ""
      },
      {
        name: "Nước bơm vào",
        sqlEntry: "",
        unit: ""
      },
      {
        name: "Nước bơm ra",
        sqlEntry: "",
        unit: ""
      },
      {
        name: "Tổng nước vào",
        sqlEntry: "",
        unit: ""
      },
      {
        name: "Tổng nước ra",
        sqlEntry: "",
        unit: ""
      },
      {
        name: "Điện năng tiêu thụ",
        sqlEntry: "",
        unit: ""
      },
      {
        name: "Hóa chất tiêu thụ",
        sqlEntry: "",
        unit: ""
      },
      {
        name: "Thất thoát vận hành",
        sqlEntry: "",
        unit: ""
      },
      {
        name: "Chất lượng nước",
        sqlEntry: "",
        unit: ""
      },
      {
        name: "Hệ thống hóa chất",
        sqlEntry: "",
        unit: ""
      }
    ]
  }),
  methods: {
    sendData: function() {
      alert("Yike !");
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
.content{
  padding-top: 30px;
  margin-left: 10vw 
}
</style>