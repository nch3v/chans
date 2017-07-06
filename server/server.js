import micro from 'micro';
import next from 'next';
import createMatcher from 'fs-router';

const match    = createMatcher(__dirname);
const { send } = micro;
const isProd   = process.env.NODE_ENV === 'production';
const app      = next({ dev: !isProd });
const handle   = app.getRequestHandler();

app.prepare().then(() => {
  const server = micro(function(req, res) {
    // route all requests starting with /api/ to the controllers under ./api
    if (req.url.indexOf('/api/') !== -1) {
      let matched = match(req);
      if (matched) {
        return matched(req, res);
      }
    }

    // otherwise let nextjs render the page
    return handle(req, res);
  });

  server.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000, production = ' + isProd);
  });
});
