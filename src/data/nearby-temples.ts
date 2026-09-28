/**
 * Bengaluru Digambar Jain temple directory supplied by the temple committee.
 * Coordinates are locality-level estimates where the supplied map link does
 * not expose a coordinate. Distances shown to visitors are therefore marked
 * approximate and are straight-line measurements from the HAL temple.
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
  { id: 1, name: 'Shri 1008 Bhagawan Adinath Mandir', address: '141, Rangaswamy Temple Street, Balepet, Bengaluru 560053', mapUrl: 'https://maps.app.goo.gl/CLx7pSCQPRkzbVbr8', coordinates: { latitude: 12.972786, longitude: 77.575042 } },
  { id: 2, name: 'Shri 1008 Bhagawan Mahaveer Mandir', address: '21/1, D.K. Lane, near Avenue Road, Chickpet Cross, Bengaluru 560053', mapUrl: 'https://goo.gl/maps/a2BWGaGzjJPUCA1e7', coordinates: { latitude: 12.9649, longitude: 77.5773 } },
  { id: 3, name: 'Shri 1008 Bhagawan Mahaveer Mandir', address: 'K.R. Road, Shankarapuram, opposite KIMS Hospital, V.V. Puram, Bengaluru 560004', mapUrl: 'https://maps.app.goo.gl/izehP5reaxpWjvFG6', coordinates: { latitude: 12.9493, longitude: 77.5684 } },
  { id: 4, name: 'Shri 1008 Bhagawan Adinath Mandir', address: '102, Elephant Rock Road, 3rd Block, Jayanagar, Bengaluru 560011', landmark: 'Opposite Central Library, near South End Circle', mapUrl: 'https://maps.app.goo.gl/92eRPKbYs4kBhKDC6', coordinates: { latitude: 12.9321, longitude: 77.5832 } },
  { id: 5, name: 'Shri 1008 Bhagawan Sheetalnath Mandir', address: '7th Phase, J.P. Nagar, Puttenahalli, Bengaluru 560078', landmark: 'Opposite Pavithra Choultry', mapUrl: 'https://maps.app.goo.gl/Hv1iN5AJ15CzY4zV6', coordinates: { latitude: 12.8891, longitude: 77.5855 } },
  { id: 6, name: 'Shri 1008 Bhagawan Shantinath Mandir', address: '62, 2nd Main, 7th Cross, Wilson Garden, Bengaluru 560027', landmark: 'Near Wilson Garden Police Station', mapUrl: 'https://maps.app.goo.gl/RfQdq8t4hHWDw3B2A', coordinates: { latitude: 12.9537, longitude: 77.6009 } },
  { id: 7, name: 'Shri 1008 Bhagawan Mahaveer Mandir (HAL)', address: 'Old HAL Airport Road, Konena Agrahara, Vimanapura, Bengaluru 560017', landmark: 'Behind Rajeshwari Talkies', mapUrl: 'https://maps.app.goo.gl/PiUbxxdQjXKRpXxd8', coordinates: { latitude: 12.9585159, longitude: 77.6611303 }, isHome: true },
  { id: 8, name: 'Shri 1008 Bhagawan Shantinath Chaityalaya', address: '210/10/1, 19th D Main Road, First N Block, Rajajinagar, Bengaluru 560010', mapUrl: 'https://goo.gl/maps/9U3PPSogwHmyYGBv8', coordinates: { latitude: 13.0003, longitude: 77.5522 } },
  { id: 9, name: 'Shri 1008 Bhagawan Neminath Mandir', address: '298, 17th Cross, C Main, 3rd Block, Rajajinagar, Bengaluru 560010', landmark: 'Near Rajajinagar Bhashyam Circle', mapUrl: 'https://goo.gl/maps/MTXmAZg7X2v2knsn7', coordinates: { latitude: 13.005, longitude: 77.5512 } },
  { id: 10, name: 'Shri 1008 Suvarna Parshwanath Digambar Jain Mandir', address: '78/18/1, 8th Cross Road, Lakshminarayanapuram, Binnipete, Bengaluru 560023', landmark: 'Magadi Road Metro site (AKAR Complex)', mapUrl: 'https://goo.gl/maps/S5hwErEytLeSpy4a7', coordinates: { latitude: 12.9686, longitude: 77.5593 } },
  { id: 11, name: 'Sahasraphani 1008 Bhagawan Parshwanath Swamy', address: 'No. 19, 1st Cross, near BEML Complex, Bengaluru', landmark: 'The supplied list shows PIN code 450098; please verify this address', mapUrl: 'https://goo.gl/maps/rNyv3cCPqEQXiDXz6', coordinates: { latitude: 12.9222, longitude: 77.5234 } },
  { id: 12, name: 'Sri Gyanoday Digambar Jain Mandir', address: 'Opposite Vaswani Brentwood, Thubarahalli, Bengaluru 560066', landmark: 'Kundalahalli Gate', mapUrl: 'https://maps.app.goo.gl/kfVTzpDkNQknhvyG8', coordinates: { latitude: 12.9503554, longitude: 77.7174031 } },
  { id: 13, name: 'Shri 1008 Parsvnath Dig. Jain Chaityalay', address: '107, 1st Cross, 2nd Main, Noble Residency, Begur, Bengaluru 560076', mapUrl: 'https://maps.google.com/?q=12.859403,77.608253', coordinates: { latitude: 12.859403, longitude: 77.608253 } },
  { id: 14, name: 'Shri 1008 Shantinath Jain Temple', address: '108, Horamavu Agara Road, Prarthana Kaveri Layout, Hennur Gardens, Bengaluru 560043', mapUrl: 'https://maps.app.goo.gl/CdGiL6Zk5rNg1Afq8', coordinates: { latitude: 13.0298, longitude: 77.6449 } },
  { id: 15, name: 'Sri 1008 Chandraprabhu Jina Mandir', address: 'No. 63, 1st Bhagat Singh Main Road, Bommanahalli, Bengaluru 560068', mapUrl: 'https://goo.gl/maps/rrQUuCA9aNz3vPLr8', coordinates: { latitude: 12.903, longitude: 77.624 } },
  { id: 16, name: 'Sri 1008 Vasupujya Jin Mandir', address: 'Kumar Kino Platinum Apartments, Seshadripuram, Bengaluru', mapUrl: 'https://maps.app.goo.gl/AR1seU1UWqEoNMPb6', coordinates: { latitude: 12.9917, longitude: 77.5761 } },
  { id: 17, name: 'Shri 1008 Chandranatha Swamy Digambar Jain Temple', address: 'Yelahanka New Town, Bengaluru', mapUrl: 'https://maps.app.goo.gl/kum67bPzqu5b6pzKA', coordinates: { latitude: 13.1058899, longitude: 77.5809131 } },
  { id: 18, name: 'Trimurti Chaityalaya · Shri 1008 Shreyanshnath Digamber Jain Association', address: 'No. D6-26, 407 SFS, Housing Board Colony, 2nd Phase, 4th Stage, Yelahanka New Town, Bengaluru 560064', mapUrl: 'https://maps.app.goo.gl/CBsmoPPDCjU3jpi98', coordinates: { latitude: 13.102631, longitude: 77.5742941 } },
  { id: 19, name: 'Shri 1008 Digamber Jain Munisuvrat Nath Ji Chaityalaya', address: '305, Vinayaka Layout, Hulimangala, Electronic City, Bengaluru 560100', mapUrl: 'https://maps.app.goo.gl/Lycp34vmKW8J8o9M8', coordinates: { latitude: 12.844, longitude: 77.661 } },
  { id: 20, name: 'Sri Vidyoday Digambar Jain Chaityalaya', address: 'Ashish Narayana Row House, Thubarahalli, Bengaluru', mapUrl: 'https://maps.app.goo.gl/61myp2jFbUSWNJN47', coordinates: { latitude: 12.955, longitude: 77.715 } },
];
