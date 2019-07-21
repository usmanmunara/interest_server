http://fbpanda.lswong.com/api/v1/

# API GROUP: USER

## '/user' POST

Creating a new user

```js
{  username: 'usmanmunara',
organization: 'edvant',
email: 'usman@edvant.net',
password: '123456',
fullName: 'Muhammmad Usman Farooq',
}

```

## '/user/auth' POST

After creating a new user or when login

```js
{  username: 'usmanmunara',
password: '123456',
}
```

# API GROUP: INTERESTS

## 'interests/user' GET --> FOR REGISTERED USER ONLY

add query as a query param with key search so the backend can retrieve it as req.query.search. Unprotected api for now.

## 'interests/demo' GET --> FOR DEMO ONLY

add query as a query param with key search so the bacledn can retrieve it as req.query.search. Unprotected api for now.
