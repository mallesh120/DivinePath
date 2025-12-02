// Ashtottara Shatanamavali (108 Names) of Hindu Deities
// Data source: https://www.drikpanchang.com/deities-namavali/deities-ashtottara-shatanamavali.html

// Import all deity ashtottarams
import { vishnuAshtottaram } from './vishnu-ashtottaram.js';
import { shivaAshtottaram } from './shiva-ashtottaram.js';
import { krishnaAshtottaram } from './krishna-ashtottaram.js';
import { ramaAshtottaram } from './rama-ashtottaram.js';
import { hanumanAshtottaram } from './hanuman-ashtottaram.js';
import { ganeshaAshtottaram } from './ganesha-ashtottaram.js';
import { brahmaAshtottaram } from './brahma-ashtottaram.js';
import { kartikeyaAshtottaram } from './kartikeya-ashtottaram.js';
import { narasimhaAshtottaram } from './narasimha-ashtottaram.js';
import { kuberAshtottaram } from './kuber-ashtottaram.js';
import { satyanarayanAshtottaram } from './satyanarayan-ashtottaram.js';
import { hayagrivaAshtottaram } from './hayagriva-ashtottaram.js';
import { bhairavaAshtottaram } from './bhairava-ashtottaram.js';
import { muruganAshtottaram } from './murugan-ashtottaram.js';

import { lakshmiAshtottaram } from './lakshmi-ashtottaram.js';
import { durgaAshtottaram } from './durga-ashtottaram.js';
import { saraswatiAshtottaram } from './saraswati-ashtottaram.js';
import { radhaAshtottaram } from './radha-ashtottaram.js';
import { sitaAshtottaram } from './sita-ashtottaram.js';
import { gangaAshtottaram } from './ganga-ashtottaram.js';
import { lalitaAshtottaram } from './lalita-ashtottaram.js';
import { tulasiAshtottaram } from './tulasi-ashtottaram.js';

/**
 * Complete collection of Ashtottara Shatanamavali (108 Names) for Hindu Deities
 * 
 * Structure:
 * - 14 Gods (Male Deities)
 * - 8 Goddesses (Female Deities)
 * 
 * Total: 22 Deities, each with 108 sacred names
 */
export const ashtottaramData = {
  // ========================================
  // GODS (Male Deities)
  // ========================================
  
  // The Supreme Trinity (Trimurti)
  vishnu: vishnuAshtottaram,
  shiva: shivaAshtottaram,
  brahma: brahmaAshtottaram,
  
  // Major Avatars & Forms
  krishna: krishnaAshtottaram,
  rama: ramaAshtottaram,
  narasimha: narasimhaAshtottaram,
  
  // Sons of Shiva & Parvati
  ganesha: ganeshaAshtottaram,
  kartikeya: kartikeyaAshtottaram,
  murugan: muruganAshtottaram, // Tamil name for Kartikeya
  
  // Devotees & Servants
  hanuman: hanumanAshtottaram,
  
  // Specialized Deities
  kuber: kuberAshtottaram,        // God of Wealth
  satyanarayan: satyanarayanAshtottaram, // Form of Vishnu
  hayagriva: hayagrivaAshtottaram,  // Horse-headed avatar of Vishnu
  bhairava: bhairavaAshtottaram,    // Fierce form of Shiva
  
  // ========================================
  // GODDESSES (Female Deities)
  // ========================================
  
  // Consorts of Trinity
  lakshmi: lakshmiAshtottaram,      // Consort of Vishnu
  saraswati: saraswatiAshtottaram,  // Consort of Brahma
  durga: durgaAshtottaram,          // Form of Parvati (Shiva's consort)
  
  // Divine Consorts & Companions
  radha: radhaAshtottaram,          // Consort of Krishna
  sita: sitaAshtottaram,            // Consort of Rama
  
  // Nature & Sacred Goddesses
  ganga: gangaAshtottaram,          // Goddess of the Ganges River
  tulasi: tulasiAshtottaram,        // Sacred Plant Goddess
  
  // Powerful Goddesses
  lalita: lalitaAshtottaram         // Goddess of Bliss
};

/**
 * Get all deity IDs
 * @returns {string[]} Array of all deity IDs
 */
export const getAllDeityIds = () => Object.keys(ashtottaramData);

/**
 * Get deity data by ID
 * @param {string} deityId - The deity identifier
 * @returns {Object|null} Deity ashtottaram data or null if not found
 */
export const getDeityById = (deityId) => ashtottaramData[deityId] || null;

/**
 * Get ashtottaram by ID (alias for getDeityById for backward compatibility)
 * @param {string} id - The deity identifier
 * @returns {Object|null} Deity ashtottaram data or null if not found
 */
export const getAshtottaramById = (id) => ashtottaramData[id] || null;

/**
 * Get list of all ashtottarams with summary info
 * @returns {Object[]} Array of deity summaries
 */
export const getAshtottaramList = () => {
  return Object.values(ashtottaramData).map(deity => ({
    id: deity.id,
    title: deity.title,
    description: deity.description,
    image: deity.image,
    category: deity.category,
    namesCount: deity.names.length
  }));
};

/**
 * Get all gods (male deities)
 * @returns {Object} Object containing all god ashtottarams
 */
export const getAllGods = () => {
  const gods = {};
  Object.entries(ashtottaramData).forEach(([id, deity]) => {
    if (deity.category === 'god') {
      gods[id] = deity;
    }
  });
  return gods;
};

/**
 * Get all goddesses (female deities)
 * @returns {Object} Object containing all goddess ashtottarams
 */
export const getAllGoddesses = () => {
  const goddesses = {};
  Object.entries(ashtottaramData).forEach(([id, deity]) => {
    if (deity.category === 'goddess') {
      goddesses[id] = deity;
    }
  });
  return goddesses;
};

/**
 * Search deities by name or description
 * @param {string} query - Search query
 * @returns {Object[]} Array of matching deities
 */
export const searchDeities = (query) => {
  const lowerQuery = query.toLowerCase();
  return Object.values(ashtottaramData).filter(deity => 
    deity.title.toLowerCase().includes(lowerQuery) ||
    deity.description.toLowerCase().includes(lowerQuery) ||
    deity.id.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get random deity
 * @returns {Object} Random deity ashtottaram
 */
export const getRandomDeity = () => {
  const deityIds = getAllDeityIds();
  const randomId = deityIds[Math.floor(Math.random() * deityIds.length)];
  return ashtottaramData[randomId];
};

/**
 * Get deity count
 * @returns {{total: number, gods: number, goddesses: number}} Deity counts
 */
export const getDeityCount = () => {
  const gods = Object.values(ashtottaramData).filter(d => d.category === 'god');
  const goddesses = Object.values(ashtottaramData).filter(d => d.category === 'goddess');
  
  return {
    total: Object.keys(ashtottaramData).length,
    gods: gods.length,
    goddesses: goddesses.length
  };
};

export default ashtottaramData;
