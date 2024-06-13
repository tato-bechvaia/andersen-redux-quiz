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
    setQuizConfig: (_, action) => {
      return {...action.payload };
    }
  },
});

export const { setQuizConfig } = quizConfigSlice.actions;
export default quizConfigSlice.reducer;
