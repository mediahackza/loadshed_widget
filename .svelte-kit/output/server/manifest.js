export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.ad2955ed.js","app":"_app/immutable/entry/app.1369a938.js","imports":["_app/immutable/entry/start.ad2955ed.js","_app/immutable/chunks/index.9ac0ecfe.js","_app/immutable/chunks/singletons.b33f256c.js","_app/immutable/entry/app.1369a938.js","_app/immutable/chunks/index.9ac0ecfe.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
