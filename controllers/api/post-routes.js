const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',  async (req, res) => {
	try {
	  const postData = await Post.findAll({
		...req.body,
		user_id: req.session.user_id,
	  });
  
	  res.status(200).json(postData);
	} catch (err) {
	  res.status(400).json(err);
	}
  });

  router.get("/:id", async (req, res) => {
	// find a single product by its `id`
	// be sure to include its associated Category and Tag data
	try {
	  const postData = await Post.findByPk(req.params.id, {
	
	  });
  
	  if (!postData) {
		res.status(404).json({ message: "No post found with that id" });
		return;
	  }
  
	  res.status(200).json(postData);
	} catch (err) {
	  res.status(500).json(err);
	}
  });
  



router.post('/', async (req, res) => {
	try {
	  const newPost = await Post.create({
		
		id: req.body.id,
	  });
  
	  res.status(200).json(newPost);
	} catch (err) {
	  res.status(400).json(err);
	}
  });

  router.delete('/:id', withAuth, async (req, res) => {
	try {
	  const postData = await Post.destroy({
		where: {
		  id: req.params.id,
		  user_id: req.session.user_id,
		},
	  });
  
	  if (!postData) {
		res.status(404).json({ message: 'No post found with this id!' });
		return;
	  }
  
	  res.status(200).json(postData);
	} catch (err) {
	  res.status(500).json(err);
	}
  });
  


module.exports = router;

