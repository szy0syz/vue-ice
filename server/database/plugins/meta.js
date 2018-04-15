module.exports = exports = function lastModifiedPlugin(schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      this.meta.updatedAt = Date.now()
    }

    next()
  })
}
