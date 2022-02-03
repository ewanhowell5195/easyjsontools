# easyjsontools

### Tools for working with JSON objects

```js
const data = {}

ensureJSON(data, ["key", "key2", "key3"], [])

console.log(data) // { key: { key2: { key3: [] } } }

data.key.number = 7

console.log(data) // { key: { key2: { key3: [] }, number: 7 } }

cleanJSON(data)

console.log(data) // { key: { number: 7 } }
```

## Install
```console
$ npm i easyjsontools
```

## Usage
```js
import {ensureJSON, cleanJSON} from "easyjsontools"
```

---

## ensureJSON(data, keys, value)

ensureJSON makes sure that a json branch exists, so that you do not have to create each level manually

### objects
```js
const data = {}

// ensuring the json branch is an object with the path data.config.model.part
ensureJSON(data, ["config", "model", "part"], {})

console.log(data) // { config: { model: { part: {} } } }

// adding something to the new json branch
data.config.model.part.cube = {
  x: 7,
  y: 3,
  z: 9
}

console.log(data) // { config: { model: { part: { cube: { x: 7, y: 3, z: 9 } } } } }
```

### arrays
```js
const data = {}

// ensuring the json branch is an array with the path data.settings.words.ignored
ensureJSON(data, ["settings", "words", "ignored"], [])

console.log(data) // { settings: { words: { ignored: [] } } }

// adding something to the new json branch
data.settings.words.ignored.push("hello")

console.log(data) // { settings: { words: { ignored: [ 'hello' ] } } }
```

Ensuring with objects or arrays will not overwrite if it already exists

You can also use ensureJSON to directly set numbers, strings, booleans, and nulls

```js
const data = {}

// using ensureJSON to set a string
ensureJSON(data, ["dictionary", "words", "example"], "a thing characteristic of its kind or illustrating a general rule.")

console.log(data) // { dictionary: { words: { example: 'a thing characteristic of its kind or illustrating a general rule.' } } }
```

Ensuring with numbers, strings, booleans, and nulls will overwrite anything that isn't an array or an object

---

## cleanJSON(data)

cleanJSON removes any empty objects and arrays from a json structure

```js
const data = {uploaded: {files: {images: []}, status: "failed"}}

console.log(data) // { uploaded: { files: { images: [] }, status: 'failed' } }

// clean the json structure
cleanJSON(data)

console.log(data) // { uploaded: { status: 'failed' } }
```