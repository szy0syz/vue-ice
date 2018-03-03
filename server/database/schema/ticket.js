// 管理微信公众号全局票据 Schema
const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
  name: String, // 票据名称
  ticket: String,
  expires_in: Number,
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

// mongoose的一个中间件，每次往数据库写入前执行这个中间件
TicketSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

// ticket票据的静态方法，静态方法可以拿到model后直接调用，它属于整个类的~
TicketSchema.statics = {
  async getTicket() {
    const ticket = await this.findOne({
      name: 'ticket'
    }).exec()

    if (ticket && ticket.ticket) {
      ticket.ticket = ticket.ticket // 对外提供统一的数据对象
    }

    return ticket
  },
  async saveTicket(data) {
    console.log('我是token实例', data)
    let ticket = await this.findOne({
      name: 'ticket'
    }).exec()
    // 从服务器拿到ticket后保存到数据库
    if (ticket) {
      ticket.ticket = data.ticket
      ticket.expires_in = data.expires_in
    } else {
      ticket = new Ticket({
        name: 'ticket',
        ticket: data.ticket,
        expires_in: data.expires_in
      })
    }

    try {
      await ticket.save()
    } catch (e) {
      console.log('存储Ticket失败!!!')
      console.error(e)
    }

    return data
  }
}

// 获取Ticket的数据模型
const Ticket = mongoose.model('Ticket', TicketSchema)
