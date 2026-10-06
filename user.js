const data = require("./users-dataset.json");
//user-dataset.json

// 1. Create a Summary of All Unique Tech Used Across Projects

// Output:
// [
//     {
//         "technology": "GraphQL",
//         "used_in": "3 projects"
//     },
//     {
//         "technology": "TypeScript",
//         "used_in": "2 projects"
//     },
//     {
//         "technology": "Kubernetes",
//         "used_in": "4 projects"
//     },
//     {
//         "technology": "MongoDB",
//         "used_in": "6 projects"
//     },
//     ...
// ]

function q1() {
  let res = {}
  for (let user of data) {
    for (let job of user.employment) {
      for (let proj of job.projects) {
        for (let tech of proj.technologies) {
          console.log(tech)
          if (!res[tech]) {
            res[tech]=0
          }
          res[tech]++

        }
      }
    }
  }
  console.log(res)
  let final = []
  for (let [k,v] of Object.entries(res)){
    final.push({
      "technology": k,
      "used_in": `${v} projects`,
    })
  }
  console.log(JSON.stringify(final,null,2))
}
q1()

// 2. Group Users by Country of Their Home Address

// {
//     "mali": ["Maria Grant", "Rhonda Spears"],
//     "Saint Barthelemy": ["firstname lastname", "firstname lastname"],
//     ....
// }

// 3. Write a function called "waitTimer()". This should print numbers from 1 to 10 each after a delay of k number of seconds after printing last number, where k is the number it is printing.

// For eg:
// 1 // prints after delay of 1 sec
// 2 // prints after delay of 2 sec after printing 1
// 3 // prints after delay of 3 sec after printing 2
// ...
// ...
// and so on.

// let delay=0
// for (let i = 1; i <= 5; i++){
//   delay+=i*1000
//   setTimeout(() => {
//     console.log(i)
//   }, delay)
// }

// 4. Write a function createCountdown that takes an initial number and returns a function.
// Each time the returned function is called, it should decrement the number by 1 and log it.
// When the count reaches zero, the function should log "Countdown complete!" and do nothing on further calls.

function createCountdown(num) {
  return function () {
    num--;
    if (num > 0) {

      console.log(num);
    }
    else if (num == 0) {
      console.log("Countdown complete!")
    }
    else {
      return
    }
  }

}
const c=createCountdown(4)
c()
c()
c()
c()
c()
c()
c()



// **5. give a newConfig using original config where ram is 16gb, print both original and new config**

const originalConfig = {
name: 'Macbook',
processor: 'M2',
memory: {
  ram: '8 gb',
  ssd: '512gb'}
}
// const newConfig = { ...originalConfig, memory:{
//   ...originalConfig.memory, ram: '16 gb',
// }}
// console.log(originalConfig, newConfig)

const newConfig = structuredClone(originalConfig);

newConfig.memory.ram = "16 gb";

console.log(originalConfig);
console.log(newConfig);
// **6. create a function createPower(base)
// createPower should return a function using which following can be obtained**

// for eg:
// const powerOfTwo = createPower(2);
// console.log(powerOfTwo(3)); // Should output 8 (2^3)

// const powerOfThree = createPower(3);
// console.log(powerOfThree(3)); // Should output 27 (3^3)
