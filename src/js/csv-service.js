class CsvService {
	constructor(filename = 'questions.csv') {
		this.filename = filename;
	}

	async loadQuestions() {
		try {
			const response = await fetch(this.filename);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const csvText = await response.text();
			return this.parseCSV(csvText);
		} catch (error) {
			console.error('Error loading questions:', error);
			throw error;
		}
	}

	parseCSV(csvText) {
		return new Promise((resolve, reject) => {
			Papa.parse(csvText, {
				header: true,
				dynamicTyping: true,
				skipEmptyLines: true,
				complete: (results) => {
					if (results.errors.length) {
						console.warn('CSV parsing warnings:', results.errors);
					}

					const questions = results.data
						.filter((item) => item.q)
						.sort((a, b) => a.q - b.q);

					resolve(questions);
				},
				error: (error) => {
					console.error('CSV parsing error:', error);
					reject(error);
				},
			});
		});
	}
}

export default CsvService;
