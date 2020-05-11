import React, { Component } from 'react'

// import OverviewWidget from '../../components/OverviewWidget';

export default class PharmacyDashboard extends Component {
  render() {
    return (
      <div>
        {/*<form className="form-inline float-sm-right mt-3 mt-sm-0">
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr value={this.state.filterDate}
                                        onChange={date => { this.setState({ filterDate: date }) }} options={{ mode: "range" }}
                                        className="form-control" />
                                </div>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="primary" className="dropdown-toggle">
                                        <i className='uil uil-file-alt mr-1'></i>Download
                                            <i className="icon ml-1"><ChevronDown /></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Mail className="icon-dual icon-xs mr-2"></Mail>
                                            <span>Email</span>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Printer className="icon-dual icon-xs mr-2"></Printer>
                                            <span>Print</span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <File className="icon-dual icon-xs mr-2"></File>
                                            <span>Re-Generate</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </form>*/}
        {/* <Row>

        </Row> */}
        {/* stats */}
        {/* <Statistics></Statistics> */}

        {/* charts */}
        {/* <Row>
                        <Col xl={3}>
                            <OverviewWidget items={[
                                { title: '121,000', description: 'Total Visitors', icon: Users },
                                { title: '21,000', description: 'Product Views', icon: Image },
                                { title: '$21.5', description: 'Revenue Per Visitor', icon: ShoppingBag }
                            ]}></OverviewWidget>
                        </Col>

                        <Col xl={6}>
                            <RevenueChart />
                        </Col>
                        <Col xl={3}>
                            <TargetChart />
                        </Col>
                    </Row> */}

        {/* charts */}
        {/* <Row>
                        <Col xl={5}>
                            <SalesChart />
                        </Col>
                        <Col xl={7}>
                            <Orders />
                        </Col>
                    </Row> */}
      </div>
    )
  }
}
