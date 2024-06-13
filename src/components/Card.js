import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pugal from '../assets/pugalgamer.jpg';
import Viwin from '../assets/viwin.jpg';
import Asim from '../assets/asim.jpg';
import Kevin from '../assets/kevinmatthewfranklin.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const UserDataCard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  let userImage;

  // Determine which image to display based on the username
  switch (loggedInUser.username) {
    case 'Pugal':
      userImage = Pugal;
      break;
    case 'Viwin':
      userImage = Viwin;
      break;
    case 'Asim':
      userImage = Asim;
      break;
    case 'Kevin':
      userImage = Kevin;
      break;
    default:
      userImage = '';
  }

  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">
        {[1, 2, 3, 4].map((index) => ( // Map over an array with 4 elements
          <div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={userImage} />
              <Card.Body>
                <Card.Text>
                  Hey, <strong>{loggedInUser.username}</strong>. This "{loggedInUser.password}" is your password.
                </Card.Text>
                <Button variant="primary" onClick={() => navigate('/userprofile')}>Visit Profile</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDataCard;
