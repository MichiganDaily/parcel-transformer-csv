const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
  async transform({ asset }) {
    const code = await asset.getCode();
    asset.type = "js";
    asset.setCode(`
      import { csvParse } from "d3-dsv";
      export default csvParse(\`${code}\`);
    `);
    return [asset];
  },
});
