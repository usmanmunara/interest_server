https://interestpanda.com/api/v1/

# API GROUP: user

## '/' POST

Creating a new user

```js
{
email: 'usman@interestpanda.com',
password: '123456',
fullName: 'Muhammmad Usman Farooq',
}

```

### response

- 400 with {message: 'Missing fields'} if any of the fields are missing
- 400 with {message: 'Password Length should be greater than or equal to 6'} if pass length <6
- 400 with {message:'invalid email'} if email invalid
- 409 with some error message if there is an Unique Constraint error

## '/auth' POST

After creating a new user or when login

```js
{  username: 'usmanmunara',
password: '123456',
}
```

### response

- 400 with {message:'invalid email'} if email invalid
- 404 if user not found
- 500 if internal server error in updating user

## '/' PATCH

Updating user's email and fullName
Protected api. Send the token as `Bearer token`.

```js
{
email: 'usman@interestpanda.com',
fullName: 'Muhammmad Usman Farooq',
}

### response

- 400 if email or pass missing
- 403 if user not verified with {message: 'User email not verified'}
- 403 without message === invalide credentials
- 500 everywhere indicates internal sevrer error

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

### res

- 400 if pass is < 6 or if any of the fields are missing
- 403 if 'invalid credentials'

## '/verifyEmail' POST

Verifying user's email

```js
{
  id: '12345678';
}
```

400 with {message: 'User ID not found.'} if id not there in body
403 for invalide cred
500 for server error

## '/resetPassword' POST

```js
{
  password:******, confirmPassword:******, id:******
}
```

### res

- 400 for any missing field or if pass < 6
- 403 invalid cred
- 500 server error

## '/logout' ALL

logout

```js
{
  id: '12345678';
}
```

# API GROUP: INTERESTS

## 'interests/user' GET --> FOR REGISTERED USER ONLY

add query as a query param with key search so the backend can retrieve it as req.query.search. Protected api.

Send the token as `Bearer token`.

### res

- 400 with {message: 'Unpaid user'} if user unpaid

## 'interests/demo' GET --> FOR DEMO ONLY

add query as a query param with key search so the bacledn can retrieve it as req.query.search. Unprotected api for now.

## RESPONSE
