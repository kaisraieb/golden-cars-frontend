# JSON Server Setup

Ce projet utilise JSON Server pour simuler une API REST avec une base de données JSON.

## Installation

Installez les dépendances nécessaires :

```bash
npm install
```

## Utilisation

### Option 1: Lancer JSON Server séparément

Dans un terminal, lancez JSON Server :

```bash
npm run json-server
```

JSON Server sera accessible sur `http://localhost:3000`

Dans un autre terminal, lancez l'application Angular :

```bash
npm start
```

### Option 2: Lancer les deux simultanément

Lancez JSON Server et Angular en même temps :

```bash
npm run dev
```

## Endpoints disponibles

Une fois JSON Server lancé, les endpoints suivants sont disponibles :

- `GET http://localhost:3000/cars` - Récupérer toutes les voitures
- `GET http://localhost:3000/cars/:id` - Récupérer une voiture par ID
- `GET http://localhost:3000/cars?featured=true` - Récupérer les voitures en vedette
- `GET http://localhost:3000/cars?brand=Ford` - Filtrer par marque
- `GET http://localhost:3000/cars?type=Classic` - Filtrer par type
- `GET http://localhost:3000/cars?category=Sport` - Filtrer par catégorie
- `GET http://localhost:3000/cars?price_gte=50000&price_lte=100000` - Filtrer par prix
- `GET http://localhost:3000/cars?discount_gte=1` - Récupérer les voitures en promotion
- `POST http://localhost:3000/cars` - Créer une nouvelle voiture
- `PATCH http://localhost:3000/cars/:id` - Mettre à jour une voiture
- `DELETE http://localhost:3000/cars/:id` - Supprimer une voiture

## Structure des données

Les voitures sont stockées dans `db.json` avec la structure suivante :

```json
{
  "id": "string",
  "brand": "string",
  "model": "string",
  "year": number,
  "price": number,
  "originalPrice": number (optionnel),
  "discount": number (optionnel),
  "description": "string",
  "imageUrl": "string",
  "type": "string",
  "category": "string",
  "engine": "string",
  "maxSpeed": "string",
  "mileage": number,
  "fuelType": "string",
  "transmission": "string",
  "color": "string",
  "featured": boolean
}
```

## Service Angular

Le service `CarsService` est disponible dans `src/app/features/cars/services/cars.service.ts` et fournit des méthodes pour interagir avec l'API :

- `getAllCars()` - Récupérer toutes les voitures
- `getCarById(id)` - Récupérer une voiture par ID
- `getFeaturedCars()` - Récupérer les voitures en vedette
- `searchCars(params)` - Rechercher des voitures avec filtres
- `getCarsByCategory(category)` - Récupérer les voitures par catégorie
- `getCarsWithDiscount()` - Récupérer les voitures en promotion
- `createCar(car)` - Créer une nouvelle voiture
- `updateCar(id, car)` - Mettre à jour une voiture
- `deleteCar(id)` - Supprimer une voiture

## Exemple d'utilisation

```typescript
import { CarsService } from './services/cars.service';

constructor(private carsService: CarsService) {}

ngOnInit() {
  this.carsService.getAllCars().subscribe(cars => {
    console.log(cars);
  });
}
```

