import factory from '../components/FactoryOverwatch.vue';
import deviceSetting from '../components/DeviceSettings.vue';
import reportPressure from '../components/ReportPressure.vue';
import reportDetail from '../components/ReportDetail.vue';

const routes = [
    {   path: "/",
        redirect: "/factoryOverwatch"
    },
    {   path: "/factoryOverwatch",
        component: factory,
        name: 'Giám sát nhà máy',
        meta: {
            title: 'Giám sát nhà máy'
        }
    },
    {   path: "/deviceSetting",
        component: deviceSetting,
        name: 'Cấu hình thiết bị',
        meta: {
            title: 'Cấu hình thiết bị'
        }
    },   
    {   path: "/reportPressure",
        component: reportPressure,
        name: 'Áp lực lưu lượng',
        meta: {
            title: 'Áp lực lưu lượng'
        }
    }, 
    {   path: "/reportDetail",
        component: reportDetail,
        name: 'Chi tiết vận hành',
        meta: {
            title: 'Chi tiết vận hành'
        }
    },  
]

export default routes;