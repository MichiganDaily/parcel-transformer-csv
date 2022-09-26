# parcel-transformer-csv

CSV transformer for Parcel 2

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
