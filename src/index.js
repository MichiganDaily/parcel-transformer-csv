const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
  async transform({ asset }) {
    const code = await asset.getCode();
    const q = asset.query;

    let p = "csvParse";
    if (q.has("delimiter")) {
      const delimiter = q.get("delimiter");
      if (delimiter === ",") {
        p = "csvParse";
      } else if (delimiter === "\t") {
        p = "tsvParse";
      } else {
        p = `dsvFormat("${delimiter}").parse`;
      }
    } else if (asset.type === "csv") {
      p = "csvParse";
    } else if (asset.type === "tsv") {
      p = "tsvParse";
    }

    let data = `${p}(\`${code}\`, autoType)`;
    if (q.has("autoType") && q.get("autoType") === "false") {
      data = `${p}(\`${code}\`)`;
    }

    const parser = p === "csvParse" || p === "tsvParse" ? p : "dsvFormat";

    asset.type = "js";
    asset.setCode(`
      import { ${parser}, autoType } from "d3-dsv";
      export default ${data};
    `);
    return [asset];
  },
});
