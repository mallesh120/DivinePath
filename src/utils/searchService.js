import { godsData } from '../data/gods/godsData';
import { festivalsData } from '../data/festivals/festivalsData';
import { literatureData } from '../data/literature/index';
import { pujasData } from '../data/pujas/pujasData';
import { ashtottaramData } from '../data/ashtottaram/ashtottaramData';

export const searchContent = (query, filterType = 'all') => {
  if (!query || query.trim().length < 2) return [];

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  // 1. Search Gods
  if (filterType === 'all' || filterType === 'gods') {
    godsData.forEach(god => {
      const nameMatch = god.name && god.name.toLowerCase().includes(lowerQuery);
      const descMatch = god.description && god.description.toLowerCase().includes(lowerQuery);
      const titleMatch = god.title && god.title.toLowerCase().includes(lowerQuery);

      if (nameMatch || descMatch || titleMatch) {
        results.push({
          id: `god-${god.id}`,
          title: god.name,
          subtitle: god.title || 'Deity / Divinity',
          description: god.description ? god.description.slice(0, 100) + '...' : '',
          type: 'God',
          category: 'gods',
          badgeColor: '#e65100',
          link: `/gods/${god.id}`,
          image: god.imageUrl
        });
      }
    });
  }

  // 2. Search Literature (All 24 Sacred Texts & Chapters)
  if (filterType === 'all' || filterType === 'literature') {
    literatureData.forEach(item => {
      const titleMatch = item.title && item.title.toLowerCase().includes(lowerQuery);
      const summaryMatch = item.summary && item.summary.toLowerCase().includes(lowerQuery);
      const authorMatch = item.author && item.author.toLowerCase().includes(lowerQuery);

      if (titleMatch || summaryMatch || authorMatch) {
        results.push({
          id: `lit-${item.id}`,
          title: item.title,
          subtitle: item.author ? `By ${item.author} • Sacred Text` : 'Sacred Scripture',
          description: item.summary ? item.summary.slice(0, 100) + '...' : '',
          type: 'Scripture',
          category: 'literature',
          badgeColor: '#7b1fa2',
          link: `/library/${item.id}`,
          image: item.imageUrl
        });
      }

      // Search inside chapters / kandas / sections
      const sections =
        item.chapters ||
        item.kandas ||
        item.parvas ||
        item.mandalas ||
        item.kaandas ||
        item.samhitas ||
        item.books;

      if (Array.isArray(sections)) {
        sections.forEach((sec, idx) => {
          const secTitle = sec.title || `Chapter ${sec.number || idx + 1}`;
          const secDesc = sec.summary || sec.description || '';
          if (
            secTitle.toLowerCase().includes(lowerQuery) ||
            secDesc.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              id: `sec-${item.id}-${sec.id || idx}`,
              title: secTitle,
              subtitle: `Chapter in ${item.title}`,
              description: secDesc ? secDesc.slice(0, 90) + '...' : '',
              type: 'Chapter',
              category: 'literature',
              badgeColor: '#4a148c',
              link: `/library/${item.id}/${sec.id || idx}`,
              image: item.imageUrl
            });
          }
        });
      }
    });
  }

  // 3. Search Pujas
  if (filterType === 'all' || filterType === 'pujas') {
    if (Array.isArray(pujasData)) {
      pujasData.forEach(puja => {
        const nameMatch = puja.name && puja.name.toLowerCase().includes(lowerQuery);
        const deityMatch = puja.deity && puja.deity.toLowerCase().includes(lowerQuery);
        const descMatch = (puja.significance || puja.shortDescription) &&
          (puja.significance || puja.shortDescription).toLowerCase().includes(lowerQuery);

        if (nameMatch || deityMatch || descMatch) {
          results.push({
            id: `puja-${puja.id}`,
            title: puja.name,
            subtitle: puja.deity ? `Puja for ${puja.deity}` : 'Sacred Ritual Guide',
            description: puja.significance || puja.shortDescription || '',
            type: 'Puja',
            category: 'pujas',
            badgeColor: '#c2185b',
            link: `/puja/${puja.id}`,
            image: puja.imageUrl || null
          });
        }
      });
    }
  }

  // 4. Search 108 Ashtottaram Names
  if (filterType === 'all' || filterType === 'ashtottaram') {
    Object.keys(ashtottaramData).forEach(deityKey => {
      const ash = ashtottaramData[deityKey];
      if (ash && ash.deityName) {
        const deityMatch = ash.deityName.toLowerCase().includes(lowerQuery);
        const titleMatch = ash.title && ash.title.toLowerCase().includes(lowerQuery);

        if (deityMatch || titleMatch) {
          results.push({
            id: `ash-${deityKey}`,
            title: `${ash.deityName} Ashtottaram`,
            subtitle: '108 Sacred Names (Shatanamavali)',
            description: ash.description || `Complete 108 sacred names for daily chanting of ${ash.deityName}.`,
            type: 'Ashtottaram',
            category: 'ashtottaram',
            badgeColor: '#00796b',
            link: `/ashtottaram/${deityKey}`,
            image: null
          });
        }
      }
    });
  }

  // 5. Search Festivals
  if (filterType === 'all' || filterType === 'festivals') {
    festivalsData.forEach(festival => {
      const nameMatch = festival.name && festival.name.toLowerCase().includes(lowerQuery);
      const descMatch = festival.description && festival.description.toLowerCase().includes(lowerQuery);
      const deityMatch = festival.deity && festival.deity.toLowerCase().includes(lowerQuery);

      if (nameMatch || descMatch || deityMatch) {
        results.push({
          id: `fest-${festival.id}`,
          title: festival.name,
          subtitle: festival.month ? `${festival.month} • Festival` : 'Hindu Festival',
          description: festival.description ? festival.description.slice(0, 100) + '...' : '',
          type: 'Festival',
          category: 'festivals',
          badgeColor: '#f57c00',
          link: `/festivals/${festival.id}`,
          image: null
        });
      }
    });
  }

  // Rank by exact title match first, then return top 15
  results.sort((a, b) => {
    const aExact = a.title.toLowerCase().startsWith(lowerQuery) ? 1 : 0;
    const bExact = b.title.toLowerCase().startsWith(lowerQuery) ? 1 : 0;
    return bExact - aExact;
  });

  return results.slice(0, 15);
};
