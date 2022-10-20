# parcel-transformer-dsv

DSV transformer for Parcel 2 using [`d3-dsv`](https://github.com/d3/d3-dsv).

## Usage

1. Install by running `yarn add --dev michigandaily/parcel-transformer-dsv`.
2. In your Parcel config (i.e. `.parcelrc`), add this transformer like the following:

   ```json
   {
    "extends": "@parcel/config-default",
    "transformers": {
      "*.{csv,tsv,dsv}": [
        "@michigandaily/parcel-transformer-dsv"
      ]
    }
   }
   ```

Now, you can import a CSV file like so:

```javascript
import data from "../data.csv"
```

You can also import a TSV file:

```javascript
import data from "../data.tsv"
```

If you have a file with a different type of delimiter,  you can import it with a `delimiter` query parameter. Consider a file with values delimited with colons. You can import it like so:

```javascript
import data from "../data.dsv?delimiter=:"
```

By default, this transformer will use [`d3.autoType`](https://github.com/d3/d3-dsv#autoType) to infer data types. If you want to disable automatic typing, import with a `autoType=false` query parameter:

```javascript
import data from "../data.csv?autoType=false"
```

If you want to only retrieve certain columns of values from a DSV, use the `columns` query paramter. The following import will only import the `a` and `b` columns from a CSV file:

```javascript
import data from "../data.csv?columns=a,b"
```
