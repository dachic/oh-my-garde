import React, { Component } from 'react';
import { getLoggedInUser } from '../../../helpers/authUtils';

import hospitalApi from '../../../api/hospital';
import agrementApi from '../../../api/agrement';
import internshipApi from '../../../api/internship';

class EditInternship extends Component {
  constructor(props) {
    super(props);
    const loggedInUser = getLoggedInUser();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      status: '',
      pharmaciesOptions: {},
      agrementsOptions: {},
      agrements: [],
      selectedAgrements: [],
      hospital: '',
      selectedPharmacy: '',
      errorSelect: {},
      errorApi: '',
      user: `api/users/${loggedInUser.id}`
    };
  }

  handleSubmit(event, errors, values) {
    this.setState({ errors, values });

    if (!errors.length) {
      if (!this.state.agrements.length) {
        this.setState({ errorSelect: { agrement: "vous devez sélectionner au moins un argument" } });
        return;
      }
      else if (this.state.hospital === '') {
        this.setState({ errorSelect: { hospital: "vous devez sélectionner un hôpital" } });
        return;
      }
      else {
        let form = this.state.values;
        let agrements = this.state.agrements;
        let hospital = this.state.hospital;
        form.user = this.state.user;
        form.agrements = agrements;
        form.hospital = hospital;
        form = JSON.stringify(form, null, 2);
        internshipApi.add(form).then(pharmacy => {
          document.getElementById("internship-form").reset();
          this.setState({ status: 'Les expériences ont bien été ajoutées' });
        }).catch((error) => {
          this.setState({ errorApi: error.error });
        });
      }
    }
  }

  loadPharmaciesFromServer() {
    hospitalApi.getAll().then(pharmacyList => {
      let options = [];
      Object.keys(pharmacyList).forEach(function (key) {
        options.push({ value: pharmacyList[key]['id'], label: pharmacyList[key]['name'] });
      });
      this.setState({ pharmaciesOptions: options });
    }).catch((error) => {
      console.log(error.error);
      this.setState({ pharmaciesOptions: { value: 0, label: "Aucun hôpital trouvé" } });
    });
  }

  loadAgrementsFromServer() {
    agrementApi.getAll().then(pharmacyList => {
      let options = [];
      Object.keys(pharmacyList).forEach(function (key) {
        options.push({ value: pharmacyList[key]['id'], label: pharmacyList[key]['name'] });
      });
      this.setState({ agrementsOptions: options });
    }).catch((error) => {
      console.log(error);
      this.setState({ pharmaciesOptions: { value: 0, label: "Aucun agrément trouvé" } });
    });
  }

  handleSelectedAgrement = e => {
    let tab = [];
    if (e) {
      this.setState({
        errorSelect: {}
      });
      Object.keys(e).forEach(function (key) {
        tab.push(`api/agrements/${e[key]['value']}`);
      });
      this.setState({ agrements: tab, selectedAgrements: e });
    } else {
      this.setState({ errorSelect: { agrement: "vous devez sélectionner au moins un argument" }, agrements: [], selectedAgrements: e });
    }
  }

  handleSelectedPharmacy = e => {
    if (e) {
      this.setState({ hospital: `api/hospitals/${e.value}`, selectedPharmacy: e, errorSelect: {} });
    } else {
      this.setState({ hospital: '', errorSelect: { hospital: "vous devez sélectionner un hôpital" }, selectedPharmacy: e });
    }
  }
  componentDidMount() {
    this.loadPharmaciesFromServer();
    this.loadAgrementsFromServer();
  }

  render() {
    return <React.Fragment>
    
        TEST
   
    </React.Fragment >
  }
}

export default EditInternship;
