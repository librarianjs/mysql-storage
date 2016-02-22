# Librarian Mysql Storage

**Note**: This version of `librarian-mysql-storage` is compatible with `librarian` 2.0.0 and above.

**Warning**: Storing files in MYSQL is usually not the greatest idea.
We recommend using something like [a filesystem](https://github.com/librarianjs/fs-storage) or [Amazon S3](https://github.com/librarianjs/s3-storage) for better storage

## Installation

```
$ npm install librarian-mysql-storage
```

## Usage

```js
var express = require('express')
var librarian = require('librarian')
var MysqlStorage = require('librarian-mysql-storage')
var storage = new MysqlStorage(options) // see below

var app = express()
app.use('/files', librarian({
    storage: storage
}))

app.listen(8888, function(){
    console.log('app listening')
})
```

## Options

Options is an object containing any of the following options.

### host

The host to connect to. Defaults to `localhost`.

### port

The port to connect to. Defaults to `3306`.

### database

The database name. Defaults to `librarian`.

### table

The database table for the file records. If you use the [writeSchema](#writeschema) option, one will be created for you with this name. But if you already have a table, make sure it has the correct format.

Field | Type | Notes
----- | ---- | -----
name | VARCHAR(150) | Will store file names (150 is probably long enough, right?)
data | MEDIUMBLOB | Actual file storage (will store 16MB files)

If you need to store larger files, use `LONGBLOB` to store files up to 4GB

### user

The user to connect as. Defaults to `librarian`.

### password (required)

The password to use. Use `''` if you don't want a password.

### writeSchema

Should this plugin attempt to create the database/table for you?
If you set this to true, it should fail gracefully if the database/table already exists.

Defaults to `false`.

### connectTimeout

The amount of milliseconds `init()` will wait for MySQL to come online before failing.

Defaults to `45 * 1000` (milliseconds).

### retryWaitTime

The amount of milliseconds `init()` will wait between connection attempts.

Defaults to `1000` (milliseconds).
