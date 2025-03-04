import express from "express"

const app = express()
const port = 8000

app.use(express.json())

let productData = []
let nextId = 1

// Add a new product
app.post('/product', (req, res) => {
    const { name, price } = req.body
    const newProduct = { id: nextId++, name, price }
    productData.push(newProduct)
    res.status(201).send(newProduct)
})

// Get the list of products
app.get('/product', (req, res) => {
    res.status(200).send(productData)
})

// Get a single product 
app.get('/product/:id', (req, res) => {
    const product = productData.find(t => t.id === parseInt(req.params.id))

    if (!product) {
        return res.status(404).send("404 Product Not Found!")
    }
    res.status(200).send(product)
})

// Update existing products

app.put('/product/:id', (req, res) => {
    const product = productData.find(t => t.id === parseInt(req.params.id))

    if (!product) {
        return res.status(404).send("404 Product Not Found!")
    }

    const {name, price} = req.body
    product.name = name
    product.price = price
    res.status(200).send(product)
})

// Delete existing product 
app.delete('/product/:id', (req, res) => {
    const index = productData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
       return  res.status(404).send("404 Product Not Found!")
    }
    productData.splice(index, 1)
    return res.status(200).send("Deleted")

})





















// app.get("/", (req, res) => {
//     res.send("Hello Node from Rahul.")
// })
// app.get("/about", (req, res) => {
//     res.send("This is about page.")
// })
// app.get("/shop", (req, res) => {
//     res.send("Shopping")
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)

})