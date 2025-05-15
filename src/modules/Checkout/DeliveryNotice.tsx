// components/DeliveryNotice.tsx
import { Alert, Box, Typography } from '@mui/material';

export default function DeliveryNotice() {
  return (
    <Alert severity="info" sx={{ mb: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        📦 Delivery Schedule Notice
      </Typography>

      <Typography>
        We deliver on <strong>Tuesdays, Thursdays, and Sundays</strong>.
      </Typography>

      <Box mt={1}>
        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
          <li>
            Orders placed on <strong>Sunday</strong> or <strong>Monday</strong> will be delivered on <strong>Tuesday</strong>.
          </li>
          <li>
            Orders placed on <strong>Tuesday</strong> or <strong>Wednesday</strong> will be delivered on <strong>Thursday</strong>.
          </li>
          <li>
            Orders placed on <strong>Thursday</strong>, <strong>Friday</strong>, or <strong>Saturday</strong> will be delivered on <strong>Sunday</strong>.
          </li>
        </ul>
      </Box>

      <Typography mt={2}>
        🕒 Please keep this in mind when placing your order. Contact our support team if you need assistance.
      </Typography>
    </Alert>
  );
}
