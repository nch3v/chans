import React from 'react';
import Chan from './chan';
import { Form, ListGroup, Button, Input } from 'reactstrap';

const formStyle = {
  padding: '1em'
};

const INITIAL_STATE = {
  bouquetSelect: 'free'
};

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.onBouquetSelectChanged = this.onBouquetSelectChanged.bind(this);
  }

  onBouquetSelectChanged({ target: { value } }) {
    this.setState(() => ({
      bouquetSelect: value
    }));
  }

  render() {
    const {
      chans,
      bouquetsList,
      selectedBouquet,
      onChange,
      onAdd
    } = this.props;

    return (
      <Form style={formStyle}>
        <div>
          <Button onClick={onAdd}>Add channel</Button>
        </div>
        <ListGroup>
          {chans.map(
            (chan) =>
              chan
                ? <Chan
                    key={chan.id}
                    chan={chan}
                    bouquetsList={bouquetsList}
                    selectedBouquet={selectedBouquet}
                    onChange={onChange}
                  />
                : null
          )}
        </ListGroup>
      </Form>
    );
  }
}
