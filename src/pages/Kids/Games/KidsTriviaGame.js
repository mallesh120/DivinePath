import React, { useState } from 'react';
import { kidsQuizzes } from '../../../data/kids/quizzes';
import { motion, AnimatePresence } from 'framer-motion';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import ArcadePlayerShell from './ArcadePlayerShell';
import { saveGameHighScore } from './arcadeCatalog';
import './KidsTriviaGame.css';

const KidsTriviaStage = ({ isPaused }) => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [arcadePoints, setArcadePoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const { playClick, playSuccess, playError } = useSoundEffects();
  const { awardStars } = useSadhana(true);

  const quiz = kidsQuizzes.find((q) => q.id === selectedQuizId);

  const handleSelectQuiz = (quizId) => {
    try {
      playClick();
    } catch (e) {}
    setSelectedQuizId(quizId);
    setCurrentQuestionIdx(0);
    setCorrectCount(0);
    setArcadePoints(0);
    setStreak(0);
    setShowExplanation(false);
    setSelectedOption(null);
    setIsFinished(false);
  };

  const handleOptionClick = (idx) => {
    if (isPaused || showExplanation) return;

    setSelectedOption(idx);
    setShowExplanation(true);

    const question = quiz.questions[currentQuestionIdx];
    if (idx === question.correctAnswerIndex) {
      const nextStreak = streak + 1;
      const gained = 100 + (nextStreak - 1) * 25;
      const nextPts = arcadePoints + gained;
      setStreak(nextStreak);
      setCorrectCount((s) => s + 1);
      setArcadePoints(nextPts);
      saveGameHighScore('trivia', nextPts);
      try {
        playSuccess();
      } catch (e) {}
    } else {
      setStreak(0);
      try {
        playError();
      } catch (e) {}
    }
  };

  const nextQuestion = () => {
    try {
      playClick();
    } catch (e) {}
    if (currentQuestionIdx < quiz.questions.length - 1) {
      setCurrentQuestionIdx((c) => c + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      awardStars(1);
      saveGameHighScore('trivia', arcadePoints);
      try {
        playSuccess();
      } catch (e) {}
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    try {
      playClick();
    } catch (e) {}
    setCurrentQuestionIdx(0);
    setCorrectCount(0);
    setArcadePoints(0);
    setStreak(0);
    setShowExplanation(false);
    setSelectedOption(null);
    setIsFinished(false);
  };

  return (
    <div className="trivia-arcade-stage">
      {!quiz ? (
        <div className="trivia-hub-container">
          <div className="trivia-stage-banner">
            <h2>🧠 Choose Your Mythology Quiz Pack</h2>
            <p>Answer questions, build wisdom streaks, and win Dharma Stars!</p>
          </div>

          <div className="quiz-selection-grid">
            {kidsQuizzes.map((q, idx) => (
              <motion.div
                key={q.id}
                className="quiz-selection-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                whileHover={{ y: -4 }}
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
      ) : isFinished ? (
        <div className="trivia-container finished">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="score-card"
          >
            <div className="finish-trophy">
              {correctCount === quiz.questions.length ? '🏆' : '🌟'}
            </div>
            <h2>
              {correctCount === quiz.questions.length
                ? 'Magnificent Champion!'
                : 'Great Effort!'}
            </h2>
            <p className="score-summary-text">
              You answered <strong>{correctCount}</strong> of{' '}
              <strong>{quiz.questions.length}</strong> correctly (
              <strong>{arcadePoints} pts</strong>) on <strong>{quiz.title}</strong>!
            </p>
            <div className="star-reward-badge">
              <span>⭐ +1 Dharma Star Awarded!</span>
            </div>
            <div className="finish-btn-group">
              <button onClick={restartQuiz} className="action-btn play-again">
                🔄 Play Again
              </button>
              <button
                onClick={() => setSelectedQuizId(null)}
                className="action-btn pick-another"
              >
                📚 Other Quiz Packs
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="trivia-container">
          <div className="trivia-header">
            <button
              className="change-quiz-btn"
              onClick={() => setSelectedQuizId(null)}
            >
              ◀ Quiz Packs
            </button>
            <h2 className="quiz-active-title">{quiz.title}</h2>
            <div className="score-badge">
              ⭐ {arcadePoints} pts {streak > 1 ? `• 🔥 ${streak}x` : ''}
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{
                width: `${((currentQuestionIdx + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>

          <div className="question-card">
            <span className="question-counter">
              Question {currentQuestionIdx + 1} of {quiz.questions.length}
            </span>
            <h3 className="question-text">
              {quiz.questions[currentQuestionIdx].question}
            </h3>
          </div>

          <div className="options-grid">
            {quiz.questions[currentQuestionIdx].options.map((opt, idx) => {
              const question = quiz.questions[currentQuestionIdx];
              let btnClass = 'option-btn';
              if (showExplanation) {
                if (idx === question.correctAnswerIndex) btnClass += ' correct';
                else if (idx === selectedOption) btnClass += ' wrong';
                else btnClass += ' disabled';
              }

              return (
                <motion.button
                  key={idx}
                  className={btnClass}
                  onClick={() => handleOptionClick(idx)}
                  disabled={showExplanation}
                  whileTap={{ scale: showExplanation ? 1 : 0.97 }}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="option-label">{opt}</span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                className="explanation-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
              >
                <div className="explanation-header">
                  <span className="explanation-icon">
                    {selectedOption ===
                    quiz.questions[currentQuestionIdx].correctAnswerIndex
                      ? '🎉 Spot on!'
                      : '💡 Good Try!'}
                  </span>
                </div>
                <p className="explanation-text">
                  {quiz.questions[currentQuestionIdx].explanation}
                </p>
                <button className="next-question-btn" onClick={nextQuestion}>
                  {currentQuestionIdx < quiz.questions.length - 1
                    ? 'Next Question ▶'
                    : 'See Results 🏆'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const KidsTriviaGame = () => {
  return (
    <ArcadePlayerShell gameId="trivia">
      {({ isPaused }) => <KidsTriviaStage isPaused={isPaused} />}
    </ArcadePlayerShell>
  );
};

export default KidsTriviaGame;
