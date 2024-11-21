import React from 'react';
import { Box, Typography } from '@mui/material';

interface CallData {
  id: string;
  time: string;
  duration: string;
  type: 'incoming' | 'outgoing';
  status: 'completed' | 'in-progress' | 'missed';
}

const CallMonitor: React.FC = () => {
  // Sample data - in production this would come from a service
  const calls: CallData[] = [
    {
      id: '1',
      time: '10:30 AM',
      duration: '5:23',
      type: 'outgoing',
      status: 'completed'
    },
    {
      id: '2',
      time: '11:15 AM',
      duration: '3:45',
      type: 'incoming',
      status: 'completed'
    }
  ];

  return (
    <div className="monitor-section">
      <Typography variant="h6" gutterBottom>
        Call Monitor
      </Typography>
      
      {calls.length === 0 ? (
        <Box sx={{ textAlign: 'center', color: '#666', py: 3 }}>
          No calls recorded yet
        </Box>
      ) : (
        <ul className="call-list">
          {calls.map(call => (
            <li key={call.id} className="call-item">
              <div className="call-header">
                <span className="call-type">
                  {call.type === 'incoming' ? '📞 Incoming' : '📱 Outgoing'}
                </span>
                <span className="call-status" style={{
                  color: call.status === 'completed' ? '#2ecc71' : 
                         call.status === 'in-progress' ? '#3498db' : '#e74c3c'
                }}>
                  {call.status}
                </span>
              </div>
              <div className="call-details">
                <span className="call-time">{call.time}</span>
                <span className="call-duration">Duration: {call.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CallMonitor;
