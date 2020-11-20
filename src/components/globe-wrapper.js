import makeAsyncScriptLoader from "react-async-script";
import Globe from "./globe";

const globalName = "WE";
const URL = `http://www.webglearth.com/v2/api.js`;

export default makeAsyncScriptLoader(URL, {
  globalName: globalName,
  removeOnUnmount: true,
})(Globe);
