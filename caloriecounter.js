const emptyCard = {
    name: "",
    timestamp: 0,
    items: []
};

var cardParent = document.getElementById("card-parent");

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

function formatCard(data, edit) {
    var div = document.createElement("div");
    div.classList.add("card");
    var header = document.createElement("div");
    header.classList.add("card-header");
    div.appendChild(header);
    var items = document.createElement("div");
    items.classList.add("card-list");
    div.appendChild(items);
    if(edit) {
        div.classList.add("edit");
        var span = document.createElement("span");
        span.innerHTML = "Meal: ";
        header.appendChild(span);
        var title = document.createElement("select");
        title.classList.add("card-title");
        mealTypes.forEach(type => {
            var opt = document.createElement("option");
            opt.value = type.toLowerCase();
            opt.innerHTML = type;
            title.appendChild(opt);
        });
        header.appendChild(title);
        var addItem = document.createElement("button");
        addItem.innerHTML = "Add Item";
        addItem.addEventListener("click", function() {
            // to do
        });
        div.appendChild(addItem);
        data.items.forEach(item => {
            // to do
        });
    } else {
        var title = document.createElement("p");
        title.innerHTML = data.name;
        title.classList.add("card-title");
        header.appendChild(title);
        var date = document.createElement("p");
        date.classList.add("card-date");
        date.innerHTML = getDate(data.timestamp);
        header.appendChild(date);
        data.items.forEach(item => {
            var i = document.createElement("div");
            i.classList.add("card-item");
            var t = document.createElement("p");
            t.classList.add("item-header");
            t.innerHTML = item.name;
            i.appendChild(t);
            var c = document.createElement("p");
            c.classList.add("calories");
            c.innerHTML = item.calories + " calorie" + (item.calories == 1 ? "" : "s");
            i.appendChild(c);
            items.appendChild(i);
        });
    }
    return div;
}

function appendCard(card) {
    var div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = card;
    cardParent.appendChild(div);
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDate(timestamp) {
    var date = new Date(timestamp);
    return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

var sample = {
    name: "Breakfast",
    timestamp: 1652724817000,
    items: [
        {
            name: "sausage",
            calories: 150
        },
        {
            name: "egg",
            calories: 78
        },
        {
            name: "coffee",
            calories: 100
        },
        {
            name: "air",
            calories: -0
        }
    ]
};

cardParent.appendChild(formatCard(sample, false));
cardParent.appendChild(formatCard(sample, true));
cardParent.appendChild(formatCard(emptyCard, true));
