// store.jsx
import { configureStore, } from '@reduxjs/toolkit';
import quizConfigReducer from './slices/quizConfigSlice';
import quizQuestionsReducer from './slices/quizQuestionsSlice';
import quizStatsReducer from './slices/quizStatsSlice';
import {thunk} from 'redux-thunk'; 

const store = configureStore({
    reducer: {
        quizConfig: quizConfigReducer,
        quizQuestions: quizQuestionsReducer,
        quizStats: quizStatsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
