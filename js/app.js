import StorageService from './storage-service.js';
import CsvService from './csv-service.js';
import QuestionRenderer from './question-renderer.js';

class ExamQuestionsApp {
	constructor() {
		this.storageService = new StorageService();
		this.csvService = new CsvService();
		this.questionRenderer = new QuestionRenderer(
			document.getElementById('links-container'),
			this.storageService
		);

		this.resetButton = document.getElementById('reset-button');
		this.init();
	}

	async init() {
		this.bindEvents();
		await this.loadQuestions();
	}

	bindEvents() {
		this.resetButton.addEventListener('click', () => this.handleReset());
	}

	async loadQuestions() {
		try {
			const questions = await this.csvService.loadQuestions();
			this.questionRenderer.renderQuestions(questions);
		} catch (error) {
			this.questionRenderer.showError(
				'Failed to load questions. Please ensure questions.csv exists and is correctly formatted.'
			);
		}
	}

	handleReset() {
		const confirmMessage =
			'Are you sure you want to reset all your progress? This action cannot be undone.';

		if (confirm(confirmMessage)) {
			this.storageService.clearStates();
			this.questionRenderer.resetAllCheckboxes();
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new ExamQuestionsApp();
});
