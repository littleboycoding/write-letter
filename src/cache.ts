import { InMemoryCache, Reference } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getLetters: {
          keyArgs: ["hashtag"],
          merge(existing, incoming) {
            const letters: Reference[] = existing
              ? [...existing.letters, ...incoming.letters]
              : [...incoming.letters];

            return { ...incoming, letters };
          },
        },
      },
    },
    Letter: {
      fields: {
        getComments: {
          keyArgs: false,
          merge(existing, incoming, { args }) {
            const comments: Reference[] = existing
              ? [...existing.comments, ...incoming.comments]
              : [...incoming.comments];

            return { ...incoming, comments };
          },
        },
      },
    },
  },
});

export default cache;
