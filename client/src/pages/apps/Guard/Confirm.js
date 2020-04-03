import React, { Component } from 'react'
import { Row, Col, Button, Spinner } from 'reactstrap';
import confirmApi from '../../../api/confirm';

class Confirm extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const guardId = urlParams.get('guard');

    this.state = {
      userId: userId,
      guardId: guardId,
      isValid: '',
      isLoaded: false
    };
  }

  checkValidity() {
    // Check user than guard
    confirmApi.checkUserGuard(this.state.userId, this.state.guardId).then(validation => {
      this.setState({ isValid: validation.check, isPharmacyLoaded: true });
    }).catch((error) => {
      this.setState({ pharmaciesOptions: { value: 0, label: "Aucun agrément trouvé" } });
    });
  }

  componentWillMount() {
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
                      <Button href="/account/login" color="outline-secondary" key="1">
                        Me connecter à mon espace
                  </Button>
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
