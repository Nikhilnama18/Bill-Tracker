function some(p1, p2, cb) {
    console.log("Inside some")
    cb("suhas", p1 + p1);
}

some(1, 2, (er, res) => {
    if (er) {
        console.log("Error orc ", er)
    }
    else
        console.log(res)
})