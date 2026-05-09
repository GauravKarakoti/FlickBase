const express = require('express');
let router = express.Router();
//model
const { Article } = require('../../models/article_model');
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');
const { sortArgsHelper } = require('../../config/helpers');
// add single article - DONE
router.route('/admin/add_articles')
    .post(checkLoggedIn, grantAccess('createAny', 'article'), async(req, res) => {
        try {
            // run some other code to validate
            const article = new Article({
                ...req.body,
                score: parseInt(req.body.score)
            });
            const result = await article.save();
            res.status(200).json(result);
        } catch(error) {
            return res.status(400).json({message: "Error adding article", error: error})
        }
    })
// admin get, patch, delete single article (draft or public) - DONE
router.route('/admin/:id')
    .get(checkLoggedIn, grantAccess('readAny', 'article'), async(req, res) => {
        try {
            const _id = req.params.id;
            const article = await Article.findById(_id);
            if(!article || article.length === 0) {
                return res.status(400).json({message: "Article not found"})
            }
            res.status(200).json(article);
        } catch(error) {
            return res.status(400).json({message: "Error fetching article", error});
        }
    })
    .patch(checkLoggedIn, grantAccess('updateAny', 'article'), async(req, res) => {
        try {
            const _id = req.params.id;
            const article = await Article.findOneAndUpdate(
                { _id },
                {
                    "$set": req.body
                },
                {
                    new: true
                }
            );
            if(!article) return res.status(400).json({ message: "Article not found" });
            res.status(200).json(article);
        } catch(error) {
            res.status(400).json({message: "Error updating article", error});
        }
    })
    .delete(checkLoggedIn, grantAccess('deleteAny', 'article'), async(req, res) => {
        try {
            const _id = req.params.id;
            const article = await Article.findByIdAndRemove(_id);
            if(!article) return res.status(400).json({ message: "Article not found" });
            res.status(200).json({ _id: article._id });
        } catch(error) {
            res.status(400).json({message: "Error deleting", error});
        }
    })
// get articles no auth - DONE
router.route('/get_byid/:id')
    .get(async (req, res) => {        // NO AUTH REQUIRED //
        try {
            const _id = req.params.id;
            const article = await Article.find({_id: _id, status: 'public'});
            if(!article || article.length === 0) {
                return res.status(400).json({message: "Article not found"})
            }
            res.status(200).json(article);
        } catch(error) {
            return res.status(400).json({message: "Error fetching article", error});
        }
    })
// fetch articles load more - DONE
router.route('/loadmore')
    .post(async (req, res) => {
        try {
            let sortArgs = sortArgsHelper(req.body);
            const articles = await Article
                .find({ status: 'public' })
                .sort([[sortArgs.sortBy, sortArgs.order]])
                .skip(sortArgs.skip)
                .limit(sortArgs.limit);
            res.status(200).json(articles);
        } catch(error) {
            console.log(error);
            res.status(400).json({message: "Error fetching articles", error});
        }
    })
// fetch articles, with pagination - DONE
router.route('/admin/paginate')
    .post(checkLoggedIn, grantAccess('readAny', 'articles'), async (req, res) => {
        try {
            // let aggQuery = Article.aggregate([
            //     { $match: { status: "public" } },
            //     { $match: { title: { $regex: /Lorem/ } } }
            // ]);
            const limit = req.body.limit ? req.body.limit : 5;
            const aggQuery = Article.aggregate();
            const options = {
                page: req.body.page,
                limit,
                sort: { _id: 'desc' }
            }
            const articles  = await Article.aggregatePaginate(aggQuery, options);
            res.status(200).json(articles);
        } catch(error) {
            res.status(400).json({message: "Error", error});
        }
    })
module.exports = router;