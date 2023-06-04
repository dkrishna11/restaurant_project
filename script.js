let menu=document.getElementsByClassName("container")[0];
let place=document.getElementsByClassName("placed")[0];

async function getMenu(){
    menu.innerHTML="";
    try{
        let reponse=await fetch("https://avivashishta29.github.io/f2-contest-test/db.json");
        let result =await reponse.json();

        for(let i=0;i<result.length;i++){
            let data=result[i];
            let menuOrder=document.createElement("div");
            let innerContent=`
            <p>${data.name}</p>
            <img src=${data.imgSrc} alt=${data.name}>
            <p>$${data.price}</P>`;
            
            menuOrder.className="menu-details";
            menuOrder.innerHTML=innerContent;
            menu.append(menuOrder);
        }
    }
    catch(Error){
        console.log("GetMenu Error", Error);
    }
}
let arr=[];



// ---------------Take Order-----------
function TakeOrder() {
    place.innerHTML="";
    return new Promise((resolve) => {
      setTimeout(() => {
        const burgers = ['Cheeseburger', 'Pizza', 'Tacos', 'Sushi', 'Pasta', 'Fried Chicken', 'Grilled Cheese Sandwich', 'Steak', 'Caesar Salad', 'Fish and Chips', 'Ramen', 'Burrito', 'Pho', 'Pad Thai', 'Gyro', 'Ice Cream', 'Smoothie', 'Apple Pie', 'Chocolate Cake', 'Pancakes', 'Cupcake', 'Crepes', 'Club Sandwich', 'Falafel', 'Curry']
        const order = {
          burgers: burgers.sort(() => 0.5 - Math.random()).slice(0, 3)
        };
        arr=order.burgers;
        fetch('https://avivashishta29.github.io/f2-contest-test/db.json')
         .then(response => response.json()).then(result =>{
            for(let i=0;i<arr.length;i++){
                for(let j=0;j<result.length;j++){
                    if(arr[i]===result[j].name){
                        let data=result[j];
                        let placedOrder=document.createElement("div");
                        let innerContent=`
                        <p>${data.name}</p>
                        <img src=${data.imgSrc} alt=${data.name}>
                        <p>$${data.price}</P>`;
                        
                        placedOrder.className="placed-details";
                        placedOrder.innerHTML=innerContent;
                        place.append(placedOrder);
                    }
                }
            }
        })
        resolve(order);
      }, 2500);
    });
  }
    
  // Function for order preparation
  function orderPrep() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: false });
      }, 1500);
    });
  }
  
  // Function for payment
  function payOrder() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ order_status: true, paid: true });
      }, 1000);
    });
  }
  
  // Function to display a thank you message
  function thankyouFnc() {
    alert("Thank you for eating with us today!");
  }
  
  // Function to handle the tasks sequentially using async/await

  async function place_order() {
    const order = await TakeOrder();
    console.log("Order:", order);
    const orderStatus = await orderPrep();
    console.log("Order_Preparation status:", orderStatus);
  }
  
  // Run the pay flow
  async function pay(){
        const paymentStatus = await payOrder();
        console.log("Payment_Order status:", paymentStatus);
        if(paymentStatus.paid===true)
        thankyouFnc();
  }
 


getMenu();
document.getElementById('placeOrder').addEventListener('click', place_order);
document.getElementById('payOrder').addEventListener('click', pay);
