import { a as TSS_SERVER_FUNCTION } from "./server-B3ytGRYy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createServerRpc-DiQR2LFd.js
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
