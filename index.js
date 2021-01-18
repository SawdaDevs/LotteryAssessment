//read csv file into my program 
//generate lottery numbers 1-9

//checks if each person has at least three lotttery numbers - if so they are a winner
//log out the winning numbers, number of winners, names of winners and thier numbers - they win £100
//if there are no winners only the lottery numbers get logged out, number of winners is 0

const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let winners =[];
let lotteryNumbers = new Set()
while (lotteryNumbers.size < 6) {
    lotteryNumbers.add(Math.ceil(Math.random() * 9))
    //give me a number between 1 and 9
}
console.log("these are the lottery numbers", ...lotteryNumbers)

//console.log(JSON.parse("[4,3,9,2,7,5]"))


fs.createReadStream('entries.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        // console.log(results);
        // [
        // {name: "Laurianne Wuckert", numbers: "[4,3,9,2,7,5]"},
        // {name: "Mrs. Jeramie Glover", numbers: "[5,1,4,6,2,8]"}
        // ] array of objects
        results.forEach(record => {
            let numbers = JSON.parse(record.numbers)
            //filtering records if more than three numbers...
            // console.log("now on", numbers)
            let newArray = numbers.filter(number=> [...lotteryNumbers].includes(number))
            // console.log("new array ",newArray)
            if(newArray.length>=3){
                winners.push({name: record.name, numbers: numbers, winning: newArray})
            }
        })
        winners.forEach(winner=>{
            console.log(`${winner.name} is a winner! They had the numbers ${winner.numbers} and won with  the numbers ${winner.winning}. They win £100!` )
        })

    });


