'use strict'

const makeDb = require( './make-db.js' )
const assert = require('assert')
const fs = require('fs')
const MysqlStorage = require('../')

const TEST_KEY = 'test-key'
const FAKE_KEY = 'fake-key'
const TEST_DATA = fs.readFileSync(__dirname + '/test_upload_image.jpg')
const TEST_TIMEOUT = 10000

describe('MysqlStorage', () => {
  var db = makeDb()
  let plugin = new MysqlStorage({
    host: db.host,
    user: db.user,
    password: db.password,
    port: db.port,
    database: db.database,
    connectTimeout: 60 * 1000,
    writeSchema: true
  })

  it('should init()', function () {
    this.timeout(TEST_TIMEOUT)
    return plugin.init()
  })

  it('should put()', function () {
    this.timeout(TEST_TIMEOUT)
    return plugin.put(TEST_KEY, TEST_DATA)
  })

  it('should get()', function () {
    this.timeout(TEST_TIMEOUT)

    return plugin.get(TEST_KEY).then(fetched => {
      if (TEST_DATA.compare(fetched) !== 0) {
        throw new Error('Data is not the same when fetched')
      }
    })
  })

  it('should return null for a get() of a missing key', function () {
    this.timeout(TEST_TIMEOUT)

    return plugin.get(FAKE_KEY).then(data => {
      assert.equal(data, null)
    })
  })
})
