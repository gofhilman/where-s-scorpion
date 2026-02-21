import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:
    process.env.JWT_SECRET ??
    (() => {
      throw new Error("JWT_SECRET missing");
    })(),
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) =>
    done(null, { id: jwt_payload.sub }),
  ),
);
