class StorageService {
	constructor(key = 'questionStates') {
		this.storageKey = key;
	}

	getStates() {
		try {
			return JSON.parse(localStorage.getItem(this.storageKey)) || {};
		} catch (error) {
			console.error('Failed to parse stored states:', error);
			return {};
		}
	}

	setState(id, state) {
		const currentStates = this.getStates();
		currentStates[id] = state;

		try {
			localStorage.setItem(
				this.storageKey,
				JSON.stringify(currentStates)
			);
		} catch (error) {
			console.error('Failed to save state:', error);
		}
	}

	clearStates() {
		try {
			localStorage.removeItem(this.storageKey);
		} catch (error) {
			console.error('Failed to clear states:', error);
		}
	}
}

export default StorageService;
