const Comment = require('../models/Comment');



// exports.ViewArticle = (req, res) => {
//     const articleFound = Article.findOne({
//       where: { id_article: req.params.id_article },
//     }).catch((err) => console.log(err));
  
//     if (articleFound) {
//       res
//         .status(200)
//         .json({ message: `articleFound : ${articleFound.id_article}` });
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   };