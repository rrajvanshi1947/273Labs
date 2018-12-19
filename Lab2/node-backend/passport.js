var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var Traveler = require('./models/login') // need to resolve
var Owner = require('./models/owner')
var config = require('./secret/secret')

module.exports = function(passport) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        Traveler.findOne({id: jwt_payload.id}, function(err, traveler){
            if(err){
                return done(err, false)
            }
            if(traveler){
                done(null, traveler)
            }else{
                done(null, false)
            }
        } 
            
        )
    } 
        
    ))
}