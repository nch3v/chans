import { bind } from 'decko';
import set from 'lodash/set';
import sortBy from 'lodash/sortBy';
import findIndex from 'lodash/findIndex';
import transform from 'lodash/transform';
import { Container, Navbar } from 'reactstrap';
import { createSelector } from 'reselect';
import api from '../shared/api';
import Toolbar from '../shared/components/toolbar';
import Chans from '../shared/components/chans';
import Bouquets from '../shared/components/bouquets';

const filteredChannels = createSelector(
  state => state.channels,
  state => state.selectedBouquet,
  (channels, selectedBouquet) => {
    const sortedChans = sortBy(
      channels,
      chan => chan && chan.bouquets
    );
    return sortedChans;
  }
);

export default class Index extends React.PureComponent {
  static async getInitialProps({ req }) {
    const channels = await api(req).get('channels');
    const bouquetsList = Object.keys(
      channels.reduce(
        (prev, chan) => (chan ? Object.assign({}, prev, chan.bouquets) : {}),
        {}
      )
    );

    return {
      channels,
      bouquetsList
    };
  }

  constructor(props) {
    super();

    const { channels, bouquetsList } = props;

    this.state = {
      channels,
      bouquetsList
    };
  }

  @bind
  async save() {
    const channels = await api().post('channels', this.state.channels);
    this.setState(() => ({ channels }));
  }

  @bind
  addNewBouquet(bouquet) {
    this.setState(prevState => ({
      bouquetsList: [...prevState.bouquetsList, bouquet]
    }));
  }

  @bind
  addNewChannel() {
    this.setState(prevState => ({
      channels: [
        { names: ['New Channel'], bouquets: {} },
        ...prevState.channels
      ]
    }));
  }

  @bind
  onBouquetSelected(value) {
    this.setState(() => ({
      selectedBouquet: value
    }));
  }

  @bind
  update(index, props) {
    this.setState(prevState => {
      const { channels: prevChannels } = prevState;
      const channels = prevChannels.concat();
      const chanIndex = findIndex(channels, chan => chan.index === index);
      const updatedChan = transform(
        props,
        (result, value, key) => {
          set(result, key, value);
        },
        Object.assign({}, channels[chanIndex])
      );

      channels[chanIndex] = updatedChan;

      return {
        channels
      };
    });
  }

  render() {
    const { channels, bouquetsList, selectedBouquet } = this.state;

    return (
      <Container>
        <Toolbar
          save={this.save}
          bouquets={bouquetsList}
          onBouquetSelected={this.onBouquetSelected}
        />

        <h1>Bouquets</h1>
        <Bouquets bouquets={bouquetsList} addNewBouquet={this.addNewBouquet} />

        <h1>Channels</h1>
        <Chans
          chans={filteredChannels(this.state)}
          bouquetsList={bouquetsList}
          selectedBouquet={selectedBouquet}
          onChange={this.update}
          onAdd={this.addNewChannel}
        />
      </Container>
    );
  }
}
