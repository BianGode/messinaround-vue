import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faShoppingCart, faTrash, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

/* add icons to the library */
library.add(faShoppingCart, faTrash, faUser, faXmark)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
