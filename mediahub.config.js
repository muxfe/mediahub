module.exports = {
  "apps": [
    {
      "name": "mediahub",
      "script": "index.js",
      "watch": true,
      "out_file": "/logs/out.log",
      "error_file": "/logs/error.log",
      "max_memory_restart": "1024M"
    }
  ]
}
