module.exports = [

  {

    method: `GET`,
    path: `/{param*}`,

    config:{
      cache:{
        expiresIn: 31536000,
        privacy: 'private'
      }
    },

    handler: {
      file: `index.html`
    }

  },

  {

    method: `GET`,
    path: `/manifest.json`,
    config:{
      cache:{
        expiresIn: 31536000,
        privacy: 'private'
      }
    },

    handler: {
      file: `manifest.json`
    }

  },

  {

    method: `GET`,
    path: `/js/{param*}`,
    config:{
      cache:{
        expiresIn: 31536000,
        privacy: 'private'
      }
    },

    handler: {
      directory: {
        path: `./js`
      }
    }

  },

  {

    method: `GET`,
    path: `/css/{param*}`,
    config:{
      cache:{
        expiresIn: 31536000,
        privacy: 'private'
      }
    },

    handler: {
      directory: {
        path: `./css`
      }
    }

  },

  {

    method: `GET`,
    path: `/assets/{param*}`,
    config:{
      cache:{
        expiresIn: 31536000,
        privacy: 'private'
      }
    },

    handler: {
      directory: {
        path: `./assets`
      }
    }

  },

  {

    method: `GET`,
    path: `/uploads/{param*}`,
    config:{
      cache:{
        expiresIn: 31536000,
        privacy: 'private'
      }
    },

    handler: {
      directory: {
        path: `../uploads`
      }
    }

  },

  {

    method: `GET`,
    path: `/social/{param*}`,
    config:{
      cache:{
        expiresIn: 31536000,
        privacy: 'private'
      }
    },

    handler: {
      directory: {
        path: `./assets/social`
      }
    }

  }

];
