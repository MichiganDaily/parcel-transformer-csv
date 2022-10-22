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
    let imports = "";

    const q = asset.query;

    const parser = getParser(q, asset.type);
    if (parser === csv || parser === tsv) {
      imports += parser;
    } else {
      imports += dsv;
    }

    const code = await asset.getCode();
    let data = `${parser}(\`${code}\`)`;

    const shouldAutoType = !(q.has(auto) && q.get(auto) === "false");
    if (shouldAutoType) {
      imports += "," + auto;
      data = `${parser}(\`${code}\`, ${auto})`;
    }

    if (q.has("columns")) {
      const columns = q.get("columns");
      const mapper = `(d) => {
        const columns = ${parser}(\`${columns}\`).columns;
        if (columns === undefined) {
          console.warn("The specified columns for ${asset.filePath} are undefined");
          return d;
        }
        let m = d.map(r => Object.fromEntries(columns.map(c => [c, r[c]])));
        m.columns = columns;
        return m;
      }`;
      data = `(${mapper})(${data})`;
    }

    asset.type = "js";
    asset.setCode(`
      import { ${imports} } from "d3-dsv";
      export default ${data};
    `);
    return [asset];
  },
});
