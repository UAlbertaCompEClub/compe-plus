# CompE+ Tech Stack

The goal of this document is to outline a set of technologies and tools that can be used to build CompE+.

# Frontend

| Role                 | Tool or Technology |
| -------------------- | ------------------ |
| Programming Language | TypeScript         |
| Framework            | React              |
| State Management     | Redux              |
| Testing              | Jest               |
| Authentication       | OAuth              |
| Styling              | Material UI        |
| Hosting              | Netlify            |
| Analytics            | Google Analytics   |

## Reasoning

### TypeScript

-   Team is familiar with it
-   Types help keep the code clean

### React

-   Team is familiar with it

### Redux

-   Solid library and popular in community
-   Helps avoid annoying prop drilling
-   May or may not be necessary

### Jest

-   Solid library and popular in community

### Authentication - OAuth

-   [Guide](https://auth0.com/blog/complete-guide-to-react-user-authentication/)

### Material UI

-   Team is familar with it
-   Good default styling and accessibility
-   Customizable to our needs

### Netlify

-   Free
-   Automatic deploy support
-   Supports React routing

### Google Analytics

-   Standard solution
-   Lots of functionality provided
-   Team is familiar with it

# Backend

| Role                        | Tool or Technology                  |
| --------------------------- | ----------------------------------- |
| Programming Language        | TypeScript                          |
| Framework                   | Express                             |
| Testing                     | Jest                                |
| Hosting                     | Heroku                              |
| ORM                         | Zapatos                             |
| Migrations                  | Golang Migrate                      |
| Database                    | PostgreSQL                          |
| Authentication              | Passport.js                         |
| Blob Storage                | Heroku Add-on                       |
| Transactional Email         | Heroku Add-on (recommend: SendGrid) |
| Google Calendar Integration | Google Calendar API/SDK             |

## Reasoning

### TypeScript

-   Team is familiar with it
-   Types help keep the code clean
-   Considered Python as alternative but decided against it for following reasons:
    -   Lack of types
    -   Necessity of virtual environments to make versioning and package management even remotely feasible

### Express

-   Solid library and popular in community
-   Makes adding middleware easy

### Jest

-   Solid library and popular in community

### Heroku

-   Super simple. Minimize time wasted on infrastructure
-   Has a reasonable free tier
-   Has add-ons that will help us with other infrastructure needs

### Zapatos

-   Let's us directly write SQL queries with TypeScript type saftey
-   Avoids the classic problems with ORMs
-   Avoids the classic problems with writing raw SQL

### Golang-Migrate

-   Simple and straightforward

### PostgreSQL

-   Opted for SQL to get defined schema and relational features
-   Heroku has a managed PostgreSQL offering with a reasonable free tier
-   Will use docker to run PostgreSQL for local development

### Passport.js

-   Community standard
-   May change if our authentication needs change

### Blob storage Heroku add-on

-   Simple and straightforward
-   Not worth our time using raw S3
-   Plenty of storage space at entry level price

### SendGrid

-   Has a nice Heroku add-on
-   Easy to use and meets our needs

### Google Calendar API/SDK

-   Easiest and most straightforward way to connect with Google Calendar.

# Common

| Role            | Tool or Technology |
| --------------- | ------------------ |
| Code Formatting | Prettier           |
| CI/CD           | Github Actions     |
| Issue Tracking  | Github Issues      |

## Reasoning

### Prettier

-   Standardized code formatting makes pull request reviews much simpler
-   Solid library and popular in community
-   Great integration with VS Code

### Github Actions

-   We are already using Github so this will be very easy to setup

### Github Issues

-   We are already using Github so this will integrate nicely with pull requests
