import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setQuizQuestions } from '../redux/slices/quizQuestionsSlice';
import styled from 'styled-components';
import he from 'he';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 18px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuizConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    numQuestions: 5,
    category: '9', // Default category ID for General Knowledge
    difficulty: 'easy',
    time: 1,
    type: 'multiple',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate('/quiz');
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Label>
            Number of Questions:
            <Input type="number" name="numQuestions" value={config.numQuestions} onChange={handleChange} min="5" max="15" />
          </Label>
          <Label>
            Category:
            <Select name="category" value={config.category} onChange={handleChange}>
              <option value="9">General Knowledge</option>
              <option value="21">Sports</option>
              <option value="17">Science & Nature</option>
              <option value="11">Entertainment: Film</option>
            </Select>
          </Label>
          <Label>
            Difficulty:
            <Select name="difficulty" value={config.difficulty} onChange={handleChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </Label>
          <Label>
            Type:
            <Select name="type" value={config.type} onChange={handleChange}>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True/False</option>
            </Select>
          </Label>
          <Label>
            Time:
            <Select name="time" value={config.time} onChange={handleChange}>
              <option value="1">1 Minute</option>
              <option value="2">2 Minutes</option>
              <option value="5">5 Minutes</option>
            </Select>
          </Label>
          <Button type="submit">Start Quiz</Button>
          <Button style={{backgroundColor: 'green'}} onClick={() => navigate('/stats')}>See Stats</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default QuizConfig;
