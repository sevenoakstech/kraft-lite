import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        // !!! Should be stored in .env file. See: https://next-auth.js.org/providers/keycloak
        KeycloakProvider({
            clientId: `kraftjs`,
            clientSecret: `refine`,
            issuer: `http://localhost:8888/realms/master`,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name ?? profile.preferred_username,
                    email: profile.email,
                    image: `https://picsum.photos/200`,
                };
            },
        }),
    ],
    secret: `UItTuD1HcGXIj8ZfHUswhYdNd40Lc325R8VlxQPUoR0=`,
};
export default NextAuth(authOptions);
