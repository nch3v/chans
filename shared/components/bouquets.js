import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

const INITIAL_STATE = {
  newBouquet: ''
};

export default class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.onChange = this.onChange.bind(this);
    this.addNewBouquet = this.addNewBouquet.bind(this);
  }

  onChange({ target: { value } }) {
    this.setState(() => ({
      newBouquet: value
    }));
  }

  addNewBouquet() {
    this.props.addNewBouquet(this.state.newBouquet);
    this.setState(() => INITIAL_STATE);
  }

  render() {
    const { bouquets } = this.props;
    const { newBouquet } = this.state;
    return (
      <div>
        <ol>
          {bouquets.map(b =>
            <li key={b}>
              {b}
            </li>
          )}
        </ol>
        <InputGroup>
          <Input
            value={newBouquet}
            placeholder="Add bouquet"
            onChange={this.onChange}
          />
          <InputGroupAddon>
            <Button onClick={this.addNewBouquet}>Add bouquet</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}
