import React, { Component } from 'react';

/**
 * Renders the Footer
 */
class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            &copy; OhMyGarde, 2020 - Tous droits réservés <i className='uil uil-heart text-danger font-size-12'></i>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
