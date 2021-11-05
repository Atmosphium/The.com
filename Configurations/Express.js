const User = require ('../Models/User'),
      Cryption = require ('./Cryption.json')

const Express = require ('express')

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ====== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== \\

// Configurations

const Application = Express ()

Application.use (Express.static ('Static'))
Application.use (Express.urlencoded ({ extended: true }))

Application.set ('view engine', 'ejs')
Application.set ('views', 'Pages')



// Pages

Application.get ('/', (Request, Response) => {
    Request.user ? Response.render ('Home', { User: Request.user }) : Response.render ('Home', { User: false })
})

Application.get ('/signin', (Request, Response) => {
    Request.user ? Response.redirect ('/profile') : Response.render ('Sign In')
})

Application.get ('/signup', (Request, Response,) => {
    Request.user ? Response.redirect ('/profile') : Response.render ('Sign Up')
})

Application.get ('/profile', (Request, Response) => {
    Request.user ? Response.render ('Profile', Request.user) : Response.redirect ('/signin')
})

Application.get ('/profile/:username', (Request, Response) => {
    Response.render ('Profile', { User: Request.params.username })
})


Application.post ('/signin', (Request, Response) => {
    User.findOne ({ username: Request.body.username }, (Err, foundUser) => {
        if (foundUser) {
            if (foundUser.password == Request.body.password) {
                Request.authenticate ({ User: foundUser })
                
                Response.redirect ('/profile')
            } else {
                Request.error ('signin', 'Password is incorrect.')
            }
        } else {
            Request.error ('signin', 'No user found with this username.')
            Response.redirect ('/signin')
        }
    })
})

Application.post ('/signup', (Request, Response) => {
    User.findOne ({ username: Request.body.username }, (Err, foundUser) => {
        if (foundUser) {
            Request.error ('signup', 'User already found with this username.')
            Response.redirect ('/signup')
        } else {
            const newUser = new User ()
            
            const birthdayDate = new Date (Number (Request.body.birthday.toString ().split ('-') [0]), Number (Request.body.birthday.toString ().split ('-') [1] - 1), Number (Request.body.birthday.toString ().split ('-') [2])),
                  isUserAKid = (new Date ().getFullYear () - Number (Request.body.birthday.toString ().split ('-') [0])) < 13

            var cryptedUsername = ''

            Request.body.username.split ('').forEach (symbolOfUsername => {
                cryptedUsername += Cryption [symbolOfUsername]
            })

            newUser._id = cryptedUsername
            newUser.fullname = Request.body.fullname
            newUser.username = Request.body.username
            newUser.password = Request.body.password
            newUser.gender = Request.body.gender
            newUser.birthday = birthdayDate
            newUser.kid = isUserAKid

            newUser.save ()

            Response.redirect ('/signin')
        }
    })
})

Application.get ('/api/users/:username', (Request, Response) => {
    User.findOne ({ username: Request.params.username }, (Err, foundUser) => {
        if (foundUser) {
            if (foundUser.password == Request.query.password) {
                Response.json (foundUser)
            } else {
                Response.json ({ error: 'Password is incorrect.' })
            }
        } else {
            Response.json ({ error: 'No user found with this username.' })
        }
    })
})

Application.get ('/api/signin', (Request, Response) => {
    const Username = Request.query.username,
          Password = Request.query.password,
          Platform = Request.query.platform

    User.findOne ({ username: Username }, (Err, foundUser) => {
        if (foundUser) {
            if (foundUser.password == Password) {
                Response.redirect (`www.${Platform}.com/api/signin?id=${foundUser.id}`)
            } else {
                Response.json ({ error: 'Password is incorrect.' })
            }
        } else {
            Response.json ({ error: 'No user found with this username.' })
        }
    })
})



// Port

Application.listen (3000, () => {
    console.log ('TheDotCom | Key of new world!')
})

/*User.register({username: req.body.username, fullname: req.body.fullname, lastName: 
        req.body.lastName}, req.body.password, function(err, user) {
        if (err) { 
            console.log(err);
            res.redirect('/register')
         } else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/secrets')
           });
        }}
    );*/