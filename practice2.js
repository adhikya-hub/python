const data = require("./data2.json")
console.log(data.company)

// 1.
// Given a company dataset, print total salary for each department sorted by highest salary first.

// Output Example:
// Engineering: 240000
// Design: 138000
// HR: 75000
function q1() {
  res=[]
  data.departments.forEach(dept => {
    const ans = {}
      ans[dept.name]=dept.employees.reduce((acc, emp) => {
      acc += emp.salary
      return acc
    }, 0)
    res.push(ans)
  })
  return res.sort((a,b)=>(Object.values(a)[0]-Object.values(b)[0]))
}
console.log(q1())

// 2.Using monthlyRevenue and monthlyExpenses arrays, print all months where profit is greater than 50000.

// Output Example:
// Month 1: 60000
// Month 2: 52000

for (let i = 0; i < data.monthlyRevenue.length; i++){
  const profit = data.monthlyRevenue[i] - data.monthlyExpenses[i];
  if ( profit> 50000) {
    console.log(`Month ${i}: ${profit}`)
  }
}



// 3.Print all unique employee skills from all departments in alphabetical order, one per line.

res = new Set()

for (let dept of data.departments) {
  for (let emp of dept.employees) {
    if (emp.skills) {
      for (let skill of emp.skills) {
        res.add(skill)
      }
    }
  }
}
for (let val of res) {
  console.log(val)
}
// 4.Given input user count, print the cheapest matching subscription plan name and price.

// Input:
// 20
// Output:
// Pro - 2499
// "subscriptionPlans": [
//   { "plan": "Basic", "price": 999, "usersLimit": 5 },
//   { "plan": "Pro", "price": 2499, "usersLimit": 25 },
//   { "plan": "Enterprise", "price": 9999, "usersLimit": 999 }
// ]

function sp(l) {

  ans = {
    "plan": "",
    "price": Infinity,
    "usersLimit": Infinity,
  }
  for (let p of data.subscriptionPlans) {
    if (p.usersLimit >= l && p.price < ans.price) {
      ans={...p}
    }
  }
  console.log(`${ans.plan} - ${ans.price}`)
}
sp(20)
// 5.Given a search keyword, print matching employees whose name, designation, or skills contain the keyword (case insensitive), in format: Name - Department

// Input:
// react
// Output:
// Rahul - Engineering

// "employees": [
//   { "empId": 201, "name": "Asha", "designation": "UI Designer", "skills": ["Figma", "UI/UX"], "salary": 70000 },
//   { "empId": 202, "name": "Niharika", "designation": "UX Researcher", "skills": ["Research", "Wireframing"], "salary": 68000 }
// ]

function mS(arr,key) {
  for (let skill of arr) {
    if (skill.includes(key)) {
      return true
    }
  }
  return false
}
function sr(key) {
  key = key.toLowerCase()
  for (let dept of data.departments) {
    for (let emp of dept.employees) {
      let name = (emp.name).toLowerCase();
      let designation = (emp.designation).toLowerCase()
      let skills = [];
      if (emp.skills) {
        skills = emp.skills.map(s => s.toLowerCase())
      }


      if (name.includes(key) || designation.includes(key) || mS(skills,key)) {
        console.log(`${emp.name} -${emp.designation} `)
      }

    }
}


}
sr("ar")
