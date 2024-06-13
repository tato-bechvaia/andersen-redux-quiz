import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAnswer } from '../redux/slices/quizQuestionsSlice';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  flex-direction: column;
  gap: 20px;
`;

const Timer = styled.div`
  position: absolute;
  top: 10px;
  font-size: 24px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #007bff;
  border: 3px solid #007bff;
  border-radius: 50%;
`;

const QuestionIndicator = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const QuestionCard = styled.div`
  background: linear-gradient(135deg, #FFD54F, #FFB74D);
  border: 2px solid #007bff;
  border-radius: 10px;
  padding: 20px;
  width: 600px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? 'lightgreen' : 'white')};
  border: 1px solid #007bff;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? 'lightgreen' : '#f0f0f0')};
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin-top: 20px;
`;

const NavigationButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${({ isFinal }) => (isFinal ? '#28a745' : '#007bff')};
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isFinal }) => (isFinal ? '#218838' : '#0056b3')};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const FinishButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  padding: 20px;
  z-index: 1000;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  background-color: ${({ cancel }) => (cancel ? '#dc3545' : '#28a745')};
  color: white;

  &:hover {
    background-color: ${({ cancel }) => (cancel ? '#c82333' : '#218838')};
  }
`;

const QuestionNumbers = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QuestionNumberButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ answered }) => (answered ? '#28a745' : '#f0f0f0')};
  color: ${({ answered }) => (answered ? 'white' : '#007bff')};
  cursor: pointer;
  border: 2px solid #007bff;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ answered }) => (answered ? '#218838' : '#e0e0e0')};
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizQuestions = useSelector(state => state.quizQuestions.questions);
  const time = useSelector(state => state.quizConfig.time);
  const answers = useSelector(state => state.quizQuestions.answers);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(time * 60);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(countdown);
          navigate('/results');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [navigate, time]);

  const handleAnswer = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    if(currentQuestionIndex === quizQuestions.length - 1){
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    navigate('/');
  };

  const handleFinish = () => {
    setShowFinishModal(true);
  };
  
  const handleConfirmFinish = () => {
    navigate('/results');
  };
  
  return (
    quizQuestions.length !== 0 ? (<Container>
       {showFinishModal && (
        <>
          <Backdrop />
          <Modal>
            <h2>Finish Quiz</h2>
            <p>Are you sure you want to finish the quiz?</p>
            <ModalButtonContainer>
              <ModalButton onClick={handleConfirmFinish}>Confirm</ModalButton>
              <ModalButton cancel onClick={() => setShowFinishModal(false)}>Cancel</ModalButton>
            </ModalButtonContainer>
          </Modal>
        </>
      )}
      {showCancelModal && (
        <>
          <Backdrop />
          <Modal>
            <h2>Cancel Quiz</h2>
            <p>Are you sure you want to cancel the quiz?</p>
            <ModalButtonContainer>
              <ModalButton onClick={handleConfirmCancel}>Confirm</ModalButton>
              <ModalButton cancel onClick={() => setShowCancelModal(false)}>Cancel</ModalButton>
            </ModalButtonContainer>
          </Modal>
        </>
      )}

      <Timer>
        {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
      </Timer>
      <QuestionIndicator>
        Question Number {currentQuestionIndex + 1}
      </QuestionIndicator>
      <QuestionCard>
        <h2>{quizQuestions[currentQuestionIndex]?.question}</h2>
        <OptionsContainer>
          {quizQuestions[currentQuestionIndex]?.options.map(option => (
            <OptionButton
              key={option}
              onClick={() => handleAnswer(quizQuestions[currentQuestionIndex].id, option)}
              selected={answers[quizQuestions[currentQuestionIndex].id] === option}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsContainer>
        <NavigationContainer>
          <NavigationButton onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</NavigationButton>
          <NavigationButton 
            onClick={handleNext} 
            isFinal={currentQuestionIndex === quizQuestions.length - 1}
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish' : 'Next'}
          </NavigationButton>
        </NavigationContainer>
      </QuestionCard>
      <NavigationContainer>
        <NavigationButton onClick={handleCancel}>Cancel Quiz</NavigationButton>
        <FinishButton onClick={handleFinish}>Finish Quiz</FinishButton>
      </NavigationContainer>
      <QuestionNumbers>
        {quizQuestions.map((_, index) => (
          <QuestionNumberButton
            key={index}
            answered={answers[index] !== undefined}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {index + 1}
          </QuestionNumberButton>
        ))}
      </QuestionNumbers>
    </Container>) : <>
        No Quiz avaliable now! take new quiz!
    </>
  );
};

export default Quiz;
