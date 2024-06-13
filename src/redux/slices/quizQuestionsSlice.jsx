import { createSlice } from '@reduxjs/toolkit';

const quizQuestionsSlice = createSlice({
  name: 'quizQuestions',
  initialState: {
    questions: [],
    answers: {},
  },
  reducers: {
    setQuizQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.answers = {};
    },
    resetAnswers: state => {
      state.answers = {};
    }
  },
});

export const { setQuizQuestions, setAnswer, resetQuiz, resetAnswers } = quizQuestionsSlice.actions;
export default quizQuestionsSlice.reducer;
