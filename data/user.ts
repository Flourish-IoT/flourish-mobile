export type ConfidenceRating = 1 | 2 | 3;

export const getConfidenceText = (rating: ConfidenceRating) => {
	switch (rating) {
		case 1:
			return 'Low';
		case 2:
			return 'Medium';
		case 3:
			return 'High';
	}
};
