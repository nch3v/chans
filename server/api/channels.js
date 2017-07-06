import fs from 'fs.promised';
import pickBy from 'lodash/pickBy';
import { send, json } from 'micro';
import { FIELDS } from '../../shared/constants';
import _ from 'lodash';

const tweakBouquets = (bouquets = {}) => {
  bouquets = _(bouquets)
    .mapValues(_.toInteger)
    .pickBy(index => index > 0)
    .value();

  if (bouquets.free) {
    bouquets['free-canal-panorama'] = bouquets.free;
  }

  return Object.keys(bouquets).length ? bouquets : undefined;
};

const split = str =>
  str && _(str.split(',')).map(s => s.trim()).compact().value();
const join = items => (items ? items.join(', ') : undefined);

const fromDb = channels =>
  _(channels)
    .map((chan, index) => {
      const bouquets = chan && tweakBouquets(chan[FIELDS.BOUQUET]);
      return chan && bouquets
        ? {
            index,
            id: chan[FIELDS.NAME][0],
            names: join(chan[FIELDS.NAME]),
            bouquets,
            types: join(chan[FIELDS.TYPE])
          }
        : null;
    })
    .compact()
    .value();

const toDb = channels => [
  null,
  ..._(channels)
    .map(chan => {
      const bouquets = chan && tweakBouquets(chan.bouquets);
      return chan && bouquets
        ? {
            [FIELDS.NAME]: split(chan.names),
            [FIELDS.BOUQUET]: bouquets,
            [FIELDS.TYPE]: split(chan.types)
          }
        : null;
    })
    .compact()
    .value()
];

let channelsCollection = fromDb(require('../store/channels'));

export const GET = () => {
  console.log(`${channelsCollection.length} channels sent`);
  return channelsCollection;
};

export const POST = async (req, res) => {
  const rawChannels = toDb(await json(req));
  await fs.writeFile(
    __dirname + '/../store/channels.json',
    JSON.stringify(rawChannels)
  );
  channelsCollection = fromDb(rawChannels);
  console.log(`${channelsCollection.length} channels saved`);
  return channelsCollection;
};
