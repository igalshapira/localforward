# localforward

A very simple utility which proxies requests to another host

## What is it good for?

I had to create this utility in order to use a certain application that can only access APIs on localhost, and I wanted to access API that exist on another development machine.

## Usage

```
git clone https://github.com/igalshapira/localforward.git
set REMOTE_HOST=X.X.X.X
npm start
```

On the first time you should access https://localhost:44300 and accept the certificate.

## Certificate

Was generated using:

```
openssl genrsa 2048 > key.pem
openssl req -x509 -days 9999 -new -key key.pem > cert.pem
