const express = require("express");
const app = express();
const bodyp = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);

// Middleware for parsing JSON bodies
app.use(bodyp.json());

// Serve static files (like CSS, JS, Images) from the public directory
app.use(express.static("public")); // Make sure your style.css and codemirror-5.65.16 are inside the "public" folder

// Serve the main page
app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted");
    });
    res.sendFile(__dirname + "/index.html"); // Ensure your index.html is in the root directory
});

// Handle compile requests
app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;

    try {
        if (lang == "C_&_Cpp") {
            const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            if (!input) {
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            } else {
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                });
            }
        }
        else if (lang == "Java") {
            const envData = { OS: "windows" };
            if (!input) {
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            } else {
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            }
        }
        else if (lang == "Python") {
            const envData = { OS: "windows" };
            if (!input) {
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            } else {
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            }
        }
    } catch (e) {
        console.log("error", e);
        res.send({ output: "error" });
    }
});

// Start server
app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});
