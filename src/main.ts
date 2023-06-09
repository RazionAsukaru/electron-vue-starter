import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { VueFire } from 'vuefire';
import { firebaseApp } from './firebase/connection';

const app = createApp(App);

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
        // we will see other modules later on
        // VueFireAuth(),
    ],
});

app.mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'));
