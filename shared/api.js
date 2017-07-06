import fetch from 'isomorphic-fetch';

export default (req, res) => {
  const prefix = req ? 'http://localhost:3000/api/' : 'api/';

  return {
    get: async path => {
      const fullPath = prefix + path;
      const res = await fetch(fullPath);
      return res.json();
    },

    post: async (path, payload) => {
      const fullPath = prefix + path;
      const res = await fetch(fullPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return res.json();
    }
  };
};
