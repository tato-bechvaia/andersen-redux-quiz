import { createSlice } from "@reduxjs/toolkit";

const quizStatsReducer = createSlice({
    name: 'quizStats',
    initialState: {
        quizes: [], // array of objects with {score, numberOfQuestions}, 
        // quizes should contain only last 8 quiz.
    },
    reducers: {
        addQuizStat: (state, action) => {
            if(state.quizes.length === 8){
                state.quizes.shift();
            }
            state.quizes.push(action.payload);
        },
    }
});

export const {addQuizStat} = quizStatsReducer.actions;
export default quizStatsReducer.reducer;
