import { createSlice } from '@reduxjs/toolkit';
import { addQuiz } from '../quizzes/quizzesSlice';

const initialState = {
    topics: {},
};

export const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        addTopic: (state, action) => {
            const { id, name, icon } = action.payload;
            state.topics[id] = {
                id,
                name,
                icon,
                quizIds: []
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addQuiz, (state, action) => {
            const { id, topicId } = action.payload;
            const topic = state.topics[topicId];
            if (topic) {
                topic.quizIds.push(id);
            }
        })
    }
});

export const { addTopic } = topicsSlice.actions;

export const selectTopics = (state) => state.topics.topics;

export default topicsSlice.reducer;