# Users Management App

A modern, responsive user management application built with Next.js 13+, featuring a clean UI with search, sort, and detailed user profiles.

## Features

- **Responsive Design** - Optimized for both desktop and mobile devices
- **Advanced Search** - Real-time filtering by name, email, or website
- **Sort Functionality** - Sort users by name (A-Z, Z-A)
- **User Details** - Comprehensive user profiles with company and address information
- **Performance** - Built with Next.js App Router and React Query
- **Modern UI** - Styled with Tailwind CSS
- **Test Coverage** - Comprehensive unit tests with Jest and React Testing Library
- **SEO Optimized** - Dynamic metadata generation for better search visibility

## Tech Stack

- **Framework**: Next.js 13.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query (React Query)
- **Testing**: Jest + React Testing Library
- **API**: JSONPlaceholder

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd users-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── globals.css              # Global styles
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── providers.tsx           # Providers for React Query
└── users/
    ├── page.tsx            # Users list page
    └── [id]/
        ├── page.tsx        # User detail page (Server Component)

components/
├── ui/
│   ├── table.tsx           # Reusable table component
│   ├── searchBar.tsx      # Search input
│   ├── sortDropdown.tsx   # Sort functionality
│   ├── error.tsx           # Error component
│   └── skeleton/           # Loading skeletons


hooks/
└── queries/
    └── users.ts            # React Query hooks

__tests__/
└── users.test.tsx          # Test files
```

## Key Features Implementation

### Users List (`/users`)
- **Responsive Table**: Displays name, email, and website
- **Real-time Search**: Filter users by name, email, or website
- **Sorting**: Sort users alphabetically by name
- **Loading States**: Beautiful skeleton loading
- **Error Handling**: Graceful error states

### User Details (`/users/[id]`)
- **Comprehensive Profile**: All user information including company and address
- **SEO Optimization**: Dynamic metadata generation
- **Navigation**: Easy back-to-list functionality
- **Responsive Card**: Clean, mobile-friendly layout

### Performance Optimizations
- **ISR Caching**: Static generation with revalidation
- **Efficient Fetching**: React Query for client-side data
- **Code Splitting**: Automatic with Next.js App Router

## Testing

Run the test suite:

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage
- Users List: Renders rows, filters by search, shows loading & error states
- User Details: Renders details for given ID, shows loading & error states
- Network calls properly mocked
- Responsive behavior tested

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## Responsive Breakpoints

- **Mobile**: < 768px (Card-based layout)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (Table-based layout)

## Design System

### Colors
- Primary: `blue-500`, `blue-600`
- Background: `gray-50`, `white`
- Text: `gray-900`, `gray-600`, `gray-400`
- Borders: `gray-200`, `gray-300`

### Typography
- Headings: `font-semibold`, `font-bold`
- Body: Regular weight
- Labels: `font-medium`

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing fake API data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [TanStack Query](https://tanstack.com/query) for data fetching management

---
