// QuizStats.jsx
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import {useNavigate} from 'react-router-dom';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);



const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    justify-content: center;
`;

const ChartContainer = styled.div`
    width: 600px;
    margin: 20px 0;
`;


const ButtonContainer = styled.div`
    position: absolute;
    left: 20px;
    top: 20px;
`;

const NewQuizButton = styled.button`
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    position: fixed;
`;

const QuizStats = () => {
    const quizStats = useSelector(state => state.quizStats.quizes);
    const correctAnswersSum = quizStats.map(quiz => quiz.score).reduce((a, b) => a +b, 0);
    const incorrectAnswersSum = quizStats.map(quiz => quiz.numberOfQuestions - quiz.score).reduce((a, b) => a + b, 0);

    const chartLabels = quizStats.map((_, i) => `Quiz-${i+1}`)
    console.log(chartLabels);
    const navigate = useNavigate();

    const barData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Score',
                data: quizStats.map(quiz => quiz.score),
                backgroundColor: 'red',
                borderWidth: 2,
            },
            {   
                label: 'Question',
                data: quizStats.map(quiz => quiz.numberOfQuestions),
                backgroundColor: 'blue',
                borderWidth: 2,
            },
        ]
    }

    const barOptions = {
        scales: {
          y: {
            min: 0,
            max: 15,
            ticks: {
              stepSize: 3, // Optional: Set the step size of ticks
            },
          },
        },
    };

    const lineData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Quizzes Score %',
                backgroundColor: 'blue',
                borderColor: 'rgba(re,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: quizStats.map(quiz => (100 * quiz.score / quiz.numberOfQuestions).toFixed(2)),
            }
        ]
    }

    const lineOptions = {
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 1, // Optional: Set the step size of ticks
            },
          },
        },
      };

    const doughnutData = {
        labels: ['Correct Answers', 'Incorrect Answers'],
        datasets: [
            {
                data: [correctAnswersSum, incorrectAnswersSum],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['blue','red'],
            }
        ]
    }

    const handleNewQuiz = () => {
        navigate('/');
    }

    return (
        <Container>
            <ButtonContainer>
                <NewQuizButton onClick={handleNewQuiz}>Take New Quiz</NewQuizButton>
            </ButtonContainer>
            <h2>Quiz Charts</h2>
            <ChartContainer>
                <Bar data={barData} options={barOptions} />
            </ChartContainer>
            <ChartContainer>
                <Line data={lineData} options={lineOptions} />
            </ChartContainer>
            <ChartContainer>
                <Doughnut data={doughnutData} />
            </ChartContainer>
        </Container>
    );
};

export default QuizStats;
