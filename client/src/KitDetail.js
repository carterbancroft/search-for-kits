import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function KitDetail({kitId, tracking}) {
  return (
    <Card variant="outlined" sx={{ width: 300 }}>
      <CardContent>
        <p><strong>Kit ID:</strong> {kitId}</p>
        <p><strong>FedEx Tracking:</strong> <a href={`https://www.fedex.com/fedextrack/?tracknumbers=${tracking}`} target="_blank">{tracking}</a></p>
      </CardContent>
    </Card>
  ) 
}

export default KitDetail;
