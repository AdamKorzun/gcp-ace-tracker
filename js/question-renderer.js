class QuestionRenderer {
	constructor(container, storageService) {
		this.container = container;
		this.storageService = storageService;
	}

	renderQuestions(questions) {
		this.container.innerHTML = '';

		questions.forEach((question) => {
			this.renderQuestion(question);
		});
	}

	renderQuestion(questionData) {
		const itemDiv = this.createQuestionElement(questionData);
		this.container.appendChild(itemDiv);
	}

	createQuestionElement(questionData) {
		const itemDiv = document.createElement('div');
		itemDiv.className = 'link-item';

		const checkbox = this.createCheckbox(questionData);
		const label = this.createLabel(questionData, checkbox.id);

		itemDiv.appendChild(checkbox);
		itemDiv.appendChild(label);

		return itemDiv;
	}

	createCheckbox(questionData) {
		const checkboxId = this.generateCheckboxId(questionData);
		const checkbox = document.createElement('input');

		checkbox.type = 'checkbox';
		checkbox.id = checkboxId;
		checkbox.checked = this.storageService.getStates()[checkboxId] || false;

		checkbox.addEventListener('change', () => {
			this.storageService.setState(checkboxId, checkbox.checked);
		});

		return checkbox;
	}

	createLabel(questionData, checkboxId) {
		const label = document.createElement('label');
		label.htmlFor = checkboxId;
		label.className = 'link-text';

		const link = this.createLink(questionData);
		label.appendChild(link);

		return label;
	}

	createLink(questionData) {
		const link = document.createElement('a');
		const isGoogleSearch = !questionData.url;

		link.href = this.generateUrl(questionData);
		link.target = '_blank';
		link.rel = 'noopener noreferrer';
		link.textContent = this.generateLinkText(
			questionData.q,
			isGoogleSearch
		);

		return link;
	}

	generateUrl(questionData) {
		if (questionData.url) {
			return questionData.url;
		}

		const query = `site:examtopics.com "Exam Associate Cloud Engineer topic 1 question ${questionData.q}"`;
		return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
	}

	generateLinkText(questionNumber, isGoogleSearch) {
		const linkType = isGoogleSearch ? '(Google Search)' : '(ExamTopics)';
		return `Question ${questionNumber} ${linkType}`;
	}

	generateCheckboxId(questionData) {
		const searchType = questionData.url ? 'examtopics' : 'google';
		return `q-${questionData.q}-${searchType}`;
	}

	showError(message) {
		this.container.innerHTML = `<p class="error-message">${message}</p>`;
	}

	resetAllCheckboxes() {
		const checkboxes = this.container.querySelectorAll(
			"input[type='checkbox']"
		);
		checkboxes.forEach((checkbox) => {
			checkbox.checked = false;
		});
	}
}

export default QuestionRenderer;
