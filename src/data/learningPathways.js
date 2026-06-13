export const learningPathways = {
  gita_basics: {
    id: "gita_basics",
    title: "Introduction to Bhagavad Gita",
    totalDays: 7,
    lessons: [
      {
        day: 1,
        title: "The Battlefield of the Mind",
        content: "The Bhagavad Gita opens on the battlefield of Kurukshetra. But many scholars interpret this battlefield as an allegory for the human mind. Arjuna represents the individual soul, paralyzed by doubt and ethical dilemmas. Krishna represents the Supreme Consciousness or the inner guide. The first lesson of the Gita is acknowledging our internal conflicts rather than running away from them."
      },
      {
        day: 2,
        title: "The Nature of the Soul (Atman)",
        content: "Krishna teaches that the soul (Atman) is eternal. 'Weapons cannot shred the soul, nor can fire burn it. Water cannot wet it, nor can the wind dry it.' Understanding this helps alleviate the fear of death and failure, giving us the courage to perform our duties without anxiety."
      },
      {
        day: 3,
        title: "Karma Yoga (The Path of Action)",
        content: "Karma Yoga is the central pillar of the Gita's practical philosophy. 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.' This means we must give 100% effort to our work, but detach ourselves from the success or failure of the outcome. This detachment leads to peace of mind."
      },
      {
        day: 4,
        title: "Bhakti Yoga (The Path of Devotion)",
        content: "Bhakti is the path of pure love and devotion. Krishna says that a leaf, a flower, fruit, or water offered with true devotion is accepted by the Divine. It emphasizes that the purity of intention matters far more than the grandeur of the ritual."
      },
      {
        day: 5,
        title: "Jnana Yoga (The Path of Knowledge)",
        content: "Jnana Yoga is the pursuit of true wisdom—understanding the difference between the temporary body and the eternal soul. It requires deep contemplation, study, and the cultivation of a steady intellect (Sthita Prajna)."
      },
      {
        day: 6,
        title: "The Three Gunas (Modes of Nature)",
        content: "Everything in nature is made of three qualities (Gunas): Sattva (goodness, purity, harmony), Rajas (passion, activity, restlessness), and Tamas (ignorance, lethargy, darkness). Spiritual growth involves moving from Tamas to Rajas, from Rajas to Sattva, and ultimately transcending all three."
      },
      {
        day: 7,
        title: "Surrender and Liberation (Moksha)",
        content: "The ultimate teaching of the Gita culminates in complete surrender (Sharanagati). 'Abandon all varieties of dharmas and simply surrender unto Me alone. I shall liberate you from all sinful reactions. Do not fear.' Liberation (Moksha) is achieved when the ego dissolves into the Divine will."
      }
    ]
  }
};

export const getLearningPathway = (id) => learningPathways[id];
