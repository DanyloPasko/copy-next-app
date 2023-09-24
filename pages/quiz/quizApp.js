import React, { useState, useEffect } from 'react';
import styles from '../../styles/quiz.module.css';
import Head from "next/head";


export default function QuizApp({questions}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerClick = (selectedOptionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedOptionIndex;
    setUserAnswers(newAnswers);
    sessionStorage.setItem('userAnswers', JSON.stringify(newAnswers));
  };

  const handleQuestionClick = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handleFinishTest = () => {
    const newScore = userAnswers.reduce(
      (totalScore, answer, index) =>
        answer === questions[index].correctAnswer ? totalScore + 1 : totalScore,
      0
    );
    setScore(newScore);
    setShowResult(true);
    sessionStorage.removeItem('userAnswers'); 
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setUserAnswers(Array(questions.length).fill(null));
  };

  useEffect(() => {
    const savedQuestionIndex = sessionStorage.getItem('currentQuestion');
    const savedUserAnswers = sessionStorage.getItem('userAnswers');

    if (savedQuestionIndex !== null && savedUserAnswers !== null) {
      setCurrentQuestion(parseInt(savedQuestionIndex, 10));
      setUserAnswers(JSON.parse(savedUserAnswers));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('currentQuestion', currentQuestion);
  }, [currentQuestion]);

  return (
    <>
    <Head>
        <title>Quiz</title>
      </Head>
    <div className={styles.container}>
      {showResult ? (
        <div className={styles.result}>
          <h2>Результат:</h2>
          <p>
            Вы правильно відповіли на {score} з {questions.length} питань
          </p>
          <button className={styles['enter']} onClick={resetQuiz}>Почати знову</button>
        </div>
      ) : (
        <div className={styles.question}>
          <h2>Питання {currentQuestion + 1} з {questions.length}:</h2>
          {questions.length > 0 ? (
            <p>{questions[currentQuestion].question}</p>
          ) : (
            <p>Завантаження...</p>
          )}
          <ul className={styles['answers']}>
            {questions.length > 0 &&
              questions[currentQuestion].options.map((option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type="checkbox"
                      checked={userAnswers[currentQuestion] === index}
                      onChange={() => handleAnswerClick(index)}
                    />
                    {option}
                  </label>
                </li>
              ))}
          </ul>
          {currentQuestion === questions.length - 1 ? (
            <button className={styles['enter']} onClick={handleFinishTest}>Завершити тест</button>
          ) : (
            <button className={styles['enter']} onClick={() => setCurrentQuestion(currentQuestion + 1)}>Далі</button>
          )}
        </div>
      )}
      {!showResult && (
        <div className={styles['question-list']}>
          <h3>Список питань:</h3>
          <div className={styles['questions-list']}>
            {questions.length > 0 &&
              questions.map((_, index) => (
                <button
                  key={index}
                  className={currentQuestion === index ? styles['active'] : styles['custom']}
                  onClick={() => handleQuestionClick(index)}
                >
                  {index + 1}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
    </>
    
  );
}



export const getStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.API_HOST}/Questions/`);
    const data = await response.json();

    return {
      props: {
        questions: data,
      },
    };
  } catch (error) {
    console.error('Помилка при отриманні запиту', error);
    return {
      props: {
        questions: [],
      },
    };
  }
};


