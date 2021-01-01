import { combineReducers } from 'redux';
import { auth } from './auth';
import { courseDirector } from './courseDirector';

export * from './auth';
export * from './courseDirector';

export const rootReducer = combineReducers({
    auth,
    courseDirector,
});

export type FullState = ReturnType<typeof rootReducer>;
