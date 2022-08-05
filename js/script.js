
  "use strict";
  let trolley = [];
  let trolleyTotal = 0;
  const trolleyDom = document.querySelector(".trolley");
  const addtotrolleybtnDom = document.querySelectorAll('[data-action="add-to-trolley"]');

  addtotrolleybtnDom.forEach(addtotrolleybtnDom => {
    addtotrolleybtnDom.addEventListener("click", () => {
      const productDom = addtotrolleybtnDom.parentNode.parentNode;
      const product = {
        img: productDom.querySelector(".product-img").getAttribute("src"),
        name: productDom.querySelector(".product-name").innerText,
        price: productDom.querySelector(".product-price").innerText,
        quantity: 1
      };

      const Isintrolley = trolley.filter(trolleyItem => trolleyItem.name === product.name).length > 0;
      if (Isintrolley === false) {
        trolleyDom.insertAdjacentHTML("beforeend", `
<div class="d-flex flex-row shadow-sm card trolley-items mt-2 mb-3 animated flipInX">
  <div class="p-2">
      <img src="${product.img}" alt="${product.name}" style="max-width: 50px;"/>
  </div>
  <div class="p-2 mt-3">
      <p class="text-info trolley_item_name">${product.name}</p>
  </div>
  <div class="p-2 mt-3">
      <p class="text-success trolley_item_price">${product.price}</p>
  </div>
  <div class="p-2 mt-3 ml-auto">
      <button class="btn badge badge-secondary" type="button" data-action="increase-item">&plus;
  </div>
  <div class="p-2 mt-3">
    <p class="text-success trolley_item_quantity">${product.quantity}</p>
  </div>
  <div class="p-2 mt-3">
    <button class="btn badge badge-info" type="button" data-action="decrease-item">&minus;
  </div>
  <div class="p-2 mt-3">
    <button class="btn badge badge-danger" type="button" data-action="remove-item">&times;
  </div>
</div> `);

        if (document.querySelector('.trolley-footer') === null) {
          trolleyDom.insertAdjacentHTML("afterend", `
    <div class="d-flex flex-row shadow-sm card trolley-footer mt-2 mb-3 animated flipInX">
      <div class="p-2">
        <button class="btn badge-danger" type="button" data-action="clear-trolley">Clear Trolley
      </div>
      <div class="p-2 ml-auto">
        <button class="btn badge-dark" type="submit" data-action="check-out">Pay <span class="pay"></span> 
          &#10137;
      </div>
    </div>`);
        }

        addtotrolleybtnDom.innerText = "In the trolley";
        addtotrolleybtnDom.disabled = true;
        trolley.push(product);

        const trolleyItemsDom = trolleyDom.querySelectorAll(".trolley-items");
        trolleyItemsDom.forEach(trolleyItemDom => {

          if (trolleyItemDom.querySelector(".trolley_item_name").innerText === product.name) {

            trolleyTotal += parseInt(trolleyItemDom.querySelector(".trolley_item_quantity").innerText)
              * parseInt(trolleyItemDom.querySelector(".trolley_item_price").innerText);
            document.querySelector('.pay').innerText = trolleyTotal;

            // increase item in the trolley
            trolleyItemDom.querySelector('[data-action="increase-item"]').addEventListener("click", () => {
              trolley.forEach(trolleyItem => {
                if (trolleyItem.name === product.name) {
                  trolleyItemDom.querySelector(".trolley_item_quantity").innerText = ++trolleyItem.quantity;
                  trolleyItemDom.querySelector(".trolley_item_price").innerText = parseInt(trolleyItem.quantity) *
                    parseInt(trolleyItem.price);
                  trolleyTotal += parseInt(trolleyItem.price)
                  document.querySelector('.pay').innerText = trolleyTotal;
                }
              });
            });

            // decrease item in trolley
            trolleyItemDom.querySelector('[data-action="decrease-item"]').addEventListener("click", () => {
              trolley.forEach(trolleyItem => {
                if (trolleyItem.name === product.name) {
                  if (trolleyItem.quantity > 1) {
                    trolleyItemDom.querySelector(".trolley_item_quantity").innerText = --trolleyItem.quantity;
                    trolleyItemDom.querySelector(".trolley_item_price").innerText = parseInt(trolleyItem.quantity) *
                      parseInt(trolleyItem.price);
                    trolleyTotal -= parseInt(trolleyItem.price)
                    document.querySelector('.pay').innerText = trolleyTotal;
                  }
                }
              });
            });

            //remove item from trolley
            trolleyItemDom.querySelector('[data-action="remove-item"]').addEventListener("click", () => {
              trolley.forEach(trolleyItem => {
                if (trolleyItem.name === product.name) {
                  trolleyTotal -= parseInt(trolleyItemDom.querySelector(".trolley_item_price").innerText);
                  document.querySelector('.pay').innerText = trolleyTotal;
                  trolleyItemDom.remove();
                  trolley = trolley.filter(trolleyItem => trolleyItem.name !== product.name);
                  addtotrolleybtnDom.innerText = "Add to trolley";
                  addtotrolleybtnDom.disabled = false;
                }
                if (trolley.length < 1) {
                  document.querySelector('.trolley-footer').remove();
                }
              });
            });

            //clear trolley
            document.querySelector('[data-action="clear-trolley"]').addEventListener("click", () => {
              trolleyItemDom.remove();
              trolley = [];
              trolleyTotal = 0;
              if (document.querySelector('.trolley-footer') !== null) {
                document.querySelector('.trolley-footer').remove();
              }
              addtotrolleybtnDom.innerText = "Add to trolley";
              addtotrolleybtnDom.disabled = false;
            });

            document.querySelector('[data-action="check-out"]').addEventListener("click", () => {
              if (document.getElementById('paypal-form') === null) {
                checkOut();
              }
            });
          }
        });
      }
    });
  });

  function animateImg(img) {
    img.classList.add("animated", "shake");
  }

  function normalImg(img) {
    img.classList.remove("animated", "shake");
  }

  function checkOut() {
    alert("Thank you for shopping. Have a great day!")
    window.location.reload();

  }
