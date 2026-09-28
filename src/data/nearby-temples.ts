/**
 * Bengaluru Digambar Jain temple directory supplied by the temple committee.
 * Map links and coordinates are taken from the location links supplied by the
 * temple committee. Distances shown to visitors are straight-line measurements
 * from the HAL temple and remain approximate as driving distances differ.
 */
export type NearbyTemple = {
  id: number;
  name: string;
  address: string;
  landmark?: string;
  mapUrl: string;
  coordinates: { latitude: number; longitude: number };
  isHome?: boolean;
};

export const nearbyTemples: NearbyTemple[] = [
  { id: 1, name: 'Shri 1008 Bhagawan Adinath Mandir', address: '141, Rangaswamy Temple Street, Balepet, Bengaluru 560053', mapUrl: 'https://maps.app.goo.gl/LJbvki7dkoePZG7DA', coordinates: { latitude: 12.972786, longitude: 77.575042 } },
  { id: 2, name: 'Shri 1008 Bhagawan Mahaveer Mandir', address: '21/1, D.K. Lane, near Avenue Road, Chickpet Cross, Bengaluru 560053', mapUrl: 'https://maps.app.goo.gl/fCD1JgyPGXoZB5q2A', coordinates: { latitude: 12.9693188, longitude: 77.5783 } },
  { id: 3, name: 'Shri 1008 Bhagawan Mahaveer Mandir', address: 'K.R. Road, Shankarapuram, opposite KIMS Hospital, V.V. Puram, Bengaluru 560004', mapUrl: 'https://maps.app.goo.gl/wpZsamgLtLhyBLb3A', coordinates: { latitude: 12.9538226, longitude: 77.5733531 } },
  { id: 4, name: 'Shri 1008 Bhagawan Adinath Mandir', address: '102, Elephant Rock Road, 3rd Block, Jayanagar, Bengaluru 560011', landmark: 'Opposite Central Library, near South End Circle', mapUrl: 'https://maps.app.goo.gl/fVydxRgRnpLMSgUb9', coordinates: { latitude: 12.9358092, longitude: 77.5815262 } },
  { id: 5, name: 'Shri 1008 Bhagawan Sheetalnath Mandir', address: '7th Phase, J.P. Nagar, Puttenahalli, Bengaluru 560078', landmark: 'Opposite Pavithra Choultry', mapUrl: 'https://maps.app.goo.gl/NdHDnoiqrymreADT7', coordinates: { latitude: 12.8974838, longitude: 77.5844904 } },
  { id: 6, name: 'Shri 1008 Bhagawan Shantinath Mandir', address: '62, 2nd Main, 7th Cross, Wilson Garden, Bengaluru 560027', landmark: 'Near Wilson Garden Police Station', mapUrl: 'https://maps.app.goo.gl/A1i4M1qgpXnvNfRX8', coordinates: { latitude: 12.9490949, longitude: 77.5943702 } },
  { id: 7, name: 'Shri 1008 Bhagawan Mahaveer Mandir (HAL)', address: 'Old HAL Airport Road, Konena Agrahara, Vimanapura, Bengaluru 560017', landmark: 'Behind Rajeshwari Talkies', mapUrl: 'https://maps.app.goo.gl/WmeWALmSt6EyZo2i8', coordinates: { latitude: 12.9585159, longitude: 77.6611303 }, isHome: true },
  { id: 8, name: 'Shri 1008 Bhagawan Shantinath Chaityalaya', address: '210/10/1, 19th D Main Road, First N Block, Rajajinagar, Bengaluru 560010', mapUrl: 'https://maps.app.goo.gl/A9Qmtwd17jZ6SaRW9', coordinates: { latitude: 13.0043893, longitude: 77.5518906 } },
  { id: 9, name: 'Shri 1008 Bhagawan Neminath Mandir', address: '298, 17th Cross, C Main, 3rd Block, Rajajinagar, Bengaluru 560010', landmark: 'Near Rajajinagar Bhashyam Circle', mapUrl: 'https://maps.app.goo.gl/5Ze2AsuczfEaZhSH7', coordinates: { latitude: 12.9868156, longitude: 77.5523726 } },
  { id: 10, name: 'Shri 1008 Suvarna Parshwanath Digambar Jain Mandir', address: '78/18/1, 8th Cross Road, Lakshminarayanapuram, Binnipete, Bengaluru 560023', landmark: 'Magadi Road Metro site (AKAR Complex)', mapUrl: 'https://maps.app.goo.gl/ZMnzgA28gzpYM66c7', coordinates: { latitude: 12.9771757, longitude: 77.5567371 } },
  { id: 11, name: 'Sahasraphani 1008 Bhagawan Parshwanath Swamy', address: 'No. 19, 1st Cross, near BEML Complex, Bengaluru', landmark: 'The supplied link resolves to Rajarajeshwari Nagar; please confirm this address', mapUrl: 'https://maps.app.goo.gl/c4CrdNKXEPwDmNF48', coordinates: { latitude: 12.9165306, longitude: 77.5181167 } },
  { id: 12, name: 'Sri Gyanoday Digambar Jain Mandir', address: 'Opposite Vaswani Brentwood, Thubarahalli, Bengaluru 560066', landmark: 'Kundalahalli Gate', mapUrl: 'https://maps.app.goo.gl/B7CD3WhWYfCiSPbL7', coordinates: { latitude: 12.9503554, longitude: 77.7174031 } },
  { id: 13, name: 'Shri 1008 Parsvnath Dig. Jain Chaityalay', address: '107, 1st Cross, 2nd Main, Noble Residency, Begur, Bengaluru 560076', mapUrl: 'https://maps.app.goo.gl/rxY6qQkMVBLcv1ur9', coordinates: { latitude: 12.859403, longitude: 77.608253 } },
  { id: 14, name: 'Shri 1008 Shantinath Jain Temple', address: '108, Horamavu Agara Road, Prarthana Kaveri Layout, Hennur Gardens, Bengaluru 560113', mapUrl: 'https://share.google/sBBHVShutuYRHO1vK', coordinates: { latitude: 13.0401, longitude: 77.6461 } },
  { id: 15, name: 'Sri 1008 Chandraprabhu Jina Mandir', address: 'No. 63, 1st Bhagat Singh Main Road, Bommanahalli, Bengaluru 560068', mapUrl: 'https://maps.app.goo.gl/jsKi29dXruQXFoBx6', coordinates: { latitude: 12.9031162, longitude: 77.6236727 } },
  { id: 16, name: 'Sri 1008 Vasupujya Jin Mandir', address: 'Kumar Kino Platinum Apartments, Seshadripuram, Bengaluru', mapUrl: 'https://maps.app.goo.gl/DVpzEmSUq1aAtTqJ6', coordinates: { latitude: 12.9859438, longitude: 77.5748479 } },
  { id: 17, name: 'Shri 1008 Chandranatha Swamy Digambar Jain Temple', address: 'Yelahanka New Town, Bengaluru', mapUrl: 'https://maps.app.goo.gl/zuaHUeJ2GXiwJ957A', coordinates: { latitude: 13.1058899, longitude: 77.5809131 } },
  { id: 18, name: 'Trimurti Chaityalaya · Shri 1008 Shreyanshnath Digamber Jain Association', address: 'No. D6-26, 407 SFS, Housing Board Colony, 2nd Phase, 4th Stage, Yelahanka New Town, Bengaluru 560064', mapUrl: 'https://maps.app.goo.gl/BeEWVnAaQmWnwAvX9', coordinates: { latitude: 13.102631, longitude: 77.5742941 } },
  { id: 19, name: 'Shri 1008 Digamber Jain Munisuvrat Nath Ji Chaityalaya', address: '305, Vinayaka Layout, Hulimangala, Electronic City, Bengaluru 560100', mapUrl: 'https://maps.app.goo.gl/vqGVvYVZXjn95KeH9', coordinates: { latitude: 12.8286114, longitude: 77.6487185 } },
  { id: 20, name: 'Sri Vidyoday Digambar Jain Chaityalaya', address: 'Ashish Narayana Row House, Thubarahalli, Bengaluru', mapUrl: 'https://maps.app.goo.gl/kpGhHrZyKv58KwZp8', coordinates: { latitude: 12.9469965, longitude: 77.7196123 } },
];
