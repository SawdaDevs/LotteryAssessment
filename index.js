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


fs.createReadStream('entries.csv') //read from this file
    .pipe(csv())
    .on('data', (data) => results.push(data)) //for each line of data (line defined with first line)
    .on('end', () => { //when finished with all lines
        results.forEach(record => {
            let numbers = JSON.parse(record.numbers)
            //filtering records if more than three numbers...
            let winningNumbers = numbers.filter(number=> [...lotteryNumbers].includes(number))
            if(winningNumbers.length>=3){ //if there are three or more winning numbers
                winners.push({name: record.name, numbers: numbers, winning: winningNumbers})
            }
        })
        winners.forEach(winner=>{
            console.log(`${winner.name} is a winner! They had the numbers ${winner.numbers} and won with  the numbers ${winner.winning}. ${winner.name} wins £100!` )
        })
    });


