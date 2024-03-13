export interface ITask {
	id: string;
	title: string;
	description: string;
	category: string;
	dueDate: string;
	priority: string;
	isComplete: boolean;
}

export interface ITaskFormData {
	title: string;
	description: string;
	dueDate: string;
	priority: string;
}
