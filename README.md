# GoldenCarsFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## GitHub Pages Deployment

To deploy this project to GitHub Pages (project site), run:

```
npm run deploy
```

What the scripts do:

- `predeploy`: builds the app in production mode with `base-href` set to `/golden-cars-frontend/` so routes work on GitHub Pages.
- `deploy`: publishes the `dist/golden-cars-frontend` folder to the `gh-pages` branch using `gh-pages` via `npx`.

Notes:

- Make sure the repository remote `origin` points to your GitHub repo `kaisraieb/golden-cars-frontend`.
- If you want to include the `gh-pages` package in `devDependencies` instead of using `npx`, run `npm install --save-dev gh-pages` and the `deploy` script will use the local package.
