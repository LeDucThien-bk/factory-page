import factory from '../components/FactoryOverwatch.vue';
import deviceSetting from '../components/DeviceSettings.vue';
import reportPressure from '../components/ReportPressure.vue';
import reportDetail from '../components/ReportDetail.vue';

const routes = [{
        path: "/",
        redirect: "/factoryOverwatch"
    },
    {
        path: "/factoryOverwatch",
        component: factory,
        name: 'Giám sát nhà máy',
        meta: {
            title: 'Giám Sát Nhà Máy'
        }
    },
    {
        path: "/deviceSetting",
        component: deviceSetting,
        name: 'Cấu hình thiết bị',
        meta: {
            title: 'Cấu Hình Thiết Bị'
        }
    },
    {
        path: "/reportPressure",
        component: reportPressure,
        name: 'Áp lực lưu lượng',
        meta: {
            title: 'Áp Lực Lưu Lượng'
        }
    },
    {
        path: "/reportDetail",
        component: reportDetail,
        name: 'Chi tiết vận hành',
        meta: {
            title: 'Chi Tiết Vận Hành'
        }
    },
]

export default routes;