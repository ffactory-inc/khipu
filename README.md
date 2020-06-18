# Khipu Node.js Library

![Publish Khipu Node library](https://github.com/TeLoPreparo/khipunodejspackage/workflows/publish%20Node.js%20Package/badge.svg?branch=develop)

The Khipu Node library provides convenient access to the Khipu API from applications written in server-side JavaScript.

## Documentation

See the khipu-node API docs for Node.js.

## Installation

```sh
npm install --save @TeLoPreparo/khipu
#or
yarn add @TeLoPreparo/khipu
```

## Usage

The package needs to be configured with your account's secret key, which is available in the [Khipu account](https://khipu.com/merchant/profile#).

```javascript

const KhipuClient = require("@TeLoPreparo/khipu")

KhipuClient.setAuthentication({
  secret: "<RECEIVER_SECRET>",
  receiverId: "<RECEIVER_IDENTIFIER>",
});
```

Using promises to retrieve all banks associated with khipu.

```javascript
KhipuClient.banks.get()
.then((response) => {
  console.log(response);
})
.catch((error) => {
  console.error(error);
})
```

Using async/await to retrieve all banks associated with khipu.

```javascript
async function getbanks() {
  try {
    const banks = await KhipuClient.banks.get();
    console.log(banks)
  } catch(error) {
    console.log(error);
  }
}
getbanks();
```

## More detail about Khipu API reference, [clik here](https://cl.khipu.com/page/api-referencia)
