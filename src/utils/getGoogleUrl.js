function getGoogleOAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"

    const options = {
        redirect_uri: "http://localhost:3001/api/sessions/oauth/google",
        client_id: "338132662236-6fu1bnm0ijj5es3q1n42q2lqtba7k256.apps.googleusercontent.com",
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
}

module.exports = getGoogleOAuthURL;
