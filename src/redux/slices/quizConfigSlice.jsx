import { createSlice } from '@reduxjs/toolkit';

const quizConfigSlice = createSlice({
  name: 'quizConfig',
  initialState: {
    numQuestions: 5,
    category: 'sports',
    difficulty: 'easy',
    time: 1,
    type: 'multiple-choice',
  },
  reducers: {
    setQuizConfig: (state, action) => {
      return { ...state, ...action.payload };
    },
    // updateNumQuestions: (state, action) => {
    //   state.numQuestions = action.payload;
    // },
    // updateCategory: (state, action) => {
    //   state.category = action.payload;
    // },
    // updateDifficulty: (state, action) => {
    //   state.difficulty = action.payload;
    // },
    // updateTime: (state, action) => {
    //   state.time = action.payload;
    // },
    // updateType: (state, action) => {
    //   state.type = action.payload;
    // },
  },
});

export const { setQuizConfig } = quizConfigSlice.actions;
export default quizConfigSlice.reducer;
