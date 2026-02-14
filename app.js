const fs = require("fs")


const readData = () => {
    try {
        const data = fs.readFileSync("data.json").toString()
        return JSON.parse(data)
    } catch {
        return []
    }
}


const writeData = (data) => {
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2))
}


const command = process.argv[2]
const id = process.argv[3]
const firstName = process.argv[4]
const lastName = process.argv[5]
const age = process.argv[6]
const city = process.argv[7]

let people = readData()

if (command === "add") {

    if (people.length >= 10) {
        console.log("You cannot add more than 10 people")
        return
    }

    const person = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        age: age,
        city: city
    }

    people.push(person)
    writeData(people)

    console.log("Person Added Successfully")
}


else if (command === "viewAll") {
    console.log(people)
}

else if (command === "viewOne") {
    const person = people.find(p => p.id === id)

    if (person) {
        console.log(person)
    } else {
        console.log("Person not found")
    }
}


else if (command === "deleteAll") {
    writeData([])
    console.log("All people deleted")
}


else if (command === "deleteOne") {
    const filtered = people.filter(p => p.id !== id)
    writeData(filtered)
    console.log("Person deleted if existed")
}


else if (command === "viewFull") {

    people.forEach(p => {
        console.log(`Full Name: ${p.firstName} ${p.lastName} - City: ${p.city}`)
    })
}

else {
    console.log("Unknown command")
}
