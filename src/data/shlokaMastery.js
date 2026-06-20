export const shlokaMastery = {
  week1: {
    id: "week1",
    title: "Shiva Panchakshara Stotram (Verse 1)",
    sanskrit: "नागेन्द्रहाराय त्रिलोचनाय\nभस्माङ्गरागाय महेश्वराय ।\nनित्याय शुद्धाय दिगम्बराय\nतस्मै 'न' काराय नमः शिवाय ॥",
    english: "Nagendra-Haraya Tri-Locanaya\nBhasm-Angga-Ragaya Maheshvaraya |\nNityaya Shuddhaya Dig-Ambaraya\nTasmai Na-Karaya Namah Shivaya ||",
    meaning: "He who has the king of snakes as his garland and has three eyes, whose body is smeared with sacred ashes and who is the great Lord. He who is eternal, who is ever pure with the four directions as his clothes, Salutations to that Shiva, who is represented by syllable 'Na'.",
    // In a real app, this would be a URL to a local or remote audio file
    audioUrl: "/audio/shiva_panchakshara.mp3" 
  }
};

export const getWeeklyShloka = () => {
  // For now, return week1 statically. In the future, determine based on week of the year.
  return shlokaMastery.week1;
};
