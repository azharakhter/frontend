// import { TextField } from '@mui/material';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// const DatePicker = ({
//     label,
//     selectedDate,
//     onChange,
//     maxDate = '',
//     minDate = ''
// }) => {
//     return (
//         <TextField
//             label={label}
//             type="date"
//             value={selectedDate}
//             onChange={(e) => onChange(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             InputProps={{
//                 startAdornment: <CalendarMonthIcon sx={{ color: 'text.secondary', mr: 1 }} />,
//             }}
//             inputProps={{
//                 max: maxDate,
//                 min: minDate
//             }}
//             fullWidth
//         />
//     );
// };

// export default DatePicker;
import { TextField } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';

const DatePicker = ({
    label,
    selectedDate,
    onChange,
    maxDate = '',
    minDate = ''
}) => {
    return (
        <TextField
            label={label}
            type="date"
            value={selectedDate}
            onChange={(e) => onChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
                startAdornment: <DateRangeIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            inputProps={{
                max: maxDate,
                min: minDate
            }}
            fullWidth
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper'
                }
            }}
        />
    );
};

export default DatePicker;