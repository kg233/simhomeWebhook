function makeRes(msg, google) {
  if (google) {
    return {
      fulfillmentMessages: [
        {
          platform: 'ACTIONS_ON_GOOGLE',
          simpleResponses: {
            simpleResponses: [
              {
                textToSpeech: `${msg}`,
                displayText: `${msg}`,
              },
            ],
          },
        },
        {
          basicCard: {
            title: 'template',
            image: {
              imageUri:
                'https://thumbs.gfycat.com/ImmenseNeglectedBooby-max-1mb.gif',
              accessibilityText: 'accessibility text',
            },
          },
          platform: 'ACTIONS_ON_GOOGLE',
        },
        {
          suggestions: {
            suggestions: [
              {
                title: 'suggestion1',
              },
              {
                title: 'suggestion2',
              },
              {
                title: 'suggestion3',
              },
            ],
          },
          platform: 'ACTIONS_ON_GOOGLE',
        },
      ],
      outputContexts: [],
    };
  } else {
    return {
      fulfillmentMessages: [
        {
          text: {
            text: [`${msg}`],
          },
        },
        {
          card: {
            title: 'template',
            imageUri:
              'https://thumbs.gfycat.com/KnobbyImperfectCoypu-max-1mb.gif',
          },
        },
        {
          quickReplies: {
            quickReplies: ['suggestion1', 'suggestion2', 'suggestion3'],
          },
        },
      ],
      outputContexts: [],
    };
  }
}

module.exports = makeRes;