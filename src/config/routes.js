import reportPressure from '../components/ReportPressure.vue';
import reportDetail from '../components/ReportDetail.vue';

const routes = [
    {   path: "/",
        redirect: "/reportPressure"
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
    {
        path: "*",
        redirect: "/reportPressure"
    }
]

export default routes;