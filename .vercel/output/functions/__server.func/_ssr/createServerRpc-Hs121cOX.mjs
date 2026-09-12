import { a as TSS_SERVER_FUNCTION } from "./server-Bi_VMfDL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createServerRpc-Hs121cOX.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { createServerRpc as t };
