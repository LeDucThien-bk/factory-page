<template>
<v-app>
    <v-app-bar app color="#173D6A" height="56px">
        <v-app-bar-nav-icon id="navbarText" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title id="navbarText">{{navbartitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" fixed color="#173D6A" width="280px">
        <v-img id="sidebarLogo" :src="require('./assets/logo-sidebar.png')" contain></v-img>

        <v-divider></v-divider>

        <!-- Hard-coded list, should be fixed later -->
        <v-list dark>
            <v-list-item to="/factoryOverwatch">
                <v-list-item-icon>
                    <v-icon>account_balance</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Giám sát nhà máy</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-group prepend-icon="signal_cellular_alt" no-action>
                <template v-slot:activator>
                    <v-list-item-title>Báo cáo - Biểu đồ</v-list-item-title>
                </template>

                <v-list-item to="/reportPressure">
                    <v-list-item-content>
                        <v-list-item-title>Áp lực lưu lượng</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/reportDetail">
                    <v-list-item-content>
                        <v-list-item-title>Chi tiết vận hành</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>

            <v-list-item to="/deviceSetting">
                <v-list-item-icon>
                    <v-icon>build</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Cấu hình thiết bị</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-img id="sidebarWave" :src="require('./assets/wave-sidebar.svg')" contain></v-img>
    </v-navigation-drawer>
    <v-content>
        <router-view></router-view>
    </v-content>
</v-app>
</template>

<script>
export default {
    name: "App",

    components: {},
    mounted() {
        this.$data.navbartitle = this.$router.history.current.meta.title;
    },
    watch: {
        $route(to) {
            // document.title = to.meta.title || "Quản lý nhà máy";
            this.$data.navbartitle = to.meta.title || "Quản lý nhà máy";
        }
    },

    data() {
        return {
            drawer: null,
            navbartitle: ""
        };
    },
    methods: {}
};
</script>

<style scoped>
#sidebarLogo {
    margin: 15px;
}

#navbarText {
    color: white;
    font-weight: bold;
}

#sidebarWave {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0.2;
}
</style>
