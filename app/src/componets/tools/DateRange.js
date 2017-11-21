import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const DateRange = (state) => {
    let dateTo = state.to ? new Date(state.to) : null;
    let dateFrom = state.from ? new Date(state.from) : null;

    const onChange = (ev, from, to) => {
        if (state.onChange) {
            state.onChange(ev, from, to);
        }
    };

    return (
        <div>
            <DatePicker
                floatingLabelText="Date from"
                autoOk={true}
                value={dateFrom}
                onChange={(ev, val) => onChange(ev, val)}
            />
            <DatePicker
                floatingLabelText="Date to"
                autoOk={true}
                value={dateTo}
                onChange={(ev, val) => onChange(ev, null, val)}
            />
        </div>

    );
};

export default DateRange;