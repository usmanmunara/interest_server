http://fbpanda.lswong.com/api/v1/user

# API GROUP: USER

## '/' POST

Creating a new user

```js
{
email: 'usman@fbpanda.com',
password: '123456',
fullName: 'Muhammmad Usman Farooq',
}

```

## '/auth' POST

After creating a new user or when login

```js
{  username: 'usmanmunara',
password: '123456',
}
```

## '/' PATCH

Updating user's email and fullName
Protected api. Send the token as `Bearer token`.

```js
{
email: 'usman@fbpanda.com',
fullName: 'Muhammmad Usman Farooq',
}

```

## '/password' POST

Updating user's password
Protected api. Send the token as `Bearer token`.

```js
{
oldPasssword: 'abcd',
newPassword: 'efgh'
}

```

## '/verifyEmail' POST

Verifying user's email

```js
{
  id: '12345678';
}
```

## '/logout' ALL

Verifying user's email

```js
{
  id: '12345678';
}
```

# API GROUP: INTERESTS

## 'interests/user' GET --> FOR REGISTERED USER ONLY

add query as a query param with key search so the backend can retrieve it as req.query.search. Protected api.

Send the token as `Bearer token`.

## 'interests/demo' GET --> FOR DEMO ONLY

add query as a query param with key search so the bacledn can retrieve it as req.query.search. Unprotected api for now.
