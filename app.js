const express = require('express');
const app = express();

const stringSimilarity = require('string-similarity');

app.use(express.json()); // Middleware to parse JSON requests
//Testing commit for 2 github accounts

const medicines = [
    { name: "shelcal", price: 100.00 },
    { name: "aspirin", price: 50.00 },
    { name: "buprofen", price: 30.00 },
    { name: "acetaminophen", price: 25.00 },
    { name: "lisinopril", price: 120.00 },
    { name: "metformin", price: 40.00 },
    { name: "atorvastatin", price: 75.00 },
    { name: "amoxicillin", price: 15.00 },
    { name: "albuterol", price: 90.00 },
    { name: "omeprazole", price: 60.00 },
    { name: "losartan", price: 70.00 }
];

app.post('/search-meds', (req, res) => {
    if (req.body && req.body.name) {
        const medicineNameToFind = req.body.name.toLowerCase();

        const matches = stringSimilarity.findBestMatch(medicineNameToFind, medicines.map(medicine => medicine.name.toLowerCase()));
        console.log("Matches ==> ", matches);
        const bestMatch = matches.bestMatch.target;

        if (bestMatch) {
            const foundMedicine = medicines.find(medicine => medicine.name.toLowerCase() === bestMatch);
            console.log("Medicine found:", foundMedicine);
            res.status(201).json({ foundMedicine });
        } else {
            console.log("Medicine not found");
            res.status(404).json({ error: "Medicine not found" });
        }
    } else {
        console.log("Invalid request body");
        res.status(400).json({ error: "Invalid request body" });
    }
});


app.listen(3000);