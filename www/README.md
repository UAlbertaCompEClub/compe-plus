# CompE+ Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Authentication set-up

1. Copy `www/.env.sample` to `www/.env`
2. Using the `compe-plus-dev` tenant in [Auth0](https://manage.auth0.com/dashboard), expand _Applications_ on the left sidebar and click on _Compe+ Web Application_
3. In the settings page, copy the domain and client ID to their respective fields in the `.env` file
4. Add the following line in `/etc/hosts`
    ```
    127.0.0.1     local.compe.plus
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [https://local.compe.plus:3000](https://local.compe.plus:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint:fix`

Runs ESLint across the codebase and fixes errors.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Staging

https://amazing-snyder-c0ce1a.netlify.app/

# TODO

I think that this README should be re-worked to be specific to our project
