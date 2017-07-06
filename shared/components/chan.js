import React from 'react';
import { FIELDS } from '../constants';
import { InputGroup, InputGroupAddon, Input, ListGroupItem } from 'reactstrap';

class Chan extends React.PureComponent {
  constructor(props) {
    super();

    this.onChange = this.handleOnChange(props.onChange);
  }

  handleOnChange(onChangeCallback) {
    return ({ target: { name: key, value } }) => {
      return onChangeCallback(this.props.chan.index, { [key]: value });
    };
  }

  renderNames() {
    const { chan: { names } } = this.props;
    return (
      <InputGroup>
        <InputGroupAddon>Names</InputGroupAddon>
        <Input name="names" value={names} onChange={this.onChange} />
      </InputGroup>
    );
  }

  renderBouquets() {
    const { chan: { bouquets }, bouquetsList, selectedBouquet } = this.props;
    const list = selectedBouquet ? [selectedBouquet] : bouquetsList;

    return list.map(bouquetName =>
      <InputGroup key={bouquetName}>
        <InputGroupAddon>
          {bouquetName}
        </InputGroupAddon>
        <Input
          type="number"
          name={`bouquets.${bouquetName}`}
          value={bouquets[bouquetName]}
          onChange={this.onChange}
        />
      </InputGroup>
    );
  }

  renderTypes() {
    const { chan: { types } } = this.props;
    return (
      <InputGroup>
        <InputGroupAddon>Types</InputGroupAddon>
        <Input name="types" value={types} onChange={this.onChange} />
      </InputGroup>
    );
  }

  render() {
    return (
      <ListGroupItem>
        {this.renderNames()}
        {this.renderBouquets()}
        {this.renderTypes()}
      </ListGroupItem>
    );
  }
}

export default Chan;
