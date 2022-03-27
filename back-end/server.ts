import "dotenv/config";
import Twilio from "twilio";
import express from "express";

const AccessToken = Twilio.jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

const PORT = process.env.PORT || 8081;

const app = express();
app.use(express.json());

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY_SID,
  TWILIO_API_KEY_SECRET,
} = process.env;



app.get("/token", function (request, response) {
  const {
    query: { identity, room },
  } = request;
  console.log(request.query)

  var token = new AccessToken(
    TWILIO_ACCOUNT_SID!,
    TWILIO_API_KEY_SID!,
    TWILIO_API_KEY_SECRET!,
    {
      identity: identity as string,
    }
  );

  const grant = new VideoGrant({
    room: room as string,
  });
  token.addGrant(grant);

  response.send({
    token: token.toJwt(),
  });
});


app.listen(PORT, () => console.log(`server running on ${PORT}`));
