# volunteer-matching

## Project setup
```
npm install
```

## Environment configuration
As this is a browser-only application that uses the [Google API](https://github.com/google/google-api-javascript-client), that means that any client id or secret used to talk to Google has to be accessed by this code. At least for the time being, those secrets are being kept outside of this repository. Contact [@carpeliam](https://github.com/carpeliam) for a copy of client id, api key, and spreadsheet id necessary to create your own `.env.local` file.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
