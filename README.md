# fashion-cloud

### To run
```
$ npm install
$ npm run dev
```

### API List
| ROUTE                     | METHOD | DESCRIPTION               |
|---------------------------|--------|---------------------------|
| /api/product/:id          | GET    | Get product by Id         |
| /api/product/:id          | POST   | Insert Product            |
| /api/product/:id          | PUT    | Update Product            |
| /api/product/cache/all    | GET    | Get all keys in cache     |
| /api/product/cache/:id    | DELETE | Delete cache by key       |
| /api/product/cache/all    | DELETE | Flush all caches         |


### Product Schema
```javascript
{
  key: String,
  data: Object
}
```
