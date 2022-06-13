/* Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
cid is a 2D array listing available currency.
The checkCashRegister() function should always return an object with a status key and a change key.
Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)

See below for an example of a cash-in-drawer array:
[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
] */

function checkCashRegister(price, cash, cid) {
  //define the original array of currency units and amounts for later conversion
  let arr = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ]
  //define the sum of cash-in-drawer and change to be returned
  let cid_sum = cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2);
  let change = cash - price, result = {status: "", change: []};
  //if all the cash-in-drawer is to be returned, set status to "CLOSED" and change to the initial cid array
  if (change == cid_sum) {
    result.status = "CLOSED";
    result.change = cid;
  } else {
    result.status = "OPEN";
    //loop through all the arrays included in cid
    for (let i = cid.length - 1; i >= 0; i--) {
      //set amt to be the currency unit and amount of the current cid array
      let amt = arr.filter(curr => curr[0] === cid[i][0])[0];
      //if the current cid array is zero, add the empty cid array to the change property and continue the "for" loop 
      if (cid[i][1] === 0) {
        result.change.push(cid[i]);
        continue;
      //if the (remaining) change is equal or larger than the amount in the cid array, subtract the amount from the change and push the array to the change property
      } else if (change >= cid[i][1]) {
        change = (change - cid[i][1]).toFixed(2);
        result.change.push(cid[i]);
      //if the (remaining) change is between the cid amount and the minimum amount for the unit, subtract the maximum amount of the unit from change and push to the change property
      } else if (change >= amt[1]) {
          amt[1] = Math.floor(change/amt[1]) * amt[1];
          change = (change - amt[1]).toFixed(2);
          result.change.push(amt);
      }
      //as soon as the remaining change is zero, break the "for" loop
      if (change <= 0) break;
    }
  }
  //if the sum of the returned change is not equal to the required change (e.g. because the cid units are too large), set status to "INSUFFICIENT_FUNDS" and change to an empty array
  if (cash - price != result.change.reduce((sum, curr) => sum + curr[1], 0).toFixed(2)) {
    result.status = "INSUFFICIENT_FUNDS";
    result.change = [];
  }
  return result;
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);