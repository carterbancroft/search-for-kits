# Biobot Kit Search

A simple app for searching the Biobot database for customer kits. Provides info on kit shipping status.

## Requirements
`Node.js` - Specifically the latest LTS (v18). I'd suggest [nvm](https://github.com/nvm-sh/nvm) for managing and installing Node/npm versions.

A browser. I tested this in Firefox, Chrome and Safari with consistent results.

## Setup and Running
This repository is segmented into a Node/Express powered API and a React client. At the root of the repo these are the `api` and `client` directories, respectively.

Both the API and the Client have dependencies that will need to be installed before they can be run.

### API
First install dependencies. Starting from the root of the repo...

```
$ cd api
$ npm i
```

Then start the api...

```
$ npm start
```

You should see something like this...

```

> api@1.0.0 start
> node index.js

Listening on port 8888
```

### Client
Again, install client dependencies, starting from the root of the repo...

```
$ cd client
$ npm i
```

Then start the client...

```
$ npm start
```

You should see something like this and the app should automatically open in your browser...

```
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.227.6:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

If the app doesn't open up automatically, simply visit `http://localhost:3000`.

_Note: You may also see useEffect dependency linter warnings in the output. I didn't have time to clean these up._

## Usage
In the `Kit ID` field, begin entering your kit label ID. It will do a `contains` style search to provide autocomplete options for all kit IDs that contain the value you'd typed in so far.

Select the kit ID from the dropdown to display kit details (mainly the FedEx tracking number).

## Thoughts
The 3 hour timebox is fairly tight to build an API and a Frontend that looks decent. This gave me the impression that you wanted more to see what choices I would make to get something out the door in that timeframe, complete or not. I tried to keep my development/design work within that scope, however I decided that I would spend additional time to write this `README` and think about/document the ways in which the product should be improved. It takes me a while to document clearly and adding that work into the 3 hour window would have cut down my development time a great deal.

I also got the impression (perhaps I should have asked though) that this was not a test of my project communication skills. The short timeframe and the fact that there was no Confluence-like doc or Slack channel associated with this made me feel comfortable crawling into a hole and emerging with a "finished" product. Normally I'd be communicating with the team throughout the process.

## Make Better
In the app code itself I've got a handful of TODOs pointing out some things that could be improved. Here however, I'm documenting general improvements I'd like to make.

- Unit tests. There are neither FE or BE unit tests here, I just didn't have time to get them in and I made an executive decision not to include them, as bad as that feels. The next improvement I'd like to make would be to add unit tests. Probably using Jest or Mocha and React Testing Library.
- Add a database. I would like to add a real DB and get away from loading JSON into memory... maybe a containerized version of PostGres. Even a simple SQLite DB would be more representative of a production version though.
- Search scaling. This feels like a good solution for a product like [Algolia](https://www.algolia.com/). If we could create a searchable index in Algolia instead of hitting the DB and handling search logic ourselves it would be a big improvement. This would obviously require a lot of extra work. For example, any time kits are added or removed from the DB the Algolia index would need updating.
- Security. This is probably a big one. Right now the API is wide open and using `GET`s to request data. I would bet that this product would be behind some sort of auth and that the user would only be able to search their own kits. Maybe not though? I'd want more context from Product on this.
- Debounced search. Right now, any time a new character is entered into the Autocomplete it makes an API request, even if the user is typing quickly. There should be a timeout to minimize requests.
- Fix FE vulnerabilities. You'll notice that there are 6 high severity vulnerabilities when installed `node_modules` on the FE. This isn't ideal.
- Query validation. Right now I'm just trusting user input. This isn't good for a production ready application and if this became DB backed I'd fix this.
- Search style. I wonder if it should do more of a `startsWith` style search than a `contains` style search. This is something I'd ask a Product person but it feels like in this case the user might start by entering the first characters and it should be assumed that the autocomplete should only show kits that start with those values. Sort of similar to Google style autocomplete.
- Autocomplete length. This is another question I would ask... I wonder if it should only show, say, 5 or 10 autocomplete options instead of ALL of them. This would allow us to put a limit on the DB query/Algolia request.
- Add something like `nodemon`. Mostly it'd be nice to just have the API restart with changes. Currently only the FE does that.
- Environments. This should have separate Dev/Staging (maybe)/Prod environments. At least to manage different URLs based on different contexts.
- Error monitoring. I like [Sentry](https://sentry.io).
- More npm scripts. I could imagine some nice scripts to populate/run a DB in a dev environment. It also needs test scripts. Probably a lot of niceties to add here to make it more developer friendly as the product is built out.
- Search bugs. There may be some small issues with search. Notably you can't make a request to get kit details by hitting the enter key. Also if you clear the search field the dropdown still shows the last selected Kit ID value alone. The dropdown should also say something a little nicer than "No options" when there are no autocomplete values to show.
- Match Biobot site styling. At the very least I thought it'd be nice to include the Biobot logo but alas, this wasn't a high priority.
- [react-query](https://github.com/TanStack/query)... I dunno, maybe this is simple enough that it's overkill but perhaps there's some value to be gained by using something like `react-query`.
- Clean up `create-react-app` cruft. There's always stuff this utility generates that's not necessary for the end product. I'd like to clean it up but I didn't prioritize it.
- Build process. It'd be fun to add some GitHub actions to run linting/unit tests on every push.
- A [`debug`](https://www.npmjs.com/package/debug) like package. I like using `debug` for logging helpful stuff in a dev context without using `console.log`s.
- Refactor directory structures a bit. Particularly on the FE, I like to have a components directory and folders for specific components.
