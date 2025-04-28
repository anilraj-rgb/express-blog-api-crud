const posts = require(`../data/posts`);

const index = (req, res) => {
    const tag = req.query.tag; // Questo è il tag dalla query string
    if (tag) {
        let filteredPosts = posts.filter(post =>
            post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
        );
        res.json(filteredPosts); // Restituisci i post filtrati
    } else {
        res.json(posts); // Restituisco i post in formato JSON
    }
}

const show = (req, res) => {
    const id = parseInt(req.params.id);
    const tag = req.query.tag;

    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    res.json(post);
}

const store = (req, res) => {
    let newId = posts[posts.length - 1].id + 1;
    const { title, content, image, tags } = req.body;
    let newObj = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    posts.push(newObj);
    console.log(posts);
    res.status(201)
        .json(newObj);
}

const update = (req, res) => {
    let id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    const { title, content, image, tags } = req.body;

    post.title = title;
    post.content = content;
    post.image = image;
    post.tags = tags;

    console.log(posts)

    res.json(posts);
}

const modify = (req, res) => {
    let id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    res.send(`L'elemento è stato parzialmente modificato`);
}

const destroy = (req, res) => {
    let id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    posts.splice(posts.indexOf(post), 1);

    console.log(posts);
    res.status(204);
}

module.exports = { index, show, store, update, modify, destroy };