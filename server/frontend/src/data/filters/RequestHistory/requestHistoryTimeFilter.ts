const now = new Date();
const then = new Date();
then.setHours(then.getHours() + 24);

export interface RequestHistoryTimeFilter {
    timestampRangeStart: Date,
    timestampRangeEnd: Date
}

const requestHistoryTimeFilter : RequestHistoryTimeFilter = {
    timestampRangeStart: now,
    timestampRangeEnd: then,
}

export default requestHistoryTimeFilter;