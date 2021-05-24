# CompE+ Tech Stack

The goal of this document is to outline a set of technologies and tools that can be used to build CompE+.

# Frontend

| Role                 | Tool or Technology |
| -------------------- | ------------------ |
| Programming Language | TypeScript         |
| Framework            | React              |
| State Management     | Redux              |
| Testing              | Jest               |
| Authentication       | ?                  |
| Styling              | ?                  |
| Hosting              | ?                  |
| Analytics            | ?                  |

## Reasoning

### TypeScript

- Team is familiar with it
- Types help keep the code clean

### React

- Team is familiar with it

### Redux

- Solid library and popular in community
- Helps avoid annoying prop drilling
- May or may not be necessary

### Jest

- Solid library and popular in community

## Open Questions

### Authentication Options

- Need more details on how we will be doing Oauth with Google

### Styling Options

- TailwindCSS
- Custom CSS
- Something like Bootstrap
- Component Library (Ex. [Material](https://material-ui.com/), [Ant Design](https://ant.design/))

### Hosting Options

- Github Pages
- Netlify

### Analytics

- Google Analytics
- Something simpler and more privacy friendly
- [Log Rocket](https://logrocket.com/)

# Backend

| Role                        | Tool or Technology |
| --------------------------- | ------------------ |
| Programming Language        | TypeScript         |
| Framework                   | Express            |
| Testing                     | Jest               |
| Hosting                     | Heroku             |
| ORM                         | Zapatos            |
| Migrations                  | ?                  |
| Database                    | PostgreSQL         |
| Authentication              | Passport.js        |
| Blob Storage                | ?                  |
| Transactional Email         | ?                  |
| Google Calendar Integration | ?                  |

## Reasoning

### TypeScript

- Team is familiar with it
- Types help keep the code clean
- Considered Python as alternative but decided against it for following reasons:
  - Lack of types
  - Necessity of virtual environments to make versioning and package management even remotely feasible

### Express

- Solid library and popular in community
- Makes adding middleware easy

### Jest

- Solid library and popular in community

### Heroku

- Super simple. Minimize time wasted on infrastructure
- Has a reasonable free tier
- Has add-ons that will help us with other infrastructure needs

### Zapatos

- Let's us directly write SQL queries with TypeScript type saftey
- Avoids the classic problems with ORMs
- Avoids the classic problems with writing raw SQL

### PostgreSQL

- Opted for SQL to get defined schema and relational features
- Heroku has a managed PostgreSQL offering with a reasonable free tier
- Will use docker to run PostgreSQL for local development

### Passport.js

- Community standard
- May change if our authentication needs change

## Open Questions

### Migrations

- [dbmate](https://github.com/amacneil/dbmate)
- [golang-migrate](https://github.com/golang-migrate/migrate)
- [migrate](https://github.com/graphile/migrate?ref=hackernoon.com)

### Blob Storage

- [Bucketeer add-on](https://elements.heroku.com/addons/bucketeer) at ~$5 / month
- [Cloudcube add-on](https://elements.heroku.com/addons/cloudcube) at ~$5 / month
- Directly on S3 at ? / month

### Transactional Email

- [SendGrid add-on](https://elements.heroku.com/addons/sendgrid) 12000 / month for free
- [Mailgun add-on](https://elements.heroku.com/addons/mailgun) 400 / day for free

### Google Calendar Integration

- Looks like there is an [SDK](https://developers.google.com/calendar/quickstart/nodejs) for this but more refining of our requirements is needed

# Common

| Role            | Tool or Technology |
| --------------- | ------------------ |
| Code Formatting | Prettier           |
| CI/CD           | Github Actions     |
| Issue Tracking  | Github Issues      |

## Reasoning

### Prettier

- Standardized code formatting makes pull request reviews much simpler
- Solid library and popular in community
- Great integration with VS Code

### Github Actions

- We are already using Github so this will be very easy to setup

### Github Issues

- We are already using Github so this will integrate nicely with pull requests
