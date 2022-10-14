const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
  async transform({ asset }) {
    const code = await asset.getCode();
    asset.type = "js";
    let parseFunction = `csvParse(\`${code}\`, autoType)`;
    if (
      asset.query.has("autoType") &&
      asset.query.get("autoType") === "false"
    ) {
      parseFunction = `csvParse(\`${code}\`)`;
    }
    asset.setCode(`
      import { csvParse, autoType } from "d3-dsv";
      export default ${parseFunction};
    `);
    return [asset];
  },
});
