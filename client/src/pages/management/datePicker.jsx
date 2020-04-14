import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {ManagementContext as Context} from '../../contexts/managementContext';

export default function DatePicker() {
  
  const [management, setManagement] = React.useContext(Context);

  const handleDateChange = (date) => {
    setManagement({
      ...management,
      selectedDate : date
    });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={management.selectedDate}
          onChange={handleDateChange}
          style={{width : '100%', marginTop : 8}}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />        
      </Grid>
    </MuiPickersUtilsProvider>
  );
}