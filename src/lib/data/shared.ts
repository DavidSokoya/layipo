import type { DressCode } from '../types';

export const dressCodeDetails: Record<string, DressCode> = {
  'Casual': {
    title: 'Casual',
    details: [
      'Comfort is key. Feel free to wear jeans, t-shirts, and sneakers.',
      'Relaxed and informal attire is appropriate.',
      'Perfect for social gatherings and informal events.'
    ]
  },
  'Formal': {
    title: 'Formal',
    details: [
      'Also known as Business Formal.',
      'A full matching business suit, including a jacket and dress pants or a dress skirt.',
      'Pair with a button-down shirt, a blouse, or a shell.',
      'Appropriate footwear includes classic heels, flats, or dress shoes.',
      'Keep accessories professional and understated.'
    ]
  },
  'Business': {
    title: 'Business',
    details: [
       'A professional standard of dress.',
       'For men: A suit or dress slacks with a blazer and tie.',
       'For women: A suit, a dress with a jacket, or a skirt with a blouse.',
       'Closed-toe shoes are recommended.'
    ]
  },
  'Sports Wear': {
    title: 'Sports Wear',
    details: [
      'Athletic attire suitable for physical activity.',
      'Think tracksuits, shorts, t-shirts, and athletic shoes.',
      'Comfort and freedom of movement are the priorities.'
    ]
  },
  'Local Fabric': {
    title: 'Local Fabric',
    details: [
      'Celebrate culture with traditional attire.',
      'Wear garments made from local textiles and patterns.',
      'A vibrant and festive dress code.'
    ]
  },
  'Torch of Black (Formal)': {
    title: 'Torch of Black (Formal)',
    details: [
      'A formal dress code with a specific theme.',
      'Men should aim for a dark suit or tuxedo.',
      'Women should wear an elegant evening gown or cocktail dress, preferably in black.',
      'Think sophisticated and classic formalwear.'
    ]
  },
  'JCI T-shirt/Sports Wear': {
    title: 'JCI T-shirt/Sports Wear',
    details: [
      'Show your JCI pride while staying active.',
      'Official JCI t-shirts paired with athletic shorts or pants.',
      'Comfortable and suitable for sports or casual team activities.'
    ]
  },
  'Not stated': {
    title: 'Not Stated',
    details: [
      'There is no specific dress code for this event.',
      'Please dress comfortably and appropriately for the occasion.'
    ]
  },
};
