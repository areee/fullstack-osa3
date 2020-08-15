const mongoose = require('mongoose')

if (process.argv.length < 3) {
  // ei edes salasanaa annettu
  console.log('give password as an argument')
  process.exit(1)
} else if (process.argv.length === 4 || process.argv.length > 5) {
  // tuntematon komento
  console.log('you gave an unknown command')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.hwizz.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  // esim. node mongo.js yourpassword Anna 040-1234556
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  // esim. node mongo.js yourpassword
  console.log('phonebook:')
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
