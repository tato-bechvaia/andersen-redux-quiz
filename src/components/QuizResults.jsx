import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { resetAnswers, resetQuiz } from '../redux/slices/quizQuestionsSlice';
import { addQuizStat } from '../redux/slices/quizStatsSlice';
import { useState } from 'react';

const CardContainer = styled.div`
  perspective: 1000px;
  width: 400px;
  height: 300px;
  margin: 100px auto;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'none')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 20px;
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(to bottom right, orange, yellow, blue);
  font-size: 24px;
  font-weight: 550;
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(to bottom right, orange, yellow, blue);
  transform: rotateY(180deg);
  font-size: 22px;
  font-weight: 550;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 20px;
`;

const ResultButton = styled.button`
  padding: 8px 25px;
  font-size: 14px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  background-color: ${({ color }) => color === 'green' ? '#28a745' : '#007bff'};

  &:hover {
    background-color: ${({ color }) => color === 'green' ? '#218838' : '#0056b3'};
  }
`;

const QuizResults = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [flipped, setFlipped] = useState(false);
    const quizQuestions = useSelector(state => state?.quizQuestions);
    const userCorrectAnswers = quizQuestions?.questions.filter((quiz, i) => quiz?.answer === quizQuestions?.answers[i]).map(quiz => quiz?.answer);

    const handleFlip = () => setFlipped(!flipped);

    const handleRestartQuiz = () => {
        dispatch(resetAnswers());
        navigate('/quiz');
    };

    const handleTryAnotherQuiz = () => {
        const obj = {
            score: userCorrectAnswers?.length,
            numberOfQuestions: quizQuestions?.questions?.length,
        };
        dispatch(addQuizStat(obj));
        dispatch(resetQuiz());
        navigate('/');
    };

    return (
        <CardContainer>
        <Card flipped={flipped} onClick={handleFlip}>
            <CardFront>Click here to find out your score!</CardFront>
            <CardBack>
                {quizQuestions?.questions?.length !== 0 ? `You scored ${userCorrectAnswers?.length} out of ${quizQuestions?.questions?.length}` : `Nothing to see here yet so take the quiz!`}
                <ButtonContainer>
                    {userCorrectAnswers && <ResultButton color="green" onClick={handleRestartQuiz}>Restart Quiz</ResultButton>}
                    <ResultButton color="blue" onClick={handleTryAnotherQuiz}>New Quiz</ResultButton>
                </ButtonContainer>
            </CardBack>
        </Card>
        </CardContainer>
    );
};

export default QuizResults;
