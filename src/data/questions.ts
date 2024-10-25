export const feedbackQuestions = [
  {
    id: 'overall',
    text: '¿Cómo calificaría su experiencia general en La Petit?',
    category: 'overall'
  },
  {
    id: 'food-quality',
    text: '¿Qué tan satisfecho está con la calidad de su comida?',
    category: 'food'
  },
  {
    id: 'food-temp',
    text: '¿La temperatura de sus platos fue la adecuada?',
    category: 'food'
  },
  {
    id: 'service-speed',
    text: '¿Cómo calificaría la rapidez del servicio?',
    category: 'service'
  },
  {
    id: 'staff-courtesy',
    text: '¿Qué tan amable y atento fue nuestro personal?',
    category: 'service'
  },
  {
    id: 'ambiance',
    text: '¿Cómo calificaría el ambiente del restaurante?',
    category: 'ambiance'
  }
] as const;

export const departments = [
  {
    id: 'kitchen',
    name: 'Cocina',
    notifyOnCategories: ['food']
  },
  {
    id: 'service',
    name: 'Servicio',
    notifyOnCategories: ['service']
  },
  {
    id: 'management',
    name: 'Gerencia',
    notifyOnCategories: ['overall', 'ambiance']
  }
];