import { configureStore } from '@reduxjs/toolkit';

import quizConfigReducer from './slices/quizConfigSlice';
import quizQuestionsReducer from './slices/quizQuestionsSlice';
import quizStatsReducer from './slices/quizStatsSlice';

const store = configureStore({
  reducer: {
    quizConfig: quizConfigReducer,
    quizQuestions: quizQuestionsReducer,
    quizStats: quizStatsReducer
  },
});

export default store;
