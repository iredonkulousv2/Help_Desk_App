import { Paper, Typography, CardContent } from '@mui/material';

const StatusCard = ({ status, count, color }) => {
  return (
    <Paper elevation={3} style={{ flex: 1, minWidth: 0, margin: '10px', background: color }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom style={{ fontWeight: 'bold', color: 'white' }}>
          {status}
        </Typography>
        <Typography variant="body1" color="textSecondary" style={{ color: 'white' }}>
          Total Tickets: {count}
        </Typography>
      </CardContent>
    </Paper>
  );
};

export default StatusCard;