<div align="left">
  <h1>:zap: Quiz Server</h1>
</div>

**Introducing Quiz Server** - server for quiz app

**Features**

- Creating user
- Login user
- Get user
- Update user
- todo++

**Tech Stack**

- Typescript
- Zod
- Express
- Drizzle-orm [see](https://github.com/drizzle-team/drizzle-orm)
- Neon database (postgres)

## Contribute

```bash
pnpm install
```

### Run generate sql file
```bash
pnpm db:generate
```
After generate sql file, you can copy sql file to your database and run it.

### Run the development server

You can start the server using this command:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your api tester like postman/insomnia to try the api.

## Endpoint

@access Public
@desc Register new user & set refreshToken and accessToken
route POST /api/user/register
body

```json
{
  "email": "demo@email.com",
  "name": "demo",
  "password": "demo"
}
```

@access Public
@desc Login user/set accessToken
route POST /api/user/login
body

```json
{
  "email": "demo@email.com",
  "password": "demo"
}
```

@access Public
@desc Logout user/delete accessToken
route GET /api/user/logout
body none

@access Public
@desc Refresh accessToken
route GET /api/user/refresh

@access Private
@desc Get user profile
route GET /api/user/profile
body none

@access Private
@desc Update user name profile
route PATCH /api/user/name
body

```json
{
  "name": "demoupdate"
}
```

@access Private
@desc Update user name profile
route PATCH /api/user/password
body

```json
{
  "password": "demoupdate"
}
```
