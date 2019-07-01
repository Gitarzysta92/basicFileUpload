module.exports = class Router {
	constructor(handlers) {
		this._endpoints = [];
		this._defaultMatch = {}
        this._setupHandlers(handlers);

        return {
            pipeRequest: this.pipeRequest.bind(this)
        }
	}

	pipeRequest(req, res) {   
		const url = req.url;
		const handler = this._endpoints.find(handler => {
			return handler.pattern.test(url);
        });

		if (!handler) return this._defaultMatch(req, res);
		handler.exec(req, res);
	}

	_setupHandlers(handlers) {
		handlers.forEach(handler => {
			const isInvalid = handler.hasOwnProperty('exec') && typeof exec === 'function';
			if (isInvalid) return;

			const isEndpoint = handler.hasOwnProperty('pattern');
			if (!isEndpoint) {
				this._defaultMatch = handler.exec;
				return;	
			} 
			this._endpoints.push(handler); 
		})
	}
}