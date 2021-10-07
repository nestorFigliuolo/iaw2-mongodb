const { MongoClient } = require('mongodb')

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'peliculas'

async function main () {
  // Use connect method to connect to the server
  await client.connect()
  console.log('Conectado al server.')
  const db = client.db(dbName)
  const collection = db.collection('peliculas')

  console.log('Vaciando coleccion...')
  await collection.deleteMany({})
  console.log('---------------------------------------------------------------------')

  console.log('Insertando peliculas...')
  await collection.insertMany([
    {
      nombre: 'Día de la Independencia',
      debut: 1996,
      actores: [
        'Jeff Goldblum',
        'Will Smith',
        'Bill Pullman',
        'Margaret Colin'
      ]
    },
    {
      nombre: '¡Marcianos al ataque!',
      debut: 1996,
      actores: [
        'Jack Nicholson',
        'Glenn Close',
        'Annette Bening',
        'Pierce Brosnan'
      ]
    },
    {
      nombre: 'Interestelar',
      debut: 2014,
      actores: [
        'Matthew McConaughey',
        'Anne Hathaway',
        'Jessica Chastain',
        'Bill Irwin'
      ]
    },
    {
      nombre: 'Dune',
      debut: 2021,
      actores: [
        'Timothée Chalamet',
        'Rebecca Ferguson',
        'Dave Bautista',
        'Stellan Skarsgård'
      ]
    },
    {
      nombre: 'The Martian',
      debut: 2015,
      actores: [
        'Matt Damon',
        'Jessica Chastain',
        'Kristen Wiig',
        'Jeff Daniels'
      ]
    }
  ])
  console.log(await collection.find({}).toArray())
  console.log('---------------------------------------------------------------------')
  console.log('insertando campo boxoffice...')
  await collection.updateMany({}, { $set: { boxoffice: 0 } })
  console.log(await collection.find({}).toArray())

  console.log('---------------------------------------------------------------------')
  console.log('Reemplazando Interestelar por Elysium')
  await collection.replaceOne({ nombre: 'Interestelar' }, {
    nombre: 'Elysium',
    debut: 2014,
    actores: [
      'Matt Damon',
      'Jodie Foster',
      'Sharlto Copley',
      'Alice Braga'
    ],
    boxoffice: 0
  })
  console.log(await collection.find({}).toArray())

  console.log('---------------------------------------------------------------------')
  console.log('Recuperando peliculas pre 2015...')
  console.log(await collection.find({ debut: { $lte: 2015 } }).toArray())

  console.log('---------------------------------------------------------------------')
  console.log('Quitando boxoffice de The Martian...')
  await collection.updateOne({ nombre: 'The Martian' }, { $unset: { boxoffice: 0 } })
  console.log(await collection.findOne({ nombre: 'The Martian' }))

  // the following code examples can be pasted here...
  console.log('---------------------------------------------------------------------')
  return 'Terminado.'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close())
