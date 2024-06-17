import axios from 'axios';
import { setQuizQuestions } from '../redux/slices/quizQuestionsSlice';
import he from 'he';

export const fetchQuizQuestions = (config) => async (dispatch) => {
    try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${config.numQuestions}&category=${config.category}&difficulty=${config.difficulty}&type=${config.type}`);
        const { results } = response.data;
        const formattedQuestions = results.map((question, index) => ({
            id: index,
            question: he.decode(question.question),
            options: [...question.incorrect_answers.map(answer => he.decode(answer)), he.decode(question.correct_answer)].sort(),
            answer: he.decode(question.correct_answer),
        }));
        dispatch(setQuizQuestions(formattedQuestions));
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
    }
};
