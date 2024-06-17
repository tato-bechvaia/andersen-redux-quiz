import { configureStore} from '@reduxjs/toolkit';
import quizConfigReducer from './slices/quizConfigSlice';
import quizQuestionsReducer from './slices/quizQuestionsSlice';
import quizStatsReducer from './slices/quizStatsSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk'; 

const quizStatsPersistConfig = {
    key: 'quizStats',
    storage,
};

const persistedQuizStatsReducer = persistReducer(quizStatsPersistConfig, quizStatsReducer);

const store = configureStore({
    reducer: {
        quizConfig: quizConfigReducer,
        quizQuestions: quizQuestionsReducer,
        quizStats: persistedQuizStatsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
