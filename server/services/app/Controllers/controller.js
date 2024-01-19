const {User, Movie, Cast, Genre} = require('../models')
const { comparePassword } = require('../Helpers/bcrypt')
const { signToken } = require('../Helpers/jwt')
const { makeItLow } = require('../Helpers/toLower')
const {sequelize} = require('../models')
const slugify = require('slugify');

class Controller {

    static async register (req, res, next) {
        try {
            const role = "Admin"
            const {email, password} = req.body
            await User.create({
                email, password, role
            })
            res.status(201).json({message: "Register success"})
        } catch (error) {
            next(error)
        }
    }

    static async login (req, res, next) {
        try {
            const {email, password} = req.body
            if (!email || !password) {
                throw {name : "empty input field"}
            }
            
            const user = await User.findOne({where:{
                email: makeItLow(email)
            }})
            if (!user) {
                throw {name : "user not registered"}
            }

            const passwordValidation = comparePassword(password, user.password)
            if (!passwordValidation) {
                throw {name : "user not registered"}
            }
            const token = signToken({id:user.id, email:user.email})
            res.status(200).json({access_token: token, username : user.username, userId : user.id,  role : user.role})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getAllGenre(req, res, next) {
        try {
            const data = await Genre.findAll()
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addGenre(req, res, next) {
        try {
            console.log(req.body);
            const {name} = req.body
            const createdGenre = await Genre.create({
                name: name
            })

            res.status(201).json({createdGenre})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async deleteGenre(req, res, next) {
        try {
            const {id} = req.params
            const findGenre = await Genre.findByPk(id)
            if (!findGenre) {
                throw {name : "Data not found"}
            }

            await Genre.destroy({
            where: {
                id : id
            }})
            res.status(200).json({message: "Genre deleted"})
        } catch (error) {
            next(error)
        }
    }

    static async getAllMovie(req, res, next) {
        try {
            const data = await Movie.findAll({
                include: [
                    {
                        model: Genre,
                        attributes: ['name']
                    },
                    { model: Cast }
                ],
            })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getMovie(req, res, next) {
        try {
            const {id} = req.params
            const data = await Movie.findByPk(id, {
                include: [
                    {
                        model: Genre,
                        attributes: ['name']
                    },
                    { model: Cast }
                ],
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async addMovie(req, res, next) {
        const { title, GenreId, synopsis, trailerUrl, imgUrl, rating, Casts } = req.body;
        const slug = slugify(title, { lower: true });
        const transaction = await sequelize.transaction();
        const AuthorId = '654f7eceb47c3c39b519141a'
        try {
            const createdMovie = await Movie.create({
                title,
                slug,
                GenreId,
                synopsis,
                trailerUrl,
                imgUrl,
                rating,
                AuthorId 
            }, { transaction });
    
            await Promise.all(Casts.map(async (cast) => {
                const createdCast = await Cast.create({
                    name: cast.name,
                    profilePict: cast.profilePict,
                    MovieId: createdMovie.id,
                }, { transaction });
            }));
    
            await transaction.commit();
    
            res.status(201).json({ message: "success" });
        } catch (error) {
            console.log(error);
            await transaction.rollback();    
            next(error);
        }
    }

    static async editMovie(req, res, next) {
        const { title, GenreId, synopsis, trailerUrl, imgUrl, rating, Casts } = req.body;
        const { id } = req.params;
        const transaction = await sequelize.transaction();
        
        try {
            const updatedMovie = await Movie.findByPk(id);
    
            if (!updatedMovie) {
                throw {name : "Data not found"}
            }
    
            const slug = slugify(title, { lower: true });
            const AuthorId = '654f7eceb47c3c39b519141a'
            await updatedMovie.update({
                title,
                slug,
                GenreId,
                synopsis,
                trailerUrl,
                imgUrl,
                rating,
                AuthorId,
            }, { transaction });
            
            await Cast.destroy({
                where: { MovieId: id },
                transaction,
            });

            await Promise.all(Casts.map(async (cast) => {
                const createdCast = await Cast.create({
                    name: cast.name,
                    profilePict: cast.profilePict,
                    MovieId: id,
                }, { transaction });
            }));
    
            await transaction.commit();
    
            res.status(200).json({ message: 'success' });
        } catch (error) {
            await transaction.rollback();    
            next(error);
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const {id} = req.params
            const findMovie = await Movie.findByPk(id)
            if (!findMovie) {
                throw {name : "Data not found"}
            }

            await Movie.destroy({
            where: {
                id : id
            }})
            res.status(200).json({message: "Genre deleted"})
        } catch (error) {
            next(error)
        }
    }

    static async getAllCast(req, res, next) {
        try {
            const data = await Cast.findAll()
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

}
module.exports = Controller