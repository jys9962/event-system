db = db.getSiblingDB('assignment')

// Create collections
db.createCollection('refreshToken')
db.createCollection('users')
db.createCollection('events')
db.createCollection('eventRewards')
db.createCollection('eventRewardClaims')

db.users.insertOne({
  name: 'admin',
  password: '$argon2id$v=19$m=65536,t=3,p=4$l4M0r7VurxXJFTpmsWEr0Q$DN5OTAGbbGtDtYbB0DKiO75jzJNhqKRrfS7nwNiAs+k'
})
