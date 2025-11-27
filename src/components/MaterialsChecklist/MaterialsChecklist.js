import React, { useState, useEffect } from 'react';
import { getAllMaterialsForPuja } from '../../data/pujasData';
import './MaterialsChecklist.css';

const MaterialsChecklist = ({ puja }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const allMaterials = getAllMaterialsForPuja(puja.id);
  
  useEffect(() => {
    // Load checked items from localStorage
    const saved = localStorage.getItem(`puja_${puja.id}_materials`);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, [puja.id]);

  useEffect(() => {
    // Save checked items to localStorage
    localStorage.setItem(`puja_${puja.id}_materials`, JSON.stringify(checkedItems));
  }, [checkedItems, puja.id]);

  const toggleItem = (item) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter(i => i !== item));
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  const checkAll = () => {
    setCheckedItems(allMaterials);
  };

  const uncheckAll = () => {
    setCheckedItems([]);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      deity: '🕉️',
      flowers: '🌸',
      offerings: '🍽️',
      puja_items: '🪔',
      additional: '✨'
    };
    return icons[category] || '📋';
  };

  const getCategoryName = (category) => {
    const names = {
      deity: 'Deity Items',
      flowers: 'Flowers & Decorations',
      offerings: 'Offerings & Food',
      puja_items: 'Puja Items',
      additional: 'Additional Items'
    };
    return names[category] || category;
  };

  const totalItems = allMaterials.length;
  const checkedCount = checkedItems.length;
  const progressPercent = totalItems > 0 ? ((checkedCount / totalItems) * 100).toFixed(0) : 0;

  return (
    <div className="materials-checklist">
      <div className="checklist-header">
        <div className="progress-info">
          <div className="progress-label">
            <span className="progress-count">{checkedCount} of {totalItems}</span>
            <span className="progress-percent">{progressPercent}%</span>
          </div>
          <div className="progress-bar-mini">
            <div 
              className="progress-fill-mini" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        <div className="checklist-actions">
          <button 
            className="action-btn check-all-btn" 
            onClick={checkAll}
            disabled={checkedCount === totalItems}
          >
            ✓ All
          </button>
          <button 
            className="action-btn uncheck-all-btn" 
            onClick={uncheckAll}
            disabled={checkedCount === 0}
          >
            ✗ Clear
          </button>
        </div>
      </div>

      <div className="materials-categories">
        {Object.entries(puja.materials).map(([category, items]) => (
          <div key={category} className="material-category">
            <h4 className="category-title">
              <span className="category-icon">{getCategoryIcon(category)}</span>
              {getCategoryName(category)}
            </h4>
            <ul className="materials-list">
              {items.map((item, idx) => {
                const isChecked = checkedItems.includes(item);
                return (
                  <li 
                    key={idx} 
                    className={`material-item ${isChecked ? 'checked' : ''}`}
                    onClick={() => toggleItem(item)}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(item)}
                      className="material-checkbox"
                    />
                    <span className="material-name">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {checkedCount === totalItems && totalItems > 0 && (
        <div className="completion-message">
          <span className="completion-icon">✨</span>
          <span className="completion-text">All materials ready!</span>
        </div>
      )}
    </div>
  );
};

export default MaterialsChecklist;
