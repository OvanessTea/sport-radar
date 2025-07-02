# Sport Radar - Test Task

A web application for displaying sports matches, tournaments, and sports types with filtering capabilities.

## Features

- **Data Display**: List of sports, tournaments, and matches
- **Filtering**: Search by team name, filter by sport and tournament
- **Caching**: Local data storage for better performance
- **Data retrieval**: Data retrieval is done via configured amazonaws

## Technologies

- **Next.js 15** with TypeScript
- **Mantine UI** for interface components
- **Jest** for testing
- **SCSS** for styling

## Installation & Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd sport-radar
```

2. **Install dependencies**
```bash
npm install
```

3. **Start in development mode**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Production build

```bash
npm run build
npm start
```

## API

The app uses the following endpoints:
- `GET /sport/all` - List of sports
- `GET /tournament/all` - List of tournaments
- `GET /match/all` - List of matches
