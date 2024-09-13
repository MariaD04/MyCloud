import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './App.css'
import { store } from './store/index.jsx'

createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
