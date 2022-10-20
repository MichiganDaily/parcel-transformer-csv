const { Transformer } = require("@parcel/plugin");

const csv = "csvParse";
const tsv = "tsvParse";
const dsv = "dsvFormat";
const auto = "autoType";

const getParser = (query, type) => {
  let parser = csv;
  if (query.has("delimiter")) {
    const delimiter = query.get("delimiter");
    if (delimiter === ",") {
      parser = csv;
    } else if (delimiter === "\t") {
      parser = tsv;
    } else {
      parser = `${dsv}("${delimiter}").parse`;
    }
  } else if (type === "csv") {
    parser = csv;
  } else if (type === "tsv") {
    parser = tsv;
  }

  return parser;
};

module.exports = new Transformer({
  async transform({ asset }) {
    const code = await asset.getCode();
    const q = asset.query;

    const shouldAutoType = !(q.has(auto) && q.get(auto) === "false");
    const autoType = shouldAutoType ? `, ${auto}` : "";

    const p = getParser(q, asset.type);
    const data = `${p}(\`${code}\` ${autoType})`;
    const parser = p === csv || p === tsv ? p : dsv;

    asset.type = "js";
    asset.setCode(`
      import { ${parser} ${autoType} } from "d3-dsv";
      export default ${data};
    `);
    return [asset];
  },
});
