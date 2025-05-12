import { Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export default ({DepositSummary,title})=> {
    console.log(DepositSummary)
  return (
    <Card>
        <h6 className="text-center">{title}</h6>
        <Table striped bordered hover>
        
        <thead>
        
          <tr>
            <th>SI</th>
            <th>day</th>
            <th>Total</th>
           
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>Last Day</td>
            <td>{DepositSummary?.lastDay}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Last 7 Days</td>
            <td>{DepositSummary?.last7Days}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Last 30 Days</td>
            <td>{DepositSummary?.last30Days}</td>
          </tr>
          
        </tbody>
      </Table>
    </Card>
  );
}

