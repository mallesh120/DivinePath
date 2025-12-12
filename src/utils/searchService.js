import { godsData } from '../data/gods/godsData';
import { festivalsData } from '../data/festivals/festivalsData';
import { literatureData } from '../data/literature/index';

export const searchContent = (query) => {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  const results = [];

  // Search Gods
  godsData.forEach(god => {
    if (
      god.name.toLowerCase().includes(lowerQuery) ||
      god.description.toLowerCase().includes(lowerQuery) ||
      (god.title && god.title.toLowerCase().includes(lowerQuery))
    ) {
      results.push({
        id: god.id,
        title: god.name,
        subtitle: god.title || 'Deity',
        description: god.description,
        type: 'God',
        link: `/gods/${god.id}`,
        image: god.imageUrl
      });
    }
  });

  // Search Literature
  literatureData.forEach(item => {
    if (
      item.title.toLowerCase().includes(lowerQuery) ||
      item.summary.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: item.id,
        title: item.title,
        subtitle: item.type || 'Scripture',
        description: item.summary,
        type: 'Literature',
        link: `/library/${item.id}`,
        image: item.imageUrl
      });
    }
    
    // Search Kandas/Chapters if available
    if (item.kandas) {
      item.kandas.forEach((kanda, index) => {
        if (kanda.title.toLowerCase().includes(lowerQuery)) {
           results.push({
            id: `${item.id}-kanda-${index}`,
            title: kanda.title,
            subtitle: `Chapter in ${item.title}`,
            description: kanda.summary,
            type: 'Literature',
            link: `/library/${item.id}`, // Ideally deep link if supported
            image: item.imageUrl
          });
        }
      });
    }
  });

  // Search Festivals
  festivalsData.forEach(festival => {
    if (
      festival.name.toLowerCase().includes(lowerQuery) ||
      festival.description.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: festival.id,
        title: festival.name,
        subtitle: festival.month || 'Festival',
        description: festival.description,
        type: 'Festival',
        link: `/festivals`, // Festivals page usually lists all, maybe anchor link later
        image: null // Festivals might not have direct images in this data structure
      });
    }
  });

  return results.slice(0, 10); // Limit to 10 results
};
