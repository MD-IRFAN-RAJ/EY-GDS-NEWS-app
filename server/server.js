// require("dotenv").config();

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// const API_KEY = process.env.API_KEY;

// function fetchNews(url, res) {
//     axios.get(url)
//     .then(response => {
//         if (express.data.totalResult > 0) {
//             res.json({
//                 status: 200,
//                 success: true,
//                 message: "Successfully fetched the data",
//                 data:response.data
//             });
//         }
//         else {
//             res.json({
//                 status: 200,
//                 success: true,
//                 message: "No more results to show"
//             })
//         }
//     })
//     .catch(error => {
//         res.json({
//             status: 500,
//             success: false,
//             message: "Internal server error",
//             error: error.message
//         });
//     });
// };

// //routes
// app.get("/all-news", (req, res) => {
//     let pageSize = parseInt(req.query.pageSize) || 40;
//     let page=parseInt(req.query.page) || 1;
//     //let url = `https://newsapi.org/v2/everything?q=bitcoin&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
//     let url = 'https://newsapi.org/v2/everything?q=tesla&from=2024-11-20&sortBy=publishedAt&apiKey=19f6663fd229401c8265748cf620f186';
//     fetchNews(url, res);

// });

// //port
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });







require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

function fetchNews(url, res) {
    axios.get(url)
        .then(response => {
            if (response.data.totalResults > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Successfully fetched the data",
                    data: response.data
                });
            } else {
                res.json({
                    status: 200,
                    success: true,
                    message: "No more results to show"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            });
        });
}

// Routes
app.get("/all-news", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let query = req.query.q || "tesla";
    let from = req.query.from || "2024-11-20";
    let sortBy = req.query.sortBy || "publishedAt";

    let url = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=${sortBy}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

//top-headlines
app.options("/top-headlines", cors());
app.get("/top-headlines", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let country = req.query.country || "us";
    let category = req.query.category || "general";

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

//country specific news
app.options("/country/:iso", cors());
app.get("/country/:iso", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    const country = req.params.iso;

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});


// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
