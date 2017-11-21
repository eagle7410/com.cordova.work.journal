const routes = {
	login    : '/login',
	logout   : '/logout',
	storage  : '/storage',
	settings : '/settings',
	users    : '/users',
	dataLoader: '/data-loader'
};

const afterAuth = routes.storage;
const index     = routes.dataLoader;

export {routes, afterAuth, index};
