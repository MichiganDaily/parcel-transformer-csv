# parcel-transformer-csv

CSV transformer for Parcel 2 using [`d3-dsv`](https://github.com/d3/d3-dsv)

## Usage

1. Install by running `yarn add --dev michigandaily/parcel-transformer-csv`.
2. In your Parcel config (i.e. `.parcelrc`), add this transformer like the following:

   ```json
   {
    "extends": "@parcel/config-default",
    "transformers": {
      "*.csv": [
        "@michigandaily/parcel-transformer-csv"
      ]
    }
   }
   ```

Now, you can import a CSV file like so:

```javascript
import data from "../data.csv"
```

By default, this transformer will use [`d3.autoType`](https://github.com/d3/d3-dsv#autoType) to infer data types. If you want to disable automatic typing, import with a `autoType=false` query parameter:

```javascript
import data from "../data.csv?autoType=false"
```
