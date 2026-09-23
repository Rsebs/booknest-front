import type { Book } from '@/models/book.model';
import type { Lookup } from '@/models/lookup.model';

export const INITIAL_CATEGORIES: Lookup[] = [
  { id: 1, value: 'Ficción' },
  { id: 2, value: 'Ciencia Ficción' },
  { id: 3, value: 'Desarrollo Personal' },
  { id: 4, value: 'Fantasía' },
  { id: 5, value: 'Historia' },
  { id: 6, value: 'Misterio' },
];

export const INITIAL_BOOKS: Book[] = [
  {
    id: 1,
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    description: 'La célebre obra cumbre del realismo mágico que narra la historia familiar de los Buendía a lo largo de siete generaciones en Macondo.',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '18.99',
    categoryId: 1,
    categoryName: 'Ficción',
    rating: 4.9,
    ratingCount: 15,
    comments: [
      {
        id: 101,
        bookId: 1,
        userName: 'Sofía Martínez',
        userEmail: 'sofia@demo.com',
        rating: 5,
        comment: 'Una joya imprescindible de la literatura hispanoamericana. Mágico y poético.',
        createdAt: '2026-08-10',
      },
      {
        id: 102,
        bookId: 1,
        userName: 'Carlos Gómez',
        userEmail: 'carlos@demo.com',
        rating: 5,
        comment: 'La prosa es inigualable. Macondo cobra vida en cada página.',
        createdAt: '2026-09-01',
      },
    ],
  },
  {
    id: 2,
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'En el desértico planeta Arrakis, el joven Paul Atreides asume el control del único recurso vital del universo: la especia Melange.',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '22.50',
    categoryId: 2,
    categoryName: 'Ciencia Ficción',
    rating: 4.8,
    ratingCount: 24,
    comments: [
      {
        id: 103,
        bookId: 2,
        userName: 'Elena Rostova',
        userEmail: 'elena@demo.com',
        rating: 5,
        comment: 'La mejor novela de ciencia ficción de todos los tiempos. Profunda y fascinante.',
        createdAt: '2026-07-22',
      },
    ],
  },
  {
    id: 3,
    title: 'Hábitos Atómicos',
    author: 'James Clear',
    description: 'Un marco revolucionario para mejorar cada día un 1%. Descubre cómo pequeños cambios generan resultados extraordinarios.',
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '16.00',
    categoryId: 3,
    categoryName: 'Desarrollo Personal',
    rating: 4.7,
    ratingCount: 42,
    comments: [
      {
        id: 104,
        bookId: 3,
        userName: 'Andrés López',
        userEmail: 'andres@demo.com',
        rating: 4,
        comment: 'Muy práctico y directo. Me ayudó a estructurar mi rutina diaria.',
        createdAt: '2026-08-15',
      },
    ],
  },
  {
    id: 4,
    title: 'El Nombre del Viento',
    author: 'Patrick Rothfuss',
    description: 'Kvothe narra su propia historia: músico, mendigo, ladrón, estudiante y héroe legendario en un mundo de magia fascinante.',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '24.90',
    categoryId: 4,
    categoryName: 'Fantasía',
    rating: 4.9,
    ratingCount: 31,
    comments: [
      {
        id: 105,
        bookId: 4,
        userName: 'Valeria Rivas',
        userEmail: 'valeria@demo.com',
        rating: 5,
        comment: 'La narrativa es pura poesía. Imposible soltarlo.',
        createdAt: '2026-06-30',
      },
    ],
  },
  {
    id: 5,
    title: 'Sapiens: De animales a dioses',
    author: 'Yuval Noah Harari',
    description: 'Un recorrido apasionante por la historia de la humanidad desde la revolución cognitiva hasta la era biotecnológica.',
    coverUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '19.99',
    categoryId: 5,
    categoryName: 'Historia',
    rating: 4.6,
    ratingCount: 18,
    comments: [
      {
        id: 106,
        bookId: 5,
        userName: 'Mateo Fernández',
        userEmail: 'mateo@demo.com',
        rating: 5,
        comment: 'Cambió por completo mi manera de entender nuestra especie y sociedad.',
        createdAt: '2026-09-10',
      },
    ],
  },
  {
    id: 6,
    title: 'El Sabueso de los Baskerville',
    author: 'Arthur Conan Doyle',
    description: 'El célebre detective Sherlock Holmes investiga una escalofriante maldición familiar en los páramos oscuros de Devonshire.',
    coverUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '14.50',
    categoryId: 6,
    categoryName: 'Misterio',
    rating: 4.5,
    ratingCount: 12,
    comments: [],
  },
  {
    id: 7,
    title: '1984',
    author: 'George Orwell',
    description: 'Una visión inquietante de un mundo distópico dominado por el Gran Hermano y la vigilancia extrema del pensamiento.',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '15.99',
    categoryId: 2,
    categoryName: 'Ciencia Ficción',
    rating: 4.8,
    ratingCount: 50,
    comments: [
      {
        id: 107,
        bookId: 7,
        userName: 'Lucía M.',
        userEmail: 'lucia@demo.com',
        rating: 5,
        comment: 'Un clásico visionario que se vuelve más relevante cada año.',
        createdAt: '2026-09-12',
      },
    ],
  },
  {
    id: 8,
    title: 'El Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'Bilbo Bolsón es arrastrado a una búsqueda épica con trece enanos y el mago Gandalf para recuperar la Montaña Solitaria.',
    coverUrl: 'https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '21.00',
    categoryId: 4,
    categoryName: 'Fantasía',
    rating: 4.9,
    ratingCount: 38,
    comments: [],
  },
  {
    id: 9,
    title: 'Pensar Rápido, Pensar Despacio',
    author: 'Daniel Kahneman',
    description: 'El premio Nobel de Economía nos invita a un recorrido por la mente y explica los dos sistemas que dirigen cómo pensamos.',
    coverUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '23.00',
    categoryId: 3,
    categoryName: 'Desarrollo Personal',
    rating: 4.6,
    ratingCount: 19,
    comments: [],
  },
  {
    id: 10,
    title: 'La Sombra del Viento',
    author: 'Carlos Ruiz Zafón',
    description: 'En la Barcelona de 1945, un joven encuentra un libro maldito en el Cementerio de los Libros Olvidados que cambiará su vida.',
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '17.80',
    categoryId: 6,
    categoryName: 'Misterio',
    rating: 4.9,
    ratingCount: 29,
    comments: [],
  },
  {
    id: 11,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    description: 'Guy Montag es un bombero cuya misión no es apagar incendios, sino quemar los libros prohibidos por el régimen.',
    coverUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '13.90',
    categoryId: 2,
    categoryName: 'Ciencia Ficción',
    rating: 4.7,
    ratingCount: 22,
    comments: [],
  },
  {
    id: 12,
    title: 'El Arte de la Guerra',
    author: 'Sun Tzu',
    description: 'El tratado de estrategia militar más antiguo e influyente del mundo, aplicable tanto a la vida como a los negocios.',
    coverUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    price: '11.00',
    categoryId: 5,
    categoryName: 'Historia',
    rating: 4.4,
    ratingCount: 14,
    comments: [],
  },
];

const STORAGE_KEY = 'booknest_demo_books_v2';

export function getStoredBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading stored books, resetting to initial', err);
    return INITIAL_BOOKS;
  }
}

export function saveStoredBooks(books: Book[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch (err) {
    console.error('Error saving books to storage', err);
  }
}
