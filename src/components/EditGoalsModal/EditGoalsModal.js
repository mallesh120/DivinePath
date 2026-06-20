import React, { useState } from 'react';
import './EditGoalsModal.css';

const EditGoalsModal = ({ isOpen, onClose, customGoals, addCustomGoal, removeCustomGoal }) => {
  const [newGoalText, setNewGoalText] = useState('');

  if (!isOpen) return null;

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      addCustomGoal(newGoalText.trim());
      setNewGoalText('');
    }
  };

  return (
    <div className="meditation-overlay">
      <div className="meditation-modal glass-panel edit-goals-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2 className="meditation-title">Customize Sadhana</h2>
        <p className="meditation-subtitle">Add your own daily spiritual habits.</p>
        
        <div className="custom-goals-list">
          {customGoals.length === 0 ? (
            <p className="no-custom-goals">No custom goals added yet.</p>
          ) : (
            customGoals.map(goal => (
              <div key={goal} className="custom-goal-item">
                <span>{goal}</span>
                <button 
                  className="remove-goal-btn" 
                  onClick={() => removeCustomGoal(goal)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleAddGoal} className="add-goal-form">
          <input
            type="text"
            className="add-goal-input"
            placeholder="e.g., Read 1 chapter of Gita"
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
          />
          <button type="submit" className="add-goal-btn" disabled={!newGoalText.trim()}>
            Add Goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGoalsModal;
