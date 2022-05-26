const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate.js");
const log = console.log;

// * /////////////////////////
// * Database
// * /////////////////////////
const db = [
  {
    id: 0,
    productName: "Fresh Avocados",
    image: "🥑",
    from: "Spain",
    nutrients: "Vitamin B, Vitamin K",
    quantity: "4 🥑",
    price: "6.50",
    organic: true,
    description:
      "A ripe avocado yields to gentle pressure when held in the palm of the hand and squeezed. The fruit is not sweet, but distinctly and subtly flavored, with smooth texture. The avocado is popular in vegetarian cuisine as a substitute for meats in sandwiches and salads because of its high fat content. Generally, avocado is served raw, though some cultivars, including the common 'Hass', can be cooked for a short time without becoming bitter. It is used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices.",
  },
  {
    id: 1,
    productName: "Goat and Sheep Cheese",
    image: "🧀",
    from: "Portugal",
    nutrients: "Vitamin A, Calcium",
    quantity: "250g",
    price: "5.00",
    organic: false,
    description:
      "Creamy and distinct in flavor, goat cheese is a dairy product enjoyed around the world. Goat cheese comes in a wide variety of flavors and textures, from soft and spreadable fresh cheese to salty, crumbly aged cheese. Although it’s made using the same coagulation and separation process as cheese made from cow’s milk, goat cheese differs in nutrient content.",
  },
  {
    id: 2,
    productName: "Apollo Broccoli",
    image: "🥦",
    from: "Portugal",
    nutrients: "Vitamin C, Vitamin K",
    quantity: "3 🥦",
    price: "5.50",
    organic: true,
    description:
      "Broccoli is known to be a hearty and tasty vegetable which is rich in dozens of nutrients. It is said to pack the most nutritional punch of any vegetable. When we think about green vegetables to include in our diet, broccoli is one of the foremost veggies to come to our mind. Broccoli is a cruciferous vegetable and part of the cabbage family, which includes vegetables such as Brussel sprouts and kale. Although the tastes are different, broccoli and these other vegetables are from the same family.",
  },
  {
    id: 3,
    productName: "Baby Carrots",
    image: "🥕",
    from: "France",
    nutrients: "Vitamin A, Vitamin K",
    quantity: "20 🥕",
    price: "3.00",
    organic: true,
    description:
      "The carrot is a root vegetable that is often claimed to be the perfect health food. It is crunchy, tasty and highly nutritious. Carrots are a particularly good source of beta-carotene, fiber, vitamin K, potassium and antioxidants. Carrots have a number of health benefits. They are a weight loss friendly food and have been linked to lower cholesterol levels and improved eye health.",
  },
  {
    id: 4,
    productName: "Sweet Corncobs",
    image: "🌽",
    from: "Germany",
    nutrients: "Vitamin C, Magnesium",
    quantity: "2 🌽",
    price: "2.00",
    organic: false,
    description:
      "Also known as maize, corn is one of the most popular cereal grains in the world. Popcorn and sweet corn are commonly eaten varieties, but refined corn products are also widely consumed, frequently as ingredients in foods. These include tortillas, tortilla chips, polenta, cornmeal, corn flour, corn syrup, and corn oil. Whole-grain corn is as healthy as any cereal grain, rich in fiber and many vitamins, minerals, and antioxidants.",
  },
];
// * ////////////////////////
// * Our own server
// * ////////////////////////

const HOST = "localhost";
const PORT = 8080;

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { query, pathname: pathName } = url.parse(req.url, true);

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    let cardsHtml = db.map((prod) => replaceTemplate(tempCard, prod)).join("");
    let output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);
  } else if (pathName === "/product") {
    const product = db[query.id];
    let output = replaceTemplate(tempProduct, product);
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(output);
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(db));
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(PORT, HOST, () => {
  log(`Server started listening at PORT ${8080}`);
  log(`GOTO http://${HOST}:${PORT}/`);
});
