class Hamburger {
    constructor(size, stuffing) {
      this.size = size;
      this.stuffing = stuffing;
      this.toppings = [];
    }
  
    static SIZE_SMALL = { price: 50, calories: 20 };
    static SIZE_LARGE = { price: 100, calories: 40 };
    static STUFFING_CHEESE = { price: 10, calories: 20 };
    static STUFFING_SALAD = { price: 20, calories: 5 };
    static STUFFING_POTATO = { price: 15, calories: 10 };
    static TOPPING_MAYO = { price: 20, calories: 5 };
    static TOPPING_SAUCE = { price: 15, calories: 0 };
  
    addTopping(topping) {
      this.toppings.push(topping);
    }
  
    calculatePrice() {
      const totalPrice = this.size.price + this.stuffing.price;
      const toppingPrice = this.toppings.reduce((acc, topping) => acc + topping.price, 0);
      return totalPrice + toppingPrice;
    }
  
    calculateCalories() {
      const totalCalories = this.size.calories + this.stuffing.calories;
      const toppingCalories = this.toppings.reduce((acc, topping) => acc + topping.calories, 0);
      return totalCalories + toppingCalories;
    }
  }

const chooseSizeButtons = document.querySelectorAll('.choose__size');
const stuffRadios = document.querySelectorAll('input[name="choose__stuff"]');
const toppingCheckboxes = document.querySelectorAll('input[name="choose__topping"]');
const calculateButton = document.querySelector('.hamburger__checkPrice button');

//DataBase :)
let selectedSize = '';
let selectedStuff = '';
const selectedToppings = [];

chooseSizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.hamburger__heading_2').style.display = 'block';
        document.querySelector('.hamburger__stuff').style.display = 'block';
        selectedSize = button.value;
    });
});

stuffRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        document.querySelector('.hamburger__heading_3').style.display = 'block';
        document.querySelector('.hamburger__topping').style.display = 'block';
        document.querySelector('.hamburger__checkPrice').style.display = 'flex';
        selectedStuff = radio.value;
    });
});

toppingCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const selectedTopping = checkbox.value;

        if (checkbox.checked) {
            selectedToppings.push(selectedTopping);
        } else {
            const index = selectedToppings.indexOf(selectedTopping);
            if (index !== -1) {
                selectedToppings.splice(index, 1);
            }
        }
    });
});

calculateButton.addEventListener('click', () => {
    const sizeObject = selectedSize === 'small' ? Hamburger.SIZE_SMALL : Hamburger.SIZE_LARGE;
    const stuffingObject = selectedStuff === 'None' ? { price: 0, calories: 0 } : Hamburger[`STUFFING_${selectedStuff.toUpperCase()}`];

    const hamburger = new Hamburger(sizeObject, stuffingObject);

    selectedToppings.forEach(topping => {
        if (topping === 'mayo') {
            hamburger.addTopping(Hamburger.TOPPING_MAYO);
        } else if (topping === 'sauce') {
            hamburger.addTopping(Hamburger.TOPPING_SAUCE);
        }
    });

    const totalPrice = hamburger.calculatePrice();
    const totalCalories = hamburger.calculateCalories();

    alert(`Total Price: ${totalPrice}\nTotal Calories: ${totalCalories}`);
});