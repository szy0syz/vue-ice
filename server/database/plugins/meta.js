module.exports = exports = function lastModifiedPlugin(schema) {
  schema.pre('save', function (next) {
    if (this.isNew) {
      this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
      // ☆ 郑重提示：mongoose对于数据会执行 save 中间件length次
      if (this.meta && this.meta.updatedAt) {
        this.meta.updatedAt = Date.now()
      }
    }

    next()
  })
}
