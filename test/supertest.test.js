import chai from 'chai'
import mongoose from 'mongoose'
import supertest from 'supertest'
import __dirname from '../src/path.js'

const expect = chai.expect

await mongoose.connect(`mongodb+srv://franciscopugh01:@cluster0.uggkmbj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)

const requester = supertest('http://localhost:8080')
describe('Test CRUD de usuarios en la ruta /api/pets', function () {
        it('Ruta: api/pets metodo GET', async() => {
            const ok= await requester.get('api/pets')
            console.log(ok)
            expect(ok).to.be.ok
        })
// OJO!!!! COMENTAR LO QUE NO CORRESPONDA PROBAR*************
        it('Ruta: api/pets metodo POST', async() => {
            const nwPet = {
                name: "Panchito",
                specie: "Gato",
                birthDate: '12-25-2022'
            }
            const {statusCode, _body, ok } = await requester.post('/api/pets').send(newPet)
            expect(ok).to.be.ok
            expect(statusCode).to.be.equal(200)
            expect(_body.status).to.be.equal('success')
        })
        it('Ruta: api/pets metodo PUT', async() => {
            const id  = 'poner el id a modificar'
            const updatePet = {
                name: "Naranjito",
                specie: "Gato",
                birthDate: '12-25-2022'
            }
            const {statusCode} = await requester.put('/api/pets/${id}').send(updatePet)
            expect(statusCode).to.be.equal(200)
            
        })
        it('Ruta: api/pets metodo DELETE', async() => {
            const id  = 'poner el id a modificar'
            
            const {statusCode} = await requester.delete('/api/pets/${id}')
            expect(statusCode).to.be.equal(200)
            
        })
        it('Ruta: api/pets/withimage metodo post', async() => {
            const newPet = {
                name: "Jenjibre",
                specie: "Gato",
                birthDate: '10-01-2022'
            }

            
            const {statusCode, _body, ok} = await requester.post('/api/pets/withimage}')
            .field('name',newPet.name)
            .field('specie',newPet.specie)
            .field('birthDate',newPet.birthDate)
            .field('image',`${__dirname}/public/img/jenjibre.jpg`)


            expect(_body.payload).to.have.property('_id')
            expect(_body.payload.image).to.be.ok
        })


})