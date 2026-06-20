import React, { useState } from 'react';
import { kidsQuizzes } from '../../../data/kids/quizzes';
import { motion, AnimatePresence } from 'framer-motion';
import useSoundEffects from '../../../hooks/useSoundEffects';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import './KidsTriviaGame.css';

const KidsTriviaGame = () => {
  const quiz = kidsQuizzes[0]; // Load the first quiz
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const { playClick, playSuccess, playError } = useSoundEffects();

  const question = quiz.questions[currentQuestionIdx];

  const handleOptionClick = (idx) => {
    if (showExplanation) return; // Prevent clicking again

    playClick();
    setSelectedOption(idx);
    setShowExplanation(true);

    if (idx === question.correctAnswerIndex) {
      setScore(s => s + 1);
      playSuccess();
    } else {
      playError();
    }
  };

  const nextQuestion = () => {
    playClick();
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx(c => c + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    playClick();
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedOption(null);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <KidsPageTransition>
        <div className="trivia-container finished">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="score-card"
          >
            <h1>🏆 Great Job! 🏆</h1>
            <p>You scored {score} out of {quiz.questions.length}!</p>
            <button onClick={restart} className="action-btn">Play Again</button>
          </motion.div>
        </div>
      </KidsPageTransition>
    );
  }

  return (
    <KidsPageTransition>
      <div className="trivia-container">
        <div className="trivia-header">
        <h2>{quiz.title}</h2>
        <div className="score-badge">⭐ Score: {score}</div>
      </div>

      <div className="question-card">
        <h3>Question {currentQuestionIdx + 1}</h3>
        <p className="question-text">{question.question}</p>
      </div>

      <div className="options-grid">
        {question.options.map((opt, idx) => {
          let btnClass = "option-btn";
          if (showExplanation) {
            if (idx === question.correctAnswerIndex) btnClass += " correct";
            else if (idx === selectedOption) btnClass += " wrong";
            else btnClass += " disabled";
          }

          return (
            <button 
              key={idx} 
              className={btnClass}
              onClick={() => handleOptionClick(idx)}
              disabled={showExplanation}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div 
            className="explanation-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="explanation-icon">
              {selectedOption === question.correctAnswerIndex ? '🎉 Correct!' : '💡 Good Try!'}
            </div>
            <p>{question.explanation}</p>
            <button className="next-btn" onClick={nextQuestion}>
              {currentQuestionIdx < quiz.questions.length - 1 ? 'Next Question ▶' : 'Finish Quiz'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </KidsPageTransition>
  );
};

export default KidsTriviaGame;
