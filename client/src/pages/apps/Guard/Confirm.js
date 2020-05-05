import React, { Component } from 'react'
import { Row, Col, Button, Spinner } from 'reactstrap';

import userApi from '../../../api/user';
import { getLoggedInUser } from '../../../helpers/authUtils';

class Confirm extends Component {
  constructor(props) {
    super(props);

    const { id, guard } = props.match.params;
    const user = getLoggedInUser();

    this.state = {
      loggedInUser: user,
      userId: id,
      guardId: guard,
      isValid: '',
      isLoaded: false
    };
  }

  checkValidity() {
    // Check user than guard
    userApi.checkUserGuard(this.state.userId, this.state.guardId).then(validation => {
      this.setState({ isValid: validation.check, isPharmacyLoaded: true });
    }).catch((error) => {
      this.setState({ pharmaciesOptions: { value: 0, label: "Aucun agrément trouvé" } });
    });
  }

  componentDidMount() {
    this.checkValidity();
  }

  render() {
    return (
      <Row>
        {!this.state.isPharmacyLoaded ?
          <Col md={12} className="mx-auto mt-5">
            <div className="d-flex justify-content-center">
              <Spinner key="2" className="m-2" color="primary" />
            </div>
          </Col> :
          <Col md={8} className="mx-auto mt-5">
            <div>
              <div className="mt-2 p-2">
                {this.state.isValid === 'success' ?
                  <div className="alert alert-success" role="alert">
                    <p className="text-center">Votre acceptation de garde a bien été prise en compte !</p>
                    <div className="mt-3 d-flex justify-content-center">
                      {!this.state.loggedInUser ?
                        <Button href="/account/login" color="outline-secondary" key="1">
                          Me connecter à mon espace
                      </Button> :
                        <Button href="/guards/list" color="outline-secondary" key="1">
                          Revenir à la liste des gardes
                      </Button>}
                    </div>
                  </div> :
                  <div className="alert alert-danger" role="alert">
                    <p className="text-center">Ce lien n'est pas valide.</p>
                  </div>}
              </div>
            </div>
          </Col>}
      </Row>
    )
  }
}

export default Confirm;
