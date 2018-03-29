const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000 // 20mins

const Schema = mongoose.Schema

const UserSchema = new Schema({
  // 用户角色：user admin superAdmin
  role: {
    type: String,
    default: 'user'
  },

  openid: [String],
  unionid: String,
  nickName: String,
  address: String,
  province: String,
  country: String,
  city: String,
  gender: String,
  email: String,
  password: String,
  hashed_password: String,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 虚拟字段，没有实际存入数据库中，类似计算字段
UserSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

UserSchema.pre('save', function (next) {
  let user = this
  // 如果密码没变，就跳过。
  if (user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (err) return next(error)

      user.password = hash

      next()
    })
  })
})

UserSchema.methods = {
  comparePassword: function (_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, function (err, isMatch) {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },

  incLoginAttempts: function (user) {
    const that = this
    return new Promise((resolve, reject) => {
      if (that.lockUntil && that.lockUntil < Date.now()) {
        that.update(
          {
            $set: {
              loginAttempts: 1
            },
            $unset: {
              lockUntil: 1
            }
          },
          function (err) {
            if (!err) resolve(true)
            else reject(err)
          }
        )
      } else {
        let updates = {
          $inc: {
            // 自增1
            loginAttempts: 1
          }
        }
        // 分开更新：如果已经到最大试错次数，且账号没锁定，就自增1和增加锁定时间
        // 否则就只自增1
        if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }

        that.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}

mongoose.model('User', UserSchema)
