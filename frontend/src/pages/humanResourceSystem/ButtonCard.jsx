import Card from 'react-bootstrap/Card';
import './hr.css'
import Button from 'react-bootstrap/Button';


function DashboardCard(props) {
  return (
    <Card className='cardStyle'>
        <Card.Body>
            <Button className='cardButton'>
                <h1>{props.name}</h1>
            </Button>
        </Card.Body>
    </Card>
  );
}

export default DashboardCard;