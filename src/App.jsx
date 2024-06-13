import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import QuizConfig from './components/QuizConfig';
import Quiz from './components/Quiz';
import './index.css';
import QuizResults from './components/QuizResults';
import QuizStats from './components/QuizStats';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<QuizConfig />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<QuizResults />} />
        <Route path="/stats" element={<QuizStats />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
