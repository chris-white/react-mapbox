

# Mapbox GL JS React Demo. 

This is a Demonstration Web Application for Mapbox GL JS implemented with React. 

It uses the native Mapbox GL JS Library to render vector maps served by a local / privately hosted vector map server.

UI is built upon react JS 

## Open Map Tiles Server

An open map tiles server is required to server the necessary vector tiles

```
curl -sSL https://get.docker.com/ | sh

```

To run the server on `localhost:8080` execute 

```
docker run --rm -it -v $(pwd):/data -p 8080:80 klokantech/openmaptiles-server
```

Visit `localhost:8080` to configure the server. Tile map downloads are free for non-commercial purposes but will require an account on
[Open Map Tiles](https://openmaptiles.com/) to Download.

## Database setup support

TODO: Simple steps for setting up postgres locally.

## Google Places API.

This project uses the Google Maps Places API for address resolution / auto-complete.

There are 2 types of requests made to the places API
0. A Request to to the [Places API Autocomplete Service](https://developers.google.com/places/web-service/autocomplete) to return a list of suggested addresses.
0. A Request to the [Places API Place Details Service](https://developers.google.com/places/web-service/details) to return details of the selected address.

Use of the Google Places API requires specification of API keys, these keys are restricted to use within a specific domain and as such 'localhost' only development keys
should never be shared.

Specify the key in the `env.development` file as `REACT_APP_GOOGLE_API_PUBLIC_KEY`

## Google Re-captcha V3/2

The Google recaptcha library is free and helps prevent against scripting, which is great since we dont want an easily scripted site that uses paid google API's

Specify the keys in the `env.development` file as `REACT_APP_RECAPTCHA_V2_PUBLIC_KEY` and `REACT_APP_RECAPTCHA_V3_PUBLIC_KEY`

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Making available the following following scripts.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
