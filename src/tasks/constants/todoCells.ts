import { types } from '../../constants';

// The Grid component require these values to build the component.
export const todoCells = [
  { name: 'Description', value: 'description', type: types.STRING },
  { name: 'Completed', value: 'completed', type: types.BOOLEAN },
  { name: 'Completed at', value: 'completedAt', type: types.TIMESTAMP }
];