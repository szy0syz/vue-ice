require('babel-core/register')({
  'ignore': [/node_modules/],
  'presets': [
    'stage-3',
    ['latest-node', {
      'target': 'current'
    }]
  ]
})

require('babel-polyfill')
require('./server')
// require('./server/crawler/api')