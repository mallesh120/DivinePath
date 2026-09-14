import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { kidsQuizzes } from '../../../data/kids/quizzes';
import { motion, AnimatePresence } from 'framer-motion';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import './KidsTriviaGame.css';

const KidsTriviaGame = () => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const { playClick, playSuccess, playError } = useSoundEffects();
  const { awardStars } = useSadhana(true);

  const quiz = kidsQuizzes.find(q => q.id === selectedQuizId);

  const handleSelectQuiz = (quizId) => {
    try { playClick(); } catch (e) {}
    setSelectedQuizId(quizId);
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedOption(null);
    setIsFinished(false);
  };

  const handleOptionClick = (idx) => {
    if (showExplanation) return;

    setSelectedOption(idx);
    setShowExplanation(true);

    const question = quiz.questions[currentQuestionIdx];
    if (idx === question.correctAnswerIndex) {
      setScore(s => s + 1);
      try { playSuccess(); } catch (e) {}
    } else {
      try { playError(); } catch (e) {}
    }
  };

  const nextQuestion = () => {
    try { playClick(); } catch (e) {}
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx(c => c + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      // Finished quiz! Award stars
      awardStars(1);
      try { playSuccess(); } catch (e) {}
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    try { playClick(); } catch (e) {}
    setCurrentQuestionIdx(0);
    setScore(0);
    setShowExplanation(false);
    setSelectedOption(null);
    setIsFinished(false);
  };

  // If no quiz is selected, show Quiz Topic Picker
  if (!quiz) {
    return (
      <KidsPageTransition>
        <div className="trivia-hub-container">
          <div className="trivia-hub-header">
            <Link to="/kids/games" className="back-games-link" onClick={() => { try { playClick(); } catch (e) {} }}>
              ◀ Games Hub
            </Link>
            <h2>🧠 Divine Trivia Quizzes</h2>
            <p>Select a quiz topic and test your knowledge!</p>
          </div>

          <div className="quiz-selection-grid">
            {kidsQuizzes.map((q, idx) => (
              <motion.div
                key={q.id}
                className="quiz-selection-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                onClick={() => handleSelectQuiz(q.id)}
              >
                <div className="quiz-card-icon">{q.coverEmoji}</div>
                <div className="quiz-card-info">
                  <span className="quiz-category-badge">{q.category}</span>
                  <h3>{q.title}</h3>
                  <p>{q.description}</p>
                  <div className="quiz-card-meta">
                    <span>❓ {q.questions.length} Questions</span>
                    <span className="quiz-star-tag">⭐ +1 Star</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </KidsPageTransition>
    );
  }

  // Finished Screen
  if (isFinished) {
    const isPerfect = score === quiz.questions.length;

    return (
      <KidsPageTransition>
        <div className="trivia-container finished">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="score-card"
          >
            <div className="finish-trophy">{isPerfect ? '🏆' : '🌟'}</div>
            <h2>{isPerfect ? 'Magnificent Job!' : 'Great Effort!'}</h2>
            <p className="score-summary-text">
              You scored <strong>{score}</strong> out of <strong>{quiz.questions.length}</strong> on <strong>{quiz.title}</strong>!
            </p>
            <div className="star-reward-badge">
              <span>⭐ +1 Dharma Star Awarded!</span>
            </div>
            <div className="finish-btn-group">
              <button onClick={restartQuiz} className="action-btn play-again">
                🔄 Play Again
              </button>
              <button onClick={() => setSelectedQuizId(null)} className="action-btn pick-another">
                📚 Other Quizzes
              </button>
            </div>
          </motion.div>
        </div>
      </KidsPageTransition>
    );
  }

  const question = quiz.questions[currentQuestionIdx];

  return (
    <KidsPageTransition>
      <div className="trivia-container">
        <div className="trivia-header">
          <button 
            className="change-quiz-btn" 
            onClick={() => setSelectedQuizId(null)}
          >
            ◀ Change Quiz
          </button>
          <h2 className="quiz-active-title">{quiz.title}</h2>
          <div className="score-badge">⭐ Score: {score}</div>
        </div>

        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentQuestionIdx + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>

        <div className="question-card">
          <span className="question-counter">Question {currentQuestionIdx + 1} of {quiz.questions.length}</span>
          <h3 className="question-text">{question.question}</h3>
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
              <motion.button 
                key={idx} 
                className={btnClass}
                onClick={() => handleOptionClick(idx)}
                disabled={showExplanation}
                whileTap={{ scale: showExplanation ? 1 : 0.97 }}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-label">{opt}</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div 
              className="explanation-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <div className="explanation-header">
                <span className="explanation-icon">
                  {selectedOption === question.correctAnswerIndex ? '🎉 Spot on!' : '💡 Good Try!'}
                </span>
              </div>
              <p className="explanation-text">{question.explanation}</p>
              <button className="next-question-btn" onClick={nextQuestion}>
                {currentQuestionIdx < quiz.questions.length - 1 ? 'Next Question ▶' : 'See Results 🏆'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </KidsPageTransition>
  );
};

export default KidsTriviaGame;
