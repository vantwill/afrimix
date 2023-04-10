import { MusicsData } from "../Data/MusicData.js";
import Music from "../Models/MusicsModel.js";
import asyncHandler from "express-async-handler";

// ************ PUBLIC CONTROLLERS ************
// @desc    import musics
// @route   POST /api/musics/import
// @access  Public

const importMusics = asyncHandler(async (req, res) => {
  // first we make sure our Musics table is empty by delete all documents
  await Music.deleteMany({});
  // then we insert all musics from MusicsData
  const musics = await Music.insertMany(MusicsData);
  res.status(201).json(musics);
});

// @desc    get all musics
// @route   GET /api/musics
// @access  Public

const getMusics = asyncHandler(async (req, res) => {
  try {
    // filter musics by category, time, language, rate, year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    // load more musics functionality
    const page = Number(req.query.pageNumber) || 1; // if pageNumber is not provided in query we set it to 1
    const limit = 10; // 10 musics per page
    const skip = (page - 1) * limit; // skip 2 musics per page

    // find musics by query, skip and limit
    const musics = await Music.find(query)
      // .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // get total number of musics
    const count = await Music.countDocuments(query);

    // send response with musics and total number of musics
    res.json({
      musics,
      page,
      pages: Math.ceil(count / limit), // total number of pages
      totalMusics: count, // total number of musics
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    get music by id
// @route   GET /api/musics/:id
// @access  Public

const getMusicById = asyncHandler(async (req, res) => {
  try {
    // find music by id in database
    const music = await Music.findById(req.params.id);
    // if the music if found send it to the client
    if (music) {
      res.json(music);
    }
    // if the music is not found send 404 error
    else {
      res.status(404);
      throw new Error("Music not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get top rated musics
// @route   GET /api/musics/rated/top
// @access  Public

const getTopRatedMusics = asyncHandler(async (req, res) => {
  try {
    // find top rated musics
    const musics = await Music.find({}).sort({ rate: -1 });
    // send top rated musics to the client
    res.json(musics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get random musics
// @route GET /api/musics/random/all
// @access Public

const getRandomMusics = asyncHandler(async (req, res) => {
  try {
    // find random musics
    const musics = await Music.aggregate([{ $sample: { size: 8 } }]);
    // send random musics to the client
    res.json(musics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  ************ PRIVATE CONTROLLERS ************

// @desc    Create music review
// @route   POST /api/musics/:id/reviews
// @access  Private

const createMusicReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    // find music by id in database
    const music = await Music.findById(req.params.id);

    if (music) {
      // check if the user already reviewed this music
      const alreadyReviewed = music.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      // if the user already reviewed this music send 400 error
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this music");
      }
      // else create a new review
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
      // push the new review to the reviews array
      music.reviews.push(review);
      // increment the number of reviews
      music.numberOfReviews = music.reviews.length;

      // calculate the new rate
      music.rate =
        music.reviews.reduce((acc, item) => item.rating + acc, 0) /
        music.reviews.length;

      // save the music in database
      await music.save();
      // send the new music to the client
      res.status(201).json({
        message: "Review added",
      });
    } else {
      res.status(404);
      throw new Error("Music not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ************ ADMIN CONTROLLERS ************

// @desc    Update music
// @route   PUT /api/musics/:id
// @access  Private/Admin

const updateMusic = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // find music by id in database
    const music = await Music.findById(req.params.id);

    if (music) {
      // update music data
      music.name = name || music.name;
      music.desc = desc || music.desc;
      music.image = image || music.image;
      music.titleImage = titleImage || music.titleImage;
      music.rate = rate || music.rate;
      music.numberOfReviews = numberOfReviews || music.numberOfReviews;
      music.category = category || music.category;
      music.time = time || music.time;
      music.language = language || music.language;
      music.year = year || music.year;
      music.video = video || music.video;
      music.casts = casts || music.casts;

      // save the music in database

      const updatedMusic = await music.save();
      // send the updated music to the client
      res.status(201).json(updatedMusic);
    } else {
      res.status(404);
      throw new Error("Music not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete music
// @route   DELETE /api/musics/:id
// @access  Private/Admin

const deleteMusic = asyncHandler(async (req, res) => {
  try {
    // find music by id in database
    const music = await Music.findById(req.params.id);
    // if the music is found delete it
    if (music) {
      await music.remove();
      res.json({ message: "Music removed" });
    }
    // if the music is not found send 404 error
    else {
      res.status(404);
      throw new Error("Music not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete all musics
// @route   DELETE /api/musics
// @access  Private/Admin

const deleteAllMusics = asyncHandler(async (req, res) => {
  try {
    // delete all musics
    await Music.deleteMany({});
    res.json({ message: "All musics removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Create music
// @route   POST /api/musics
// @access  Private/Admin

const createMusic = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // create a new music
    const music = new Music({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      userId: req.user._id,
    });

    // save the music in database
    if (music) {
      const createdMusic = await music.save();
      res.status(201).json(createdMusic);
    } else {
      res.status(400);
      throw new Error("Invalid music data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  importMusics,
  getMusics,
  getMusicById,
  getTopRatedMusics,
  getRandomMusics,
  createMusicReview,
  updateMusic,
  deleteMusic,
  deleteAllMusics,
  createMusic,
};
