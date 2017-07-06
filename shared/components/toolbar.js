import React from 'react';
import { bind } from 'decko';
import {
  Button,
  Navbar,
  Nav,
  NavbarBrand,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const INITIAL_STATE = {
  selectedBouquet: undefined
};

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  @bind
  onBouquetClicked({ target: { value } }) {
    this.setState(() => ({
      selectedBouquet: value
    }));

    this.props.onBouquetSelected && this.props.onBouquetSelected(value);
  }

  render() {
    const { save, bouquets } = this.props;
    return (
      <Navbar color="faded" toggleable>
        <NavbarBrand href="/">Channels editor</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <UncontrolledDropdown>
              <DropdownToggle caret>
                {this.state.selectedBouquet || 'All bouquets'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.onBouquetClicked} value={undefined} >All bouquets</DropdownItem>
                {bouquets.map(bouquetName =>
                  <DropdownItem
                    onClick={this.onBouquetClicked}
                    key={bouquetName}
                    value={bouquetName}
                  >
                    {bouquetName}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
          <NavItem>
            <Button onClick={save}>Save</Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
